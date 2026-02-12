(() => {
  const panel = document.getElementById("support-panel");
  const fab = document.getElementById("support-fab");
  const closeBtn = document.getElementById("support-panel-close");
  const footerLink = document.getElementById("support-live-link");

  if (!panel || !fab || !closeBtn) return;

  const open = () => {
    panel.hidden = false;
  };

  const close = () => {
    panel.hidden = true;
  };

  const toggle = () => {
    panel.hidden ? open() : close();
  };

  fab.addEventListener("click", (e) => {
    e.preventDefault();
    toggle();
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    close();
  });

  if (footerLink) {
    footerLink.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  document.addEventListener("click", (e) => {
    if (panel.hidden) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    if (panel.contains(target) || fab.contains(target)) return;
    close();
  });
})();
