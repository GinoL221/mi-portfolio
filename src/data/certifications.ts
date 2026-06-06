export interface Certification {
  name: string;
  institution: string;
  date?: string;
}

export const CORE_CERTIFICATIONS: Certification[] = [
  {
    name: "Programación Web Full Stack",
    institution: "Digital House",
    date: "Mar 2024",
  },
  {
    name: "React.js",
    institution: "Certified Tech Developer / Digital House + Globant + Mercado Libre",
    date: "2025",
  },
  {
    name: "DevOps Engineer",
    institution: "Digital House",
    date: "Abr 2026",
  },
  {
    name: "Introduction to Linux (LFS101)",
    institution: "The Linux Foundation",
    date: "Ene 2026",
  },
  {
    name: "Web Designer",
    institution: "Digital House",
    date: "Nov 2024",
  },
  {
    name: "Testing Manual QA",
    institution: "ProgramON / Coca-Cola Foundation / Chicos.net",
    date: "2025",
  },
  {
    name: "Testing Automatizado con Playwright",
    institution: "ProgramON / Coca-Cola Foundation / Chicos.net",
    date: "2026",
  },
];

export const AI_CERTIFICATIONS: Certification[] = [
  {
    name: "Claude 101",
    institution: "Anthropic",
    date: "Jun 2026",
  },
  {
    name: "AI Fluency: Framework & Foundations",
    institution: "Anthropic",
    date: "Jun 2026",
  },
  {
    name: "AI Fluency: AI Capabilities & Limitations",
    institution: "Anthropic",
    date: "Jun 2026",
  },
  {
    name: "Introduction to Claude Cowork",
    institution: "Anthropic",
    date: "Jun 2026",
  },
  {
    name: "Introduction to Agent Skills",
    institution: "Anthropic",
    date: "Jun 2026",
  },
];
