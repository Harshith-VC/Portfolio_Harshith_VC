/* ============================================================
   PICKER · Who's Watching? + auto-rotating profile spotlight
   ============================================================ */

const wrap = document.getElementById("profiles");
const keys = PROFILE_ORDER;

/* avatar row (instant entry) */
keys.forEach((key, i) => {
  const p = PROFILES[key];
  const a = document.createElement("a");
  a.className = "profile";
  a.dataset.key = key;
  a.href = "browse.html?profile=" + key;
  a.style.animationDelay = (i * 0.1) + "s";
  a.innerHTML = avatarSVG(p.color, p.color2) + `<span class="p-name">${p.name}</span><span class="p-tag">${p.tagline}</span>`;
  a.addEventListener("mouseenter", () => goTo(i, false));
  wrap.appendChild(a);
});
const avatarEls = [...wrap.children];

/* spotlight slides + dots */
const slidesEl = document.getElementById("spotSlides");
const dotsEl = document.getElementById("spotDots");
const ROTATE_MS = 5000;
let current = 0, timer = null, hoverPause = false;

keys.forEach((key, i) => {
  const p = PROFILES[key];
  const s = document.createElement("div");
  s.className = "spot-slide";
  s.style.setProperty("--sc", p.color);
  s.style.setProperty("--sc-soft", p.color + "26");
  s.innerHTML = `
    <div class="spot-av">${avatarSVG(p.color, p.color2)}</div>
    <div class="spot-info">
      <div class="s-tag">PROFILE ${String(i + 1).padStart(2, "0")} / 0${keys.length} · INTELLIGENCE READY</div>
      <h3>${p.name}</h3>
      <div class="s-line">"${p.tagline}." This profile recomputes the entire portfolio for a ${p.name.toLowerCase()}'s questions.</div>
      <div class="spot-stats">${p.stats.map(st => `<div><b>${st[0]}</b><span>${st[1]}</span></div>`).join("")}</div>
      <button class="spot-enter" data-key="${key}">Enter as ${p.name} →</button>
    </div>`;
  slidesEl.appendChild(s);

  const d = document.createElement("button");
  d.className = "sdot";
  d.style.setProperty("--dc", p.color);
  d.setAttribute("aria-label", p.name);
  d.innerHTML = `<span class="fill"></span>`;
  d.addEventListener("click", () => goTo(i, true));
  dotsEl.appendChild(d);
});

const slideEls = [...slidesEl.children];
const dotEls = [...dotsEl.children];
const zone = document.querySelector(".spotlight-zone");

function render() {
  slideEls.forEach((s, i) => {
    s.classList.remove("active", "exit");
    if (i === current) s.classList.add("active");
    else if (i === (current - 1 + slideEls.length) % slideEls.length) s.classList.add("exit");
  });
  dotEls.forEach((d, i) => {
    d.classList.toggle("active", i === current);
    if (i === current) {
      const f = d.querySelector(".fill");
      f.style.animation = "none"; f.offsetHeight; f.style.animation = "";
      d.style.setProperty("--dur", ROTATE_MS + "ms");
    }
  });
  avatarEls.forEach((a, i) => a.classList.toggle("spot-sync", i === current));
}
function goTo(i, manual) {
  current = (i + slideEls.length) % slideEls.length;
  render();
  if (manual) restart();
}
function restart() {
  clearInterval(timer);
  timer = setInterval(() => { if (!hoverPause) goTo(current + 1); }, ROTATE_MS);
}
render(); restart();

const spot = document.getElementById("spotlight");
spot.addEventListener("mouseenter", () => { hoverPause = true; zone.classList.add("paused"); });
spot.addEventListener("mouseleave", () => { hoverPause = false; zone.classList.remove("paused"); });

document.getElementById("spotPrev").addEventListener("click", () => goTo(current - 1, true));
document.getElementById("spotNext").addEventListener("click", () => goTo(current + 1, true));
slidesEl.addEventListener("click", e => {
  const b = e.target.closest(".spot-enter");
  if (b) location.href = "browse.html?profile=" + b.dataset.key;
});
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") goTo(current + 1, true);
  if (e.key === "ArrowLeft") goTo(current - 1, true);
  if (e.key === "Enter") location.href = "browse.html?profile=" + keys[current];
});
