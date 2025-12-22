"use strict";

/**
 * Coffee Marketplace
 * - Renders product cards with image, store, and buy links.
 * - "View" opens the detail HTML page via slug.
 * - Search filters by name + origin tags.
 */

const coffees = [
    {
        name: "Ethiopian Yirgacheffe",
        slug: "ethiopian-yirgacheffe",
        storeName: "coffeeworld",
        buyUrl:
            "https://coffeeworld.co.uk/product/coffee/single-origin/ethiopia-yirgacheffe/",
        imageUrl:
            "../imgs/product imgs/yirgacheffe-1-1159x2048.png.webp",
        tags: ["ethiopia", "floral", "citrus", "single origin"]
    },
    {
        name: "Colombian Medium Roast",
        slug: "colombian-medium-roast",
        storeName: "Add your store",
        buyUrl: "#",
        imageUrl: "../imgs/default.jpg",
        tags: ["colombia", "balanced", "chocolate"]
    },
    {
        name: "Italian-Style Dark Roast",
        slug: "italian-style-dark-roast",
        storeName: "Add your store",
        buyUrl: "#",
        imageUrl: "../imgs/default.jpg",
        tags: ["italy", "dark", "espresso"]
    },
    {
        name: "Brazilian Bean",
        slug: "brazilian-bean",
        storeName: "Add your store",
        buyUrl: "#",
        imageUrl: "../imgs/default.jpg",
        tags: ["brazil", "nutty", "sweet"]
    },
    {
        name: "Central American Blend",
        slug: "central-american-blend",
        storeName: "Add your store",
        buyUrl: "#",
        imageUrl: "../imgs/default.jpg",
        tags: ["blend", "smooth", "everyday"]
    },
    {
        name: "Panama Geisha",
        slug: "panama-geisha",
        storeName: "Add your store",
        buyUrl: "#",
        imageUrl: "../imgs/default.jpg",
        tags: ["panama", "geisha", "premium", "tea-like"]
    }
];

const coffeeList = document.getElementById("coffeeList");
const searchInput = document.getElementById("searchInput");
const homeBtn = document.getElementById("homeBtn");

function normalizeText(text) {
    return String(text || "").toLowerCase().trim();
}

function matchesFilter(coffee, filter) {
    if (!filter) return true;

    const name = normalizeText(coffee.name);
    const tags = (coffee.tags || []).map(normalizeText).join(" ");
    const store = normalizeText(coffee.storeName);

    return (name + " " + tags + " " + store).includes(filter);
}

function createCard(coffee) {
    const li = document.createElement("li");
    li.className = "card glass";

    const imgWrap = document.createElement("div");
    imgWrap.className = "cardImage";

    const img = document.createElement("img");
    img.src = coffee.imageUrl || "../imgs/default.jpg";
    img.alt = coffee.name;

    imgWrap.appendChild(img);

    const body = document.createElement("div");
    body.className = "cardBody";

    const title = document.createElement("h3");
    title.className = "cardTitle";
    title.textContent = coffee.name;

    const meta = document.createElement("p");
    meta.className = "cardMeta";
    meta.textContent = coffee.storeName
        ? `Store: ${coffee.storeName}`
        : "Store: —";

    const tagRow = document.createElement("div");
    tagRow.className = "tagRow";
    (coffee.tags || []).slice(0, 3).forEach(tag => {
        const pill = document.createElement("span");
        pill.className = "tag";
        pill.textContent = tag;
        tagRow.appendChild(pill);
    });

    const actions = document.createElement("div");
    actions.className = "cardActions";

    const viewBtn = document.createElement("button");
    viewBtn.className = "btn btnPrimary";
    viewBtn.type = "button";
    viewBtn.textContent = "View";
    viewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `${coffee.slug}.html`;
    });

    const buyLink = document.createElement("a");
    buyLink.className = "btn btnGhost";
    buyLink.href = coffee.buyUrl || "#";
    buyLink.target = "_blank";
    buyLink.rel = "noopener noreferrer";
    buyLink.textContent = "Buy";

    if (!coffee.buyUrl || coffee.buyUrl === "#") {
        buyLink.setAttribute("aria-disabled", "true");
        buyLink.classList.add("isDisabled");
        buyLink.addEventListener("click", (e) => e.preventDefault());
    }

    actions.appendChild(viewBtn);
    actions.appendChild(buyLink);

    body.appendChild(title);
    body.appendChild(meta);
    body.appendChild(tagRow);
    body.appendChild(actions);

    li.appendChild(imgWrap);
    li.appendChild(body);

    // Entire card opens the detail page (except buttons)
    li.addEventListener("click", () => {
        window.location.href = `${coffee.slug}.html`;
    });

    return li;
}

function renderCoffeeList(filterRaw = "") {
    const filter = normalizeText(filterRaw);

    coffeeList.innerHTML = "";

    const filtered = coffees.filter(c => matchesFilter(c, filter));

    if (filtered.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty glass";
        empty.innerHTML = `
      <h3>No results</h3>
      <p>Try a different keyword.</p>
    `;
        coffeeList.appendChild(empty);
        return;
    }

    filtered.forEach(coffee => {
        coffeeList.appendChild(createCard(coffee));
    });
}

function wireUi() {
    renderCoffeeList("");

    searchInput.addEventListener("input", () => {
        renderCoffeeList(searchInput.value);
    });

    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }
}

document.addEventListener("DOMContentLoaded", wireUi);
