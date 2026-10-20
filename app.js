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
  /* ---------- 사진 hover → 중분류 flyout → 클릭 → 소분류(파트) 팝업 ---------- */
  const flyout = $("flyout"), modal = $("partsModal"), pmCard = $("pmCard");
  let curId = null, pinned = false, hideTimer = null, seq = 0;
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

  function placeFlyout(zone) {
    const r = $("stagePhoto").getBoundingClientRect(), z = zone.getBoundingClientRect();
    if (window.innerWidth <= 900) {
      flyout.style.left = "12px"; flyout.style.right = "12px"; flyout.style.width = "auto";
      flyout.style.top = Math.max(12, Math.min(r.bottom + 8, window.innerHeight - flyout.offsetHeight - 12)) + "px";
      return;
    }
    flyout.style.right = "auto"; flyout.style.width = "";
    const h = flyout.offsetHeight;
    flyout.style.left = (r.right + 12) + "px";
    flyout.style.top = Math.max(12, Math.min(z.top + z.height / 2 - h / 2, window.innerHeight - h - 12)) + "px";
  }

  function showFlyout(id, zone) {
    clearTimeout(hideTimer);
    const m = data[id];
    if (curId !== id) {
      flyout.innerHTML = `<div class="fo-head"><div class="eyebrow">MODULE ${esc(m.number)} / ${esc(m.eyebrow)}</div>
          <div class="fo-title">${esc(m.name)} <span>${esc(m.ko)}</span></div></div>
        <div class="fo-sub">중분류를 클릭하면 파트 목록이 열립니다</div>
        <div class="fo-list">${m.categories.map((c, i) => `<button class="fo-item" data-idx="${i}" style="--d:${i * 40}ms">
          <span class="category-icon">${esc(c.icon)}</span><span class="category-name"><strong>${esc(c.name)}</strong><small>${esc(c.ko)}</small></span>
          <span class="part-count">${c.parts.length} PARTS</span><span class="fo-arrow">›</span></button>`).join("")}</div>`;
      flyout.classList.remove("show"); void flyout.offsetWidth;   // 모듈이 바뀌면 항목이 다시 부드럽게 등장
    }
    curId = id;
    placeFlyout(zone);
    flyout.classList.add("show"); flyout.setAttribute("aria-hidden", "false");
    document.querySelectorAll(".hotspot").forEach(z2 => { z2.classList.toggle("active", z2.dataset.module === id); z2.classList.toggle("pinned", pinned && z2.dataset.module === id); });
  }
  function hideFlyout() {
    clearTimeout(hideTimer); pinned = false; curId = null;
    flyout.classList.remove("show"); flyout.setAttribute("aria-hidden", "true");
    document.querySelectorAll(".hotspot").forEach(z => z.classList.remove("active", "pinned"));
  }
  function scheduleHide() { if (pinned || modal.classList.contains("show")) return; clearTimeout(hideTimer); hideTimer = setTimeout(hideFlyout, 320); }

  /* ----- 소분류(파트) 팝업 ----- */
  function rowHTML(p, rec, i) {
    const r = rec || {}, stock = r.stock, g = r.guaranteedStock;
    const low = typeof stock === "number" && stock === 0 ? " zero" : (typeof stock === "number" && typeof g === "number" && stock < g ? " short" : "");
    const q = r.qcode || (window.PART_QCODES && window.PART_QCODES[p[0]]);
    return `<tr class="part-row" data-i="${i}" tabindex="0" aria-expanded="false"><td><span class="part-name">${esc(p[0])}</span><span class="part-en">${esc(p[1])}</span></td>
      <td class="mono">${val(q)}</td><td>${yn(r.localized)}</td><td>${val(r.maker)}</td>
      <td class="num${low}">${val(stock)}</td><td>${val(r.eta)}</td><td>${val(r.contact)}</td>
      <td class="num">${val(g)}</td><td>${val(r.guaranteedOwner)}</td></tr>
      <tr class="detail-row" hidden><td colspan="9"><b>기능·분류 메모</b> ${esc(p[2])} <span class="confidence ${p[3] === "일반 구조 후보" ? "general" : "verify"}">${esc(p[3])}</span></td></tr>`;
  }
  function modalHTML(id, idx, result) {
    const m = data[id], c = m.categories[idx], st = statusText[result ? result.status : "loading"];
    return `<div class="sp-head"><div><div class="eyebrow">${esc(m.name)} · ${esc(m.ko)} / 소분류</div>
        <h3>${esc(c.name)} <span>${esc(c.ko)}</span></h3></div>
        <button class="secondary-btn" id="pmClose" aria-label="닫기">✕ 닫기</button></div>
      <div class="sp-status ${st[0]}">${esc(st[1])}${result && result.error ? " (" + esc(result.error) + ")" : ""}</div>
      <div class="sp-scroll"><table class="inv-table"><thead>
        <tr><th rowspan="2">파트명 <small>(클릭 시 상세)</small></th><th colspan="3" class="grp">큐코드</th><th rowspan="2">재고</th><th rowspan="2">입고 예정 일자</th><th rowspan="2">담당자 연락처</th><th colspan="2" class="grp">보장재고</th></tr>
        <tr><th>코드</th><th>국산화</th><th>Maker사</th><th>수량</th><th>보장재고 담당자</th></tr>
      </thead><tbody>${c.parts.map((p, i) => rowHTML(p, result && result.lookup(p), i)).join("")}</tbody></table></div>`;
  }
  async function openParts(id, idx) {
    const mine = ++seq;
    pmCard.innerHTML = modalHTML(id, idx, null);
    modal.classList.add("show"); modal.setAttribute("aria-hidden", "false");
    $("pmClose").focus();
    const result = await window.InventoryService.load(id, data[id].categories.flatMap(c => c.parts));
    if (mine !== seq || !modal.classList.contains("show")) return;
    const open = [...pmCard.querySelectorAll(".part-row[aria-expanded=true]")].map(r => r.dataset.i);
    pmCard.innerHTML = modalHTML(id, idx, result);
    open.forEach(i => toggleRow(pmCard.querySelector(`.part-row[data-i="${i}"]`)));
    $("pmClose").focus();
  }
  function closeParts() { seq++; modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); }
  function toggleRow(row) {
    if (!row) return;
    const d = row.nextElementSibling, open = d.hidden;
    d.hidden = !open; row.setAttribute("aria-expanded", String(open)); row.classList.toggle("open", open);
  }

  function initStage() {
    if (new URLSearchParams(location.search).has("debug")) $("stage").classList.add("debug");
    document.querySelectorAll(".hotspot").forEach(z => {
      const id = z.dataset.module;
      z.addEventListener("pointerenter", () => { if (!modal.classList.contains("show")) showFlyout(id, z); });
      z.addEventListener("pointerleave", scheduleHide);
      z.addEventListener("focus", () => showFlyout(id, z));
      z.addEventListener("click", e => { e.stopPropagation(); pinned = true; showFlyout(id, z); });   // 클릭 = 고정 (터치 기기 대응)
      z.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); z.dispatchEvent(new Event("click")); } });
    });
    flyout.addEventListener("pointerenter", () => clearTimeout(hideTimer));
    flyout.addEventListener("pointerleave", scheduleHide);
    flyout.addEventListener("click", e => {
      const b = e.target.closest(".fo-item"); if (!b) return;
      pinned = true; openParts(curId, Number(b.dataset.idx));
    });
    modal.addEventListener("click", e => { if (e.target === modal) closeParts(); });
    pmCard.addEventListener("click", e => {
      if (e.target.closest("#pmClose")) return closeParts();
      toggleRow(e.target.closest(".part-row"));
    });
    pmCard.addEventListener("keydown", e => { const r = e.target.closest && e.target.closest(".part-row"); if (r && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggleRow(r); } });
    document.addEventListener("keydown", e => { if (e.key === "Escape") { if (modal.classList.contains("show")) closeParts(); else hideFlyout(); } });
    document.addEventListener("click", e => { if (!modal.classList.contains("show") && !e.target.closest("#flyout") && !e.target.closest(".hotspot")) hideFlyout(); });
    window.addEventListener("scroll", () => { if (!modal.classList.contains("show")) hideFlyout(); }, { passive: true });
    window.addEventListener("resize", hideFlyout);
  }
  renderModule();
  initStage();
})();
