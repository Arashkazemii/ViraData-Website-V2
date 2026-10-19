/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright CLI loads this function expression directly. */
async (page) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  const results = [];
  for (const width of [1440, 768, 390, 360]) {
    await page.setViewportSize({ width, height: width > 760 ? 1000 : 844 });
    for (const lang of ["fa", "en"])
      for (const route of ["", "solutions", "demos", "about", "contact"]) {
        const response = await page.goto(
          "http://localhost:3000/" + lang + (route ? "/" + route : ""),
        );
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(200);
        const data = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          h1: document.querySelectorAll("h1").length,
          main: document.querySelector("main")?.innerText.length,
        }));
        results.push({
          width,
          lang,
          route,
          status: response.status(),
          ...data,
        });
        if (width === 1440 || width === 390)
          await page.screenshot({
            path:
              "E:/Arash/ViraData/website/screenshots/redesign-" +
              lang +
              "-" +
              (route || "home") +
              "-" +
              width +
              ".png",
            fullPage: !!route,
          });
      }
  }
  return {
    checks: results.length,
    failures: results.filter(
      (r) => r.overflow || r.h1 !== 1 || r.status !== 200 || r.main < 300,
    ),
    errors,
  };
};
