// Holperfrei pitch site behaviour. Each feature starts only if its element is on the page.
(function () {
  "use strict";

  const SVG = "http://www.w3.org/2000/svg";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SEV_NAME = { 1: "Watch", 2: "Plan repair", 3: "Fix now" };
  // Photo shown for each damage kind in the map demo.
  const KIND_PHOTO = {
    "Pothole": "img/pothole-lingner.jpg",
    "Crack network": "img/stage-2-network.jpg",
    "Long crack": "img/crack-long.jpg",
    "Edge break": "img/crack-edge.jpg",
    "Sunken patch": "img/pothole-leonhard.jpg",
  };
  const KIND_TEXT = {
    "Pothole": "Cut out and refill before someone hits it.",
    "Crack network": "Water is getting in. Patch the surface before frost.",
    "Long crack": "Seal it with hot bitumen on the next crew run.",
    "Edge break": "The edge is crumbling. Patch and reinforce it.",
    "Sunken patch": "An old repair is sinking. Check it on the next pass.",
  };

  function el(name, attrs, parent) {
    const node = document.createElementNS(SVG, name);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  function sevDot(sev) {
    const span = document.createElement("span");
    span.className = "sev sev-" + sev;
    span.setAttribute("aria-hidden", "true");
    return span;
  }

  // Draws the Neustadt street map into an <svg>. Returns handles used by the hero and the demo.
  function drawMap(svg, data, opts) {
    svg.setAttribute("viewBox", opts.viewBox || `0 0 ${data.w} ${data.h}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    el("path", { d: data.river, class: "river" }, svg);
    el("path", { d: data.minor, class: "minor" }, svg);
    el("path", { d: data.major, class: "major" }, svg);
    const water = el("text", { x: 150, y: 960, class: "map-label water" }, svg);
    water.textContent = "Elbe";
    const area = el("text", { x: 800, y: 200, class: "map-label" }, svg);
    area.textContent = "Äußere Neustadt";

    const others = el("g", { class: "other" }, svg);
    data.others.forEach((o) => el("circle", { cx: o.x, cy: o.y, r: 6, fill: `var(--sev-${o.sev})`, class: "dmg-dot" }, others));

    const ghost = el("path", { d: data.route, class: "route-ghost" }, svg);
    const done = el("path", { d: data.route, class: "route-done" }, svg);
    const marks = data.damages.map((d) => {
      const g = el("g", { class: "dmg" }, svg);
      el("rect", { x: d.x - 18, y: d.y - 18, width: 36, height: 36, rx: 2, class: "dmg-ring", stroke: `var(--sev-${d.sev})` }, g);
      el("circle", { cx: d.x, cy: d.y, r: 7, class: "dmg-dot", fill: `var(--sev-${d.sev})` }, g);
      return g;
    });
    const truck = el("g", { class: "truck" }, svg);
    el("rect", { x: -20, y: -11, width: 40, height: 22, rx: 4, fill: "var(--truck)", stroke: "#2b2e30", "stroke-width": 3 }, truck);
    el("rect", { x: 8, y: -9, width: 10, height: 18, rx: 2, fill: "#2b2e30" }, truck);
    return { ghost, done, marks, truck, length: done.getTotalLength() };
  }

  function placeTruck(map, at) {
    const len = map.length * at;
    const p = map.done.getPointAtLength(len);
    const q = map.done.getPointAtLength(Math.min(map.length, len + 4));
    const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
    map.truck.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle})`);
    map.done.style.strokeDasharray = `${map.length}`;
    map.done.style.strokeDashoffset = `${map.length - len}`;
  }

  // Hero: one truck drives its route once on load; damage appears and the fix list ranks it.
  function initHero() {
    const svg = document.querySelector("[data-hero-map]");
    if (!svg || !window.HOLPERFREI_MAP) return;
    const data = window.HOLPERFREI_MAP;
    const map = drawMap(svg, data, { viewBox: "330 150 820 760" });
    const list = document.querySelector("[data-fix-list]");
    const km = document.querySelector("[data-km]");
    const replay = document.querySelector("[data-replay]");
    const DURATION = 16000;
    let raf = 0;

    function render(at) {
      placeTruck(map, at);
      const found = [];
      data.damages.forEach((d, i) => {
        const on = d.at <= at;
        map.marks[i].classList.toggle("on", on);
        if (on) found.push(d);
      });
      if (list.childElementCount !== found.length) {
        // Ranked: worst first, then in the order found.
        found.sort((a, b) => b.sev - a.sev || a.at - b.at);
        const newest = data.damages.filter((d) => d.at <= at).pop();
        list.replaceChildren(...found.slice(0, 6).map((d) => {
          const li = document.createElement("li");
          if (d !== newest) li.style.animation = "none";
          li.append(sevDot(d.sev));
          const where = document.createElement("span");
          where.className = "where";
          where.textContent = d.street;
          const what = document.createElement("span");
          what.className = "what";
          what.textContent = d.kind;
          li.append(where, what);
          li.title = SEV_NAME[d.sev];
          return li;
        }));
      }
      km.textContent = (data.routeKm * at).toFixed(1);
    }

    function play() {
      cancelAnimationFrame(raf);
      if (reduceMotion) return render(1);
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / DURATION);
        render(t);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      list.replaceChildren();
      raf = requestAnimationFrame(tick);
    }

    replay.addEventListener("click", play);
    play();
  }

  // How-it-works: the same map, fully driven, with a filterable ranked list.
  function initMapDemo() {
    const svg = document.querySelector("[data-demo-map]");
    if (!svg || !window.HOLPERFREI_MAP) return;
    const data = window.HOLPERFREI_MAP;
    const map = drawMap(svg, data, { viewBox: "300 120 900 700" });
    placeTruck(map, 1);
    map.truck.style.display = "none";
    map.marks.forEach((m) => m.classList.add("on"));

    const list = document.querySelector("[data-dmg-list]");
    const detail = document.querySelector("[data-dmg-detail]");
    const filters = document.querySelectorAll("[data-filter]");
    let minSev = 1;
    let selected = null;

    const ranked = data.damages.map((d, i) => ({ ...d, i })).sort((a, b) => b.sev - a.sev || a.at - b.at);

    function showDetail(d) {
      if (!d) {
        detail.innerHTML = "<p>Pick a damage from the list to see it on the map.</p>";
        detail.style.gridTemplateColumns = "1fr";
        return;
      }
      detail.style.gridTemplateColumns = "";
      detail.innerHTML = "";
      const img = document.createElement("img");
      img.src = KIND_PHOTO[d.kind];
      img.alt = "";
      const text = document.createElement("div");
      text.innerHTML = "<b></b><span></span>";
      text.querySelector("b").textContent = `${d.kind}, ${d.street}`;
      text.querySelector("span").textContent = `${SEV_NAME[d.sev]}. ${KIND_TEXT[d.kind]}`;
      detail.append(img, text);
    }

    function render() {
      list.replaceChildren(...ranked.filter((d) => d.sev >= minSev).map((d) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("aria-pressed", String(selected === d.i));
        const where = document.createElement("span");
        where.className = "where";
        where.textContent = d.street;
        const what = document.createElement("span");
        what.className = "what";
        what.textContent = d.kind;
        btn.append(sevDot(d.sev), where, what);
        btn.addEventListener("click", () => {
          selected = selected === d.i ? null : d.i;
          render();
        });
        li.append(btn);
        return li;
      }));
      map.marks.forEach((m, i) => {
        const d = data.damages[i];
        m.style.display = d.sev >= minSev ? "" : "none";
        m.classList.toggle("focus", selected === i);
        if (selected === i) m.parentNode.appendChild(m);
      });
      showDetail(selected === null ? null : data.damages[selected]);
    }

    filters.forEach((b) => b.addEventListener("click", () => {
      minSev = Number(b.dataset.filter);
      filters.forEach((f) => f.setAttribute("aria-pressed", String(f === b)));
      if (selected !== null && data.damages[selected].sev < minSev) selected = null;
      render();
    }));
    render();
  }

  // Six years of road checks, one square per week.
  function initWeeks() {
    document.querySelectorAll("[data-weeks]").forEach((grid) => {
      const mode = grid.dataset.weeks;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < 312; i++) {
        const cell = document.createElement("i");
        if (mode === "survey" && i === 0) cell.className = "survey";
        frag.appendChild(cell);
      }
      grid.appendChild(frag);
    });
  }

  // Crack-to-pothole stages: pick a stage, see the photo, the effort and who notices.
  function initStages() {
    const root = document.querySelector("[data-stages]");
    if (!root) return;
    const buttons = root.querySelectorAll("[data-stage]");
    const photos = root.querySelectorAll(".stage-photo img");
    const marks = root.querySelectorAll(".stage-photo .boxes");
    const texts = root.querySelectorAll("[data-stage-text]");
    const bar = root.querySelector(".effort-bar i");
    const dot = root.querySelector("[data-curve-dot]");
    const EFFORT = ["8%", "22%", "52%", "100%"];
    const DOT_X = [150, 390, 640, 860];

    function show(n) {
      buttons.forEach((b, i) => b.setAttribute("aria-pressed", String(i === n)));
      photos.forEach((p, i) => p.classList.toggle("on", i === n));
      marks.forEach((m, i) => m.classList.toggle("on", i === n));
      texts.forEach((t, i) => (t.hidden = i !== n));
      bar.style.setProperty("--w", EFFORT[n]);
      const path = root.querySelector(".curve .line");
      const x = DOT_X[n];
      // Find the curve's y at this x by walking the path.
      let lo = 0, hi = path.getTotalLength();
      for (let k = 0; k < 24; k++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).x < x) lo = mid; else hi = mid;
      }
      const p = path.getPointAtLength(lo);
      dot.setAttribute("cx", p.x);
      dot.setAttribute("cy", p.y);
    }

    buttons.forEach((b, i) => b.addEventListener("click", () => show(i)));
    root.addEventListener("keydown", (e) => {
      const cur = [...buttons].findIndex((b) => b.getAttribute("aria-pressed") === "true");
      if (e.key === "ArrowRight" && cur < 3) { show(cur + 1); buttons[cur + 1].focus(); }
      if (e.key === "ArrowLeft" && cur > 0) { show(cur - 1); buttons[cur - 1].focus(); }
    });
    show(0);
  }

  // Price calculator for the "For cities" page.
  function initCalc() {
    const form = document.querySelector("[data-calc]");
    if (!form) return;
    const fmt = (n) => "€" + Math.round(n).toLocaleString("en-GB");
    const out = (k) => form.querySelector(`[data-out="${k}"]`);
    function update() {
      const km = Math.max(0, Number(form.km.value) || 0);
      const rate = Number(form.tier.value);
      const year = km * rate;
      out("year").textContent = fmt(year);
      out("week").textContent = fmt(year / 52);
      out("survey").textContent = fmt(km * 208);
      out("checks").textContent = (km > 0 ? "52 a year" : "–");
    }
    form.addEventListener("input", update);
    form.addEventListener("submit", (e) => e.preventDefault());
    update();
  }

  function initNav() {
    const btn = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  }

  initNav();
  initHero();
  initMapDemo();
  initWeeks();
  initStages();
  initCalc();
})();
