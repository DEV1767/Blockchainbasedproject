/* =====================================================
   ELEMENTS
===================================================== */
const sidebar = document.getElementById("sidebar");
const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");

const BACKEND_URL = "https://backend-eduproof.vercel.app";

/* =====================================================
   SIDEBAR TOGGLE
===================================================== */
openMenu.addEventListener("click", () => {
    sidebar.classList.add("active");
    openMenu.classList.remove("active");
    closeMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
    sidebar.classList.remove("active");
    closeMenu.classList.remove("active");
    openMenu.classList.add("active");
});

/* =====================================================
   DARK MODE (SAVED STATE)
===================================================== */
function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        darkBtn.classList.remove("active");
        lightBtn.classList.add("active");
    } else {
        document.body.classList.remove("dark-mode");
        lightBtn.classList.remove("active");
        darkBtn.classList.add("active");
    }
}

applyTheme(localStorage.getItem("theme") || "light");

/* =====================================================
   DARK MODE BUTTONS
===================================================== */
darkBtn.addEventListener("click", () => {
    applyTheme("dark");
    localStorage.setItem("theme", "dark");
});

lightBtn.addEventListener("click", () => {
    applyTheme("light");
    localStorage.setItem("theme", "light");
});

/* =====================================================
   LOAD STUDENT DASHBOARD DATA
===================================================== */
async function loadDashboard() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
            method: "GET",
            credentials: "include" // 🔥 cookies
        });

        // Not logged in / token expired
        if (!res.ok) {
            window.location.href =
                "https://blockchainbasedproject.vercel.app/login.html";
            return;
        }

        const { user } = await res.json();

        /* -------- BASIC INFO -------- */
        const usernameEl = document.getElementById("username");
        if (usernameEl) usernameEl.innerText = user.name;

        /* -------- STUDENT STATS -------- */
        if (user.role === "student") {
            document.getElementById("totalCert").innerText =
                user.certificateEarned ?? 0;

            // Until certificate APIs are added
            document.getElementById("verifiedCert").innerText = 0;
            document.getElementById("pendingCert").innerText = 0;
            document.getElementById("rejectedCert").innerText = 0;
        }

    } catch (err) {
        console.error("Dashboard error:", err);
        window.location.href =
            "https://blockchainbasedproject.vercel.app/login.html";
    }
}

/* =====================================================
   LOGOUT
===================================================== */
// async function logout() {
//     try {
//         await fetch(`${BACKEND_URL}/api/auth/logout`, {
//             method: "POST",
//             credentials: "include"
//         });
//     } finally {
//         window.location.href =
//             "https://blockchainbasedproject.vercel.app/login.html";
//     }
// }

/* =====================================================
   INIT
===================================================== */
document.addEventListener("DOMContentLoaded", loadDashboard);
