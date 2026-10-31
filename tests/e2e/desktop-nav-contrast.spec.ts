import { expect, test } from "@playwright/test";

for (const theme of ["light", "dark"] as const) {
  test(`desktop navigation keeps an opaque surface over the case study in ${theme} theme`, async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) < 768, "desktop-specific navigation treatment");
    await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
    await page.goto("/projects/dental-clinic");
    await page.locator(".case-study-content h2").first().scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
    const navigation = page.locator("#header-nav");
    await expect.poll(() => navigation.evaluate((element) => {
      const canvas = document.createElement("canvas").getContext("2d")!;
      canvas.fillStyle = getComputedStyle(element).backgroundColor;
      canvas.fillRect(0, 0, 1, 1);
      return canvas.getImageData(0, 0, 1, 1).data[3];
    })).toBe(255);
    const controls = navigation.locator("a, button");
    await expect(controls).toHaveCount(7);
    for (const control of await controls.all()) {
      await expect(control).toBeVisible();
      const ratio = await control.evaluate((element) => {
        const canvas = document.createElement("canvas").getContext("2d")!;
        const luminance = (color: string) => {
          canvas.fillStyle = color;
          canvas.fillRect(0, 0, 1, 1);
          return Array.from(canvas.getImageData(0, 0, 1, 1).data).slice(0, 3)
            .map((value) => value / 255)
            .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
            .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
        };
        const foreground = luminance(getComputedStyle(element).color);
        const background = luminance(getComputedStyle(element.closest("#header-nav")!).backgroundColor);
        return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
      });
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  });
}
