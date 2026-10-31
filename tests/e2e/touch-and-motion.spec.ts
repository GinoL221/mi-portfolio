import { expect, test } from "@playwright/test";

test("standalone controls provide at least 44px touch targets", async ({ page }) => {
  await page.goto("/");
  const controls = [
    page.getByRole("complementary", { name: "Proyecto destacado" }).getByRole("link", { name: "Ver caso de estudio", exact: true }),
    page.locator("body > footer").getByRole("link", { name: "Inicio", exact: true }),
    page.locator("body > footer").getByRole("link", { name: "Contacto", exact: true }),
    page.getByRole("link", { name: "LinkedIn", exact: true }),
    page.getByRole("link", { name: "GitHub", exact: true }),
    page.getByRole("link", { name: "Código", exact: true }).first(),
  ];

  for (const control of controls) {
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});

test("reduced motion keeps navigation and project motion static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const motion = await page.evaluate(() => {
    const nav = document.querySelector("#header-nav");
    const image = document.querySelector("#proyectos img");
    return {
      animationName: nav ? getComputedStyle(nav).animationName : "",
      transitionDuration: image ? getComputedStyle(image).transitionDuration : "",
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    };
  });
  expect(motion.animationName).toBe("none");
  const duration = motion.transitionDuration.endsWith("ms")
    ? Number.parseFloat(motion.transitionDuration)
    : Number.parseFloat(motion.transitionDuration) * 1000;
  expect(duration).toBeLessThanOrEqual(0.01);
  expect(motion.scrollBehavior).toBe("auto");
});
