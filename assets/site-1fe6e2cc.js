(function () {
var root = document.documentElement;
var base = root.getAttribute('data-base') || '';

document.addEventListener('click', function (e) {
var a = e.target.closest && e.target.closest('a[data-lang]');
if (!a) return;
var secure = location.protocol === 'https:' ? '; Secure' : '';
document.cookie = 'lang=' + a.getAttribute('data-lang') + '; Path=' + (base || '/') + '; Max-Age=31536000; SameSite=Lax' + secure;
});

if (root.hasAttribute('data-clics')) {
document.addEventListener('click', function (e) {
var a = e.target.closest && e.target.closest('a[data-wa]');
if (!a || !navigator.sendBeacon) return;
try {
var body = JSON.stringify({ l: root.lang, f: a.getAttribute('data-f') || 'general', e: a.getAttribute('data-wa') });
navigator.sendBeacon(base + '/api/clic', new Blob([body], { type: 'text/plain' }));
} catch (err) { /* never block the visitor */ }
});
}

var v = document.querySelector('video[data-src]');
if (v) {
var mq = v.getAttribute('data-media');
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var save = navigator.connection && navigator.connection.saveData;
if (!reduce && !save && (!mq || window.matchMedia(mq).matches)) {
v.addEventListener('playing', function () { v.classList.add('on'); }, { once: true });
v.poster = v.getAttribute('data-poster') || '';
v.src = v.getAttribute('data-src');
var p = v.play();
if (p && p.catch) p.catch(function () {});
}
}

document.addEventListener('click', function (e) {
document.querySelectorAll('details.menu[open], details.langs[open]').forEach(function (d) {
if (!d.contains(e.target) || (e.target.closest && e.target.closest('a'))) d.removeAttribute('open');
});
});
document.addEventListener('keydown', function (e) {
if (e.key === 'Escape') document.querySelectorAll('details.menu[open], details.langs[open]').forEach(function (d) { d.removeAttribute('open'); });
});
})();
