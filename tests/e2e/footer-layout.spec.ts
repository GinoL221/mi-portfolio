import { expect, test } from "@playwright/test";

test("footer layout adapts without changing link destinations", async ({ page }, testInfo) => {
  await page.goto("/");
  const footer = page.locator("body > footer");
  const links = footer.locator("ul");
  const copyright = footer.locator("span");
  await expect(footer.getByRole("link", { name: "Inicio", exact: true })).toHaveAttribute("href", "/");
  await expect(footer.getByRole("link", { name: "Contacto", exact: true })).toHaveAttribute("href", /^mailto:/);
  await expect(footer.getByRole("link", { name: "Gino", exact: true })).toHaveAttribute("href", "https://www.linkedin.com/in/ginolencina/");
  const boxes = await Promise.all([footer.boundingBox(), links.boundingBox(), copyright.boundingBox()]);
  expect(boxes.every(Boolean)).toBe(true);
  const [container, nav, copy] = boxes as NonNullable<(typeof boxes)[number]>[];
  if (testInfo.project.name === "mobile") {
    expect(nav.y + nav.height).toBeLessThanOrEqual(copy.y);
    expect(Math.abs((nav.x + nav.width / 2) - (container.x + container.width / 2))).toBeLessThanOrEqual(2);
    expect(Math.abs((copy.x + copy.width / 2) - (container.x + container.width / 2))).toBeLessThanOrEqual(2);
  } else {
    expect(copy.x + copy.width).toBeLessThan(nav.x);
  }
});
