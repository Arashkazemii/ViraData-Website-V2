/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright CLI evaluates this function expression. */
async page => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:3001/palette-comparison.html');
  const accents = ['#a8c8ff', '#5bd6cb', '#e6a879', '#b0de83'];
  const ready = async (lang) => page.waitForFunction(({ lang, accents }) => {
    const frames = [...document.querySelectorAll('.card iframe')];
    if (frames.length !== 4) return false;
    const headings = frames.map(frame => frame.contentDocument?.querySelector('main h1')?.textContent?.replace(/\s+/g, ' ').trim());
    return !!headings[0] && headings.every(value => value === headings[0]) && frames.every((frame, i) => {
      const doc = frame.contentDocument;
      return doc?.documentElement.lang === lang &&
        frame.contentWindow.getComputedStyle(doc.documentElement).getPropertyValue('--blue').trim() === accents[i] &&
        doc.documentElement.scrollWidth <= frame.contentWindow.innerWidth + 1;
    });
  }, { lang, accents }, { timeout: 20000 });

  let saved = 0;
  for (const lang of ['fa', 'en']) {
    await page.selectOption('#language', lang);
    for (const width of ['desktop', 'mobile']) {
      await page.selectOption('#viewport', width);
      for (const section of ['home', 'solutions', 'solution-cards', 'contact', 'footer']) {
        await page.selectOption('#section', section);
        await ready(lang);
        await page.waitForTimeout(500);
        await page.screenshot({ path: `palette-preview/captures/${lang}-${width}-${section}.png`, fullPage: true, animations: 'disabled' });
        saved++;
      }
    }
  }
  await page.selectOption('#language', 'fa');
  await page.selectOption('#viewport', 'desktop');
  await page.selectOption('#section', 'contact');
  for (const state of ['focus', 'success', 'error']) {
    await page.selectOption('#form-state', state);
    await ready('fa');
    await page.waitForFunction(state => [...document.querySelectorAll('.card iframe')].every(frame => {
      const doc = frame.contentDocument;
      if (!doc) return false;
      if (state === 'focus') return !!doc.querySelector('[name=email]') && frame.contentWindow.getComputedStyle(doc.querySelector('[name=email]')).outlineWidth === '2px';
      const note = doc.querySelector('.privacy-note');
      return !!note && frame.contentWindow.getComputedStyle(note, '::after').content !== 'none';
    }), state);
    await page.screenshot({ path: `palette-preview/captures/fa-desktop-contact-${state}.png`, fullPage: true, animations: 'disabled' });
    saved++;
  }
  return `Saved ${saved} screenshots; equal content, expected palette colors, and no iframe overflow.`;
}
