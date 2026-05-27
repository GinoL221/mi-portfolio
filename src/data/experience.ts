export interface Experience {
  title: string;
  date: string;
  company: string;
  description: string;
  link?: string;
}

export const EXPERIENCE: Experience[] = [
  {
    title: "Freelance Full Stack Developer",
    date: "Enero 2024 - Actualidad",
    company: "Proyectos Independientes",
    description:
      "Desarrollo integral de aplicaciones web utilizando Java (Spring Boot) para el backend y React para el frontend. Implementación de arquitecturas escalables, integración de APIs RESTful y optimización de bases de datos MySQL. Enfoque en entregar soluciones personalizadas con alta calidad de código y performance.",
  },
  {
    title: "Desarrollador Web (Proyecto Educativo Intensivo)",
    date: "2023",
    company: "Certified Tech Developer (Digital House)",
    description:
      "Participación en simulaciones de entornos reales de trabajo bajo metodologías ágiles (Scrum). Desarrollo de un sistema de gestión clínica y una plataforma de e-commerce, aplicando patrones de diseño, validaciones de seguridad con JWT y despliegue continuo.",
  },
];
