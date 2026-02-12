(() => {
  const mobileBreakpoint = 992;

  const isMobile = () => window.innerWidth < mobileBreakpoint;

  const navbarMenu = document.getElementById("navbarMenu");
  const toggler = document.getElementById("navBarTogglerButton");
  const flagsBtn = document.getElementById("flags-btn");
  const flagsMenu = document.getElementById("flags-menu");

  const setNavbarExpanded = (expanded) => {
    if (!navbarMenu || !toggler) return;
    navbarMenu.classList.toggle("show", expanded);
    toggler.setAttribute("aria-expanded", expanded ? "true" : "false");
    toggler.classList.toggle("collapsed", !expanded);
    document.body.classList.toggle("disableScrollNavbar", expanded);
  };

  if (toggler && navbarMenu) {
    toggler.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = navbarMenu.classList.contains("show");
      setNavbarExpanded(!expanded);
    });
  }

  const closeAllDropdowns = () => {
    document.querySelectorAll(".top_menu_li.is-open").forEach((li) => {
      li.classList.remove("is-open");
      const trigger = li.querySelector('a[id="menu-item"]');
      trigger?.setAttribute("aria-expanded", "false");
    });
  };

  document.querySelectorAll(".top_menu_li").forEach((li) => {
    const trigger = li.querySelector('a[id="menu-item"]');
    const dropdown = li.querySelector(".dropdown-content");
    if (!trigger || !dropdown) return;

    trigger.addEventListener("click", (e) => {
      if (!isMobile()) return;
      e.preventDefault();
      const alreadyOpen = li.classList.contains("is-open");
      closeAllDropdowns();
      li.classList.toggle("is-open", !alreadyOpen);
      trigger.setAttribute("aria-expanded", !alreadyOpen ? "true" : "false");
    });
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) {
      closeAllDropdowns();
      flagsMenu?.classList.remove("show");
    }
  });

  document.addEventListener("click", (e) => {
    if (!isMobile()) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    const clickedInsideMenu = navbarMenu?.contains(target) ?? false;
    const clickedInsideFlags = flagsBtn?.contains(target) || flagsMenu?.contains(target) || false;
    if (!clickedInsideMenu) {
      closeAllDropdowns();
      flagsMenu?.classList.remove("show");
    }
    if (!clickedInsideFlags) flagsMenu?.classList.remove("show");
  });

  if (flagsBtn && flagsMenu) {
    flagsBtn.addEventListener("click", (e) => {
      if (!isMobile()) return;
      e.preventDefault();
      flagsMenu.classList.toggle("show");
    });
  }
})();
