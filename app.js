(() => {
  const data = window.PURION_DATA;
  const ids = Object.keys(data);
  let active = "source";
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const allParts = (m) => m.categories.flatMap(c => c.parts.map(p => ({category:c.name, categoryKo:c.ko, part:p[0], ko:p[1], desc:p[2], status:p[3]})));
  function renderNav() {
    document.querySelectorAll(".map-node").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.module === active);
      btn.setAttribute("aria-pressed", String(btn.dataset.module === active));
    });
  }
  function renderModule() {
    const m = data[active];
    $("moduleEyebrow").textContent = `MODULE ${m.number} / ${m.eyebrow}`;
    $("moduleTitle").innerHTML = `${esc(m.name)} <span>${esc(m.ko)}</span>`;
    $("moduleDescription").textContent = m.description;
    const filter = $("categoryFilter");
    const old = filter.value;
    filter.innerHTML = '<option value="all">모든 중카테고리</option>' + m.categories.map(c => `<option value="${esc(c.name)}">${esc(c.name)} · ${esc(c.ko)}</option>`).join("");
    filter.value = m.categories.some(c => c.name === old) ? old : "all";
    renderCategories();
    renderNav();
  }
  function renderCategories() {
    const m = data[active], q = $("searchInput").value.trim().toLowerCase(), catFilter = $("categoryFilter").value, details = $("showDetails").checked;
    let shownParts = 0, shownCats = 0;
    const html = m.categories.map((cat, idx) => {
      if (catFilter !== "all" && cat.name !== catFilter) return "";
      const parts = cat.parts.filter(p => !q || [cat.name,cat.ko,...p].join(" ").toLowerCase().includes(q));
      if (!parts.length) return "";
      shownCats++; shownParts += parts.length;
      const rows = parts.map(p => `<tr><td><span class="part-name">${esc(p[0])}</span><span class="part-en">${esc(p[1])}</span></td><td>${esc(p[3]) === "일반 구조 후보" ? '<span class="confidence general">일반 구조 후보</span>' : '<span class="confidence verify">검증 필요</span>'}</td>${details ? `<td class="part-desc">${esc(p[2])}</td>` : ""}</tr>`).join("");
      const isOpen = q ? true : false;
      return `<article class="category-card ${isOpen ? "open" : ""}" data-category="${esc(cat.name)}">
        <button class="category-head" aria-expanded="${isOpen}">
          <span class="category-icon">${esc(cat.icon)}</span>
          <span class="category-name"><strong>${esc(cat.name)}</strong><small>${esc(cat.ko)}</small></span>
          <span class="part-count">${parts.length} PARTS</span><span class="chevron">⌄</span>
        </button>
        <div class="part-table-wrap" ${isOpen ? "" : "hidden"}><table class="part-table"><thead><tr><th>PART NAME / 한국어 명칭</th><th>확인 상태</th>${details ? "<th>기능·분류 메모</th>" : ""}</tr></thead><tbody>${rows}</tbody></table></div>
      </article>`;
    }).join("");
    $("categoryList").innerHTML = html;
    $("emptyState").hidden = shownParts !== 0;
    $("resultSummary").textContent = `중카테고리 ${shownCats}개 · 파트 후보 ${shownParts}개`;
    document.querySelectorAll(".category-head").forEach(btn => btn.addEventListener("click", () => {
      const card = btn.closest(".category-card"), wrap = card.querySelector(".part-table-wrap"), open = wrap.hidden;
      wrap.hidden = !open; card.classList.toggle("open", open); btn.setAttribute("aria-expanded", String(open));
    }));
  }
  function selectModule(moduleId) {
    active = moduleId;
    $("searchInput").value = "";
    renderModule();
    pinPanel(moduleId);
  }
  $("searchInput").addEventListener("input", renderCategories);
  $("categoryFilter").addEventListener("change", renderCategories);
  $("showDetails").addEventListener("change", renderCategories);
  $("expandAll").addEventListener("click", () => {
    document.querySelectorAll(".category-card").forEach(card => { card.classList.add("open"); card.querySelector(".part-table-wrap").hidden = false; card.querySelector(".category-head").setAttribute("aria-expanded","true"); });
  });
  $("collapseAll").addEventListener("click", () => {
    document.querySelectorAll(".category-card").forEach(card => { card.classList.remove("open"); card.querySelector(".part-table-wrap").hidden = true; card.querySelector(".category-head").setAttribute("aria-expanded","false"); });
  });
  $("downloadData").addEventListener("click", () => {
    const payload = {module: data[active], exportedAt: new Date().toISOString(), note:"Candidate reference data only; verify against controlled equipment documentation."};
    const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json"});
    const url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url; a.download = `purion-xe-${active}-parts.json`; a.click(); URL.revokeObjectURL(url);
  });
  /* ---------- 사진 hover → 파트 리스트 패널 ---------- */
  const panelEl = $("stagePanel");
  let hoverId = null, pinnedId = null, shownId = null, shownPinned = false, hideTimer = null, seq = 0;
  const inv = () => window.InventoryService;
  const NA = '<span class="na">—</span>';
  const val = (v) => (v === null || v === undefined || v === "") ? NA : esc(v);
  const yn = (v) => {
    if (v === null || v === undefined || v === "") return NA;
    const t = v === true || /^(y|yes|true|국산|국산화)$/i.test(String(v));
    const f = v === false || /^(n|no|false|수입)$/i.test(String(v));
    return t ? '<span class="pill ok">국산화</span>' : f ? '<span class="pill no">수입</span>' : esc(v);
  };
  const statusText = {
    loading: ["loading", "재고 서버 조회 중…"],
    ok: ["ok", "재고 서버 연동됨"],
    demo: ["demo", "DEMO · 화면 확인용 샘플 값입니다 (실제 재고 아님)"],
    unconfigured: ["warn", "재고 서버 미연결 — inventory.js 의 endpoint 를 설정하면 값이 채워집니다"],
    error: ["err", "재고 서버 조회 실패 — 값을 표시할 수 없습니다"]
  };

  function rowHTML(p, rec) {
    const r = rec || {};
    const stock = r.stock, g = r.guaranteedStock;
    const low = typeof stock === "number" && stock === 0 ? " zero" : (typeof stock === "number" && typeof g === "number" && stock < g ? " short" : "");
    const q = r.qcode || (window.PART_QCODES && window.PART_QCODES[p[0]]);
    return `<tr><td><span class="part-name">${esc(p[0])}</span><span class="part-en">${esc(p[1])}</span></td>
      <td class="mono">${val(q)}</td><td>${yn(r.localized)}</td><td>${val(r.maker)}</td>
      <td class="num${low}">${val(stock)}</td><td>${val(r.eta)}</td><td>${val(r.contact)}</td>
      <td class="num">${val(g)}</td><td>${val(r.guaranteedOwner)}</td></tr>`;
  }

  function panelHTML(id, result) {
    const m = data[id], st = statusText[result ? result.status : "loading"];
    const pinned = pinnedId === id;
    const body = m.categories.map(c => `<tr class="cat-row"><td colspan="9"><b>${esc(c.name)}</b> · ${esc(c.ko)}</td></tr>` +
      c.parts.map(p => rowHTML(p, result && result.lookup(p))).join("")).join("");
    return `<div class="sp-head">
        <div><div class="eyebrow">MODULE ${esc(m.number)} / ${esc(m.eyebrow)}</div><h3>${esc(m.name)} <span>${esc(m.ko)}</span></h3></div>
        <div class="sp-actions"><span class="pin-state">${pinned ? "📌 고정됨" : "hover 중"}</span>${pinned ? '<button class="secondary-btn" id="spUnpin">고정 해제</button>' : ""}</div>
      </div>
      <div class="sp-status ${st[0]}">${esc(st[1])}${result && result.error ? " (" + esc(result.error) + ")" : ""}</div>
      <div class="sp-scroll"><table class="inv-table">
        <thead>
          <tr><th rowspan="2">파트명</th><th colspan="3" class="grp">큐코드</th><th rowspan="2">재고</th><th rowspan="2">입고 예정 일자</th><th rowspan="2">담당자 연락처</th><th colspan="2" class="grp">보장재고</th></tr>
          <tr><th>코드</th><th>국산화</th><th>Maker사</th><th>수량</th><th>보장재고 담당자</th></tr>
        </thead><tbody>${body}</tbody></table></div>`;
  }

  function renderEmpty() {
    shownId = null;
    panelEl.innerHTML = `<div class="sp-empty"><strong>PART LIST</strong><span>왼쪽 장비 사진의 모듈 영역(SOURCE · LINAC · HEB · CORRECTOR …)에<br>마우스를 올리면 해당 모듈의 파트 리스트가 여기에 표시됩니다.</span></div>`;
  }

  async function renderPanel(id) {
    shownId = id;
    const mine = ++seq;
    panelEl.innerHTML = panelHTML(id, null);
    bindPanel();
    const parts = data[id].categories.flatMap(c => c.parts);
    const result = await inv().load(id, parts);
    if (mine !== seq || shownId !== id) return;   // 다른 모듈로 이동했으면 무시
    const sc = panelEl.querySelector(".sp-scroll"), top = sc ? sc.scrollTop : 0;
    panelEl.innerHTML = panelHTML(id, result);
    panelEl.querySelector(".sp-scroll").scrollTop = top;
    bindPanel();
  }

  function bindPanel() {
    const b = $("spUnpin");
    if (b) b.addEventListener("click", () => { pinnedId = null; markZones(); refresh(); });
  }

  function markZones() {
    const cur = hoverId || pinnedId;
    document.querySelectorAll(".hotspot").forEach(z => {
      z.classList.toggle("active", z.dataset.module === cur);
      z.classList.toggle("pinned", z.dataset.module === pinnedId);
    });
  }
  function refresh() {
    const id = hoverId || pinnedId;
    if (!id) renderEmpty(); else if (id !== shownId || shownPinned !== (pinnedId === id)) { shownPinned = pinnedId === id; renderPanel(id); }
  }
  function hoverIn(id) { clearTimeout(hideTimer); hoverId = id; markZones(); refresh(); }
  function hoverOut() { clearTimeout(hideTimer); hideTimer = setTimeout(() => { hoverId = null; markZones(); refresh(); }, 350); }
  function pinPanel(id) {
    pinnedId = pinnedId === id && arguments[1] === "toggle" ? null : id;
    panelEl.dataset.pinned = "";
    markZones(); shownId = null; refresh();
  }

  function initStage() {
    if (new URLSearchParams(location.search).has("debug")) $("stage").classList.add("debug");
    document.querySelectorAll(".hotspot").forEach(z => {
      const id = z.dataset.module;
      z.addEventListener("pointerenter", () => hoverIn(id));
      z.addEventListener("pointerleave", hoverOut);
      z.addEventListener("focus", () => hoverIn(id));
      z.addEventListener("blur", hoverOut);
      z.addEventListener("click", () => {
        active = id; $("searchInput").value = ""; renderModule();
        pinnedId = pinnedId === id ? null : id; panelEl.dataset.pinned = ""; markZones(); shownId = null; refresh();
      });
      z.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); z.dispatchEvent(new Event("click")); } });
    });
    // 패널 위로 마우스를 옮겨도 닫히지 않게 유지 (표를 스크롤/클릭할 수 있도록)
    panelEl.addEventListener("pointerenter", () => clearTimeout(hideTimer));
    panelEl.addEventListener("pointerleave", () => { if (hoverId) hoverOut(); });
    renderEmpty();
  }
  renderModule();
  initStage();
})();
