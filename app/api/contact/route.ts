export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, requestType, message } = body;

    if (!name || !phone) {
      return Response.json(
        {
          success: false,
          message: "Ім'я та телефон обов'язкові",
        },
        {
          status: 400,
        }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram environment variables are missing");

      return Response.json(
        {
          success: false,
          message: "Помилка конфігурації сервера",
        },
        {
          status: 500,
        }
      );
    }

    const telegramMessage = `
🔔 Нова заявка AVESTA

👤 Ім'я:
${name}

📞 Телефон:
${phone}

✨ Запит:
${requestType || "Не вказано"}

💬 Повідомлення:
${message || "Без повідомлення"}
    `.trim();

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
        }),
      }
    );

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.text();

      console.error("Telegram error:", telegramError);

      return Response.json(
        {
          success: false,
          message: "Не вдалося відправити повідомлення",
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        success: false,
        message: "Помилка сервера",
      },
      {
        status: 500,
      }
    );
  }
}