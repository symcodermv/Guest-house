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

(() => {
  "use strict";
  const holder = document.getElementById("roomsText");
  if (!holder) return;

  let lastSignature = "";
  let paragraphObserver;
  const observeParagraphs = () => {
    paragraphObserver?.disconnect();
    const paragraphs = [...holder.querySelectorAll(".rooms-paragraph")];
    paragraphObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("reading-text-visible", entry.isIntersecting);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    paragraphs.forEach((paragraph, index) => {
      paragraph.style.setProperty("--reading-delay", `${Math.min(index, 5) * 90}ms`);
      paragraphObserver.observe(paragraph);
    });
  };
  const paragraphText = (item) => String(typeof item === "string" ? item : item?.text || "").trim();
  const getParagraphs = () => {
    const rooms = window.currentSiteContent?.rooms || window.DEFAULT_SITE_CONTENT?.rooms || {};
    const managed = Array.isArray(rooms.paragraphs)
      ? rooms.paragraphs.flatMap((item) => paragraphText(item).split(/\n+/).map((text) => text.trim()).filter(Boolean))
      : null;
    if (managed) return managed;
    return String(rooms.text || "").split(/\n+/).map((text) => text.trim()).filter(Boolean);
  };
  const render = () => {
    const paragraphs = getParagraphs();
    const signature = JSON.stringify(paragraphs);
    if (signature === lastSignature && (paragraphs.length ? holder.querySelector(".rooms-paragraph") : !holder.hasChildNodes())) return;
    lastSignature = signature;
    holder.replaceChildren(...paragraphs.map((text) => {
      const paragraph = document.createElement("p");
      paragraph.className = "rooms-paragraph reading-text-line";
      paragraph.textContent = text;
      return paragraph;
    }));
    requestAnimationFrame(observeParagraphs);
  };
  new MutationObserver(() => requestAnimationFrame(render)).observe(holder, { childList: true, subtree: true, characterData: true });
  render();
  window.addEventListener("load", render);
  window.setInterval(render, 1000);
})();

(() => {
  "use strict";
  const holder = document.getElementById("diningText");
  if (!holder) return;

  let lastSignature = "";
  let paragraphObserver;
  const paragraphText = (item) => String(typeof item === "string" ? item : item?.text || "").trim();
  const getParagraphs = () => {
    const dining = window.currentSiteContent?.dining || window.DEFAULT_SITE_CONTENT?.dining || {};
    const managed = Array.isArray(dining.paragraphs)
      ? dining.paragraphs.flatMap((item) => paragraphText(item).split(/\n+/).map((text) => ({
          text: text.trim(),
          color: typeof item === "object" ? item.color : "",
          highlightText: typeof item === "object" ? item.highlightText : "",
          highlightColor: typeof item === "object" ? item.highlightColor : ""
        })).filter((item) => item.text))
      : null;
    if (managed) return managed;
    return String(dining.text || "").split(/\n+/).map((text) => ({ text: text.trim(), color: "", highlightText: "", highlightColor: "" })).filter((item) => item.text);
  };
  const observeParagraphs = () => {
    paragraphObserver?.disconnect();
    const paragraphs = [...holder.querySelectorAll(".dining-paragraph")];
    paragraphObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("reading-text-visible", entry.isIntersecting));
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    paragraphs.forEach((paragraph, index) => {
      paragraph.style.setProperty("--reading-delay", `${Math.min(index, 5) * 90}ms`);
      paragraphObserver.observe(paragraph);
    });
  };
  const render = () => {
    const paragraphs = getParagraphs();
    const signature = JSON.stringify(paragraphs);
    if (signature === lastSignature && (paragraphs.length ? holder.querySelector(".dining-paragraph") : !holder.hasChildNodes())) return;
    lastSignature = signature;
    holder.replaceChildren(...paragraphs.map((item) => {
      const paragraph = document.createElement("p");
      paragraph.className = "dining-paragraph reading-text-line";
      paragraph.style.setProperty("color", item.color || "#657a7a", "important");
      const automaticHighlight = item.text.toLowerCase().includes("thai, sri lankan, indian, and maldivian")
        ? "Thai, Sri Lankan, Indian, and Maldivian"
        : "";
      const highlightText = String(item.highlightText || automaticHighlight).trim();
      if (!highlightText) {
        paragraph.textContent = item.text;
      } else {
        const start = item.text.toLowerCase().indexOf(highlightText.toLowerCase());
        if (start < 0) {
          paragraph.textContent = item.text;
        } else {
          paragraph.append(document.createTextNode(item.text.slice(0, start)));
          const highlight = document.createElement("span");
          highlight.className = "dining-text-highlight";
          highlight.style.setProperty("color", item.highlightColor || "#df7b3f", "important");
          highlight.textContent = item.text.slice(start, start + highlightText.length);
          paragraph.append(highlight, document.createTextNode(item.text.slice(start + highlightText.length)));
        }
      }
      return paragraph;
    }));
    requestAnimationFrame(observeParagraphs);
  };
  new MutationObserver(() => requestAnimationFrame(render)).observe(holder, { childList: true, subtree: true, characterData: true });
  render();
  window.addEventListener("load", render);
  window.setInterval(render, 1000);
})();

/* Keep the home-page editorial order: Rooms first, Restaurant immediately after. */
(() => {
  const roomsSection = document.getElementById("rooms");
  const restaurantSection = document.getElementById("dining");
  if (roomsSection && restaurantSection && roomsSection.nextElementSibling !== restaurantSection) {
    roomsSection.after(restaurantSection);
  }
})();

/* Add backend-managed duration and circular logos to home Activity cards. */
(() => {
  const grid = document.getElementById("activitiesGrid");
  if (!grid) return;
  let lastSignature = "";
  const enhanceCards = () => {
    const items = window.currentSiteContent?.activities?.items || window.DEFAULT_SITE_CONTENT?.activities?.items || [];
    const cards = [...grid.querySelectorAll(".activity-card[data-activity-index]")];
    const signature = JSON.stringify(items.map((item) => [item.duration || "", item.priceNote || "", item.logoImage || "", item.priceOptions || []]));
    if (signature === lastSignature && cards.every((card) => card.dataset.activityExtrasReady === "true")) return;
    lastSignature = signature;
    cards.forEach((card) => {
      const index = Number(card.dataset.activityIndex || 0);
      const item = items[index] || {};
      const firstOption = Array.isArray(item.priceOptions) && item.priceOptions.length ? item.priceOptions[0] : item;
      const copy = card.querySelector(".activity-card-copy");
      const price = card.querySelector(".activity-price");
      if (!copy || !price) return;

      let duration = copy.querySelector(".activity-duration");
      if (firstOption.duration) {
        if (!duration) {
          duration = document.createElement("span");
          duration.className = "activity-duration";
          price.before(duration);
        }
        duration.textContent = firstOption.duration;
      } else {
        duration?.remove();
      }

      const note = price.querySelector(":scope > span:last-child");
      if (note) {
        note.classList.add("activity-price-note");
        note.textContent = firstOption.priceNote || "";
      }

      const priceStrong = price.querySelector("strong");
      if (priceStrong && firstOption.price !== undefined && firstOption.price !== "") {
        const cleanPrice = String(firstOption.price).replace(/^\$+/, "").trim();
        priceStrong.textContent = cleanPrice ? `$${cleanPrice}` : "Ask";
      }

      const discover = copy.querySelector(".activity-discover");
      if (discover) {
        discover.querySelectorAll("svg, i, .activity-discover-arrow, .activity-card-logo").forEach((element) => element.remove());
        const textNode = [...discover.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
        if (textNode) textNode.textContent = "Discover more";
        else discover.prepend(document.createTextNode("Discover more"));
        const arrow = document.createElement("span");
        arrow.className = "activity-discover-arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "→";
        discover.append(arrow);
        discover.classList.toggle("has-activity-logo", Boolean(item.logoImage));
        if (item.logoImage) {
          const logo = document.createElement("img");
          logo.className = "activity-card-logo";
          logo.src = item.logoImage;
          logo.alt = `${item.title || "Activity"} logo`;
          logo.loading = "lazy";
          discover.append(logo);
        }
      }
      card.dataset.activityExtrasReady = "true";
    });
  };
  new MutationObserver(() => requestAnimationFrame(enhanceCards)).observe(grid, { childList: true, subtree: true });
  enhanceCards();
  window.addEventListener("load", enhanceCards);
  window.setInterval(enhanceCards, 1000);
})();

/* Selectable activity price options on each Discover page. */
(() => {
  const detail = document.getElementById("activityDetail");
  const rate = document.getElementById("activityDetailPrice")?.closest(".rate");
  if (!detail || !rate) return;

  const money = (value) => {
    const clean = String(value ?? "").replace(/^\$+/, "").trim();
    return clean ? `$${clean}` : "Ask";
  };

  const currentIndex = () => Number((location.hash.match(/^#activity-(\d+)$/) || [])[1] || 0);
  const renderOptions = () => {
    if (!detail.classList.contains("active-detail")) return;
    const item = (window.currentSiteContent?.activities?.items || window.DEFAULT_SITE_CONTENT?.activities?.items || [])[currentIndex()] || {};
    const options = Array.isArray(item.priceOptions) && item.priceOptions.length
      ? item.priceOptions
      : [{ priceNote: item.priceNote || "", duration: item.duration || "", price: item.price || "" }];

    let chooser = rate.querySelector(".activity-price-chooser");
    if (!chooser) {
      chooser = document.createElement("div");
      chooser.className = "activity-price-chooser";
      rate.prepend(chooser);
    }
    chooser.innerHTML = `<strong class="activity-price-chooser-title">Select your price option</strong><div class="activity-price-choice-list">${options.map((option, index) => `<button type="button" class="activity-price-choice ${index === 0 ? "selected" : ""}" data-activity-price-option="${index}"><span>${String(option.priceNote || `Option ${index + 1}`)}</span><small>${String(option.duration || "Duration on request")}</small><b>${money(option.price)}</b></button>`).join("")}</div>`;

    const applyOption = (optionIndex) => {
      const option = options[optionIndex] || options[0];
      chooser.querySelectorAll(".activity-price-choice").forEach((button, index) => button.classList.toggle("selected", index === optionIndex));
      const priceHolder = document.getElementById("activityDetailPrice");
      const noteHolder = document.getElementById("activityDetailPriceNote");
      if (priceHolder) priceHolder.innerHTML = `<strong>${money(option.price)}</strong>`;
      if (noteHolder) noteHolder.textContent = [option.priceNote, option.duration].filter(Boolean).join(" · ");
      const whatsapp = document.getElementById("activityWhatsapp");
      if (whatsapp) {
        const base = whatsapp.href.split("&text=")[0];
        const message = `Hello, I would like to book ${item.title || "this activity"}: ${option.priceNote || "Selected option"}, ${option.duration || "duration on request"}, ${money(option.price)}.`;
        whatsapp.href = `${base}&text=${encodeURIComponent(message)}`;
      }
    };
    chooser.querySelectorAll("[data-activity-price-option]").forEach((button) => button.addEventListener("click", () => applyOption(Number(button.dataset.activityPriceOption))));
    applyOption(0);
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-activity-index]")) setTimeout(renderOptions, 80);
  });
  window.addEventListener("hashchange", () => setTimeout(renderOptions, 80));
  new MutationObserver(() => setTimeout(renderOptions, 0)).observe(detail, { attributes: true, attributeFilter: ["class"] });
  setTimeout(renderOptions, 250);
})();
