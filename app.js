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
  function syncMachineZones(previewId) {
    document.querySelectorAll(".machine-zone").forEach(zone => {
      zone.classList.toggle("active", zone.dataset.module === (previewId || active));
      zone.setAttribute("aria-pressed", String(zone.dataset.module === active));
    });
    const m = data[previewId || active];
    $("hoverHint").textContent = `선택된 모듈: ${m.name} · ${m.ko}`;
  }
  function selectModule(moduleId) {
    active = moduleId;
    $("searchInput").value = "";
    renderModule();
    syncMachineZones();
  }
  document.querySelectorAll(".map-node").forEach(btn => btn.addEventListener("click", () => {
    selectModule(btn.dataset.module);
  }));
  document.querySelectorAll(".machine-zone").forEach(zone => {
    zone.addEventListener("mouseenter", () => {
      syncMachineZones(zone.dataset.module);
      // Preview the corresponding module's parts while the pointer is over its region.
      active = zone.dataset.module;
      $("searchInput").value = "";
      renderModule();
      syncMachineZones(zone.dataset.module);
    });
    zone.addEventListener("focus", () => {
      active = zone.dataset.module;
      $("searchInput").value = "";
      renderModule();
      syncMachineZones(zone.dataset.module);
    });
    zone.addEventListener("click", () => selectModule(zone.dataset.module));
    zone.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectModule(zone.dataset.module);
      }
    });
  });
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
  renderModule();
  syncMachineZones();
})();