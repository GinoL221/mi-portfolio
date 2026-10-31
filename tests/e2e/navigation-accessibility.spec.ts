import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});


test("navigation and its controls fit in the viewport", async ({ page }) => {
  const nav = page.locator("#header-nav");
  const controls = nav.locator("a, button");
  await expect(controls).toHaveCount(9);
  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  for (const control of await controls.all()) {
    await expect(control).toBeVisible();
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width);
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height);
    expect(await control.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const top = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
      return top === element || element.contains(top);
    })).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport!.width);
});

test("mobile navigation keeps its theme-aware backdrop while scrolling", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 768, "mobile-specific navigation treatment");

  await page.setViewportSize({ width: 320, height: 844 });
  const nav = page.locator("#header-nav");
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    await page.evaluate(() => window.scrollTo(0, 0));

    const controls = nav.locator("a, button");
    await expect(controls).toHaveCount(9);
    for (const control of await controls.all()) {
      await expect(control).toBeVisible();
      const box = await control.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(320);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);

    const navBox = await nav.boundingBox();
    const firstSection = await page.locator("main > section").first().boundingBox();
    expect(navBox).not.toBeNull();
    expect(firstSection).not.toBeNull();
    expect(navBox!.y + navBox!.height).toBeLessThanOrEqual(firstSection!.y);

    await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
    await page.evaluate(() => window.scrollTo({ top: 1000, behavior: "instant" }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    await page.waitForTimeout(100);

    const surface = await nav.evaluate((element) => {
      const context = document.createElement("canvas").getContext("2d")!;
      context.fillStyle = getComputedStyle(element).backgroundColor;
      context.fillRect(0, 0, 1, 1);
      const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
      const luminance = [red, green, blue]
        .map((channel) => channel / 255)
        .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
        .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
      return { alpha, luminance };
    });
    expect(surface.alpha).toBe(255);
    if (theme === "light") expect(surface.luminance).toBeGreaterThan(0.95);
    else expect(surface.luminance).toBeLessThan(0.1);
    await expect.poll(() => nav.evaluate((element) => getComputedStyle(element).boxShadow)).not.toBe("none");
  }
});

test("navigation controls provide at least 44px touch targets", async ({ page }) => {
  for (const control of await page.locator("#header-nav a, #header-nav button").all()) {
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});

test("navigation interaction colors contrast with both theme backgrounds", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    const background = theme === "light" ? "#ffffff" : "#00091d";
    const accent = theme === "light" ? "rgb(30, 64, 175)" : "rgb(147, 197, 253)";
    await page.addStyleTag({ content: "#header-nav a, #header-nav button { transition: none !important; }" });
    for (const control of [page.locator("#header-nav a").first(), page.locator("#theme-toggle")]) {
      await control.hover();
      await expect(control).toHaveCSS("color", accent);
      await expect.poll(() => control.evaluate((element, bg) => {
        const canvas = document.createElement("canvas").getContext("2d")!;
        const luminance = (color: string) => {
          canvas.fillStyle = color;
          canvas.fillRect(0, 0, 1, 1);
          return Array.from(canvas.getImageData(0, 0, 1, 1).data).slice(0, 3)
            .map((channel) => channel / 255)
            .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
            .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
        };
        const foreground = luminance(getComputedStyle(element).color);
        const background = luminance(bg);
        return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
      }, background)).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test("the active section uses the same navigation accent as hover", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    await page.addStyleTag({ content: "#header-nav a { transition: none !important; } html { scroll-behavior: auto !important; }" });
    const accent = theme === "light" ? "rgb(30, 64, 175)" : "rgb(147, 197, 253)";
    for (const section of ["proyectos", "experiencia", "proyectos"]) {
      await page.locator(`#${section}`).evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
      await page.mouse.move(0, 0);
      const active = page.locator(`#header-nav a[aria-label="${section}"]`);
      await expect(active).toHaveCSS("color", accent);
      for (const other of await page.locator("#header-nav a").all()) {
        if (await other.getAttribute("aria-label") !== section) {
          await expect(other).not.toHaveCSS("color", accent);
        }
      }
    }
  }
});


test("social pills have visible theme-specific keyboard focus on every caller", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.goto("/");
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    const accent = theme === "light" ? "rgb(30, 64, 175)" : "rgb(147, 197, 253)";
    const focusSocialPill = async (selector: string) => {
      const pill = page.locator(selector);
      let focused = false;
      for (let index = 0; index < 40; index += 1) {
        await page.keyboard.press("Tab");
        if (await pill.evaluate((element) => element === document.activeElement)) {
          focused = true;
          break;
        }
      }
      expect(focused).toBe(true);
      await expect(pill).toHaveCSS("outline-style", "solid");
      await expect(pill).toHaveCSS("outline-width", "2px");
      await expect(pill).toHaveCSS("outline-offset", "2px");
      await expect(pill).toHaveCSS("outline-color", accent);
    };

    const heroPills = page.locator('nav[aria-label="Contacto y perfiles"] a');
    await expect(heroPills).toHaveCount(3);
    for (let index = 0; index < 3; index += 1) {
      await focusSocialPill(`nav[aria-label="Contacto y perfiles"] a:nth-of-type(${index + 1})`);
    }

    await page.goto("/components");
    await expect(page.locator("article a")).toHaveCount(1);
    await focusSocialPill("article a");
  }
});


test("the profile panel starts below the navigation", async ({ page }) => {
  const nav = await page.locator("#header-nav").boundingBox();
  const panel = await page.locator("main > section").first().boundingBox();
  expect(nav).not.toBeNull();
  expect(panel).not.toBeNull();
  expect(panel!.y).toBeGreaterThan(nav!.y + nav!.height);
});

test("keyboard navigation focuses a link and Enter opens its section", async ({ page }) => {
  const projects = page.locator('#header-nav a[href="/#proyectos"]');
  for (let i = 0; i < 2; i++) await page.keyboard.press("Tab");
  await expect(projects).toBeFocused();
  expect(await projects.evaluate((element) => element.matches(":focus-visible"))).toBe(true);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/#proyectos$/);
  const heading = page.getByRole("heading", { name: "Proyectos", exact: true });
  await expect(heading).toBeInViewport();
});

test("theme selection persists after reload", async ({ page }) => {
  const toggle = page.getByRole("button", { name: "Cambiar tema claro u oscuro" });
  const root = page.locator("html");
  const initial = await root.evaluate((element) => element.classList.contains("dark"));
  await toggle.click();
  await expect(root).toHaveClass(initial ? /^(?!.*\bdark\b).*$/ : /\bdark\b/);
  await page.reload();
  await expect(root).toHaveClass(initial ? /^(?!.*\bdark\b).*$/ : /\bdark\b/);
});

test("home is the active navigation item when the profile is visible", async ({ page }) => {
  await page.addStyleTag({ content: "#header-nav a { transition: none !important; }" });
  await expect(page.locator('#header-nav a[aria-label="inicio"]')).toHaveCSS("color", "rgb(30, 64, 175)");
});

for (const theme of ["light", "dark"] as const) {
  test(`active navigation works after returning from the case study in ${theme} theme`, async ({ page }) => {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    const accent = theme === "light" ? "rgb(30, 64, 175)" : "rgb(147, 197, 253)";
    await page.getByRole("complementary", { name: "Proyecto destacado" })
      .getByRole("link", { name: "Ver caso de estudio" }).click();
    await expect(page).toHaveURL(/\/projects\/dental-clinic\/?$/);
    await expect(page.locator("html")).toHaveClass(theme === "dark" ? /\bdark\b/ : /^(?!.*\bdark\b).*$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("html")).toHaveClass(theme === "dark" ? /\bdark\b/ : /^(?!.*\bdark\b).*$/);
    await page.addStyleTag({ content: "#header-nav a { transition: none !important; } html { scroll-behavior: auto !important; }" });
    await expect(page.locator('#header-nav a[aria-label="inicio"]')).toHaveCSS("color", accent);
    await page.locator("#experiencia").evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
    await expect(page.locator('#header-nav a[aria-label="experiencia"]')).toHaveCSS("color", accent);
  });
}

test("featured case study opens its detail page", async ({ page }) => {
  await page.getByRole("complementary", { name: "Proyecto destacado" })
    .getByRole("link", { name: "Ver caso de estudio" }).click();
  await expect(page).toHaveURL(/\/projects\/dental-clinic\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Dental Clinic");
});
