(() => {
  const ensureQr = (containerId, text, size) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    if (typeof QRCode === "undefined") return;
    new QRCode(container, {
      text,
      width: size,
      height: size,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  };

  const iosLink = document.getElementById("ios_link");
  const androidLink = document.getElementById("android_link");

  if (iosLink?.getAttribute("href")) {
    ensureQr("qrcode_ios", iosLink.getAttribute("href"), 180);
  }
  if (androidLink?.getAttribute("href")) {
    ensureQr("qrcode_android", androidLink.getAttribute("href"), 180);
  }

  const defaultUrl =
    iosLink?.getAttribute("href") || androidLink?.getAttribute("href") || "https://www.hfm.com/int/es/";
  ensureQr("qrcode_default", defaultUrl, 91);
})();
