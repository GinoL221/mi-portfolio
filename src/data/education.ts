export interface Education {
  degree: string;
  institution: string;
  period: string;
  note?: string;
}

export const EDUCATION: Education[] = [
  {
    degree: "Licenciatura en Sistemas",
    institution: "Universidad Nacional de General Sarmiento (UNGS)",
    period: "2019 – 2024",
    note: "Sin completar",
  },
  {
    degree: "Certified Tech Developer",
    institution: "Digital House + Globant + Mercado Libre",
    period: "Desde 2025",
    note: "Sin completar",
  },
];
