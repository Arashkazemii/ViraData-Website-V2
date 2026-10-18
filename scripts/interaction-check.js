/* eslint-disable @typescript-eslint/no-unused-expressions */
async (page) => {
  const result = {};
  let response = await page.goto("http://localhost:3000/");
  result.root = { status: response?.status(), url: page.url() };
  response = await page.goto("http://localhost:3000/fa/unknown");
  await page.locator("h1").first().waitFor();
  result.fa404 = {
    status: response?.status(),
    text: await page.locator("h1").first().textContent(),
  };
  response = await page.goto("http://localhost:3000/en/unknown");
  await page.locator("h1").first().waitFor();
  result.en404 = {
    status: response?.status(),
    text: await page.locator("h1").first().textContent(),
  };
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/fa/solutions#analytics");
  await page.locator(".menu-button").focus();
  await page.keyboard.press("Enter");
  result.menu = {
    expanded: await page.locator(".menu-button").getAttribute("aria-expanded"),
    visible: await page.locator(".site-nav").isVisible(),
  };
  await page.locator(".menu-button").click();
  await page.locator(".language-link").click();
  await page.waitForURL("**/en/solutions#analytics");
  result.language = {
    url: page.url(),
    lang: await page.locator("html").getAttribute("lang"),
    dir: await page.locator("html").getAttribute("dir"),
  };
  await page.getByRole("button", { name: "Pause motion" }).click();
  result.pause = {
    pressed: await page.locator(".motion-toggle").getAttribute("aria-pressed"),
    data: await page.locator("body").getAttribute("data-motion-paused"),
  };
  await page.emulateMedia({ reducedMotion: "reduce" });
  result.reduced = {
    toggleVisible: await page.locator(".motion-toggle").isVisible(),
    data: await page.locator("body").getAttribute("data-motion-paused"),
  };
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("http://localhost:3000/en/demos");
  result.demos = {
    planned: await page.getByText("In preparation").count(),
    launch: await page
      .getByRole("link", { name: /Launch demo|View preview/ })
      .count(),
  };
  return result;
};
