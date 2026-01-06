/* ============================================================
   Services page
   - Opens quiz modal from any .openQuiz button
   - Handles quiz submit + result rendering
   - Sets footer year
   ============================================================ */

(function () {
    "use strict";

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const modalEl = document.getElementById("quizModal");
    const quizForm = document.getElementById("quizForm");
    const quizResult = document.getElementById("quizResult");
    const resultText = document.getElementById("resultText");

    if (!modalEl || !quizForm || !quizResult || !resultText) return;

    const quizModal = new bootstrap.Modal(modalEl);

    document.querySelectorAll(".openQuiz").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            quizModal.show();
        });
    });

    quizForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const d = new FormData(quizForm);

        let r =
            "Explore our premium selection – Kenyan AA or Panama Geisha.";

        if (d.get("q1") === "light" && d.get("q2") === "complex" && d.get("q4") === "yes") {
            r = "Try an Ethiopian Yirgacheffe – bright, floral and citrusy.";
        } else if (d.get("q1") === "medium" && d.get("q3") === "drip") {
            r = "Colombian medium roast – balanced and chocolatey.";
        } else if (d.get("q1") === "dark" && d.get("q3") === "espresso") {
            r = "Italian-style dark roast – bold and rich.";
        } else if (d.get("q3") === "coldbrew") {
            r = "Brazilian beans – smooth and low-acid.";
        } else if (d.get("q5") === "budget") {
            r = "Central American blend – affordable and reliable.";
        }

        resultText.textContent = r;
        quizResult.style.display = "block";

        quizResult.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    });
})();
