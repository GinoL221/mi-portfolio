export interface Skill {
  name: string;
  tag?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const SKILLS: SkillCategory[] = [
  {
    name: "Backend",
    skills: [
      { name: "Java", tag: "java" },
      { name: "Spring Boot", tag: "springboot" },
      { name: "Spring Security" },
      { name: "Node.js", tag: "node" },
      { name: "Express.js", tag: "express" },
      { name: "REST API" },
      { name: "JWT", tag: "jwt" },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", tag: "react" },
      { name: "JavaScript (ES6+)", tag: "javascript" },
      { name: "HTML5", tag: "html" },
      { name: "CSS3", tag: "css" },
      { name: "Tailwind CSS", tag: "tailwindcss" },
      { name: "Next.js", tag: "next" },
      { name: "Astro", tag: "astro" },
    ],
  },
  {
    name: "Bases de datos",
    skills: [{ name: "MySQL", tag: "mysql" }],
  },
  {
    name: "Testing",
    skills: [{ name: "Testing Manual QA" }, { name: "Playwright" }],
  },
  {
    name: "Herramientas y metodologías",
    skills: [
      { name: "Git" },
      { name: "GitHub", tag: "github" },
      { name: "Scrum" },
      { name: "Arquitectura MVC" },
      { name: "Patrones de Diseño" },
    ],
  },
];
