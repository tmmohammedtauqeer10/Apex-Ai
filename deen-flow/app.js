import { darood } from "./content/darood.js";
import { ruhani } from "./content/ruhani.js";
import { duas } from "./content/duas.js";
import { azkar } from "./content/azkar.js";

const sections = { darood, ruhani, duas, azkar };
const ORDER = ["darood", "ruhani", "duas", "azkar"];
const STORAGE_KEY = "deen-flow-practice-v1";

const library = document.getElementById("library");
const toast = document.getElementById("toast");

let query = "";
let savedOnly = false;
let toastTimer = 0;

function todayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function emptyState() {
  return { day: todayKey(), counts: {}, reads: {}, saved: [] };
}

function loadState() {
  const fresh = emptyState();
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "");
    if (!parsed || typeof parsed !== "object") return fresh;
    const saved = Array.isArray(parsed.saved) ? parsed.saved.filter((id) => typeof id === "string") : [];
    if (parsed.day !== fresh.day) return { ...fresh, saved };
    return {
      day: fresh.day,
      counts: parsed.counts && typeof parsed.counts === "object" ? parsed.counts : {},
      reads: parsed.reads && typeof parsed.reads === "object" ? parsed.reads : {},
      saved,
    };
  } catch {
    return fresh;
  }
}

let state = loadState();

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function readRoute() {
  const raw = location.hash.replace(/^#/, "");
  const [sectionId, categoryId] = raw.split("/");
  const section = sections[sectionId] ? sectionId : "darood";
  const known = sections[section].categories.some((category) => category.id === categoryId);
  return { section, category: known ? categoryId : "all" };
}

function itemCategories(item) {
  return item.categories || [];
}

function isDone(item) {
  if (state.reads[item.id]) return true;
  if (item.count && Number(state.counts[item.id] || 0) >= item.count) return true;
  return false;
}

function matchesQuery(item, source, q) {
  if (!q) return true;
  const haystack = [
    item.title,
    item.arabic,
    item.transliteration,
    item.meaning,
    item.when,
    item.virtue,
    item.reference,
    item.note,
    item.grade,
    source.title,
    source.arabicTitle,
    ...(source.keywords || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

function visibleItems(source, category) {
  const q = query.trim().toLowerCase();
  return source.items.filter((item) => {
    if (savedOnly && !state.saved.includes(item.id)) return false;
    if (category !== "all" && !itemCategories(item).includes(category)) return false;
    return matchesQuery(item, source, q);
  });
}

function otherSectionHits(q) {
  if (q.length < 3) return [];
  return ORDER.filter((id) =>
    (sections[id].keywords || []).some((word) => word === q || word.startsWith(q) || (word.length >= 4 && q.startsWith(word))),
  );
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-on");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-on"), 1600);
}

function fillCounts() {
  for (const id of ORDER) {
    const node = document.querySelector(`[data-count-for="${id}"]`);
    if (node) node.textContent = `${sections[id].items.length} texts`;
  }
}

function markNav(sectionId) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const on = link.getAttribute("data-nav") === sectionId;
    link.classList.toggle("is-current", on);
    if (on) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.querySelectorAll(".path").forEach((link) => {
    const on = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("is-current", on);
  });
}

function render() {
  const { section: sectionId, category } = readRoute();
  const source = sections[sectionId];
  const items = visibleItems(source, category);
  const done = items.filter(isDone).length;
  markNav(sectionId);

  const chips = [
    { id: "all", label: "All" },
    ...source.categories,
  ]
    .map((chip) => {
      const count =
        chip.id === "all"
          ? source.items.length
          : source.items.filter((item) => itemCategories(item).includes(chip.id)).length;
      const pressed = chip.id === category;
      return `<button class="chip${pressed ? " is-active" : ""}" type="button" data-action="category" data-category="${escapeHtml(chip.id)}" aria-pressed="${pressed ? "true" : "false"}">${escapeHtml(chip.label)} <span>${count}</span></button>`;
    })
    .join("");

  const cross = otherSectionHits(query.trim().toLowerCase())
    .filter((id) => id !== sectionId)
    .map(
      (id) =>
        `<a href="#${id}">${escapeHtml(sections[id].title)}</a>`,
    )
    .join(", ");

  const cards = items.length
    ? items.map((item) => renderCard(item)).join("")
    : `<p class="empty">Nothing in ${escapeHtml(source.title)} matches that filter. Clear the search, or open another section.</p>`;

  library.innerHTML = `
    <div class="library-head">
      <p class="library-kicker">${escapeHtml(source.arabicTitle)}</p>
      <h2>${escapeHtml(source.title)}</h2>
      <p class="library-summary">${escapeHtml(source.summary)}</p>
    </div>
    <div class="intro">
      ${source.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </div>
    <div class="toolbar">
      <label class="search">
        <span>Search this section</span>
        <input id="search" type="search" value="${escapeHtml(query)}" placeholder="A wording, a time of day, or a source" autocomplete="off" />
      </label>
      <p class="progress"><strong>${done}</strong> of ${items.length} in this view recited today</p>
    </div>
    <div class="chips" role="group" aria-label="Filter ${escapeHtml(source.title)}">${chips}</div>
    <div class="tool-row">
      <button class="text-button${savedOnly ? " is-active" : ""}" type="button" data-action="saved-toggle" aria-pressed="${savedOnly ? "true" : "false"}">${savedOnly ? "Showing saved" : "Show saved only"}</button>
      <button class="text-button" type="button" data-action="reset-day">Clear today's counts</button>
    </div>
    ${cross ? `<p class="cross">That search also names ${cross}.</p>` : ""}
    <div class="cards">${cards}</div>
  `;

}

function renderCard(item) {
  const count = Number(state.counts[item.id] || 0);
  const saved = state.saved.includes(item.id);
  const done = isDone(item);
  const countBlock = item.count
    ? `<div class="counter">
        <button type="button" data-action="dec" data-id="${escapeHtml(item.id)}" aria-label="Count one less">−</button>
        <span class="count" id="count-${escapeHtml(item.id)}">${Math.min(count, item.count)} / ${item.count}</span>
        <button type="button" data-action="inc" data-id="${escapeHtml(item.id)}" aria-label="I recited this once">+1</button>
      </div>`
    : "";
  const readLabel = done ? "Recited today" : "Mark recited today";
  return `
    <article class="card${done ? " is-done" : ""}" id="${escapeHtml(item.id)}">
      <header class="card-top">
        <p class="grade grade-${escapeHtml(item.grade.toLowerCase())}">${escapeHtml(item.grade)}</p>
        <h3>${escapeHtml(item.title)}</h3>
      </header>
      <p class="arabic" lang="ar" dir="rtl">${escapeHtml(item.arabic)}</p>
      <details>
        <summary>How to read it</summary>
        <p class="translit">${escapeHtml(item.transliteration)}</p>
      </details>
      <p class="meaning">${escapeHtml(item.meaning)}</p>
      <dl>
        <div><dt>When</dt><dd>${escapeHtml(item.when)}</dd></div>
        <div><dt>What is reported</dt><dd>${escapeHtml(item.virtue || "")}</dd></div>
        <div><dt>Reference</dt><dd>${escapeHtml(item.reference)}${item.sourceUrl ? ` <a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">Open the source</a>` : ""}</dd></div>
      </dl>
      ${item.note ? `<p class="note">${escapeHtml(item.note)}</p>` : ""}
      <div class="card-actions">
        ${countBlock}
        <button type="button" class="ghost${done ? " is-done" : ""}" data-action="read" data-id="${escapeHtml(item.id)}">${readLabel}</button>
        <button type="button" class="ghost" data-action="copy" data-id="${escapeHtml(item.id)}">Copy Arabic</button>
        <button type="button" class="ghost${saved ? " is-saved" : ""}" data-action="save" data-id="${escapeHtml(item.id)}" aria-pressed="${saved ? "true" : "false"}">${saved ? "Saved" : "Save"}</button>
      </div>
    </article>
  `;
}

function findItem(id) {
  for (const source of Object.values(sections)) {
    const item = source.items.find((entry) => entry.id === id);
    if (item) return item;
  }
  return null;
}

function setHash(sectionId, category) {
  const next = category && category !== "all" ? `#${sectionId}/${category}` : `#${sectionId}`;
  if (location.hash === next) render();
  else location.hash = next;
}

library.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  const { section } = readRoute();

  if (action === "category") {
    setHash(section, target.dataset.category);
    return;
  }
  if (action === "saved-toggle") {
    savedOnly = !savedOnly;
    render();
    return;
  }
  if (action === "reset-day") {
    state.counts = {};
    state.reads = {};
    persist();
    render();
    showToast("Today's counts are cleared");
    return;
  }

  const item = findItem(target.dataset.id);
  if (!item) return;

  if (action === "inc" && item.count) {
    const next = Math.min(item.count, Number(state.counts[item.id] || 0) + 1);
    state.counts[item.id] = next;
    if (next >= item.count) state.reads[item.id] = true;
    persist();
    syncCard(item);
    return;
  }
  if (action === "dec" && item.count) {
    const next = Math.max(0, Number(state.counts[item.id] || 0) - 1);
    state.counts[item.id] = next;
    if (next < item.count) delete state.reads[item.id];
    persist();
    syncCard(item);
    return;
  }
  if (action === "read") {
    if (state.reads[item.id]) delete state.reads[item.id];
    else state.reads[item.id] = true;
    persist();
    syncCard(item);
    return;
  }
  if (action === "save") {
    if (state.saved.includes(item.id)) state.saved = state.saved.filter((id) => id !== item.id);
    else state.saved.push(item.id);
    persist();
    if (savedOnly) render();
    else syncCard(item);
    return;
  }
  if (action === "copy") {
    const text = item.arabic;
    const done = () => showToast("Arabic copied");
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    else fallbackCopy(text, done);
  }
});

function fallbackCopy(text, done) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-999px";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
  done();
}

function syncCard(item) {
  const card = document.getElementById(item.id);
  if (!card) {
    render();
    return;
  }
  const done = isDone(item);
  card.classList.toggle("is-done", done);
  const countNode = card.querySelector(".count");
  if (countNode && item.count) {
    const count = Number(state.counts[item.id] || 0);
    countNode.textContent = `${Math.min(count, item.count)} / ${item.count}`;
  }
  const readButton = card.querySelector('[data-action="read"]');
  if (readButton) {
    readButton.textContent = done ? "Recited today" : "Mark recited today";
    readButton.classList.toggle("is-done", done);
  }
  const saveButton = card.querySelector('[data-action="save"]');
  const saved = state.saved.includes(item.id);
  if (saveButton) {
    saveButton.textContent = saved ? "Saved" : "Save";
    saveButton.classList.toggle("is-saved", saved);
    saveButton.setAttribute("aria-pressed", saved ? "true" : "false");
  }
  const { section, category } = readRoute();
  const source = sections[section];
  const items = visibleItems(source, category);
  const progress = library.querySelector(".progress");
  if (progress) {
    progress.innerHTML = `<strong>${items.filter(isDone).length}</strong> of ${items.length} in this view recited today`;
  }
}

library.addEventListener("input", (event) => {
  if (event.target.id !== "search") return;
  query = event.target.value;
  const cards = library.querySelector(".cards");
  const cross = library.querySelector(".cross");
  if (!cards) {
    render();
    return;
  }
  const { section, category } = readRoute();
  const source = sections[section];
  const items = visibleItems(source, category);
  cards.innerHTML = items.length
    ? items.map((item) => renderCard(item)).join("")
    : `<p class="empty">Nothing in ${escapeHtml(source.title)} matches that filter. Clear the search, or open another section.</p>`;
  const hits = otherSectionHits(query.trim().toLowerCase()).filter((id) => id !== section);
  const line = hits.length ? `<p class="cross">That search also names ${hits.map((id) => `<a href="#${id}">${escapeHtml(sections[id].title)}</a>`).join(", ")}.</p>` : "";
  if (cross) cross.outerHTML = line || "<p class=\"cross\" hidden></p>";
  else if (line) cards.insertAdjacentHTML("beforebegin", line);
});

window.addEventListener("hashchange", () => {
  render();
  library.scrollIntoView({ behavior: "smooth", block: "start" });
});

fillCounts();
render();
if (location.hash) library.scrollIntoView({ behavior: "auto", block: "start" });
