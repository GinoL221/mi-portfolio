import { expect, test } from "@playwright/test";

test("project links use the theme-specific keyboard focus accent", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    const accent = theme === "light" ? "rgb(30, 64, 175)" : "rgb(147, 197, 253)";
    for (const [route, selector] of [
      ["/", 'aside[aria-label="Proyecto destacado"] a'],
      ["/", '#proyectos article footer a'],
      ["/projects/dental-clinic", 'article header footer a'],
    ]) {
      await page.goto(route);
      await page.evaluate((value) => localStorage.setItem("theme", value), theme);
      await page.reload();
      await page.addStyleTag({ content: "* { transition: none !important; }" });
      const link = page.locator(selector).first();
      let focused = false;
      for (let i = 0; i < 60; i++) {
        await page.keyboard.press("Tab");
        if (await link.evaluate((element) => element === document.activeElement)) {
          focused = true;
          break;
        }
      }
      expect(focused).toBe(true);
      await expect(link).toHaveCSS("outline-style", "solid");
      await expect(link).toHaveCSS("outline-width", "2px");
      await expect(link).toHaveCSS("outline-offset", "2px");
      await expect(link).toHaveCSS("outline-color", accent);
    }
  }
});

test("return links use a visible theme-specific keyboard focus accent", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.goto("/projects/dental-clinic");
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    const accent = theme === "light" ? "rgb(30, 64, 175)" : "rgb(147, 197, 253)";

    const focusReturnLink = async (name: string) => {
      const link = page.getByRole("link", { name, exact: true });
      let focused = false;
      for (let index = 0; index < 40; index += 1) {
        await page.keyboard.press("Tab");
        if (await link.evaluate((element) => element === document.activeElement)) {
          focused = true;
          break;
        }
      }
      expect(focused).toBe(true);
      await expect(link).toHaveCSS("outline-style", "solid");
      await expect(link).toHaveCSS("outline-width", "2px");
      await expect(link).toHaveCSS("outline-offset", "2px");
      await expect(link).toHaveCSS("outline-color", accent);
    };

    await focusReturnLink("Volver a proyectos");
    await page.goto("/a-page-that-does-not-exist");
    await expect(page.getByRole("heading", { name: "Página no encontrada" })).toBeVisible();
    await focusReturnLink("Volver al inicio");
  }
});
