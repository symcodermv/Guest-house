(function () {
  "use strict";

  const root = document.documentElement;
  const cacheKey = "feealiBuddiesInn.siteContent.v1";
  const videoPattern = /\.(?:m3u8|mp4|webm|mov|m4v)(?:[?#].*)?$/i;
  const imagePattern = /\.(?:png|jpe?g|webp|gif|avif)(?:[?#].*)?$/i;
  let currentCover = "";
  let releaseTimer = 0;

  const clean = (value) => String(value || "").trim().replace(/^["']|["']$/g, "");

  const mediaItems = (content) => {
    const media = content && content.hero && content.hero.media;
    if (Array.isArray(media)) return media;
    return media ? [media] : [];
  };

  const imageFromItem = (item) => {
    if (!item) return "";
    if (typeof item === "string") {
      const url = clean(item);
      return imagePattern.test(url) && !videoPattern.test(url) ? url : "";
    }
    if (String(item.type || item.mediaType || "").toLowerCase().includes("video")) return "";
    const candidates = [
      item.image,
      item.posterPortrait,
      item.portraitPoster,
      item.mobilePoster,
      item.poster,
      item.landscapePoster,
      item.desktopPoster,
      item.url,
      item.src
    ];
    return candidates.map(clean).find((url) => url && !videoPattern.test(url)) || "";
  };

  const firstBackendImage = (content) => {
    for (const item of mediaItems(content)) {
      const image = imageFromItem(item);
      if (image) return image;
    }
    return "";
  };

  const cachedContent = () => {
    try {
      return JSON.parse(localStorage.getItem(cacheKey) || "null");
    } catch {
      return null;
    }
  };

  const showBackendCover = (content) => {
    const image = firstBackendImage(content);
    if (!image || image === currentCover) return Boolean(image);
    currentCover = image;
    root.style.setProperty("--backend-first-hero-image", `url("${image.replace(/"/g, "\\\"")}")`);
    root.classList.add("backend-hero-cover-ready");
    root.classList.remove("backend-hero-video-playing");
    return true;
  };

  const releaseCover = (video) => {
    if (!currentCover || !video || video.paused || video.readyState < 2) return;
    const mediaItem = video.closest(".hero-media-item");
    if (mediaItem && !mediaItem.classList.contains("active")) return;
    clearTimeout(releaseTimer);
    releaseTimer = window.setTimeout(() => {
      if (!video.paused && video.readyState >= 2) root.classList.add("backend-hero-video-playing");
    }, 180);
  };

  const activeVideo = () => {
    const holder = document.getElementById("heroMedia");
    if (!holder) return null;
    return holder.querySelector(".hero-media-item.active video") || holder.querySelector("video");
  };

  const bindVideos = () => {
    document.querySelectorAll("#heroMedia video").forEach((video) => {
      if (video.dataset.imageFirstBound) return;
      video.dataset.imageFirstBound = "true";
      video.addEventListener("playing", () => releaseCover(video));
      video.addEventListener("canplay", () => {
        const playAttempt = video.play();
        if (playAttempt && typeof playAttempt.catch === "function") playAttempt.catch(() => {});
        releaseCover(video);
      });
    });
    releaseCover(activeVideo());
  };

  showBackendCover(cachedContent());

  document.addEventListener("DOMContentLoaded", () => {
    bindVideos();
    const holder = document.getElementById("heroMedia");
    if (!holder) return;
    new MutationObserver(() => {
      showBackendCover(window.currentSiteContent || cachedContent());
      bindVideos();
    }).observe(holder, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "src"] });
  });

  window.addEventListener("storage", (event) => {
    if (event.key === cacheKey) showBackendCover(cachedContent());
  });
})();
