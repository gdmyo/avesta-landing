export type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export const services: Service[] = [
  {
    id: 1,
    title: "Консультації",
    description:
      "Різні формати консультацій для глибшого розуміння себе, життєвих процесів та важливих рішень.",
    image: "/images/services/consultation.jpg",
  },
  {
    id: 2,
    title: "Клубні заходи",
    description:
      "Офлайн-зустрічі, нові знайомства, практика та унікальна атмосфера кожного заходу.",
    image: "/images/services/club.jpg",
  },
  {
    id: 3,
    title: "Виїзні тренінги",
    description:
      "Тренінги у Харкові та за межами міста. Кожна зустріч має свою тему та формат.",
    image: "/images/services/training.jpg",
  },
  {
    id: 4,
    title: "Астрологія для початківців",
    description:
      "Знайомство з основами астрології та практичним аналізом натальних карт.",
    image: "/images/services/astrology.jpg",
  },
];