const posts = {
  family: [
    {
      author: "Amina",
      kind: "Reminder",
      body: "Iftar shopping list is on the fridge. Please pick bread before Maghrib.",
    },
    {
      author: "Yusuf",
      kind: "Tip",
      body: "Quiet hour starts after Isha. Put phones face-down so the little ones sleep.",
    },
  ],
  study: [
    {
      author: "Study group",
      kind: "Note",
      body: "Tomorrow we review Surah Al-Mulk memorization. Bring your marked mushaf.",
    },
    {
      author: "Noor",
      kind: "Tip",
      body: "Label any ruling notes as ‘class notes, not a fatwa’ before sharing.",
    },
  ],
  mosque: [
    {
      author: "Mosque class",
      kind: "Event",
      body: "Saturday halaqa after Asr in the side hall. Sisters’ entrance from the garden path.",
    },
    {
      author: "Imam’s office",
      kind: "Reminder",
      body: "Charity food drive boxes close Friday before Jumu‘ah. No cash requested in-app.",
    },
  ],
};

const feed = document.getElementById("feed");
const composer = document.getElementById("composer");
const chips = [...document.querySelectorAll(".chip")];
let activeCircle = "family";

function renderFeed() {
  const items = posts[activeCircle] ?? [];
  feed.innerHTML = items
    .map(
      (item) => `
      <li>
        <div class="meta">
          <span>${escapeHtml(item.author)}</span>
          <span>${escapeHtml(item.kind)}</span>
          <span>Private · ${labelCircle(activeCircle)}</span>
        </div>
        <p>${escapeHtml(item.body)}</p>
      </li>
    `,
    )
    .join("");
}

function labelCircle(id) {
  if (id === "study") return "Study group";
  if (id === "mosque") return "Mosque class";
  return "Family";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeCircle = chip.dataset.circle;
    chips.forEach((node) => {
      const selected = node === chip;
      node.classList.toggle("is-active", selected);
      node.setAttribute("aria-selected", selected ? "true" : "false");
    });
    renderFeed();
  });
});

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  const field = composer.querySelector("#post-body");
  const body = field.value.trim();
  if (!body) return;
  posts[activeCircle].unshift({
    author: "You",
    kind: "Tip",
    body,
  });
  field.value = "";
  renderFeed();
});

document.querySelectorAll("#privacy-toggles input").forEach((input) => {
  const label = input.parentElement?.querySelector("span");
  const sync = () => {
    if (!label || input.disabled) return;
    label.textContent = input.checked ? "On" : "Off";
  };
  input.addEventListener("change", sync);
  sync();
});

renderFeed();
