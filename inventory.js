/* ============================================================
 * 재고 서버 연동 설정 / 어댑터
 * - endpoint 를 채우면 hover 파트 리스트가 실제 재고 서버에서 값을 가져옵니다.
 * - 비워두면 "재고 서버 미연결" 상태로 값이 — 로 표시됩니다.
 * - URL 뒤에 ?demo 를 붙이면 화면 확인용 샘플 값이 채워집니다.
 * ============================================================ */
window.INVENTORY_CONFIG = {
  endpoint: "",                 // 예: "https://inventory.company.local/api/parts"
  moduleParam: "module",        // 요청: GET {endpoint}?module=linac
  headers: {},                  // 예: { "Authorization": "Bearer ..." }
  credentials: "same-origin",   // 사내 SSO 쿠키가 필요하면 "include" (서버 CORS 설정 필요)
  timeoutMs: 8000,
  cacheMs: 60000,               // 같은 모듈 재조회 방지 시간
  // 서버 응답 필드 이름 → 화면 필드 매핑 (서버 필드명이 다르면 오른쪽 값만 수정)
  fieldMap: {
    items: "items",                 // 응답 JSON 안의 배열 위치 (점 표기 가능: "data.rows")
    qcode: "qcode",
    partName: "partName",           // qcode 로 매칭 안 될 때 파트명으로 매칭
    localized: "localized",         // true/false 또는 "Y"/"N"
    maker: "maker",
    stock: "stock",
    eta: "eta",
    contact: "contact",
    guaranteedStock: "guaranteedStock",
    guaranteedOwner: "guaranteedOwner"
  }
};

/* 파트(영문명) → 큐코드 매핑. 큐코드를 알고 있는 파트부터 채워 넣으세요.
 * 예: "Arc chamber / discharge chamber": "Q1234567"
 * 큐코드가 없으면 서버 응답의 partName 으로 매칭합니다. */
window.PART_QCODES = {
};

window.InventoryService = (() => {
  const cfg = window.INVENTORY_CONFIG;
  const cache = new Map();
  const demo = new URLSearchParams(location.search).has("demo");
  const pick = (obj, path) => String(path).split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

  const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  function demoRecord(name) {
    const h = hash(name), pad = (n) => String(n).padStart(2, "0");
    const stock = h % 6, g = 1 + (h >> 3) % 3;
    return {
      qcode: "Q" + String(1000000 + h % 8999999),
      localized: (h >> 5) % 3 === 0,
      maker: ["Axcelis", "Maker A", "Maker B", "Maker C"][(h >> 7) % 4],
      stock, eta: stock === 0 ? `2026-${pad(11 + (h >> 9) % 2)}-${pad(1 + (h >> 11) % 28)}` : "",
      contact: "내선 " + (3000 + h % 999),
      guaranteedStock: g, guaranteedOwner: ["담당자 A", "담당자 B", "담당자 C"][(h >> 13) % 3]
    };
  }

  function normalize(raw) {
    const f = cfg.fieldMap, r = {};
    ["qcode","partName","localized","maker","stock","eta","contact","guaranteedStock","guaranteedOwner"].forEach(k => { r[k] = pick(raw, f[k]); });
    return r;
  }

  /* parts: [[영문명, 한글명, 설명, 상태], ...]  →  { status, lookup(part) } */
  async function load(moduleId, parts) {
    const names = parts.map(p => p[0]);
    if (demo) {
      const map = new Map(names.map(n => [n, demoRecord(n)]));
      return { status: "demo", lookup: (p) => map.get(p[0]) };
    }
    if (!cfg.endpoint) return { status: "unconfigured", lookup: () => null };

    const hit = cache.get(moduleId);
    if (hit && Date.now() - hit.t < cfg.cacheMs) return hit.value;

    const ctrl = new AbortController(), timer = setTimeout(() => ctrl.abort(), cfg.timeoutMs);
    try {
      const url = cfg.endpoint + (cfg.endpoint.includes("?") ? "&" : "?") + encodeURIComponent(cfg.moduleParam) + "=" + encodeURIComponent(moduleId);
      const res = await fetch(url, { headers: cfg.headers, credentials: cfg.credentials, signal: ctrl.signal });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      const items = (pick(json, cfg.fieldMap.items) || []).map(normalize);
      const byQ = new Map(), byName = new Map();
      items.forEach(it => { if (it.qcode) byQ.set(String(it.qcode), it); if (it.partName) byName.set(String(it.partName), it); });
      const value = { status: "ok", lookup: (p) => byQ.get(window.PART_QCODES[p[0]]) || byName.get(p[0]) || null };
      cache.set(moduleId, { t: Date.now(), value });
      return value;
    } catch (e) {
      console.warn("[inventory] load failed:", e);
      return { status: "error", error: String(e.message || e), lookup: () => null };
    } finally { clearTimeout(timer); }
  }
  return { load };
})();
