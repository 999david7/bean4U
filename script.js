/* ============================================================
   bean4U – UI
   - Footer year
   - Consent overlay (auto, once)
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
})();
