(() => {
  const source = fetch('/__palette-preview.css').then(response => response.text());
  const styles = new Map();

  async function paletteStyle(id) {
    if (id === 'current') return '';
    if (!styles.has(id)) {
      styles.set(id, source.then(css => css
        .replace(/html\[data-palette="([^"]+)"\]/g, (_, variant) => variant === id ? 'html:root' : 'html:not(*)')
        .replace(/html\[dir="rtl"\]\[data-palette\]/g, 'html[dir="rtl"]:root')
        .replace(/html\[data-palette\]/g, 'html:root')));
    }
    return styles.get(id);
  }

  function stateStyle(id, state, lang) {
    if (state === 'normal') return '';
    if (state === 'focus') {
      return `.contact-panel input[name="email"] { outline: 2px solid var(--blue); outline-offset: 2px; border-color: var(--blue); background: ${id === 'current' ? '#111e30' : 'var(--pv-bg)'}; }`;
    }
    const success = state === 'success';
    const message = lang === 'fa'
      ? (success ? 'درخواست شما با موفقیت برای تیم ویرا دیتا ارسال شد.' : 'ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید.')
      : (success ? 'Your request was sent to the ViraData team.' : 'Your request could not be sent. Please try again.');
    const border = id === 'current' ? (success ? '#90c9be' : '#e9a59b') : (success ? 'var(--pv-success)' : 'var(--pv-error)');
    const color = id === 'current' ? (success ? '#b6dfd7' : '#edbcb5') : border;
    const background = id === 'current' ? (success ? '#90c9be12' : '#e9a59b12') : `color-mix(in srgb, ${border} 13%, var(--pv-surface))`;
    return `.contact-panel .privacy-note::after { content: ${JSON.stringify(message)}; display: block; margin-block-start: 16px; padding: 12px 14px; border: 1px solid ${border}; border-radius: 6px; background: ${background}; color: ${color}; }`;
  }

  async function apply(frame, id, state = 'normal', lang = 'fa') {
    const doc = frame.contentDocument;
    if (!doc) return;
    if (doc.__palettePreviewSheet) {
      doc.adoptedStyleSheets = doc.adoptedStyleSheets.filter(sheet => sheet !== doc.__palettePreviewSheet);
    }
    const css = `${await paletteStyle(id)}\n${stateStyle(id, state, lang)}`;
    if (css.trim()) {
      const sheet = new doc.defaultView.CSSStyleSheet();
      await sheet.replace(css);
      doc.adoptedStyleSheets = [...doc.adoptedStyleSheets, sheet];
      doc.__palettePreviewSheet = sheet;
    }
    if (doc.__palettePreviewClickBound) return;
    doc.__palettePreviewClickBound = true;
    doc.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof doc.defaultView.Element && event.target.closest('a[href]');
      if (!link || link.origin !== location.origin || !/^\/(fa|en)(\/|$)/.test(link.pathname)) return;
      if (link.pathname === doc.defaultView.location.pathname) return;
      event.preventDefault();
      doc.defaultView.location.assign(link.href);
    }, true);
  }
  window.palettePreview = { apply };
})();
