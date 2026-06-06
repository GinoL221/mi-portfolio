import NextJSIcon from "@/icons/NextJSIcon.astro";
import AstroIcon from "@/icons/AstroIcon.astro";
import TailwindCSSIcon from "@/icons/TailwindCSSIcon.astro";
import JavaScriptIcon from "@/icons/JavaScriptIcon.astro";
import ReactIcon from "@/icons/ReactIcon.astro";
import JavaIcon from "@/icons/JavaIcon.astro";
import SpringBootIcon from "@/icons/SpringBootIcon.astro";
import MySQLIcon from "@/icons/MySQLIcon.astro";
import JWTIcon from "@/icons/JWTIcon.astro";
import CSSIcon from "@/icons/CSSIcon.astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

// --- Interfaces ---

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudySection {
  heading: string;
  body: string[];
}

export interface CaseStudy {
  slug: string;
  tagline: string;
  sections: CaseStudySection[];
  metrics: CaseStudyMetric[];
}

export interface Tag {
  name: string;
  class: string;
  icon: AstroComponentFactory;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  github: string;
  image: string;
  tags: Tag[];
  caseStudy?: CaseStudy;
}

// --- Tags ---

export const TAGS = {
  NEXT: {
    name: "Next.js",
    class: "bg-black text-white",
    icon: NextJSIcon,
  },
  ASTRO: {
    name: "Astro",
    class: "bg-[#00040a] text-white",
    icon: AstroIcon,
  },
  TAILWINDCSS: {
    name: "Tailwind CSS",
    class: "bg-[#003159] text-white",
    icon: TailwindCSSIcon,
  },
  JAVASCRIPT: {
    name: "JavaScript",
    class: "bg-[#323330] text-[#f7df1e]",
    icon: JavaScriptIcon,
  },
  REACT: {
    name: "React",
    class: "bg-[#23272f] text-[#00d8ff]",
    icon: ReactIcon,
  },
  JAVA: {
    name: "Java",
    class: "bg-[#1d1d1d] text-[#e76f00]",
    icon: JavaIcon,
  },
  SPRINGBOOT: {
    name: "Spring Boot",
    class: "bg-[#24292e] text-[#6db33f]",
    icon: SpringBootIcon,
  },
  MYSQL: {
    name: "MySQL",
    class: "bg-[#00758f] text-white",
    icon: MySQLIcon,
  },
  JWT: {
    name: "JWT",
    class: "bg-[#333333] text-white",
    icon: JWTIcon,
  },
  CSS: {
    name: "CSS",
    class: "bg-[#264de4] text-white",
    icon: CSSIcon,
  },
};

// --- Projects ---

export const PROJECTS: Project[] = [
  {
    title: "Dental Clinic - Sistema de Gestión Full Stack",
    description:
      "Sistema integral para la gestión de clínicas dentales con Java, Spring Boot y React. Backend con arquitectura MVC, Spring Security y JWT. Frontend con gestión de turnos, pacientes y odontólogos. Entregado con TDD, auditoría de código muerto y PRs encadenados.",
    link: "https://github.com/GinoL221/Dental-Clinic",
    github: "https://github.com/GinoL221/Dental-Clinic",
    image: "home-dental-clinic.webp",
    tags: [TAGS.JAVA, TAGS.SPRINGBOOT, TAGS.REACT, TAGS.MYSQL, TAGS.JWT],
    caseStudy: {
      slug: "dental-clinic",
      tagline: "Cómo encontré un eval() sobre HTML del servidor en el flujo de login y lo rediseñé limpio.",
      sections: [
        {
          heading: "El problema",
          body: [
            "Durante una auditoría sistemática del frontend de Dental Clinic encontré que el flujo de login ejecutaba eval() sobre HTML crudo devuelto por el servidor. No era un code smell abstracto: cualquier respuesta maliciosa o manipulada ejecutaría JavaScript arbitrario en el navegador del usuario.",
            "El problema de raíz era un contrato implícito entre backend y frontend: el servidor devolvía HTML que el cliente interpretaba como código. Sin un contrato explícito de datos, agregar validación o tests era imposible sin antes rediseñar la comunicación.",
          ],
        },
        {
          heading: "El enfoque",
          body: [
            "Reemplacé el contrato implícito por un contrato JSON explícito: el backend devuelve datos estructurados, el frontend los renderiza. Sin intermediarios ejecutables.",
            "Apliqué TDD (RED→GREEN) para cada pieza del rediseño: primero el test que falla por la razón correcta, después el código mínimo que lo hace pasar. Esto convirtió cada decisión de diseño en un caso de prueba verificable.",
            "La auditoría de código muerto fue sistemática: cada archivo candidato se verificó con rg antes de eliminarlo. Nada se borró por intuición.",
            "La entrega siguió la misma disciplina: PRs encadenados con slices revisables, donde cada PR tiene un inicio claro, un fin verificado y un rollback razonable. La misma práctica que este case study está usando.",
          ],
        },
        {
          heading: "El resultado",
          body: [
            "El eval() quedó en cero. El contrato entre backend y frontend es ahora explícito, tipado y testeable.",
            "37 tests pasan en main. 5 bugs de runtime (TypeError, ReferenceError) fueron corregidos en el proceso. 7 archivos de código muerto fueron eliminados — cada uno verificado antes de borrarlo.",
            "El resultado no es solo un repo más limpio. Es evidencia de un proceso: encontré algo raro, entendí por qué importaba, lo rediseñé con un criterio claro, lo probé y lo entregué en piezas revisables.",
          ],
        },
      ],
      metrics: [
        { label: "eval() eliminados", value: "0" },
        { label: "Tests en main", value: "37" },
        { label: "Bugs corregidos", value: "5" },
        { label: "Archivos de código muerto eliminados", value: "7" },
      ],
    },
  },
  {
    title: "Movies App - Explorador de Cine con API REST",
    description:
      "Aplicación moderna para la búsqueda y exploración de películas consumiendo una API REST pública. Permite visualizar destacados, recomendaciones personalizadas y trailers integrados. Desarrollada con React y JavaScript, enfocándose en una experiencia de usuario fluida y un diseño altamente responsivo optimizado para dispositivos móviles.",
    link: "https://peliradar.netlify.app/",
    github: "https://github.com/GinoL221/Buscador_Peliculas",
    image: "movies-app.webp",
    tags: [TAGS.REACT, TAGS.JAVASCRIPT],
  },
  {
    title: "Spotify Clone - Reproductor de Música de Alto Rendimiento",
    description:
      "Clon funcional del reproductor de Spotify desarrollado con Astro y React. Aprovecha la arquitectura de islas de Astro para lograr un rendimiento excepcional (LCP optimizado). Incluye controles de reproducción, gestión de playlists y un diseño UI/UX que replica fielmente la experiencia original, adaptándose a cualquier tamaño de pantalla.",
    link: "https://stremingmusic.netlify.app/",
    github: "https://github.com/GinoL221/spotify-clone",
    image: "spotify-clone.webp",
    tags: [TAGS.ASTRO, TAGS.REACT, TAGS.JAVASCRIPT],
  },
  {
    title: "Mercado Liebre - E-commerce de Práctica Intensiva",
    description:
      "Maquetación integral de un sitio de comercio electrónico inspirado en Mercado Libre. Proyecto enfocado en perfeccionar el uso de HTML5 semántico, CSS3 avanzado y JavaScript vanilla. Implementa estructuras complejas de grillas y flexbox para garantizar un diseño responsivo y accesible, incluyendo flujos de login y simulación de carrito de compras.",
    link: "https://super-jelly-27eda1.netlify.app/",
    github: "https://github.com/GinoL221/Mercado_Liebre",
    image: "mercado-liebre-app.webp",
    tags: [TAGS.JAVASCRIPT, TAGS.CSS],
  },
];
