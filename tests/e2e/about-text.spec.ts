import { expect, test } from "@playwright/test";

test("about paragraphs preserve spaces around emphasized text", async ({ page }) => {
  await page.goto("/");
  const paragraphs = page.locator("#sobre-mi article p");
  await expect(paragraphs).toHaveCount(3);
  await expect(paragraphs.nth(0)).toHaveText("Soy Gino Lencina, Desarrollador Web Full Stack orientado a la construcción de aplicaciones modernas y escalables. Mi stack principal es Java, Spring Boot, React, Node.js y MySQL, con foco en arquitecturas limpias y código de calidad.");
  await expect(paragraphs.nth(1)).toHaveText("Mi experiencia abarca desde el desarrollo de REST APIs con arquitecturas MVC hasta la creación de interfaces dinámicas y responsivas. He liderado proyectos como una Plataforma de Ecommerce y un Sistema de Gestión de Clínicas Dentales, donde implementé seguridad robusta mediante Spring Security y JWT.");
  await expect(paragraphs.nth(2)).toHaveText("Me apasiona resolver problemas complejos mediante el uso de patrones de diseño y metodologías ágiles como Scrum. Mi objetivo es integrarme en equipos de alto rendimiento donde pueda aportar valor técnico y seguir evolucionando como Full Stack Developer.");
});
