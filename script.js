/* ===============================
   Navigation Bubble Animation
   (desktop only)
   =============================== */

const nav = document.querySelector('.menu-container');
const bubble = document.querySelector('.menu-bubble');
const links = [...document.querySelectorAll('.menu-list a')];

const isDesktopLike =
    window.matchMedia('(min-width: 769px)').matches &&
    window.matchMedia('(pointer: fine)').matches;

if (nav && bubble && links.length && isDesktopLike) {
    let target = { x: 0, y: 0, w: 0, h: 0 };
    let state  = { x: 0, y: 0, w: 0, h: 0 };

    const lerp = (a, b, t) => a + (b - a) * t;

    function animate(){
        state.x = lerp(state.x, target.x, 0.2);
        state.y = lerp(state.y, target.y, 0.2);
        state.w = lerp(state.w, target.w, 0.2);
        state.h = lerp(state.h, target.h, 0.2);

        bubble.style.transform = `translate(${state.x}px,${state.y}px)`;
        bubble.style.width = `${state.w}px`;
        bubble.style.height = `${state.h}px`;

        requestAnimationFrame(animate);
    }

    function focusLink(link){
        const rL = link.getBoundingClientRect();
        const rN = nav.getBoundingClientRect();

        target = {
            x: rL.left - rN.left - 8,
            y: rL.top  - rN.top  - 4,
            w: rL.width + 16,
            h: rL.height + 10
        };

        bubble.style.opacity = 1;
    }

    links.forEach(a => {
        a.addEventListener('mouseenter', () => focusLink(a));
        a.addEventListener('focus', () => focusLink(a));
    });

    nav.addEventListener('mouseleave', () => {
        bubble.style.opacity = 0;
    });

    animate();
} else if (bubble) {
    bubble.style.display = 'none';
}

/* ===============================
   Consent Overlay
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
    const key = "beans4u_terms_agreed";
    if (localStorage.getItem(key)) return;

    const overlay = document.createElement("div");
    overlay.className =
        "position-fixed top-0 start-0 w-100 h-100 d-flex " +
        "justify-content-center align-items-center bg-dark " +
        "bg-opacity-75";

    overlay.innerHTML = `
    <div class="bg-white text-dark p-4 rounded text-center shadow"
         style="max-width:420px">
      <h4>Welcome to Bean4U ☕</h4>
      <p>Please accept our Terms & Privacy Policy.</p>
      <button class="btn btn-primary mt-3">I Agree</button>
    </div>
  `;

    document.body.appendChild(overlay);

    overlay.querySelector("button").onclick = () => {
        localStorage.setItem(key, "true");
        overlay.remove();
    };
});
