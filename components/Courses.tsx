import { courses } from "@/data/courses";

export default function Courses() {
  return (
    <section className="courses" id="courses">
      <div className="courses__container">

        <div className="courses__heading">
          <span className="courses__label">КУРСИ</span>

          <h2 className="courses__title">
            Ознайомитись з курсами
          </h2>

          <p className="courses__intro">
            Формати: онлайн, офлайн, запис. Індивідуально або у групі.
          </p>
        </div>

        <div className="courses__grid">
          {courses.map((course) => (
            <article className="course-card" key={course.id}>

              <span className="course-card__label">
                — КУРС —
              </span>

              <h3 className="course-card__title">
                {course.title}
              </h3>

              <p className="course-card__description">
                {course.description}
              </p>

              <div className="course-card__price">
                {course.price}
              </div>

              <ul className="course-card__features">
                {course.features.map((feature) => (
                  <li key={feature}>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="course-card__actions">
                <a
                  href="#contact"
                  className="course-card__button course-card__button--secondary"
                >
                  ПОСТАВИТИ ЗАПИТАННЯ
                </a>

                <a
                  href="#contact"
                  className="course-card__button course-card__button--primary"
                >
                  ПРИДБАТИ
                </a>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}