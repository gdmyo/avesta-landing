export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__top">

          <div className="footer__brand">
            <a href="#" className="footer__logo">
              AVESTA
            </a>

            <p>
              Астрологія, консультації, навчання
              та простір для глибшого розуміння себе.
            </p>
          </div>

          <div className="footer__column">
            <h3>Навігація</h3>

            <a href="#about">Про мене</a>
            <a href="#services">Послуги</a>
            <a href="#courses">Курси</a>
            <a href="#consultations">Консультації</a>
          </div>

          <div className="footer__column">
            <h3>Зв'язок</h3>

            <a href="#contact">
              Залишити заявку
            </a>

            <a href="#">
              Telegram
            </a>

            <a href="#">
              Instagram
            </a>
          </div>

        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} AVESTA. Всі права захищені.
          </p>

          <a href="#">
            Політика конфіденційності
          </a>
        </div>

      </div>
    </footer>
  );
}