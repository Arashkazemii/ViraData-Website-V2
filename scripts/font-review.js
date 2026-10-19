/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright CLI evaluates this function expression. */
async (page) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const results = [];
  for (const width of [1440, 390, 360]) {
    await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
    for (const lang of ["fa", "en"]) {
      for (const route of ["", "solutions", "demos", "about", "contact"]) {
        const url = `http://localhost:3102/${lang}${route ? `/${route}` : ""}`;
        const response = await page.goto(url);
        await page.evaluate(() => document.fonts.ready);
        const data = await page.evaluate(() => {
          const headings = [...document.querySelectorAll("h1, h2, h3")];
          const buttons = [...document.querySelectorAll("button, .button, .btn")];
          const clippedHeadings = headings.filter((node) => {
            const box = node.getBoundingClientRect();
            return box.width > innerWidth || node.scrollWidth > node.clientWidth + 2;
          });
          return {
            title: document.title,
            h1: document.querySelectorAll("h1").length,
            overflow: document.documentElement.scrollWidth > innerWidth,
            clippedHeadings: clippedHeadings.map((node) => node.textContent?.slice(0, 45)),
            tinyButtons: buttons.filter((node) => {
              const box = node.getBoundingClientRect();
              return box.width > 0 && (box.width < 36 || box.height < 36);
            }).length,
            bodyFont: getComputedStyle(document.body).fontFamily,
            headingLineHeight: headings[0] ? getComputedStyle(headings[0]).lineHeight : "",
            loadedFonts: [...document.fonts].filter((font) => font.status === "loaded").map((font) => `${font.family} ${font.weight}`),
            fontRequests: performance.getEntriesByType("resource").filter((entry) => entry.name.includes("IRANYekanXVFaNumVF.woff2")).length,
            reportSample: document.querySelector(".report-stage, .report-board, .story-report")?.textContent?.slice(0, 90) || "",
          };
        });
        results.push({ width, lang, route: route || "home", status: response?.status(), ...data });
        if (width === 1440 || width === 390) {
          await page.screenshot({
            path: `E:/Arash/ViraData/website/screenshots/font-${lang}-${route || "home"}-${width}.png`,
            fullPage: false,
          });
        }
      }
    }
  }
  return {
    checks: results.length,
    failures: results.filter((result) => result.status !== 200 || result.h1 !== 1 || result.overflow || result.clippedHeadings.length || (result.lang === "fa" && (result.fontRequests !== 1 || !result.loadedFonts.some((font) => font.includes("IRANYekanXFaNum"))))),
    results,
    errors,
  };
}
