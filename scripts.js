// === Построение бокового меню на основе .sushi-ranking с h2 ===
function rebuildSidebarMenu() {
    const menu = document.getElementById("top-list");
    if (menu) menu.innerHTML = "";

    const sushiBlocks = document.querySelectorAll(".sushi-ranking");

    let rank = 0;

    sushiBlocks.forEach((block) => {
        // Ищем заголовок строго <h2>
        const heading = block.querySelector("h2");
        if (!heading) return; // ❗ Пропускаем блоки без h2

        // Только если h2 есть — идём дальше
        rank += 1;
        block.setAttribute("data-rank", rank);

        // Проставим/создадим .rank-label
        let label = block.querySelector(".rank-label");
        if (!label) {
            label = document.createElement("div");
            label.className = "rank-label";
            block.prepend(label);
        }
        label.textContent = `ТОП ${rank}`;

        // Проставим id
        const blockId = `top-${rank}`;
        block.setAttribute("id", blockId);

        // Создаём пункт меню
        const brandName = heading.textContent.trim();
        const menuItem = document.createElement("li");
        const menuLink = document.createElement("a");
        menuLink.href = `#${blockId}`;
        menuLink.textContent = `ТОП ${rank} - ${brandName}`;

        // Плавная прокрутка
        menuLink.addEventListener("click", function (e) {
            e.preventDefault();
            const headerHeight = document.querySelector(".top-nav")?.offsetHeight || 60;
            const offset = headerHeight + 20;

            window.scrollTo({
                top: document.getElementById(blockId).getBoundingClientRect().top + window.scrollY - offset,
                behavior: "smooth"
            });
        });

        menuItem.appendChild(menuLink);
        menu.appendChild(menuItem);
    });
}

// === Аккордеон FAQ ===
function initFaqAccordion() {
    document.querySelectorAll(".faq-item").forEach((item) => {
        const question = item.querySelector(".faq-question");
        question?.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });
}

// === Бургер-меню ===
function initSidebarMenu() {
    const sidebar = document.querySelector(".sidebar");
    const burgerMenu = document.querySelector(".burger-menu");
    const closeBtn = document.querySelector(".close-btn");

    if (burgerMenu && sidebar) {
        burgerMenu.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebar.classList.add("active");
        });

        document.addEventListener("click", (e) => {
            if (!sidebar.contains(e.target) && !burgerMenu.contains(e.target)) {
                sidebar.classList.remove("active");
            }
        });

        closeBtn?.addEventListener("click", () => {
            sidebar.classList.remove("active");
        });
    }
}

// === Запуск всех функций сразу ===
rebuildSidebarMenu();
initFaqAccordion();
initSidebarMenu();
