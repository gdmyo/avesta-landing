"use client";

import { FormEvent, useState } from "react";

const requestTypes = [
  "Консультація",
  "Курс",
  "Подарунковий сертифікат",
  "Клубний захід",
  "Виїзний тренінг",
  "Інше",
];

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      requestType: formData.get("requestType"),
      message: formData.get("message"),
    };

try {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Помилка відправки");
  }

  setStatus("success");
  form.reset();
} catch (error) {
  console.error(error);
  setStatus("error");
}
    console.log(data);

    // Пока имитируем отправку.
    // На следующем этапе здесь будет запрос к Telegram API.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setStatus("success");
    form.reset();
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__container">

        <div className="contact__info">
          <span className="contact__label">
            ЗВ'ЯЗАТИСЯ
          </span>

          <h2 className="contact__title">
            Залиште заявку
          </h2>

          <p className="contact__text">
            Заповніть форму, і ми зв&apos;яжемося з Вами,
            щоб відповісти на запитання та допомогти
            обрати відповідний формат.
          </p>

          <div className="contact__note">
            <span>AVESTA</span>
            <p>
              Консультації • Курси • Навчання • Заходи
            </p>
          </div>
        </div>

        <div className="contact__form-wrapper">

          {status === "success" ? (
            <div className="contact__success">
              <span className="contact__success-icon">
                ✓
              </span>

              <h3>Дякуємо!</h3>

              <p>
                Вашу заявку успішно надіслано.
                Ми зв&apos;яжемося з Вами найближчим часом.
              </p>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="contact__new-request"
              >
                НАДІСЛАТИ ЩЕ ОДНУ ЗАЯВКУ
              </button>
            </div>
          ) : (
            <form
              className="contact__form"
              onSubmit={handleSubmit}
            >
              <div className="contact__field">
                <label htmlFor="name">
                  Ім&apos;я *
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ваше ім'я"
                  required
                />
              </div>

              <div className="contact__field">
                <label htmlFor="phone">
                  Номер телефону *
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+380..."
                  required
                />
              </div>

              <div className="contact__field">
                <label htmlFor="requestType">
                  Що Вас цікавить?
                </label>

                <select
                  id="requestType"
                  name="requestType"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Оберіть варіант
                  </option>

                  {requestTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contact__field">
                <label htmlFor="message">
                  Повідомлення
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Напишіть Ваше запитання..."
                />
              </div>

              <button
                type="submit"
                className="contact__submit"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "ВІДПРАВЛЯЄМО..."
                  : "НАДІСЛАТИ"}
              </button>
              {status === "error" && (
                <p className="contact__error">
                 Не вдалося надіслати заявку. Будь ласка,
                 спробуйте ще раз.
                </p>
               )}

              <p className="contact__privacy">
                Натискаючи кнопку, Ви погоджуєтесь
                на обробку наданих даних.
              </p>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}