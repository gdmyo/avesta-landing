export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__content">
          <p className="about__label">Про мене</p>

          <h2 className="about__title">
            Тетяна Семенова
          </h2>

          <p className="about__text">
            Практикуючий астролог із багаторічним досвідом.
            Допомагаю краще зрозуміти себе, свої можливості,
            життєві періоди та напрямки розвитку.
          </p>

          <p className="about__text">
            У своїй роботі поєдную знання астрології,
            практичний досвід та індивідуальний підхід
            до кожної людини.
          </p>

          <a href="#consultations" className="about__button">
            ЗАПИСАТИСЯ НА КОНСУЛЬТАЦІЮ
          </a>
        </div>

        <div className="about__image">
          <div className="about__image-placeholder">
            Фото
          </div>
        </div>
      </div>
    </section>
  );
}