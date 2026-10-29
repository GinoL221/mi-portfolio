import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});


test("project technology tags use the same contrasting hover palette in both themes", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    await page.addStyleTag({ content: "#proyectos li span { transition: none !important; } html { scroll-behavior: auto !important; }" });
    const tags = page.locator("#proyectos article ul li span");
    expect(await tags.count()).toBeGreaterThan(0);
    for (const tag of await tags.all()) {
      await expect(tag.locator("svg")).toHaveCount(1);
      await tag.hover();
      const colors = await tag.evaluate((element) => {
        const context = document.createElement("canvas").getContext("2d")!;
        const rgb = (color: string) => {
          context.clearRect(0, 0, 1, 1);
          context.fillStyle = color;
          context.fillRect(0, 0, 1, 1);
          return Array.from(context.getImageData(0, 0, 1, 1).data);
        };
        const style = getComputedStyle(element);
        return { foreground: rgb(style.color), background: rgb(style.backgroundColor) };
      });
      const expected = theme === "light" ? [30, 64, 175] : [147, 197, 253];
      expect(colors.foreground.slice(0, 3)).toEqual(expected);
      expect(colors.background[3]).toBe(255);
      const luminance = (color: number[]) => color.slice(0, 3)
        .map((channel) => channel / 255)
        .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
        .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
      const foreground = luminance(colors.foreground);
      const background = luminance(colors.background);
      expect((Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05)).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test("experience heading uses the portfolio accent and date text remains readable", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    const accent = theme === "light" ? "rgb(30, 64, 175)" : "rgb(147, 197, 253)";
    const heading = page.locator("#experiencia h3").first();
    const date = page.locator("#experiencia time").first();
    await expect(heading).toHaveCSS("color", accent);
    const background = theme === "light" ? "#ffffff" : "#00091d";
    const ratio = await date.evaluate((element, surface) => {
      const context = document.createElement("canvas").getContext("2d")!;
      const luminance = (color: string) => {
        context.fillStyle = color;
        context.fillRect(0, 0, 1, 1);
        return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3)
          .map((channel) => channel / 255)
          .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
          .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
      };
      const foreground = luminance(getComputedStyle(element).color);
      const background = luminance(surface);
      return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
    }, background);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  }
});

test("education dates and status labels use the readable blue palette", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    const accent = theme === "light" ? "rgb(30, 64, 175)" : "rgb(147, 197, 253)";
    const cards = page.locator("#educacion > div > div");
    await expect(cards).toHaveCount(2);
    for (const card of await cards.all()) {
      const status = card.locator("span");
      await expect(status).toHaveText("Sin completar");
      await expect(status).toHaveCSS("color", accent);
      const ratios = await card.evaluate((element) => {
        const context = document.createElement("canvas").getContext("2d")!;
        const rgba = (value: string) => {
          context.clearRect(0, 0, 1, 1);
          context.fillStyle = value;
          context.fillRect(0, 0, 1, 1);
          const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
          return [red, green, blue, alpha / 255];
        };
        const luminance = (color: number[]) => color.slice(0, 3)
          .map((channel) => channel / 255)
          .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
          .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
        const contrast = (foreground: number[], background: number[]) => {
          const foregroundLuminance = luminance(foreground);
          const backgroundLuminance = luminance(background);
          return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
            / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
        };
        const panel = rgba(getComputedStyle(element).backgroundColor);
        const time = element.querySelector("time")!;
        const badge = element.querySelector("span")!;
        const dateRatio = contrast(rgba(getComputedStyle(time).color), panel);
        const badgeStyle = getComputedStyle(badge);
        const badgeBackground = rgba(badgeStyle.backgroundColor);
        const composite = badgeBackground.slice(0, 3).map((channel, index) =>
          channel * badgeBackground[3] + panel[index] * (1 - badgeBackground[3]));
        const statusRatio = contrast(rgba(badgeStyle.color), composite);
        return { dateRatio, statusRatio };
      });
      expect(ratios.dateRatio).toBeGreaterThanOrEqual(4.5);
      expect(ratios.statusRatio).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test("certification dates use readable slate colors in both themes", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    const expectedClass = theme === "light" ? /text-slate-600/ : /dark:text-slate-300/;
    const dates = page.locator("#certificaciones li p.mt-1");
    await expect(dates).toHaveCount(7);
    for (const date of await dates.all()) {
      await expect(date).toHaveClass(expectedClass);
      const ratio = await date.evaluate((element) => {
        const context = document.createElement("canvas").getContext("2d")!;
        const luminance = (value: string) => {
          context.fillStyle = value;
          context.fillRect(0, 0, 1, 1);
          return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3)
            .map((channel) => channel / 255)
            .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
            .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
        };
        const foreground = luminance(getComputedStyle(element).color);
        const surface = luminance(getComputedStyle(element.closest("li")!).backgroundColor);
        return (Math.max(foreground, surface) + 0.05) / (Math.min(foreground, surface) + 0.05);
      });
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test("footer links use the blue accent on hover in both themes", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    const accent = theme === "light" ? "rgb(30, 64, 175)" : "rgb(147, 197, 253)";
    const surface = theme === "light" ? "rgb(234, 234, 234)" : "rgb(51, 58, 74)";
    const links = page.locator("body > footer a");
    await expect(links).toHaveCount(3);
    for (const link of await links.all()) {
      await link.hover();
      await expect(link).toHaveCSS("color", accent);
      await expect(link).toHaveCSS("text-decoration-line", "underline");
      const ratio = await link.evaluate((element, background) => {
        const context = document.createElement("canvas").getContext("2d")!;
        const color = (value: string) => {
          context.fillStyle = value;
          context.fillRect(0, 0, 1, 1);
          return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
        };
        const luminance = (channels: number[]) => channels
          .map((channel) => channel / 255)
          .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
          .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
        const surface = color(background);
        const opacity = Number(getComputedStyle(element.closest("footer")!).opacity);
        const foreground = color(getComputedStyle(element).color)
          .map((channel, index) => channel * opacity + surface[index] * (1 - opacity));
        const foregroundLuminance = luminance(foreground);
        const backgroundLuminance = luminance(surface);
        return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
          / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
      }, surface);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test("footer keeps a balanced gap from the final content section", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    const gap = await page.evaluate(() => {
      const lastSection = document.querySelector("#sobre-mi")!;
      const footer = document.querySelector("body > footer")!;
      return footer.getBoundingClientRect().top - lastSection.getBoundingClientRect().bottom;
    });
    expect(gap).toBeGreaterThanOrEqual(0);
    expect(gap).toBeLessThanOrEqual(24);
  }
});

test("footer does not dim its links and text through parent opacity", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    await expect(page.locator("body > footer")).toHaveCSS("opacity", "1");
  }
});

test("about highlights and portrait accent follow the blue palette", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    const accent = theme === "light" ? "rgb(30, 64, 175)" : "rgb(147, 197, 253)";
    const surface = theme === "light" ? "rgb(234, 234, 234)" : "rgb(51, 58, 74)";
    const highlights = page.locator("#sobre-mi strong");
    await expect(highlights).toHaveCount(9);
    for (const highlight of await highlights.all()) {
      await expect(highlight).toHaveCSS("color", accent);
      const ratio = await highlight.evaluate((element, background) => {
        const context = document.createElement("canvas").getContext("2d")!;
        const luminance = (value: string) => {
          context.fillStyle = value;
          context.fillRect(0, 0, 1, 1);
          return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3)
            .map((channel) => channel / 255)
            .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
            .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
        };
        const foreground = luminance(getComputedStyle(element).color);
        const surface = luminance(background);
        return (Math.max(foreground, surface) + 0.05) / (Math.min(foreground, surface) + 0.05);
      }, surface);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
    const portrait = page.locator("#sobre-mi img");
    await expect(portrait).toHaveClass(theme === "light" ? /bg-black\/20/ : /dark:bg-blue-500\/5/);
  }
});
