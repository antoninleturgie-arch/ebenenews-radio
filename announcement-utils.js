(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.EbeneAnnouncements = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function normalize(value) {
    return String(value ?? "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  }

  function fingerprint(item) {
    const raw = String(item.text || item.sourceTitle || "").trim();
    const withoutPrefix = raw
      .replace(/^flash automatique\s*:\s*/i, "")
      .replace(/\s*source\s*:\s*[^.]*\.?\s*$/i, "");
    return normalize(withoutPrefix || item.sourceTitle || raw);
  }

  function tokens(item) {
    const raw = String(item.text || item.sourceTitle || "")
      .replace(/^flash automatique\s*:\s*/i, "")
      .replace(/\s*source\s*:\s*[^.]*\.?\s*$/i, "");
    return new Set(normalize(raw).match(/[\p{L}\p{N}]{2,}/gu) || []);
  }

  function sameFeed(a, b) {
    const sourceA = normalize(a.source || "");
    const sourceB = normalize(b.source || "");
    return (sourceA && sourceA === sourceB) ||
      (a.kind === "auto-news" && b.kind === "auto-news");
  }

  function isNearDuplicate(a, b) {
    if (!sameFeed(a.item, b.item) || a.tokens.size < 12 || b.tokens.size < 12) return false;
    let intersection = 0;
    for (const token of a.tokens) if (b.tokens.has(token)) intersection++;
    const union = a.tokens.size + b.tokens.size - intersection;
    return union > 0 && intersection / union >= 0.82;
  }

  function uniqueAnnouncements(items) {
    if (!Array.isArray(items)) return [];
    const seenKeys = new Set();
    const kept = [];
    return items.filter((item) => {
      if (!item || typeof item !== "object") return false;
      const key = fingerprint(item);
      if (!key || seenKeys.has(key)) return false;
      const candidate = { item, tokens: tokens(item) };
      if (kept.some((previous) => isNearDuplicate(candidate, previous))) return false;
      seenKeys.add(key);
      kept.push(candidate);
      return true;
    });
  }

  return { uniqueAnnouncements };
});
