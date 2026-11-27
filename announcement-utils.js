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

  function uniqueAnnouncements(items) {
    if (!Array.isArray(items)) return [];
    const seen = new Set();
    return items.filter((item) => {
      if (!item || typeof item !== "object") return false;
      const key = fingerprint(item);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  return { uniqueAnnouncements };
});
