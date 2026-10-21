/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright CLI evaluates this function expression. */
async (page) => {
  const origin = new URL(page.url()).origin;
  const checks = [];
  const check = (name, pass, detail) => checks.push({ name, pass: Boolean(pass), detail });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/en`);
  await page.waitForTimeout(1200);
  await page.locator('a.button[href="#story"]').click();
  await page.waitForTimeout(700);
  check('Hero CTA reaches story', await page.locator('#story').evaluate(el => el.getBoundingClientRect().top < 300));
  for (const i of [0, 2, 4, 5]) {
    await page.locator(`.stage-links a[href="#story-${i}"]`).click();
    await page.waitForTimeout(1100);
    check(`Scroll scene ${i}`, await page.locator('.story-stage .report-panel').getAttribute('data-report-stage') === String(i));
    if (i === 4) await page.screenshot({ path: 'screenshots/redesign-story-detail-desktop.png' });
  }
  check('Manual pause control removed', await page.locator('.motion-toggle').count() === 0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(300);
  check('Live reduced motion uses static scenes', await page.locator('.decision-story').getAttribute('data-enhanced') === 'false');
  check('All static scenes visible', await page.locator('.static-scene:visible').count() === 6);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(300);
  check('Live motion resumes', await page.locator('.decision-story').getAttribute('data-enhanced') === 'true');
  await page.goto(`${origin}/en/demos`);
  await page.locator('.preview-controls button').nth(2).click();
  check('Dashboard detail selection', await page.locator('.dashboard-product .report-panel').getAttribute('data-report-stage') === '4');
  await page.locator('.assistant-response a').click();
  check('Assistant citation opens source', await page.locator('.source-document').getAttribute('open') !== null);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${origin}/fa`);
  for (let i = 0; i < 6; i++) {
    await page.locator(`.stage-links a[href="#story-${i}"]`).click();
    await page.waitForTimeout(1100);
    check(`Mobile scroll scene ${i}`, await page.locator('.story-stage .report-panel').getAttribute('data-report-stage') === String(i));
  }
  await page.locator('.menu-button').click();
  check('Mobile menu opens', await page.locator('.menu-button').getAttribute('aria-expanded') === 'true');
  await page.keyboard.press('Escape');
  check('Escape closes menu', await page.locator('.menu-button').getAttribute('aria-expanded') === 'false');
  check('Escape restores focus', await page.locator('.menu-button').evaluate(el => el === document.activeElement));
  await page.locator('.menu-button').click();
  await page.locator('.site-nav a[href="/fa/contact"]').first().click();
  await page.waitForURL('**/fa/contact');
  check('Mobile navigation', await page.locator('.menu-button').getAttribute('aria-expanded') === 'false');
  await page.locator('.language-link').click();
  await page.waitForURL('**/en/contact');
  check('Language preserves page', page.url().endsWith('/en/contact'));
  await page.route('**/api/contact', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"delivery_failed"}' }));
  await page.locator('[name="name"]').fill('Browser Review');
  await page.locator('[name="email"]').fill('review@example.com');
  check('Contact form has no topic field', await page.locator('[name="topic"]').count() === 0);
  await page.locator('[name="message"]').fill('We need clearer reporting for our operations team.');
  await page.locator('button[type="submit"]').click();
  await page.locator('.contact-feedback[role="alert"]').waitFor();
  check('Form failure preserves message', (await page.locator('[name="message"]').inputValue()).includes('clearer reporting'));
  await page.unroute('**/api/contact');
  await page.route('**/api/contact', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
  await page.locator('button[type="submit"]').click();
  await page.locator('[role="status"]').waitFor();
  check('Form success resets fields', await page.locator('[name="message"]').inputValue() === '');
  await page.unroute('**/api/contact');
  return { checks: checks.length, failures: checks.filter(x => !x.pass) };
}
