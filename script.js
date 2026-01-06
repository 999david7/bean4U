/* ============================================================
   bean4U – Premium UI
   - Footer year
   - Fold-out search icon (click to expand, ESC/click-out to close)
   - Recipe query forwarded via localStorage
   - Hover pill: NEVER disappears between buttons; snaps to nearest
   - Consent overlay (once), skipped on legal pages
   ============================================================ */

(function () {
    "use strict";

    // ===== Footer year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // ===== Fold-out search
    const searchDock = document.getElementById("searchDock");
    const searchToggle = document.getElementById("searchToggle");
    const searchForm = document.getElementById("recipeSearch");
    const searchInput = document.getElementById("recipeQuery");

    const setSearchOpen = (isOpen) => {
        if (!searchDock || !searchToggle || !searchInput) return;

        searchDock.classList.toggle("open", isOpen);
        searchToggle.setAttribute("aria-expanded", String(isOpen));

        if (isOpen) {
            window.setTimeout(() => searchInput.focus(), 40);
        } else {
            searchInput.value = "";
        }
    };

    if (searchToggle && searchDock) {
        searchToggle.addEventListener("click", () => {
            const isOpen = searchDock.classList.contains("open");
            setSearchOpen(!isOpen);
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

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const q = (searchInput.value || "").trim();
            if (q) localStorage.setItem("bean4u_recipe_query", q);

            window.location.href = "Rezepte (2)/Rezepte2.html";
        });

        searchInput.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;
            // Let form submit handler handle it
        });
    }

    // ===== Consent overlay (once)
    document.addEventListener("DOMContentLoaded", () => {
        const path = (window.location.pathname || "").toLowerCase();
        const isLegal = path.endsWith("/terms.html") || path.endsWith("/privacy.html");
        if (isLegal) return;

        const key = "beans4u_terms_agreed";
        if (localStorage.getItem(key)) return;

        const overlay = document.createElement("div");
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.className = "glassOverlay";

        overlay.innerHTML = `
      <div class="glassModal" role="document">
        <h2 class="glassTitle">Terms & Privacy</h2>
        <p class="glassText">
          To use this site, you need to accept our Terms and Privacy Policy.
        </p>
        <div class="glassLinks">
          <a href="terms.html">Read Terms</a>
          <a href="privacy.html">Read Privacy</a>
        </div>
        <button class="glassBtn" type="button">Accept</button>
      </div>
    `;

        document.body.appendChild(overlay);

        const btn = overlay.querySelector("button");
        btn.addEventListener("click", () => {
            localStorage.setItem(key, "true");
            overlay.remove();
        });
    });

    // ===== Hover pill (premium + no gap-stall)
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    const menuContainer = document.querySelector(".menu-container");
    const pill = document.querySelector(".menuHoverPill");
    const links = Array.from(document.querySelectorAll(".menu-list a"));

    if (!menuContainer || !pill || links.length === 0) return;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    // Spring state
    let x = 0;
    let y = 0;
    let w = 110;
    let h = 40;

    let vx = 0;
    let vy = 0;
    let vw = 0;
    let vh = 0;

    let tx = 0;
    let ty = 0;
    let tw = 110;
    let th = 40;

    let isInside = false;
    let lastMouseX = 0;

    // Tuned for "Apple" smooth (no jitter, no dead stops)
    const posStiff = 0.11;
    const posDamp = 0.52;

    const sizeStiff = 0.13;
    const sizeDamp = 0.50;

    const getRects = () => {
        const cRect = menuContainer.getBoundingClientRect();
        const lRects = links.map((a) => a.getBoundingClientRect());
        return { cRect, lRects };
    };

    let cached = getRects();

    const findNearestLinkIndex = (mouseClientX) => {
        let bestIdx = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        for (let i = 0; i < cached.lRects.length; i += 1) {
            const r = cached.lRects[i];
            const centerX = r.left + r.width / 2;
            const d = Math.abs(mouseClientX - centerX);
            if (d < bestDist) {
                bestDist = d;
                bestIdx = i;
            }
        }

        return bestIdx;
    };

    const applyTargetFromIndex = (idx) => {
        const cRect = cached.cRect;
        const r = cached.lRects[idx];
        const link = links[idx];

        tw = r.width;
        th = r.height;

        const top = r.top - cRect.top;
        ty = clamp(top, 6, cRect.height - th - 6);

        const centerLeft = r.left - cRect.left;
        const mouseX = lastMouseX - cRect.left;

        // Strong snap to the real button, slight bias from cursor
        const mouseLeft = mouseX - tw / 2;
        const snap = 0.82;
        tx = mouseLeft * (1 - snap) + centerLeft * snap;
        tx = clamp(tx, 6, cRect.width - tw - 6);

        // Subtle tint by section (via dataset), without extra classes
        const key = link.getAttribute("data-pill") || "";
        pill.setAttribute("data-pill", key);
    };

    const showPill = () => {
        pill.style.opacity = "1";
    };

    const hidePill = () => {
        pill.style.opacity = "0";
        pill.setAttribute("data-pill", "");
    };

    const tick = () => {
        if (!isInside) return;

        const ax = (tx - x) * posStiff;
        const ay = (ty - y) * posStiff;

        vx = (vx + ax) * posDamp;
        vy = (vy + ay) * posDamp;

        x += vx;
        y += vy;

        const aw = (tw - w) * sizeStiff;
        const ah = (th - h) * sizeStiff;

        vw = (vw + aw) * sizeDamp;
        vh = (vh + ah) * sizeDamp;

        w += vw;
        h += vh;

        pill.style.width = `${w.toFixed(1)}px`;
        pill.style.height = `${h.toFixed(1)}px`;
        pill.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px,0)`;

        requestAnimationFrame(tick);
    };

    const onEnter = (e) => {
        isInside = true;
        cached = getRects();
        lastMouseX = e.clientX;

        const idx = findNearestLinkIndex(lastMouseX);
        applyTargetFromIndex(idx);

        x = tx;
        y = ty;
        w = tw;
        h = th;

        vx = 0;
        vy = 0;
        vw = 0;
        vh = 0;

        showPill();
        requestAnimationFrame(tick);
    };

    const onLeave = () => {
        isInside = false;
        hidePill();
    };

    // rAF-throttled pointer tracking (clean motion)
    let rafPending = false;

    const onMove = (e) => {
        if (!isInside) return;
        lastMouseX = e.clientX;

        if (rafPending) return;
        rafPending = true;

        requestAnimationFrame(() => {
            rafPending = false;
            cached = getRects();

            const idx = findNearestLinkIndex(lastMouseX);
            applyTargetFromIndex(idx);
            showPill();
        });
    };

    menuContainer.addEventListener("mouseenter", onEnter);
    menuContainer.addEventListener("mouseleave", onLeave);
    menuContainer.addEventListener("mousemove", onMove);

    // Keyboard focus: pill follows focused item
    menuContainer.addEventListener("focusin", (e) => {
        const link = e.target.closest(".menu-list a");
        if (!link) return;

        isInside = true;
        cached = getRects();

        const rect = link.getBoundingClientRect();
        lastMouseX = rect.left + rect.width / 2;

        const idx = links.indexOf(link);
        if (idx >= 0) applyTargetFromIndex(idx);

        showPill();
        requestAnimationFrame(tick);
    });

    menuContainer.addEventListener("focusout", () => {
        if (!menuContainer.matches(":hover")) hidePill();
    });

    window.addEventListener("resize", () => {
        if (!isInside) return;
        cached = getRects();

        const idx = findNearestLinkIndex(lastMouseX);
        applyTargetFromIndex(idx);
    });
})();
