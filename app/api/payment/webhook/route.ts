import { NextResponse } from "next/server";
import crypto from "crypto";

let cachedPublicKey: string | null = null;

const courses = {
  1: {
    name: "РЎС‚СЂСѓРєС‚СѓСЂР° Р—РѕРґС–Р°РєСѓ",
    price: 99900,
  },
  2: {
    name: "Р—РЅР°РєРё Р—РѕРґС–Р°РєСѓ",
    price: 99900,
  },
  3: {
    name: "РџР»Р°РЅРµС‚Рё",
    price: 132000,
  },
  4: {
    name: "РљР°СЂРјС–С‡РЅРёР№",
    price: 132000,
  },
} as const;

async function getMonoPublicKey(
  forceRefresh = false
) {
  if (
    cachedPublicKey &&
    !forceRefresh
  ) {
    return cachedPublicKey;
  }

  const token =
    process.env.MONO_TOKEN;

  if (!token) {
    throw new Error(
      "MONO_TOKEN is missing"
    );
  }

  const response = await fetch(
    "https://api.monobank.ua/api/merchant/pubkey",
    {
      method: "GET",

      headers: {
        "X-Token": token,
      },

      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to get Monobank public key: ${response.status}`
    );
  }

  const data =
    await response.json();

  if (!data.key) {
    throw new Error(
      "Monobank public key is missing"
    );
  }

  cachedPublicKey = Buffer.from(
    data.key,
    "base64"
  ).toString("utf8");

  return cachedPublicKey;
}

function verifyMonoSignature(
  body: string,
  signature: string,
  publicKey: string
) {
  const verifier =
    crypto.createVerify("SHA256");

  verifier.update(body);
  verifier.end();

  return verifier.verify(
    publicKey,
    Buffer.from(
      signature,
      "base64"
    )
  );
}

async function getInvoiceStatus(
  invoiceId: string
) {
  const token =
    process.env.MONO_TOKEN;

  if (!token) {
    throw new Error(
      "MONO_TOKEN is missing"
    );
  }

  const response = await fetch(
    `https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${encodeURIComponent(
      invoiceId
    )}`,
    {
      method: "GET",

      headers: {
        "X-Token": token,
      },

      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      "MONO STATUS ERROR:",
      response.status,
      errorText
    );

    throw new Error(
      "Failed to get invoice status"
    );
  }

  return response.json();
}

async function sendTelegramNotification(
  invoice: any
) {
  const botToken =
    process.env.TELEGRAM_BOT_TOKEN;

  const chatId =
    process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error(
      "Telegram environment variables are missing"
    );
  }

  const amount =
    Number(invoice.amount || 0);

  const amountInUah =
    amount / 100;


  const reference =
    String(invoice.reference || "");

  const match =
    reference.match(
      /^course-(\d+)-/
    );

  const courseId = match
    ? Number(match[1])
    : 0;

  const course =
    courseId &&
    courseId in courses
      ? courses[
          courseId as keyof typeof courses
        ]
      : null;

  const courseName =
    course?.name ||
    "РљСѓСЂСЃ AVESTA";


  if (
    course &&
    course.price !== amount
  ) {
    console.error(
      "PAYMENT AMOUNT MISMATCH:",
      {
        invoiceId:
          invoice.invoiceId,
        courseId,
        expected:
          course.price,
        received:
          amount,
      }
    );

    throw new Error(
      "Payment amount mismatch"
    );
  }

  const message = [
  "вњ… Р—РђРњРћР’Р›Р•РќРќРЇ РЈРЎРџР†РЁРќРћ РћРџР›РђР§Р•РќРћ",
  "",
  `РљСѓСЂСЃ: ${courseName}`,
  `РЎСѓРјР°: ${amountInUah} РіСЂРЅ`,
  "",
  `Invoice ID: ${invoice.invoiceId || "вЂ”"}`,
].join("\n");

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    }
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      "Telegram payment notification error:",
      errorText
    );

    throw new Error(
      "Telegram notification failed"
    );
  }
}

export async function POST(
  request: Request
) {
  try {

    const signature =
      request.headers.get("x-sign");

    if (!signature) {
      console.error(
        "MONO WEBHOOK: x-sign is missing"
      );

      return NextResponse.json(
        {
          error:
            "Invalid signature",
        },
        {
          status: 401,
        }
      );
    }


    const rawBody =
      await request.text();

    let publicKey =
      await getMonoPublicKey();

    let isValid =
      verifyMonoSignature(
        rawBody,
        signature,
        publicKey
      );

    if (!isValid) {
      publicKey =
        await getMonoPublicKey(true);

      isValid =
        verifyMonoSignature(
          rawBody,
          signature,
          publicKey
        );
    }

    if (!isValid) {
      console.error(
        "MONO WEBHOOK: invalid signature"
      );

      return NextResponse.json(
        {
          error:
            "Invalid signature",
        },
        {
          status: 401,
        }
      );
    }

    const webhook =
      JSON.parse(rawBody);

    console.log(
      "MONO WEBHOOK VERIFIED:",
      {
        invoiceId:
          webhook.invoiceId,
        status:
          webhook.status,
        amount:
          webhook.amount,
        modifiedDate:
          webhook.modifiedDate,
      }
    );


    if (
      webhook.status === "success" &&
      webhook.invoiceId
    ) {
      const invoice =
        await getInvoiceStatus(
          webhook.invoiceId
        );


      if (
        invoice.status !== "success"
      ) {
        console.error(
          "INVOICE STATUS IS NOT SUCCESS:",
          invoice.status
        );

        return NextResponse.json(
          {
            error:
              "Payment is not successful",
          },
          {
            status: 400,
          }
        );
      }


      if (
        invoice.invoiceId !==
        webhook.invoiceId
      ) {
        console.error(
          "INVOICE ID MISMATCH"
        );

        return NextResponse.json(
          {
            error:
              "Invoice mismatch",
          },
          {
            status: 400,
          }
        );
      }

      await sendTelegramNotification(
        invoice
      );
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(
      "Webhook error:",
      error
    );

    return NextResponse.json(
      {
        error: "Webhook error",
      },
      {
        status: 400,
      }
    );
  }
}
