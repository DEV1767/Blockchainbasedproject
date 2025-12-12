
        let sidebar = document.getElementById("sidebar");
        let openMenu = document.getElementById("open-menu");
        let closeMenu = document.getElementById("close-menu");
        let darkBtn = document.getElementById("dark-btn");
        let lightBtn = document.getElementById("light-btn");

        // HAMBURGER TOGGLE
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

        // DARK MODE TOGGLE
        darkBtn.addEventListener("click", () => {
            document.body.classList.add("dark-mode");
            darkBtn.classList.remove("active");
            lightBtn.classList.add("active");
        });

        lightBtn.addEventListener("click", () => {
            document.body.classList.remove("dark-mode");
            lightBtn.classList.remove("active");
            darkBtn.classList.add("active");
        });
