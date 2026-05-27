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

export const PROJECTS = [
  {
    title: "Dental Clinic - Sistema de Gestión Full Stack",
    description:
      "Sistema integral para la gestión de clínicas dentales desarrollado con Java y Spring Boot. Implementa una arquitectura robusta con patrones MVC y DTOs, asegurando la escalabilidad del backend. Utiliza Spring Security y JWT para una autenticación segura. El frontend en React permite gestionar turnos, pacientes y odontólogos mediante formularios validados y una interfaz responsiva. Persistencia de datos optimizada en MySQL.",
    link: "https://github.com/GinoL221/Clinica-Dental-MVC", // Link temporal al repo ya que el original era un placeholder
    github: "https://github.com/GinoL221/Clinica-Dental-MVC",
    image: "home-dental-clinic.webp",
    tags: [TAGS.JAVA, TAGS.SPRINGBOOT, TAGS.REACT, TAGS.MYSQL, TAGS.JWT],
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
