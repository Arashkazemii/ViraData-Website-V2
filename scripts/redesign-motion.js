/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright CLI evaluates this function expression. */
async (page) => {
  const origin = new URL(page.url()).origin;
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/en`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1800);
  const clip = { x: 0, y: 150, width: 1440, height: 620 };
  const a = await page.screenshot({ path: 'screenshots/redesign-motion-a.png', clip });
  await page.waitForTimeout(1000);
  const b = await page.screenshot({ path: 'screenshots/redesign-motion-b.png', clip });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(500);
  const r1 = await page.screenshot({ clip });
  await page.waitForTimeout(700);
  const r2 = await page.screenshot({ clip });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(500);
  const c = await page.screenshot({ clip });
  await page.waitForTimeout(700);
  const d = await page.screenshot({ clip });
  return {
    animated: !a.equals(b),
    reducedMotionStable: r1.equals(r2),
    resumed: !c.equals(d),
  };
}
