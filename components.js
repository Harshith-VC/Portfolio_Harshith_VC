/* ============================================================
   COMPONENTS · panel builders for the lens workspace
   ============================================================ */

const SVGNS = "http://www.w3.org/2000/svg";
function svgEl(tag, attrs) {
  const el = document.createElementNS(SVGNS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}
function div(cls, html) {
  const d = document.createElement("div");
  if (cls) d.className = cls;
  if (html != null) d.innerHTML = html;
  return d;
}
function panelShell(mod) {
  const p = div("panel " + (mod.span || "s6"));
  const head = div("p-head",
    `<span class="p-title">${mod.title}</span>` +
    (mod.badge ? `<span class="p-badge ${/AI|PREDICT|GENERATED/i.test(mod.badge) ? "ai" : ""}">${mod.badge}</span>` : ""));
  p.appendChild(head);
  return p;
}

const tip = document.getElementById("gtip");
function showTip(e, title, text) {
  tip.innerHTML = `<b>${title}</b>${text || ""}`;
  tip.classList.add("show");
  moveTip(e);
}
function moveTip(e) {
  const pad = 14;
  let x = e.clientX + pad, y = e.clientY + pad;
  const r = tip.getBoundingClientRect();
  if (x + r.width > innerWidth - 8) x = e.clientX - r.width - pad;
  if (y + r.height > innerHeight - 8) y = e.clientY - r.height - pad;
  tip.style.left = x + "px"; tip.style.top = y + "px";
}
function hideTip() { tip.classList.remove("show"); }

/* ---------- count up ---------- */
function countUp(el, target, suffix, dur = 1300) {
  const isNum = typeof target === "number";
  if (!isNum) { el.textContent = target + (suffix || ""); return; }
  const start = performance.now();
  (function f(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + (suffix || "");
    if (p < 1) requestAnimationFrame(f);
  })(performance.now());
}

/* ============================================================
   BUILDERS
   ============================================================ */
const BUILD = {

  gauge(mod) {
    const p = panelShell(mod);
    const R = 62, C = 2 * Math.PI * R;
    const wrap = div("gauge-wrap");
    wrap.innerHTML = `
      <div class="gauge">
        <svg viewBox="0 0 150 150" width="150" height="150">
          <circle class="track" cx="75" cy="75" r="${R}"></circle>
          <circle class="arc" cx="75" cy="75" r="${R}" stroke-dasharray="${C}" stroke-dashoffset="${C}"></circle>
        </svg>
        <div class="g-val"><b>0</b><span>SCORE / 100</span></div>
      </div>
      <div class="gauge-side">
        <div class="verdict">${mod.verdict}</div>
        <p>${mod.sub}</p>
        <div class="conf">${mod.conf || ""}</div>
      </div>`;
    p.appendChild(wrap);
    p._animate = () => {
      wrap.querySelector(".arc").style.strokeDashoffset = C * (1 - mod.value / 100);
      countUp(wrap.querySelector(".g-val b"), mod.value, "");
    };
    return p;
  },

  summary(mod) {
    const p = panelShell(mod);
    const t = div("summary-text");
    t.innerHTML = `<span class="typed"></span><span class="cursor"></span>`;
    p.appendChild(t);
    p.appendChild(div("summary-src", mod.src || ""));
    p._animate = () => {
      const target = mod.text, span = t.querySelector(".typed");
      let i = 0;
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) { span.textContent = target; t.querySelector(".cursor").remove(); return; }
      (function type() {
        if (!span.isConnected) return;
        i = Math.min(i + 3, target.length);
        span.textContent = target.slice(0, i);
        if (i < target.length) setTimeout(type, 12);
        else setTimeout(() => { const c = t.querySelector(".cursor"); c && c.remove(); }, 2200);
      })();
    };
    return p;
  },

  insights(mod) {
    const p = panelShell(mod);
    const icons = { strength: "▲", risk: "⚠", opportunity: "◆", signal: "◉" };
    const wrap = div("insights");
    mod.items.forEach(it => {
      wrap.appendChild(div("insight " + it.k, `
        <div class="ii">${icons[it.k]}</div>
        <div><span class="itag">${it.k.toUpperCase()}</span><b>${it.t}</b><p>${it.p}</p></div>`));
    });
    p.appendChild(wrap);
    return p;
  },

  bars(mod) {
    const p = panelShell(mod);
    const wrap = div("bars");
    mod.items.forEach(it => {
      wrap.appendChild(div("brow", `
        <div class="btop"><span class="bl">${it.l}</span><span class="bv">${it.v}/100</span></div>
        <div class="btrack"><span class="bfill" data-v="${it.v}"></span></div>
        ${it.n ? `<div class="bnote">${it.n}</div>` : ""}`));
    });
    p.appendChild(wrap);
    p._animate = () => wrap.querySelectorAll(".bfill").forEach(b => b.style.width = b.dataset.v + "%");
    return p;
  },

  stats(mod) {
    const p = panelShell(mod);
    const wrap = div("stat-grid");
    mod.items.forEach(it => {
      const s = div("stat", `<b>0</b><span>${it.s}</span>`);
      s._target = it;
      wrap.appendChild(s);
    });
    p.appendChild(wrap);
    p._animate = () => wrap.querySelectorAll(".stat").forEach(s =>
      countUp(s.querySelector("b"), s._target.v, s._target.suf || ""));
    return p;
  },

  timeline(mod) {
    const p = panelShell(mod);
    const wrap = div("tl");
    mod.items.forEach(it => wrap.appendChild(div("tl-item",
      `<span class="td">${it.d}</span><b>${it.t}</b><p>${it.p}</p>`)));
    p.appendChild(wrap);
    return p;
  },

  list(mod) {
    const p = panelShell(mod);
    const wrap = div("ilist");
    mod.items.forEach(it => wrap.appendChild(div("li",
      `<div class="lic">${it.i}</div><div><b>${it.t}</b><p>${it.p}</p></div>`)));
    p.appendChild(wrap);
    return p;
  },

  tags(mod) {
    const p = panelShell(mod);
    const wrap = div("tag-groups");
    mod.groups.forEach(g => {
      const gd = div("");
      gd.innerHTML = `<h5>${g.h}</h5>`;
      const t = div("tags");
      t.innerHTML = g.items.map(i => `<span>${i}</span>`).join("");
      gd.appendChild(t);
      wrap.appendChild(gd);
    });
    p.appendChild(wrap);
    return p;
  },

  /* ---------- knowledge / influence graph ---------- */
  graph(mod) {
    const p = panelShell(mod);
    if (mod.hint) p.querySelector(".p-head").insertAdjacentHTML("afterend",
      `<div class="bnote" style="font-size:10.5px;color:var(--faint);margin:-6px 0 8px">${mod.hint}</div>`);
    const viz = div("viz");
    const W = 720, H = 420, cx = W / 2, cy = H / 2;
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "xMidYMid meet" });
    viz.appendChild(svg);
    p.appendChild(viz);

    const edgesLayer = svgEl("g", {}); svg.appendChild(edgesLayer);
    const nodesLayer = svgEl("g", {}); svg.appendChild(nodesLayer);

    const nodes = [], edges = [];
    const centerNode = { id: "c", x: cx, y: cy, r: 26, label: mod.center.label, info: mod.center.info, center: true, phase: 0 };
    nodes.push(centerNode);

    const nC = mod.clusters.length;
    mod.clusters.forEach((cl, i) => {
      const ang = (i / nC) * Math.PI * 2 - Math.PI / 2;
      const R1 = Math.min(W, H) * 0.30;
      const cxn = cx + Math.cos(ang) * R1 * 1.35;
      const cyn = cy + Math.sin(ang) * R1 * 0.9;
      const cnode = { id: "cl" + i, x: cxn, y: cyn, r: 15, label: cl.label, info: cl.info, phase: Math.random() * 6 };
      nodes.push(cnode);
      edges.push([centerNode, cnode]);
      (cl.items || []).forEach((it, j) => {
        const n = (cl.items.length);
        const a2 = ang + ((j - (n - 1) / 2) * 0.55);
        const x = cxn + Math.cos(a2) * 72, y = cyn + Math.sin(a2) * 58;
        const inode = { id: "cl" + i + "i" + j, x, y, r: 7.5, label: it.label, info: it.info, phase: Math.random() * 6 };
        nodes.push(inode);
        edges.push([cnode, inode]);
      });
    });

    const edgeEls = edges.map(([a, b]) => {
      const l = svgEl("line", { class: "kg-edge" });
      l._a = a; l._b = b;
      edgesLayer.appendChild(l);
      return l;
    });

    const nodeEls = nodes.map(n => {
      const g = svgEl("g", { class: "kg-node" + (n.center ? " kg-center" : "") });
      const c = svgEl("circle", { r: n.r, fill: n.center ? "var(--accent)" : (n.r > 10 ? "var(--accent-soft)" : "rgba(148,170,210,.25)"), stroke: n.center ? "none" : "var(--accent)", "stroke-width": n.r > 10 ? 1.5 : 1 });
      const t = svgEl("text", { "text-anchor": "middle", y: n.center ? 4 : (n.r > 10 ? -n.r - 7 : -n.r - 5) });
      t.textContent = n.label;
      g.appendChild(c); g.appendChild(t);
      nodesLayer.appendChild(g);
      n._el = g;
      g.addEventListener("mouseenter", e => {
        showTip(e, n.label, n.info || "");
        nodeEls.forEach(x => x.classList.add("dim"));
        edgeEls.forEach(x => x.classList.add("dim"));
        const connected = new Set([n]);
        edgeEls.forEach(l => {
          if (l._a === n || l._b === n) {
            l.classList.remove("dim"); l.classList.add("hot");
            connected.add(l._a); connected.add(l._b);
          }
        });
        connected.forEach(cn => { cn._el.classList.remove("dim"); cn._el.classList.add("hot"); });
      });
      g.addEventListener("mousemove", moveTip);
      g.addEventListener("mouseleave", () => {
        hideTip();
        nodeEls.forEach(x => x.classList.remove("dim", "hot"));
        edgeEls.forEach(x => x.classList.remove("dim", "hot"));
      });
      return g;
    });

    /* gentle float */
    let raf, t0 = performance.now();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function tick(now) {
      const t = (now - t0) / 1000;
      nodes.forEach(n => {
        n._fx = n.x + Math.sin(t * 0.7 + n.phase) * (n.center ? 2 : 4);
        n._fy = n.y + Math.cos(t * 0.6 + n.phase * 1.3) * (n.center ? 2 : 4);
        n._el.setAttribute("transform", `translate(${n._fx},${n._fy})`);
      });
      edgeEls.forEach(l => {
        l.setAttribute("x1", l._a._fx); l.setAttribute("y1", l._a._fy);
        l.setAttribute("x2", l._b._fx); l.setAttribute("y2", l._b._fy);
      });
      raf = requestAnimationFrame(tick);
    }
    p._animate = () => {
      if (reduce) {
        nodes.forEach(n => { n._fx = n.x; n._fy = n.y; n._el.setAttribute("transform", `translate(${n.x},${n.y})`); });
        edgeEls.forEach(l => {
          l.setAttribute("x1", l._a.x); l.setAttribute("y1", l._a.y);
          l.setAttribute("x2", l._b.x); l.setAttribute("y2", l._b.y);
        });
      } else { cancelAnimationFrame(raf); t0 = performance.now(); raf = requestAnimationFrame(tick); }
    };
    p._destroy = () => cancelAnimationFrame(raf);
    return p;
  },

  /* ---------- radar ---------- */
  radar(mod) {
    const p = panelShell(mod);
    const viz = div("viz");
    const W = 360, H = 300, cx = W / 2, cy = H / 2 + 6, R = 100;
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}` });
    const n = mod.axes.length;
    const pt = (i, r) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    };
    [0.33, 0.66, 1].forEach(f => {
      const pts = Array.from({ length: n }, (_, i) => pt(i, R * f).join(",")).join(" ");
      svg.appendChild(svgEl("polygon", { class: "radar-grid", points: pts }));
    });
    mod.axes.forEach((ax, i) => {
      const [x, y] = pt(i, R);
      svg.appendChild(svgEl("line", { class: "radar-axis", x1: cx, y1: cy, x2: x, y2: y }));
      const [lx, ly] = pt(i, R + 20);
      const t = svgEl("text", { class: "radar-lab", x: lx, y: ly + 3, "text-anchor": "middle" });
      t.textContent = ax;
      svg.appendChild(t);
    });
    const poly = svgEl("polygon", { class: "radar-poly", points: Array.from({ length: n }, (_, i) => pt(i, 0).join(",")).join(" ") });
    svg.appendChild(poly);
    const dots = mod.values.map((v, i) => {
      const d = svgEl("circle", { class: "radar-dot", r: 3.5, cx, cy });
      svg.appendChild(d);
      return d;
    });
    viz.appendChild(svg);
    p.appendChild(viz);
    if (mod.note) p.appendChild(div("bnote", mod.note));
    p._animate = () => {
      let start = performance.now();
      (function grow(now) {
        const f = Math.min((now - start) / 900, 1);
        const e = 1 - Math.pow(1 - f, 3);
        poly.setAttribute("points", mod.values.map((v, i) => pt(i, R * (v / 100) * e).join(",")).join(" "));
        dots.forEach((d, i) => {
          const [x, y] = pt(i, R * (mod.values[i] / 100) * e);
          d.setAttribute("cx", x); d.setAttribute("cy", y);
        });
        if (f < 1) requestAnimationFrame(grow);
      })(performance.now());
    };
    return p;
  },

  /* ---------- positioning scatter ---------- */
  scatter(mod) {
    const p = panelShell(mod);
    if (mod.hint) p.querySelector(".p-head").insertAdjacentHTML("afterend",
      `<div class="bnote" style="font-size:10.5px;color:var(--faint);margin:-6px 0 8px">${mod.hint}</div>`);
    const viz = div("viz");
    const W = 640, H = 380, M = 44;
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}` });
    const X = v => M + (v / 100) * (W - M * 2);
    const Y = v => H - M - (v / 100) * (H - M * 2);
    /* quadrant grid */
    svg.appendChild(svgEl("line", { class: "sc-axis", x1: M, y1: H - M, x2: W - M, y2: H - M }));
    svg.appendChild(svgEl("line", { class: "sc-axis", x1: M, y1: M, x2: M, y2: H - M }));
    svg.appendChild(svgEl("line", { class: "sc-axis", x1: X(50), y1: M, x2: X(50), y2: H - M, "stroke-dasharray": "3 5", opacity: ".5" }));
    svg.appendChild(svgEl("line", { class: "sc-axis", x1: M, y1: Y(50), x2: W - M, y2: Y(50), "stroke-dasharray": "3 5", opacity: ".5" }));
    const xl = svgEl("text", { class: "sc-gridlab", x: W - M, y: H - M + 26, "text-anchor": "end" }); xl.textContent = mod.xLabel;
    const yl = svgEl("text", { class: "sc-gridlab", x: M - 30, y: M - 12 }); yl.textContent = mod.yLabel;
    svg.appendChild(xl); svg.appendChild(yl);
    const q = svgEl("text", { class: "sc-gridlab", x: W - M - 4, y: M + 14, "text-anchor": "end", opacity: ".8" });
    q.textContent = "HYBRID LEADERS"; svg.appendChild(q);

    mod.points.forEach(pt0 => {
      const g = svgEl("g", { class: "sc-pt " + (pt0.me ? "sc-me" : "sc-other"), transform: `translate(${X(pt0.x)},${Y(pt0.y)})` });
      if (pt0.me) g.appendChild(svgEl("circle", { class: "ring", r: 8 }));
      g.appendChild(svgEl("circle", { r: pt0.me ? 8 : 6 }));
      const t = svgEl("text", { y: -13, "text-anchor": "middle", "font-weight": pt0.me ? "700" : "400" });
      t.textContent = pt0.label;
      g.appendChild(t);
      g.addEventListener("mouseenter", e => showTip(e, pt0.label, pt0.info || ""));
      g.addEventListener("mousemove", moveTip);
      g.addEventListener("mouseleave", hideTip);
      svg.appendChild(g);
    });
    viz.appendChild(svg);
    p.appendChild(viz);
    return p;
  },

  /* ---------- sparkline trend ---------- */
  spark(mod) {
    const p = panelShell(mod);
    const viz = div("viz");
    viz.style.minHeight = "150px";
    const W = 420, H = 150, M = 12;
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}` });
    const pts = mod.points;
    const max = Math.max(...pts), min = Math.min(...pts);
    const X = i => M + (i / (pts.length - 1)) * (W - M * 2);
    const Y = v => H - M - ((v - min) / (max - min)) * (H - M * 2);
    const line = pts.map((v, i) => `${i ? "L" : "M"}${X(i)},${Y(v)}`).join(" ");
    svg.appendChild(svgEl("path", { class: "flowarea", d: `${line} L${X(pts.length - 1)},${H - M} L${X(0)},${H - M} Z` }));
    const path = svgEl("path", { class: "flowline", d: line });
    svg.appendChild(path);
    const dot = svgEl("circle", { r: 4.5, fill: "var(--accent)", cx: X(pts.length - 1), cy: Y(pts[pts.length - 1]) });
    dot.appendChild(svgEl("animate", { attributeName: "r", values: "4.5;7;4.5", dur: "2s", repeatCount: "indefinite" }));
    svg.appendChild(dot);
    viz.appendChild(svg);
    p.appendChild(viz);
    if (mod.note) p.appendChild(div("bnote", mod.note));
    p._animate = () => {
      const L = path.getTotalLength();
      path.style.strokeDasharray = L;
      path.style.strokeDashoffset = L;
      path.getBoundingClientRect();
      path.style.transition = "stroke-dashoffset 1.6s ease .2s";
      path.style.strokeDashoffset = "0";
    };
    return p;
  }
};
