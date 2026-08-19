(() => {
  "use strict";
  const holder = document.getElementById("aboutText");
  if (!holder) return;

  let lastSignature = "";
  let paragraphObserver;
  const observeParagraphs = () => {
    paragraphObserver?.disconnect();
    const paragraphs = [...holder.querySelectorAll(".about-paragraph")];
    if (!paragraphs.length) return;
    paragraphObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("about-paragraph-visible");
        } else {
          entry.target.classList.remove("about-paragraph-visible");
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    paragraphs.forEach((paragraph, index) => {
      paragraph.style.setProperty("--about-line-delay", `${Math.min(index, 5) * 90}ms`);
      paragraphObserver.observe(paragraph);
    });
  };
  const paragraphText = (item) => String(typeof item === "string" ? item : item?.text || "").trim();
  const getParagraphs = () => {
    const about = window.currentSiteContent?.about || window.DEFAULT_SITE_CONTENT?.about || {};
    const managed = Array.isArray(about.paragraphs)
      ? about.paragraphs.flatMap((item) => paragraphText(item).split(/\n+/).map((text) => text.trim()).filter(Boolean))
      : null;
    if (managed) return managed;
    return String(about.text || "").split(/\n+/).map((text) => text.trim()).filter(Boolean);
  };
  const render = () => {
    const paragraphs = getParagraphs();
    const signature = JSON.stringify(paragraphs);
    if (signature === lastSignature && (paragraphs.length ? holder.querySelector(".about-paragraph") : !holder.hasChildNodes())) return;
    lastSignature = signature;
    if (!paragraphs.length) { holder.replaceChildren(); return; }
    holder.replaceChildren(...paragraphs.map((text) => {
      const paragraph = document.createElement("p");
      paragraph.className = "about-paragraph intro-reading-line";
      paragraph.textContent = text;
      return paragraph;
    }));
    requestAnimationFrame(observeParagraphs);
  };
  const observer = new MutationObserver(() => requestAnimationFrame(render));
  observer.observe(holder, { childList: true, subtree: true, characterData: true });
  render();
  window.addEventListener("load", render);
  window.setInterval(render, 1000);
})();
