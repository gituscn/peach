/* Peach 应用的原位改字适配器。 */
(() => {
  const source = document.body.dataset.peachCopyMode === 'source', key = 'peach.copy-edits.v1';
  const core = globalThis.PeachCopyEditorCore;
  let edits = {}, active = true, saving = false, editor;
  try { edits = JSON.parse(localStorage.getItem(key) || '{}'); } catch {}
  const originals = new WeakMap();
  const css = document.createElement('style'); css.dataset.copyEditor = '';
  css.textContent = `
    [data-copy-highlight]{position:fixed;pointer-events:none;z-index:2147483646;outline:1.5px dashed var(--tungsten);outline-offset:3px;border-radius:var(--badge-radius);display:none}
    [data-copy-inline]{outline:2px solid var(--tungsten);outline-offset:3px;border-radius:var(--badge-radius);background:var(--hover);user-select:text;cursor:text}
    [data-copy-input]{position:fixed;z-index:2147483647;padding:2px 6px;border:0;border-radius:var(--badge-radius);outline:2px solid var(--tungsten);background:var(--ground);color:var(--ink)}
    [data-copy-bar]>[role=status]{max-width:min(360px,calc(100vw - 64px));white-space:normal;overflow-wrap:anywhere}
    @media(max-width:600px){[data-copy-bar]>[role=status]{flex-basis:100%;text-align:center}}
    [data-copy-choice]{position:fixed;z-index:2147483647;background:var(--ground);color:var(--ink);border:1px solid var(--border-15);border-radius:var(--control-radius);padding:8px;max-width:calc(100vw - 32px)}
  `;
  document.head.append(css);
  const highlight = document.createElement('div'); highlight.dataset.copyEditor = ''; highlight.dataset.copyHighlight = '';
  const host = document.createElement('div'); host.className = 'peach-react'; host.dataset.copyEditor = ''; host.dataset.batchScope = '';
  const bar = document.createElement('div'); bar.dataset.copyEditor = ''; bar.dataset.copyBar = '';
  bar.dataset.selectionDock = ''; bar.dataset.glassPane = ''; bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', '文案编辑');
  const hint = document.createElement('span'); hint.id = 'peach-copy-hint'; hint.hidden = true; hint.textContent = '点击文字修改，回车或点别处保存，Esc 取消；暂停编辑后可操作页面。';
  bar.setAttribute('aria-describedby', hint.id);
  const status = document.createElement('span'); status.setAttribute('role', 'status'); status.textContent = '编辑文案'; bar.append(status);
  const say = text => { status.textContent = text; };
  const pendingKey = 'peach.copy-apply.v1';
  let applyButton;
  function recovery(text, action) {
    applyButton?.remove();
    applyButton = button(text, () => { applyButton.remove(); applyButton = null; action(); });
  }
  async function watchApply(job) {
    applyButton?.remove(); applyButton = null;
    sessionStorage.setItem(pendingKey, JSON.stringify(job));
    saving = true; bar.setAttribute('aria-busy', 'true');
    const deadline = Date.now() + 300000;
    try {
      while (Date.now() < deadline) {
        say(job.message || '已保存，等待生效…');
        if (job.state === 'ready') {
          sessionStorage.removeItem(pendingKey);
          sessionStorage.setItem('peach.copy-scroll', String(scrollY));
          location.reload(); return;
        }
        if (job.state === 'error') {
          say('已保存，未生效：' + job.message);
          recovery('重试生效', async () => {
            try {
              const response = await fetch('/dev/copy-apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: job.id }) });
              const result = await core.readJson(response);
              watchApply(result.apply);
            } catch (error) { say('已保存，未生效：' + error.message); recovery('继续等待', () => watchApply(job)); }
          });
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
          const response = await fetch('/dev/copy-apply', { cache: 'no-store', signal: AbortSignal.timeout(5000) });
          if (!response.ok) continue;
          const next = await core.readJson(response);
          if (next.id !== job.id) { say('已保存，生效任务已更新'); sessionStorage.removeItem(pendingKey); return; }
          job = next;
        } catch { /* 服务重载期间保留等待状态。 */ }
      }
      say('已保存，生效仍在处理中');
      recovery('继续等待', () => watchApply(job));
    } finally { saving = false; bar.removeAttribute('aria-busy'); }
  }
  const button = (text, fn) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = text; b.onclick = fn; bar.append(b); return b; };
  const toggle = button('暂停编辑', () => {
    if (saving) return;
    editor.commit(); active = !active; editor.hideHighlight(); toggle.textContent = active ? '暂停编辑' : '继续编辑';
  });
  button('导出修改', () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(edits, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'peach-copy-edits.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  button('退出编辑', () => { if (saving) return; editor.commit(true); const url = new URL(location.href); url.searchParams.delete('edit'); location.href = url; });
  host.append(hint, bar); document.body.append(highlight, host);
  if (source) {
    const position = sessionStorage.getItem('peach.copy-scroll');
    if (position !== null) { sessionStorage.removeItem('peach.copy-scroll'); requestAnimationFrame(() => scrollTo(0, Number(position))); }
    try {
      const pending = JSON.parse(sessionStorage.getItem(pendingKey) || 'null');
      if (pending) fetch('/dev/copy-apply', { cache: 'no-store' }).then(core.readJson)
        .then(job => { if (job.id === pending.id) watchApply(job); else sessionStorage.removeItem(pendingKey); })
        .catch(() => recovery('继续等待', () => watchApply(pending)));
    } catch { sessionStorage.removeItem(pendingKey); }
  }
  function apply() {
    if (editor?.editing || saving) return;
    core.applyDrafts(document.body, edits, originals);
  }
  new MutationObserver(apply).observe(document.body, { childList: true, subtree: true, characterData: true }); apply();
  if (source) fetch('/dev/copy-edits').then(r => r.ok ? r.json() : {}).then(saved => { edits = { ...edits, ...saved }; apply(); }).catch(() => say('暂时无法读取修改记录'));
  editor = core.create({
    highlight, isActive: () => active, isBusy: () => saving,
    resolve: node => ({ original: originals.get(node) ?? node.data.trim() }),
    onStatus: say,
    onBusy(value) {
      saving = value;
      if (value) bar.setAttribute('aria-busy', 'true'); else bar.removeAttribute('aria-busy');
      if (!value) apply();
    },
    async prepare(ed) {
      if (!source) return {};
      say('查找文案来源…');
      const response = await fetch('/dev/copy-candidates?text=' + encodeURIComponent(ed.originalText));
      const candidates = await core.readJson(response);
      if (!Array.isArray(candidates) || !candidates.length) throw Error('这段文字尚无可编辑的文案来源');
      const range = document.createRange(); range.selectNodeContents(ed.node);
      const candidate = candidates.length === 1 ? candidates[0] : await choose(candidates, range.getBoundingClientRect());
      return candidate ? { candidate, core: candidate.template || ed.originalText } : null;
    },
    async save(ed, replacement) {
      if (source) {
        const response = await fetch('/dev/copy-save', { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ original: ed.originalText, replacement, candidate: ed.candidate }) });
        return { ...await core.readJson(response), message: '已保存修改' };
      }
      const next = { ...edits, [ed.original]: replacement };
      localStorage.setItem(key, JSON.stringify(next)); edits = next;
      return { text: replacement, message: '已保存草稿' };
    },
    async onSaved(ed, result) {
      edits = { ...edits, [ed.original]: result.text }; originals.set(ed.node, ed.original);
      try { localStorage.setItem(key, JSON.stringify(edits)); }
      catch { say('已保存修改，本机草稿记录未写入'); }
      if (result.apply) await watchApply(result.apply);
    },
  });
  async function choose(candidates, rect) {
    const select = document.createElement('select'); select.dataset.copyEditor = ''; select.dataset.copyChoice = ''; select.setAttribute('aria-label', '文案来源');
    select.add(new Option('请选择文案来源', '')); candidates.forEach((x, i) => select.add(new Option(`${x.file}:${x.line}`, String(i))));
    Object.assign(select.style, { left: Math.max(16, Math.min(rect.left, innerWidth - 300)) + 'px', top: Math.max(16, Math.min(rect.bottom + 8, innerHeight - 60)) + 'px' });
    document.body.append(select); select.focus(); say('这段文案有多个来源，请选择要修改的位置');
    return new Promise(resolve => {
      const finish = value => { select.remove(); document.removeEventListener('keydown', cancel, true); resolve(value); };
      const cancel = event => { if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); finish(null); } };
      select.onchange = () => { if (select.value !== '') finish(candidates[Number(select.value)]); }; document.addEventListener('keydown', cancel, true);
    });
  }
})();
