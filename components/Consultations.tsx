import { consultations } from "@/data/consultations";

export default function Consultations() {
  return (
    <section className="consultations" id="consultations">
      <div className="consultations__container">

        <div className="consultations__heading">
          <span className="consultations__label">
            КОНСУЛЬТАЦІЇ
          </span>

          <h2 className="consultations__title">
            Оберіть формат консультації
          </h2>

          <p className="consultations__intro">
            Індивідуальний підхід до Вашого запиту та детальний
            астрологічний аналіз.
          </p>
        </div>

        <div className="consultations__grid">
          {consultations.map((consultation) => (
            <article
              className="consultation-card"
              key={consultation.id}
            >
              <h3 className="consultation-card__title">
                {consultation.title}
              </h3>

              <p className="consultation-card__description">
                {consultation.description}
              </p>
            </article>
          ))}
        </div>

        <div className="consultations__cta">
          <h3>Не знаєте, який формат обрати?</h3>

          <p>
            Залиште заявку, і ми допоможемо визначитися
            з форматом консультації.
          </p>

          <a href="#contact" className="consultations__button">
            ЗАПИСАТИСЯ
          </a>
        </div>

      </div>
    </section>
  );
}