/* eslint-disable @typescript-eslint/no-unused-expressions */
async (page) => {
  const routes = ["/", "/solutions", "/demos", "/about", "/contact"];
  const sizes = [
    [1440, 900],
    [768, 700],
    [390, 844],
    [360, 640],
  ];
  const results = [];
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const lang of ["fa", "en"]) {
    for (const route of routes) {
      for (const [width, height] of sizes) {
        await page.setViewportSize({ width, height });
        await page.goto(
          `http://localhost:3000/${lang}${route === "/" ? "" : route}`,
        );
        await page.locator("h1").first().waitFor();
        const data = await page.evaluate(() => ({
          title: document.title,
          h1: document.querySelectorAll("h1").length,
          lang: document.documentElement.lang,
          dir: document.documentElement.dir,
          horizontalOverflow:
            document.documentElement.scrollWidth - window.innerWidth,
          canonical:
            document
              .querySelector("link[rel=canonical]")
              ?.getAttribute("href") || "",
          contactDisabled:
            document
              .querySelector(".contact-panel fieldset")
              ?.hasAttribute("disabled") ?? null,
        }));
        results.push({
          route: `/${lang}${route === "/" ? "" : route}`,
          width,
          height,
          ...data,
        });
        if (width === 1440 || width === 390)
          await page.screenshot({
            path: `screenshots/${lang}-${route === "/" ? "home" : route.slice(1)}-${width}.png`,
            fullPage: true,
          });
      }
    }
  }
  return { results, errors };
};
