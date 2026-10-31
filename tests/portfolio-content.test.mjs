import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const home = readFileSync("dist/index.html", "utf8");
const caseStudy = readFileSync("dist/projects/dental-clinic/index.html", "utf8");
const dental = [...home.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)]
  .map(([article]) => article)
  .find((article) => article.includes("Dental Clinic"));

test("mobile navigation can wrap and keeps its links and theme control", () => {
  const nav = home.match(/<nav\b[^>]*id="header-nav"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav);
  assert.match(nav, /flex-wrap/);
  for (const href of ["/", "/#experiencia", "/#certificaciones", "/#proyectos", "/#sobre-mi", "mailto:"]) {
    assert.ok(nav.includes(`href="${href}`), href);
  }
  assert.match(nav, /id="theme-toggle"/);
});

test("projects appear before experience while retaining all home sections", () => {
  const ids = [...home.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(([, id]) => id);
  assert.deepEqual(ids, ["inicio", "proyectos", "experiencia", "educacion", "habilidades", "certificaciones", "sobre-mi"]);
});

test("the introduction highlights the Dental Clinic case study", () => {
  const featured = home.match(/<aside\b[^>]*aria-label="Proyecto destacado"[\s\S]*?<\/aside>/)?.[0];
  assert.ok(featured);
  assert.match(featured, /Dental Clinic/);
  assert.match(featured, /href="\/projects\/dental-clinic"/);
});

test("the featured project connects its technologies to a technical decision", () => {
  const featured = home.match(/<aside\b[^>]*aria-label="Proyecto destacado"[\s\S]*?<\/aside>/)?.[0];
  assert.ok(featured);
  assert.match(featured, /aria-label="Tecnologías"[\s\S]*aria-hidden="true"[\s\S]*Decisión técnica[\s\S]*eval\(\)[\s\S]*Ver caso de estudio/);
});

test("the introduction presents the stack without unsupported specialist claims", () => {
  assert.match(home, /Desarrollador Full Stack.*Java.*Spring Boot.*React/);
  assert.doesNotMatch(home, /Especialista en Java/);
});

test("the case study describes the remaining eval uses", () => {
  assert.match(caseStudy, /Usos de eval\(\) restantes/);
});

test("a repository is not presented as a separate website", () => {
  assert.ok(dental);
  assert.match(dental, /Código/);
  assert.doesNotMatch(dental, /Sitio Web/);
});

test("projects with distinct website links retain them", () => {
  assert.match(home, /Sitio Web/);
});

test("the Spotify project links to its existing repository", () => {
  const article = [...home.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)]
    .map(([item]) => item)
    .find((item) => item.includes("Spotify Clone"));
  assert.ok(article);
  assert.match(article, /href="https:\/\/github\.com\/GinoL221\/Spotify-clon"/);
  assert.doesNotMatch(article, /github\.com\/GinoL221\/spotify-clone/);
});
