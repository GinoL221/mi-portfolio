import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const theme of ["light", "dark"] as const) {
  test(`case study colors follow selected ${theme} theme and inline code meets contrast`, async ({ page }) => {
    const snapshots = [];
    for (const system of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme: system });
      await page.goto("/projects/dental-clinic");
      await page.evaluate((value) => localStorage.setItem("theme", value), theme);
      await page.reload();
      await expect(page.locator("html")).toHaveClass(theme === "dark" ? /\bdark\b/ : /^(?!.*\bdark\b).*$/);
      const code = page.locator("article p code");
      await expect(code).toHaveCount(3);
      const result = await new AxeBuilder({ page }).include("article p code").withRules(["color-contrast"]).analyze();
      expect(result.incomplete, `${theme}/${system}: contrast could not be determined`).toEqual([]);
      expect(result.violations, `${theme}/${system}: inline code contrast`).toEqual([]);
      snapshots.push(await page.locator("article").evaluate((article) => {
        const selectors = [".case-study-content h2", ".case-study-content p", ".case-study-content code"];
        return selectors.map((selector) => {
          const element = article.querySelector(selector);
          if (!element) throw new Error(`Missing ${selector}`);
          const style = getComputedStyle(element);
          return { color: style.color, background: style.backgroundColor };
        });
      }));
    }
    expect(snapshots[0], `${theme}: system preference must not override selected theme`).toEqual(snapshots[1]);
  });
}
