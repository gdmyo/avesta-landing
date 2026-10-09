export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__subtitle">
          Центр розвитку «Avesta»
        </p>

        <p className="hero__author">
          створений Тетяною Семеновою
        </p>

        <h1 className="hero__title">
          АСТРОЛОГІЯ
          <br />
          КОНСУЛЬТАЦІЇ
          <br />
          КУРСИ • СУПРОВІД • ВИЇЗНІ ТРЕНІНГИ
        </h1>

        <p className="hero__description">
          від практикуючого експерта з 15-річним досвідом
        </p>

        <div className="hero__actions">
          <a href="#consultations" className="hero__button hero__button--primary">
            ЗАПИСАТИСЯ
          </a>

          <a href="#courses" className="hero__button hero__button--secondary">
            ПЕРЕГЛЯНУТИ КУРСИ
          </a>
        </div>
      </div>
    </section>
  );
}