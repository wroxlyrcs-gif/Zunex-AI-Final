// Zunex AI service worker: uygulama dosyalarını önbelleğe alır, internetsiz açılır.
const C = "zunex-v5";
const F = ["./", "index.html", "assistant.js", "knowledge.js", "manifest.json", "icon.svg", "icon-192.png", "icon-512.png", "privacy.html"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(F))); });
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())));
// Önce ağ (güncelleme için), 3 sn içinde cevap yoksa ya da çevrimdışıysa önbellek.
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(new Promise(resolve => {
    let done = false;
    const fromCache = () => caches.match(r).then(m => m || (r.mode === "navigate" ? caches.match("index.html") : undefined));
    const t = setTimeout(() => fromCache().then(m => { if (m && !done) { done = true; resolve(m); } }), 3000);
    fetch(r).then(res => {
      if (res && res.ok) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); }
      if (!done) { done = true; clearTimeout(t); resolve(res); }
    }).catch(() => fromCache().then(m => { if (!done) { done = true; clearTimeout(t); resolve(m || Response.error()); } }));
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window" }).then(l => l.length ? l[0].focus() : self.clients.openWindow("./")));
});
