/* ============================================================
   Rezepte2 – Premium UI wiring
   - Renders coffee cards
   - Icon-only search that folds out (filters list)
   - Reads query from localStorage (from homepage search)
   - Home button back
   ============================================================ */

(function () {
    "use strict";

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const coffeeTypes = [
        "Espresso", "Americano", "Latte", "Cappuccino", "Flat White",
        "Macchiato", "Mocha", "Ristretto", "Long Black", "Cortado",
        "Affogato", "Irish Coffee", "Turkish Coffee", "Vienna", "Lungo",
        "Cold Brew", "Nitro Coffee", "Doppio", "Red Eye", "Black Eye",
        "Iced Coffee", "Mazagran", "Coffee Milk", "Cafe au Lait", "Breve",
        "Chicory Coffee", "Drip Coffee", "Percolator Coffee", "Frappuccino",
        "Glace", "Espresso Con Panna", "Café Bombón", "Café Cubano",
        "Café de Olla", "Pharisäer Kaffee", "Café Zorro", "Espresso Romano",
        "Bulletproof Coffee", "Café Brûlot", "Bicerin", "Café Touba",
        "Café Corretto", "Palazzo", "Café Shakerato", "Marocchino",
        "Café Rápido y Sucio", "Kopi Tubruk", "Kopi Joss", "Kopi Luwak",
        "Ca Phe Trung", "Ca Phe Sua Da", "Yuanyang", "Café del Tiempo",
        "Café Liégeois",
    ];

    const coffeeImages = {
        Espresso: "../imgs/Rezepteimgs/espresso.webp",
        Americano: "../imgs/Rezepteimgs/americano.webp",
        Latte: "../imgs/Rezepteimgs/latte.webp",
        Cappuccino: "../imgs/Rezepteimgs/cappuccino.webp",
        "Flat White": "../imgs/Rezepteimgs/flat_white.webp",
        Macchiato: "../imgs/Rezepteimgs/macchiato.webp",
        Mocha: "../imgs/Rezepteimgs/mocha.webp",
        Ristretto: "../imgs/Rezepteimgs/ristretto.webp",
        "Long Black": "../imgs/Rezepteimgs/long-black.webp",
        Cortado: "../imgs/Rezepteimgs/cortado.webp",
        Affogato: "../imgs/Rezepteimgs/affogato.webp",
        "Irish Coffee": "../imgs/Rezepteimgs/irish_coffee.webp",
        "Turkish Coffee": "../imgs/Rezepteimgs/turkish_coffee.webp",
        Vienna: "../imgs/Rezepteimgs/vienna.webp",
        Lungo: "../imgs/Rezepteimgs/lungo.webp",
        "Cold Brew": "../imgs/Rezepteimgs/cold-brew.webp",
        "Nitro Coffee": "../imgs/Rezepteimgs/nitro-coffee.webp",
        Doppio: "../imgs/Rezepteimgs/doppio.webp",
        "Red Eye": "../imgs/Rezepteimgs/red-eye.webp",
        "Black Eye": "../imgs/Rezepteimgs/black-eye.webp",
        "Iced Coffee": "../imgs/Rezepteimgs/iced-coffee.webp",
        Mazagran: "../imgs/Rezepteimgs/mazagran.webp",
        "Coffee Milk": "../imgs/Rezepteimgs/milk-coffee.webp",
        "Cafe au Lait": "../imgs/Rezepteimgs/cafe-au-lait.webp",
        Breve: "../imgs/Rezepteimgs/breve.webp",
        "Chicory Coffee": "../imgs/Rezepteimgs/chicory.webp",
        "Drip Coffee": "../imgs/Rezepteimgs/drip_coffee.webp",
        "Percolator Coffee": "../imgs/Rezepteimgs/percolator.webp",
        Frappuccino: "../imgs/Rezepteimgs/frappucchino.webp",
        Bicerin: "../imgs/Rezepteimgs/Bicerin.png",
    };

    const coffeeList = document.getElementById("coffeeList");
    const searchInput = document.getElementById("searchInput");

    const safeLower = (s) => String(s || "").toLowerCase();

    function renderCoffeeList(filter) {
        const f = safeLower(filter).trim();
        coffeeList.innerHTML = "";

        coffeeTypes.forEach((coffee) => {
            if (!safeLower(coffee).includes(f)) return;

            const li = document.createElement("li");

            const box = document.createElement("div");
            box.className = "coffee-box";

            const img = document.createElement("img");
            img.src = coffeeImages[coffee] || "../imgs/default.jpg";
            img.alt = coffee;
            img.loading = "lazy";
            img.decoding = "async";

            const title = document.createElement("h3");
            title.textContent = coffee;

            box.appendChild(img);
            box.appendChild(title);

            box.addEventListener("click", () => {
                const file = coffee.toLowerCase().replace(/\s+/g, "-");
                window.location.href = `${file}.html`;
            });

            li.appendChild(box);
            coffeeList.appendChild(li);
        });
    }

    // Initial render
    renderCoffeeList("");

    // Live filter
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            renderCoffeeList(searchInput.value);
        });
    }

    // Home button
    const homeBtn = document.getElementById("homeBtn");
    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }

    // Icon-only search fold-out (UI)
    const searchDock = document.getElementById("searchDock");
    const searchToggle = document.getElementById("searchToggle");
    const searchForm = document.getElementById("recipeSearch");

    const setSearchOpen = (isOpen) => {
        if (!searchDock || !searchToggle) return;
        searchDock.classList.toggle("open", isOpen);
        searchToggle.setAttribute("aria-expanded", String(isOpen));
        if (isOpen && searchInput) window.setTimeout(() => searchInput.focus(), 40);
    };

    if (searchToggle && searchDock) {
        searchToggle.addEventListener("click", () => {
            setSearchOpen(!searchDock.classList.contains("open"));
        });

        document.addEventListener("keydown", (e) => {
            if (e.key !== "Escape") return;
            if (searchDock.classList.contains("open")) setSearchOpen(false);
        });

        document.addEventListener("pointerdown", (e) => {
            if (!searchDock.classList.contains("open")) return;
            if (searchDock.contains(e.target)) return;
            setSearchOpen(false);
        });
    }

    if (searchForm) {
        searchForm.addEventListener("submit", (e) => e.preventDefault());
    }

    // Read query from homepage search
    const stored = localStorage.getItem("bean4u_recipe_query") || "";
    if (stored && searchInput) {
        searchInput.value = stored;
        renderCoffeeList(stored);
        setSearchOpen(true);
        localStorage.removeItem("bean4u_recipe_query");
    }
})();
