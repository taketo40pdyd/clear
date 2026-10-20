/* Clear 用 Service Worker（GitHub Pages 向け）
   - 画面本体（HTML）は「ネット優先」：公開すると次回の読み込みで自動的に新しくなります
   - CDN のライブラリ・フォントは「キャッシュ優先＋裏で更新」
   - Firebase の通信（ログイン・同期）には一切関与しません */
const VER = "clear-v1";
const CORE = ["./", "./index.html"];
const CDN = ["www.gstatic.com", "cdnjs.cloudflare.com", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VER).then((c) => c.addAll(CORE)).catch(() => {}).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VER).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const keep = (req, res) => {
  if (res && (res.ok || res.type === "opaque")) {
    const copy = res.clone();
    caches.open(VER).then((c) => c.put(req, copy)).catch(() => {});
  }
  return res;
};

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    /* 自分のサイト：ネット優先、だめならキャッシュ */
    e.respondWith(
      fetch(req).then((res) => keep(req, res)).catch(() =>
        caches.match(req).then((r) => r || (req.mode === "navigate" ? caches.match("./index.html").then((x) => x || caches.match("./")) : undefined))
      )
    );
    return;
  }

  if (CDN.includes(url.hostname)) {
    /* CDN：キャッシュがあれば即返し、裏で更新 */
    e.respondWith(
      caches.match(req).then((hit) => {
        const net = fetch(req).then((res) => keep(req, res)).catch(() => hit);
        return hit || net;
      })
    );
  }
  /* それ以外（Firebase など）は通常どおりネットワークへ */
});
