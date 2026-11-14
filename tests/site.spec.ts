import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("production page, assets, sections and browser health", async ({ page }) => {
  const errors: string[] = [];
  const failed: string[] = [];
  const remote: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("response", response => { if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
  page.on("requestfailed", request => failed.push(request.url()));
  page.on("request", request => { if (!request.url().startsWith("http://127.0.0.1:3107") && !request.url().startsWith("data:")) remote.push(request.url()); });
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Folio — One Terminal. Every Opportunity.");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Everything You Need");
  for (const id of ["product", "overview", "features", "how-it-works", "roadmap", "community"]) await expect(page.locator(`#${id}`)).toBeVisible();
  await expect(page.locator(".feature-card")).toHaveCount(6);
  await expect(page.locator(".roadmap-card")).toHaveCount(4);
  await expect(page.locator(".roadmap-card .planned-label")).toHaveText(["Planned", "Planned", "Planned", "Planned"]);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('14px "Manrope Variable"'))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(await page.evaluate(() => [...document.images].every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  await page.screenshot({ path: `test-results/${test.info().project.name}-homepage.png`, fullPage: true });
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
  expect(remote).toEqual([]);
});

test("token search, selection, watchlist, chart and portfolio", async ({ page }) => {
  await page.goto("/");
  const search = page.getByRole("searchbox", { name: "Search demo tokens" });
  await search.fill("vyne");
  await expect(page.locator(".token-row")).toHaveCount(1);
  await page.getByRole("button", { name: "View VYNE", exact: true }).click();
  await expect(page.locator(".chart-token h4")).toContainText("VYNE");
  await expect(page.locator(".chart-price strong")).toHaveText("$0.6382");
  await search.fill("nonexistent");
  await expect(page.getByText("No matching demo tokens. Try NOVA.")).toBeVisible();
  await search.fill("");
  await page.getByRole("button", { name: "Save AURA to watchlist" }).click();
  await page.getByRole("button", { name: "Watchlist", exact: true }).click();
  await expect(page.locator(".token-row")).toHaveCount(3);
  await page.getByRole("button", { name: "Remove AURA from watchlist" }).click();
  await expect(page.locator(".token-row")).toHaveCount(2);
  await page.getByRole("button", { name: "1D", exact: true }).click();
  await expect(page.getByRole("img", { name: /VYNE 1D candlestick chart/ })).toBeVisible();
  const volume = page.getByRole("button", { name: "Volume", exact: true });
  await volume.click();
  await expect(volume).toHaveAttribute("aria-pressed", "false");
  await volume.click();
  await expect(volume).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Portfolio", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Portfolio overview" })).toBeVisible();
  await expect(page.locator(".market-stats")).toContainText("$12,840.62");
});

test("navigation targets and correct social destinations", async ({ page }, testInfo) => {
  await page.goto("/");
  const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(anchors => anchors.map(a => a.getAttribute("href")!).filter(href => href !== "#" && !document.getElementById(href.slice(1))));
  expect(brokenAnchors).toEqual([]);
  await page.getByRole("link", { name: "Explore Folio", exact: true }).click();
  await expect(page).toHaveURL(/#product$/);
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Roadmap", exact: true }).click();
    await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
  } else {
    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Roadmap" }).click();
  }
  await expect(page).toHaveURL(/#roadmap$/);
  for (const url of ["https://t.me/folioterminal", "https://x.com/folioterminal?s=11"]) {
    const links = page.locator(`a[href="${url}"]`);
    expect(await links.count()).toBeGreaterThan(1);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    // Intercept external destinations to test the actual click without depending on third-party availability.
    await page.context().route(url, route => route.fulfill({ status: 200, contentType: "text/html", body: "<title>Social destination verified</title>" }));
    const popupPromise = page.waitForEvent("popup");
    await page.locator(`a[href="${url}"]:visible`).first().click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    expect(popup.url()).toBe(url);
    await popup.close();
  }
});

test("WCAG accessibility and responsive widths", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
  for (const width of [320, 375, 390, 680, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Horizontal overflow at ${width}px`).toBe(true);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.locator(".hero-content").evaluate(el => getComputedStyle(el).animationName)).toBe("none");
});

test("metadata, local assets, security headers and real 404", async ({ page, request }) => {
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-powered-by"]).toBeUndefined();
  for (const asset of ["/icon.svg", "/social-card.png", "/apple-touch-icon.png", "/robots.txt"]) {
    const result = await request.get(asset);
    expect(result.status(), asset).toBe(200);
    expect((await result.body()).byteLength).toBeGreaterThan(10);
  }
  await page.goto("/");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /all-in-one crypto trading terminal/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /social-card.png/);
  const missing = await page.goto("/missing-page");
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "This page isn’t on the map." })).toBeVisible();
  await page.getByRole("link", { name: "Back to Folio" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Everything You Need");
});
