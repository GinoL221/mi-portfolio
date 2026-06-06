export interface SkillCategory {
  name: string;
  skills: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    name: "Backend",
    skills: ["Java", "Spring Boot", "Spring Security", "Node.js", "Express.js", "REST API", "JWT"],
  },
  {
    name: "Frontend",
    skills: ["React", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Next.js", "Astro"],
  },
  {
    name: "Bases de datos",
    skills: ["MySQL"],
  },
  {
    name: "Testing",
    skills: ["Testing Manual QA", "Playwright"],
  },
  {
    name: "Herramientas y metodologías",
    skills: ["Git", "GitHub", "Scrum", "Arquitectura MVC", "Patrones de Diseño"],
  },
];
