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
  },
  {
    name: "Testing Automatizado con Playwright",
    institution: "ProgramON / Coca-Cola Foundation / Chicos.net",
  },
];

export const AI_CERTIFICATIONS: Certification[] = [
  {
    name: "Claude 101",
    institution: "Anthropic",
  },
  {
    name: "AI Fluency: Framework & Foundations",
    institution: "Anthropic",
  },
  {
    name: "AI Fluency: AI Capabilities & Limitations",
    institution: "Anthropic",
  },
  {
    name: "Introduction to Claude Cowork",
    institution: "Anthropic",
  },
  {
    name: "Introduction to Agent Skills",
    institution: "Anthropic",
  },
];
