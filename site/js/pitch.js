// Pitch deck behaviour. site.js already wires the shared pieces (week grid, crack stages, map drive);
// this file adds slide navigation and the revenue chart.
(function () {
  "use strict";

  const deck = document.querySelector("[data-deck]");
  const slides = [...deck.querySelectorAll(".slide")];
  const progress = deck.querySelector("[data-progress]");
  const count = deck.querySelector("[data-count]");
  const notesBtn = deck.querySelector("[data-notes-toggle]");
  const notesPanel = deck.querySelector("[data-notes-panel]");
  const W = 1600, H = 900;
  let current = -1;

  // Scale the fixed 1600×900 canvas to fit the space above the controls.
  function fit() {
    const s = Math.min(deck.clientWidth / W, deck.clientHeight / H);
    deck.style.setProperty("--s", String(s));
    slides.forEach((sl) => sl.style.setProperty("--s", String(s)));
  }

  const dots = slides.map((sl, i) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `${i + 1}. ${sl.dataset.title}`);
    b.title = sl.dataset.title;
    b.addEventListener("click", () => go(i));
    li.append(b);
    progress.append(li);
    return b;
  });

  function go(n) {
    n = Math.max(0, Math.min(slides.length - 1, n));
    if (n === current) return;
    current = n;
    slides.forEach((sl, i) => {
      sl.classList.toggle("on", i === n);
      sl.setAttribute("aria-hidden", String(i !== n));
      sl.inert = i !== n;
    });
    dots.forEach((d, i) => {
      d.classList.toggle("seen", i < n);
      if (i === n) d.setAttribute("aria-current", "step"); else d.removeAttribute("aria-current");
    });
    count.textContent = `${n + 1} / ${slides.length}`;
    if (location.hash !== `#${n + 1}`) history.replaceState(null, "", `#${n + 1}`);
    renderNotes();
    // The map slide: start the truck's drive each time the slide comes up.
    const replay = slides[n].querySelector("[data-replay]");
    if (replay) replay.click();
  }

  function renderNotes() {
    const note = slides[current].querySelector(".notes");
    notesPanel.innerHTML = "<b></b><p></p>";
    notesPanel.querySelector("b").textContent = `Notes · ${slides[current].dataset.title}`;
    notesPanel.querySelector("p").textContent = note ? note.textContent : "No notes for this slide.";
  }

  function toggleNotes() {
    notesPanel.hidden = !notesPanel.hidden;
    notesBtn.setAttribute("aria-pressed", String(!notesPanel.hidden));
  }

  deck.querySelector("[data-prev]").addEventListener("click", () => go(current - 1));
  deck.querySelector("[data-next]").addEventListener("click", () => go(current + 1));
  notesBtn.addEventListener("click", toggleNotes);

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    // Arrow keys inside the stage picker or the slider belong to them.
    if (t.closest && (t.closest("[data-stages]") || t.matches("input"))) return;
    if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(current + 1); }
    else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(current - 1); }
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(slides.length - 1);
    else if (e.key === "n" || e.key === "N") toggleNotes();
    else if ((e.key === "f" || e.key === "F") && document.fullscreenEnabled) {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen().catch(() => {});
    }
  });

  // Swipe on touch screens.
  let touchX = null;
  deck.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  deck.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 60 && !e.target.closest("input, [data-stages]")) go(current + (dx < 0 ? 1 : -1));
  });

  // Revenue bars from the five-year plan in docs/cost revenue model.md.
  function initRevenue() {
    const svg = deck.querySelector("[data-rev-chart]");
    if (!svg) return;
    const NS = "http://www.w3.org/2000/svg";
    const rows = [
      { yr: 2027, rev: 0.04, label: "€40k", cust: "Pilot" },
      { yr: 2028, rev: 0.224, label: "€224k", cust: "7 customers" },
      { yr: 2029, rev: 0.835, label: "€835k", cust: "28 customers" },
      { yr: 2030, rev: 1.86, label: "€1.86m", cust: "62 customers" },
      { yr: 2031, rev: 3.32, label: "€3.32m", cust: "108 customers" },
    ];
    const top = 40, base = 340, max = 3.32, bw = 96, step = 136, x0 = 20;
    const add = (name, attrs, text) => {
      const n = document.createElementNS(NS, name);
      for (const k in attrs) n.setAttribute(k, attrs[k]);
      if (text) n.textContent = text;
      svg.append(n);
      return n;
    };
    rows.forEach((r, i) => {
      const h = Math.max(3, (r.rev / max) * (base - top));
      const x = x0 + i * step;
      add("rect", { x, y: base - h, width: bw, height: h, class: i === 0 ? "bar now" : "bar" });
      add("text", { x: x + bw / 2, y: base - h - 10, "text-anchor": "middle", class: "val" }, r.label);
      add("text", { x: x + bw / 2, y: base + 30, "text-anchor": "middle", class: "yr" }, String(r.yr));
      add("text", { x: x + bw / 2, y: base + 54, "text-anchor": "middle", class: "cust" }, r.cust);
    });
    add("line", { x1: 0, y1: base, x2: x0 + 4 * step + bw + 20, y2: base, class: "axis" });
    // Break-even sits between 2029 and 2030.
    const bx = x0 + 3 * step - (step - bw) / 2;
    add("line", { x1: bx, y1: 0, x2: bx, y2: base, class: "be" });
    add("text", { x: bx - 10, y: 16, "text-anchor": "end", class: "be-label" }, "Break-even 2030 →");
  }

  initRevenue();
  fit();
  window.addEventListener("resize", fit);
  const fromHash = () => {
    const n = parseInt(location.hash.slice(1), 10);
    go(Number.isFinite(n) ? n - 1 : 0);
  };
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
