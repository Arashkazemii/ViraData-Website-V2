/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright CLI evaluates this function expression. */
async (page) => {
  const origin = new URL(page.url()).origin;
  const widths = page.viewportSize().width > 760 ? [1440, 1024, 768] : [390, 360];
  const errors = [];
  const onError = (error) => errors.push(error.message);
  const onConsole = (message) => {
    if (message.type() === "error" && !message.text().includes("WebSocket")) errors.push(message.text());
  };
  page.on("pageerror", onError);
  page.on("console", onConsole);
  const results = [];
  for (const width of widths) {
    await page.setViewportSize({ width, height: width > 760 ? 1000 : 844 });
    for (const lang of ["en", "fa"]) {
      for (const route of ["", "solutions", "demos", "about", "contact"]) {
        const response = await page.goto(`${origin}/${lang}${route ? "/" + route : ""}`);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(450);
        const data = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          h1: document.querySelectorAll("h1").length,
          text: document.querySelector("main")?.innerText.length,
          direction: document.documentElement.dir,
          panels: [...document.querySelectorAll(".contact-panel, .family-row, .report-panel, .assistant-product")]
            .filter(el => el.getBoundingClientRect().width > 0 && el.scrollWidth > el.clientWidth + 2)
            .map(el => ({ className: el.className, width: el.clientWidth, content: el.scrollWidth })),
        }));
        results.push({ width, lang, route: route || "home", status: response.status(), ...data });
        if (width === 1440 || width === 390) {
          await page.screenshot({ path: `screenshots/redesign-${lang}-${route || "home"}-${width}.png` });
        }
      }
    }
  }
  page.off("pageerror", onError);
  page.off("console", onConsole);
  return {
    checks: results.length,
    failures: results.filter(r => r.overflow || r.h1 !== 1 || r.status !== 200 || r.text < 300 || r.panels.length || r.direction !== (r.lang === "fa" ? "rtl" : "ltr")),
    errors: [...new Set(errors)],
  };
}
