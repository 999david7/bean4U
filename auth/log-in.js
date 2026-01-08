/* ============================================================
   log-in.js
   Supabase Auth (Login/Register) - Static hosting friendly
   ============================================================ */

(function () {
    "use strict";

    // ✅ PASTE EXACTLY from Supabase -> Settings -> API
    const supabaseUrl = "https://opmfwbbynlvzqwhnpqmh.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbWZ3YmJ5bmx2enF3aG5wcW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODY4MDYsImV4cCI6MjA3NzY2MjgwNn0.SmS4N__rEP8TvY53W0dHRpclWavYyxZF225ylqCnmB0";

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const formEl = document.querySelector("form.login-form");
    if (!formEl) return;

    const mode = formEl.getAttribute("data-auth-mode"); // login | register
    const emailEl = formEl.querySelector('input[name="email"]');
    const passwordEl = formEl.querySelector('input[name="password"]');
    const submitBtn = formEl.querySelector('button[type="submit"]');

    if (!window.supabase || !window.supabase.createClient) {
        alert("Supabase SDK fehlt. Prüfe den Script-Tag für supabase-js.");
        return;
    }

    if (!supabaseUrl.startsWith("https://")) {
        alert("Supabase URL ist falsch. Muss mit https:// starten.");
        return;
    }

    if (!supabaseAnonKey.startsWith("eyJ")) {
        alert("Anon Key sieht falsch aus (sollte mit eyJ... starten).");
        return;
    }

    const client = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

    formEl.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = (emailEl?.value || "").trim();
        const password = passwordEl?.value || "";

        if (!email || !password) {
            alert("Bitte E-Mail und Passwort eingeben.");
            return;
        }

        setLoading(true);

        try {
            if (mode === "register") {
                const { data, error } = await client.auth.signUp({ email, password });
                if (error) throw error;

                if (data?.session) {
                    window.location.href = "../index.html";
                    return;
                }

                alert("Registriert! Bitte Bestätigen sie ihre E-Mail.");
                window.location.href = "Log%20in.html";
                return;
            }

            const { error } = await client.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;

            window.location.href = "../index.html";
        } catch (err) {
            alert(err?.message ? String(err.message) : "E-Mail nicht besätigt.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    });

    function setLoading(isLoading) {
        if (!submitBtn) return;
        submitBtn.disabled = isLoading;
        submitBtn.style.opacity = isLoading ? "0.7" : "1";
    }
})();
