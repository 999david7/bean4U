/* ============================================================
   bean4U – UI
   - Footer year
   - Consent overlay (auto, once)
   - Pill: smooth, lightly snaps to hovered button,
           follows mouse X, only visible on buttons,
           resizes + recolors per button
   ============================================================ */

(function(){
    "use strict";

    // ===== Year in footer
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // ===== Consent Overlay (Liquid Glass)
    document.addEventListener("DOMContentLoaded", () => {
        const key = "beans4u_terms_agreed";
        if (localStorage.getItem(key)) return;

        const overlay = document.createElement("div");
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.className = "glassOverlay";

        overlay.innerHTML = `
      <div class="glassModal" role="document">
        <div class="glassModalTop">
          <div class="glassPill">
            <span class="glassDot" aria-hidden="true"></span>
            <span>bean4U</span>
          </div>
        </div>

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

    // ===== Smooth snapping pill
    const menuContainer = document.querySelector(".menu-container");
    const menuList = document.querySelector(".menu-list");
    const pill = document.querySelector(".menuHoverPill");

    if (!menuContainer || !menuList || !pill) return;

    const pillColorClasses = [
        "pill-recipes",
        "pill-about",
        "pill-recommendation",
        "pill-login",
        "pill-contact"
    ];

    const clearPillColors = () => {
        pillColorClasses.forEach((c) => pill.classList.remove(c));
    };

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    // Current state (animated)
    let x = 0;
    let y = 0;
    let w = 110;
    let h = 40;

    // Velocity for spring
    let vx = 0;
    let vy = 0;
    let vw = 0;
    let vh = 0;

    // Targets
    let tx = 0;
    let ty = 0;
    let tw = 110;
    let th = 40;

    let isInside = false;
    let isOnLink = false;
    let lastMouseX = 0;

    // Tuning (professional feel)
    // Higher stiffness = snappier, higher damping = less bounce.
    const stiffness = 0.10;
    const damping = 0.5;

    const sizeStiffness = 0.12;
    const sizeDamping = 0.49;

    const getRowCenterY = () => {
        const cRect = menuContainer.getBoundingClientRect();
        const listRect = menuList.getBoundingClientRect();
        return (listRect.top - cRect.top) + (listRect.height / 2);
    };

    const setTargetsFromLink = (link) => {
        const cRect = menuContainer.getBoundingClientRect();
        const lRect = link.getBoundingClientRect();

        tw = lRect.width;
        th = lRect.height;

        // Lock Y to the link row (stable)
        const top = (lRect.top - cRect.top);
        ty = clamp(top, 6, cRect.height - th - 6);

        // “Lightly snap”: blend mouse-follow X with button center X
        const mouseX = lastMouseX - cRect.left;
        const mouseLeft = mouseX - (tw / 2);

        const linkLeft = (lRect.left - cRect.left);
        // This makes it feel like it still follows you, but magnetizes to the link
        const snapStrength = 0.72; // 0..1 (higher = more snap)
        tx = (mouseLeft * (1 - snapStrength)) + (linkLeft * snapStrength);

        tx = clamp(tx, 6, cRect.width - tw - 6);

        // Color per button
        const key = link.getAttribute("data-pill") || "";
        clearPillColors();
        if (key) pill.classList.add(`pill-${key}`);
    };

    const hidePill = () => {
        pill.style.opacity = "0";
        clearPillColors();
        isOnLink = false;
    };

    const showPill = () => {
        pill.style.opacity = "1";
    };

    const tick = () => {
        if (!isInside) return;

        // Spring for position
        const ax = (tx - x) * stiffness;
        const ay = (ty - y) * stiffness;

        vx = (vx + ax) * damping;
        vy = (vy + ay) * damping;

        x += vx;
        y += vy;

        // Spring for size
        const aw = (tw - w) * sizeStiffness;
        const ah = (th - h) * sizeStiffness;

        vw = (vw + aw) * sizeDamping;
        vh = (vh + ah) * sizeDamping;

        w += vw;
        h += vh;

        pill.style.width = `${w.toFixed(1)}px`;
        pill.style.height = `${h.toFixed(1)}px`;
        pill.style.transform =
            `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;

        requestAnimationFrame(tick);
    };

    const onEnter = (e) => {
        isInside = true;
        lastMouseX = e.clientX;

        // initialize to avoid jump
        const cRect = menuContainer.getBoundingClientRect();
        const centerY = getRowCenterY();

        // Start hidden until you’re on a link
        hidePill();

        // Put it somewhere sane internally (doesn’t matter much if hidden)
        tw = parseFloat(getComputedStyle(document.documentElement)
            .getPropertyValue("--pill-default-w")) || 110;
        th = parseFloat(getComputedStyle(document.documentElement)
            .getPropertyValue("--pill-default-h")) || 40;

        tx = clamp((lastMouseX - cRect.left) - (tw / 2),
            6, cRect.width - tw - 6);
        ty = clamp(centerY - (th / 2),
            6, cRect.height - th - 6);

        x = tx; y = ty; w = tw; h = th;
        vx = vy = vw = vh = 0;

        requestAnimationFrame(tick);
    };

    const onLeave = () => {
        isInside = false;
        hidePill();
    };

    const onMove = (e) => {
        if (!isInside) return;

        lastMouseX = e.clientX;

        const link = e.target.closest(".menu-list a");
        if (!link) {
            // Only visible on buttons -> hide immediately
            hidePill();
            return;
        }

        // On a link -> show + snap targets
        isOnLink = true;
        showPill();
        setTargetsFromLink(link);
    };

    menuContainer.addEventListener("mouseenter", onEnter);
    menuContainer.addEventListener("mouseleave", onLeave);
    menuContainer.addEventListener("mousemove", onMove);

    // Keyboard support: show pill on focused link
    menuContainer.addEventListener("focusin", (e) => {
        const link = e.target.closest(".menu-list a");
        if (!link) return;

        isInside = true;
        isOnLink = true;
        showPill();

        // Fake mouse position to the link center
        const lRect = link.getBoundingClientRect();
        lastMouseX = lRect.left + (lRect.width / 2);

        setTargetsFromLink(link);
        requestAnimationFrame(tick);
    });

    menuContainer.addEventListener("focusout", () => {
        // If mouse isn't inside and no focus, hide
        if (!menuContainer.matches(":hover")) hidePill();
    });

    window.addEventListener("resize", () => {
        if (!isInside || !isOnLink) return;
        // Re-evaluate Y lock and clamps
        // Next mouse move will re-target anyway; this prevents weird offset.
        const link = document.querySelector(".menu-list a:hover");
        if (link) setTargetsFromLink(link);
    });

})();
