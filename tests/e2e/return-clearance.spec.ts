import { expect, test } from "@playwright/test";

test("return page content starts below the fixed navigation", async ({ page }) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    for (const theme of ["light", "dark"]) {
      await page.goto("/projects/dental-clinic");
      await page.evaluate((value) => localStorage.setItem("theme", value), theme);
      await page.reload();
      for (const [route, name] of [["/projects/dental-clinic", "Volver a proyectos"], ["/missing-page", "Volver al inicio"]]) {
        await page.goto(route);
        const nav = await page.locator("#header-nav").boundingBox();
        const link = await page.getByRole("link", { name, exact: true }).boundingBox();
        expect(nav).not.toBeNull();
        expect(link).not.toBeNull();
        expect(link!.y).toBeGreaterThanOrEqual(nav!.y + nav!.height);
      }
    }
  }
});

test("404 content clears the fixed navigation on short screens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 400 });
  await page.goto("/missing-page");
  await page.evaluate(() => document.fonts.ready);
  const nav = await page.locator("#header-nav").boundingBox();
  const content = await page.locator("main > div").first().boundingBox();
  expect(nav).not.toBeNull();
  expect(content).not.toBeNull();
  expect(content!.y).toBeGreaterThanOrEqual(nav!.y + nav!.height);
});
