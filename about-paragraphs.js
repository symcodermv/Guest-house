(() => {
  "use strict";
  const holder = document.getElementById("aboutText");
  if (!holder) return;

  let lastSignature = "";
  const paragraphText = (item) => String(typeof item === "string" ? item : item?.text || "").trim();
  const getParagraphs = () => {
    const about = window.currentSiteContent?.about || window.DEFAULT_SITE_CONTENT?.about || {};
    const managed = Array.isArray(about.paragraphs) ? about.paragraphs.map(paragraphText).filter(Boolean) : null;
    if (managed) return managed;
    return String(about.text || "").split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean);
  };
  const render = () => {
    const paragraphs = getParagraphs();
    const signature = JSON.stringify(paragraphs);
    if (signature === lastSignature && (paragraphs.length ? holder.querySelector(".about-paragraph") : !holder.hasChildNodes())) return;
    lastSignature = signature;
    if (!paragraphs.length) { holder.replaceChildren(); return; }
    holder.replaceChildren(...paragraphs.map((text) => {
      const paragraph = document.createElement("p");
      paragraph.className = "about-paragraph";
      paragraph.textContent = text;
      return paragraph;
    }));
  };
  const observer = new MutationObserver(() => requestAnimationFrame(render));
  observer.observe(holder, { childList: true, subtree: true, characterData: true });
  render();
  window.addEventListener("load", render);
  window.setInterval(render, 1000);
})();
