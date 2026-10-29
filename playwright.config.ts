import { defineConfig, devices } from "@playwright/test";
import { resolve } from "node:path";

process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve(".astro/playwright-browsers");

export default defineConfig({
  testDir: "./tests/e2e",
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:4342" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4342 --ignore-lock",
    url: "http://127.0.0.1:4342/",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
