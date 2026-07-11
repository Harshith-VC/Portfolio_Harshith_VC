/* ============================================================
   BROWSE · Netflix theme + AI intelligence report per profile
   ============================================================ */

const params = new URLSearchParams(location.search);
let profileKey = params.get("profile");
if (!PROFILES[profileKey]) profileKey = "recruiter";
const profile = PROFILES[profileKey];

/* profile accent drives the intelligence panels */
document.documentElement.style.setProperty("--p", profile.color);
document.documentElement.style.setProperty("--p-soft", profile.color + "26");

/* ---------- intro (click to skip) ---------- */
const intro = document.getElementById("intro");
intro.addEventListener("click", () => intro.remove());
setTimeout(() => intro && intro.remove(), 2800);

/* ---------- nav ---------- */
document.getElementById("resumePill").href = LINKS.resume;
const avatarBtn = document.getElementById("avatarBtn");
avatarBtn.innerHTML = avatarSVG(profile.color, profile.color2);
const drop = document.getElementById("avatarDrop");
drop.innerHTML =
  PROFILE_ORDER.filter(k => k !== profileKey)
    .map(k => `<a href="browse.html?profile=${k}">${avatarSVG(PROFILES[k].color, PROFILES[k].color2)}<span>${PROFILES[k].name}</span></a>`)
    .join("") +
  `<div class="drop-sep"></div><a href="index.html"><span style="width:26px;text-align:center">↩</span><span>Switch Profiles</span></a>`;
avatarBtn.addEventListener("click", () => drop.classList.toggle("open"));
document.addEventListener("click", e => {
  if (!document.getElementById("avatarMenu").contains(e.target)) drop.classList.remove("open");
});
document.getElementById("switchFab").addEventListener("click", () => location.href = "index.html");

const topnav = document.getElementById("topnav");
window.addEventListener("scroll", () => topnav.classList.toggle("solid", window.scrollY > 40), { passive: true });

/* ---------- hero: AI original briefing ---------- */
const brief = BRIEFINGS[profileKey];
const featured = ITEMS[brief.featured];
const heroBg = document.getElementById("heroBg");
if (featured.img) heroBg.style.backgroundImage = `url('${featured.img2 || featured.img}')`;
else {
  const [c1, c2] = featured.tileColors || ["#222", "#0a0a0a"];
  heroBg.style.background = `radial-gradient(120% 140% at 25% 0%, ${c1}, ${c2})`;
}
document.getElementById("heroEyebrow").textContent = `AI ORIGINAL BRIEFING · ${profile.name.toUpperCase()} CUT`;
document.getElementById("heroTitle").textContent = brief.title;
document.getElementById("heroMeta").innerHTML =
  `<span class="match" style="color:var(--p)">${brief.meta.match}</span><span>${brief.meta.season}</span><span class="chip">HD</span><span class="chip pchip">${brief.meta.tag}</span>`;
const playBtn = document.getElementById("heroPlay");
playBtn.innerHTML = brief.play.label;
playBtn.href = brief.play.href;
document.getElementById("heroInfo").addEventListener("click", () => openItem(brief.featured));

/* typed synopsis */
(function typeSynopsis() {
  const wrap = document.getElementById("heroDesc");
  const span = wrap.querySelector(".typed");
  const cursor = wrap.querySelector(".tcursor");
  const text = brief.synopsis;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    span.textContent = text; cursor.remove(); return;
  }
  let i = 0;
  setTimeout(function type() {
    i = Math.min(i + 2, text.length);
    span.textContent = text.slice(0, i);
    if (i < text.length) setTimeout(type, 14);
    else setTimeout(() => cursor.remove(), 2500);
  }, 2400);
})();

/* ---------- intelligence report ---------- */
document.getElementById("intelFor").textContent = "for " + profile.name;
const intelGrid = document.getElementById("intelGrid");
const intelPanels = [];
(INTEL[profileKey] || []).forEach((mod, i) => {
  const builder = BUILD[mod.type];
  if (!builder) return;
  const panel = builder(mod);
  panel.style.animationDelay = (i * 0.08) + "s";
  intelGrid.appendChild(panel);
  intelPanels.push(panel);
});
/* animate panels when scrolled into view */
if ("IntersectionObserver" in window) {
  const pio = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      setTimeout(() => en.target._animate && en.target._animate(), 300);
      pio.unobserve(en.target);
    });
  }, { threshold: .18 });
  intelPanels.forEach(p => pio.observe(p));
} else {
  intelPanels.forEach(p => { p.classList.add("in"); p._animate && p._animate(); });
}

/* ---------- rows ---------- */
const rowsEl = document.getElementById("rows");

function tileInner(item) {
  if (item.img) {
    return `<img src="${item.img}" alt="${item.title}" loading="lazy">
      <div class="shade"></div>
      ${item.live ? '<span class="c-live">LIVE</span>' : ""}
      <span class="c-tag">${item.tag || ""}</span>
      <span class="c-sub">${item.sub || ""}</span>
      <span class="c-label">${item.title}</span>
      ${item.match ? `<span class="c-match">${item.match}%</span>` : ""}`;
  }
  const [c1, c2] = item.tileColors || ["#333", "#111"];
  return `<div class="grad-tile" style="background:radial-gradient(120% 130% at 20% 0%, ${c1}, ${c2})">
      <span>${item.icon || "★"}</span><b>${item.title}</b></div>
    <div class="shade"></div>
    ${item.tag ? `<span class="c-tag">${item.tag}</span>` : ""}
    <span class="c-sub">${item.sub || ""}</span>
    <span class="c-label">${item.title}</span>
    ${item.match ? `<span class="c-match">${item.match}%</span>` : ""}`;
}

function buildRow(row) {
  const sec = document.createElement("section");
  sec.className = "row";
  sec.id = row.id;
  let track = "";
  if (row.numbered) {
    track = TOP_SKILLS.map((s, i) => `
      <div class="num-card" data-open-page="skills" title="${s.name}">
        <span class="big-num">${i + 1}</span>
        <div class="num-tile" style="background:radial-gradient(130% 130% at 25% 0%, ${s.colors[0]}, ${s.colors[1]})">
          <span>${s.icon}</span><b>${s.name}</b><span>${s.note}</span>
        </div>
      </div>`).join("");
  } else {
    track = row.items.map(id => {
      const it = ITEMS[id];
      return `<div class="card" data-item="${id}">${tileInner(it)}</div>`;
    }).join("");
  }
  sec.innerHTML = `
    <h2 class="row-title">${row.title}<span class="see">Explore all ›</span></h2>
    <div class="row-outer">
      <button class="row-arrow left" aria-label="Scroll left">‹</button>
      <div class="row-track">${track}</div>
      <button class="row-arrow right" aria-label="Scroll right">›</button>
    </div>`;
  rowsEl.appendChild(sec);
}
ROWS[profileKey].forEach(buildRow);

document.querySelectorAll(".row-outer").forEach(outer => {
  const track = outer.querySelector(".row-track");
  outer.querySelector(".left").addEventListener("click", () => track.scrollBy({ left: -track.clientWidth * 0.9, behavior: "smooth" }));
  outer.querySelector(".right").addEventListener("click", () => track.scrollBy({ left: track.clientWidth * 0.9, behavior: "smooth" }));
});

/* ---------- item routing ---------- */
document.addEventListener("click", e => {
  const numCard = e.target.closest("[data-open-page]");
  if (numCard) { openPage(numCard.dataset.openPage); return; }
  const card = e.target.closest("[data-item]");
  if (card) { openItem(card.dataset.item); return; }
  const opener = e.target.closest("[data-open]");
  if (opener) { e.preventDefault(); openPage(opener.dataset.open); }
});

function openItem(id) {
  const item = ITEMS[id];
  if (!item) return;
  if (item.type === "link") { window.open(item.href, "_blank", "noopener"); return; }
  if (item.type === "page") { openPage(item.page); return; }
  openProjectModal(item);
}

/* ---------- modal core ---------- */
const backdrop = document.getElementById("modalBackdrop");
const modalBox = document.getElementById("modalBox");
function showModal(html) {
  modalBox.innerHTML = html;
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
  modalBox.querySelector(".nm-close").onclick = closeModal;
}
function closeModal() {
  backdrop.classList.remove("open");
  document.body.style.overflow = "";
}
backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ---------- project modal ---------- */
function openProjectModal(p) {
  const heroStyle = p.img
    ? `background-image:url('${p.img}')`
    : `background:radial-gradient(120% 140% at 20% 0%, ${p.tileColors[0]}, ${p.tileColors[1]})`;
  const links = [
    p.live && `<a class="nm-btn white" href="${p.live}" target="_blank" rel="noopener">▶ Live Dashboard</a>`,
    p.github && `<a class="nm-btn gray" href="${p.github}" target="_blank" rel="noopener">GitHub Repo</a>`,
    p.video && `<a class="nm-btn gray" href="${p.video}" target="_blank" rel="noopener">Project Video</a>`,
    `<a class="nm-btn red" href="#" data-open="contact">Discuss This Project</a>`
  ].filter(Boolean).join("");
  showModal(`
    <div class="nm-hero" style="${heroStyle}">
      <div class="nm-fade"></div>
      <button class="nm-close" aria-label="Close">✕</button>
      <div class="nm-title"><h2>${p.title}</h2></div>
      <div class="nm-btns">${p.live ? `<a class="nm-btn white" href="${p.live}" target="_blank" rel="noopener">▶ Play</a>` : ""}</div>
    </div>
    <div class="nm-body">
      <div class="nm-meta">
        <span class="match">${p.match}% Match</span><span>${p.year}</span>
        <span class="chip">HD</span><span class="chip">${p.tag}</span>
      </div>
      <p class="nm-lead">${p.lead}</p>
      <div class="nm-grid">
        <div>
          <div class="nm-sec"><h4>The Business Problem</h4><p>${p.problem}</p></div>
          <div class="nm-sec"><h4>Approach</h4><ul>${p.approach.map(a => `<li>${a}</li>`).join("")}</ul></div>
          <div class="nm-sec"><h4>Key Findings</h4><ul>${p.findings.map(f => `<li>${f}</li>`).join("")}</ul></div>
          <div class="nm-sec"><h4>Business Impact</h4><p>${p.impact}</p></div>
        </div>
        <div class="nm-side">
          <div class="kv">KPIs: <b>${p.kpis}</b></div>
          <div class="kv">Cast: <b>Harshith V C (Analyst, Designer, Developer)</b></div>
          <div class="kv">Genre: <b>${p.tag}</b></div>
          <div class="nm-sec"><h4>Tools & Tech</h4><div class="nm-tools">${p.tools.map(t => `<span>${t}</span>`).join("")}</div></div>
          ${p.img2 ? `<div class="nm-sec"><h4>Another Angle</h4><img src="${p.img2}" alt="${p.title} alternate view" style="border-radius:6px" loading="lazy"></div>` : ""}
        </div>
      </div>
      <div class="nm-links">${links}</div>
    </div>`);
}

/* ---------- page modals ---------- */
const PAGES = {
  about: () => pageShell("About Me", "🧭", `
    <p class="nm-lead">I am a Data and Analytics professional who believes data is only valuable when it leads to better decisions. My approach is direct: understand the real problem, cut through noise, and deliver clear, actionable insights that change what the business does next.</p>
    <div class="nm-sec"><p>I work across the full analytics stack, from SQL, Python, and data modeling to Power BI, Tableau, and Excel, and increasingly with AI, machine learning, and automation. I focus on uncovering root causes, challenging assumptions, and making strategy choices defensible with evidence.</p></div>
    <div class="pg-h">Quick Facts</div>
    <div class="nm-sec"><ul>
      <li>Based in Bengaluru, India · open to opportunities</li>
      <li>Core stack: SQL · Python · Power BI · Excel · Tableau</li>
      <li>Domains: Sales, Finance, HR, Operations, Product</li>
      <li>Key strengths: Problem Solving, Critical Thinking, Attention to Detail, Adaptability</li>
    </ul></div>
    <div class="nm-links">
      <a class="nm-btn white" href="${LINKS.resume}" target="_blank" rel="noopener">Download Resume</a>
      <a class="nm-btn gray" href="#" data-open="contact">Contact Me</a>
    </div>`),

  skills: () => pageShell("Skills & Technologies", "🧠",
    SKILL_GROUPS.map(g => `<div class="pg-h">${g.h}</div><div class="pg-chips">${g.items.map(i => `<span>${i}</span>`).join("")}</div>`).join("") +
    `<div class="nm-links"><a class="nm-btn gray" href="${LINKS.github}" target="_blank" rel="noopener">See Skills in Action on GitHub</a></div>`),

  experience: () => pageShell("Professional Experience", "📈",
    `<p class="nm-lead">Hands-on analytics across the full lifecycle, from data quality and pipelines to experimentation, forecasting, and executive communication.</p>` +
    EXPERIENCE.map(x => `<div class="xp"><h5>${x.h}</h5><p>${x.p}</p><span class="imp">${x.imp}</span></div>`).join("") +
    `<div class="nm-links"><a class="nm-btn white" href="${LINKS.resume}" target="_blank" rel="noopener">Full Resume (PDF)</a></div>`),

  certifications: () => pageShell("Certifications & Credentials", "🎓",
    CERTS.map(c => `<div class="cert-line"><span class="ci">${c.i}</span><div><h5>${c.h}</h5><p>${c.p}</p>${c.link ? `<a href="${c.link}" target="_blank" rel="noopener">Verify credential ›</a>` : ""}</div></div>`).join("")),

  contact: () => pageShell("Let's Connect", "✉️", `
    <p class="nm-lead">Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
    <div class="contact-grid">
      <a href="${LINKS.email}"><b>✉️ Email</b><span>harshithacharya6@gmail.com</span></a>
      <a href="${LINKS.linkedin}" target="_blank" rel="noopener"><b>💼 LinkedIn</b><span>/in/harshith-v-c</span></a>
      <a href="${LINKS.github}" target="_blank" rel="noopener"><b>💻 GitHub</b><span>@Harshith-VC</span></a>
      <a href="${LINKS.phone}"><b>📞 Phone</b><span>+91 63626 32584</span></a>
    </div>
    <div class="nm-links"><a class="nm-btn red" href="${LINKS.resume}" target="_blank" rel="noopener">Download Resume (PDF)</a></div>`),

  dashboards: () => pageShell("Live Interactive Dashboards", "📊", `
    <p class="nm-lead">Fully interactive, no login needed. Click through, filter, and drill exactly like a stakeholder would.</p>
    <div class="cert-line"><span class="ci">🏢</span><div><h5>Business Insights 360</h5><p>Sales · Marketing · Finance · Supply Chain · Executive views</p><a href="${LINKS.bi360Live}" target="_blank" rel="noopener">Open live dashboard ›</a></div></div>
    <div class="cert-line"><span class="ci">🎧</span><div><h5>Spotify Songs Analysis</h5><p>Glass morphism design · DENEB visuals · global streaming trends</p><a href="${LINKS.spotifyLive}" target="_blank" rel="noopener">Open live dashboard ›</a></div></div>
    <div class="cert-line"><span class="ci">🏏</span><div><h5>IPL 2024 Magazine</h5><p>Three seasons of player and team performance</p><a href="${LINKS.iplLive}" target="_blank" rel="noopener">Open live dashboard ›</a></div></div>`)
};

function pageShell(title, icon, bodyHTML) {
  return `
    <div class="nm-hero" style="background:radial-gradient(120% 150% at 15% 0%, #2b2b2b, #0c0c0c);aspect-ratio:16/5">
      <div class="nm-fade"></div>
      <button class="nm-close" aria-label="Close">✕</button>
      <div class="nm-title"><h2>${icon} ${title}</h2></div>
    </div>
    <div class="nm-body">${bodyHTML}</div>`;
}

function openPage(key) {
  if (PAGES[key]) showModal(PAGES[key]());
}

/* ---------- footer socials ---------- */
document.getElementById("footSocial").innerHTML = `
  <a href="${LINKS.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z"/></svg></a>
  <a href="${LINKS.github}" target="_blank" rel="noopener" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg></a>
  <a href="${LINKS.email}" aria-label="Email"><svg viewBox="0 0 24 24"><path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 8.4 8.7-6.15-1.15-1.63L12 10.4 4.45 4.62 3.3 6.25 12 12.4z"/></svg></a>`;
