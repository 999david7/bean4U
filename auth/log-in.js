/* ============================================================
   log-in.js
   Supabase Auth (Login/Register) - Static hosting friendly
   ============================================================ */

(function () {
    "use strict";

    // ✅ PASTE EXACTLY from Supabase -> Settings -> API
    const supabaseUrl = "PASTE_YOUR_PROJECT_URL_HERE";
    const supabaseAnonKey = "PASTE_YOUR_ANON_PUBLIC_KEY_HERE";

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

                alert("Registriert! Prüfe ggf. deine E-Mail zur Bestätigung.");
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
            alert(err?.message ? String(err.message) : "Auth failed.");
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
