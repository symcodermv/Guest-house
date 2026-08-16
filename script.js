

    const navLinks = document.getElementById("navLinks");
    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const siteNav = document.querySelector(".site-nav");
    const updateNavScrollState = () => {
      if (siteNav) siteNav.classList.toggle("scrolled", window.scrollY > 12);
    };
    updateNavScrollState();
    window.addEventListener("scroll", updateNavScrollState, { passive: true });
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const isReloadNavigation = (() => {
      const navEntry = performance.getEntriesByType?.("navigation")?.[0];
      return navEntry?.type === "reload";
    })();
    if (isReloadNavigation && window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    const forceHeroOnReload = () => {
      if (!isReloadNavigation) return;
      document.body.classList.remove("detail-mode", "menu-open");
      document.querySelectorAll(".active-detail").forEach((section) => section.classList.remove("active-detail"));
      document.getElementById("roomDetail")?.classList.remove("active");
      if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }), 80);
      setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }), 260);
    };
    const aboutSection = document.getElementById("about");
    const roomsSection = document.getElementById("rooms");
    const travelSection = document.getElementById("travel");
    const travelPageSection = document.getElementById("travelPage");
    const activitiesSection = document.getElementById("activities");
    const gallerySection = document.getElementById("gallery");
    const islandSection = document.getElementById("island");
    const diningSection = document.getElementById("dining");
    if (aboutSection && roomsSection && travelSection && activitiesSection && gallerySection && islandSection && diningSection) {
      aboutSection.after(roomsSection);
      roomsSection.after(activitiesSection);
      activitiesSection.after(islandSection);
      islandSection.after(gallerySection);
      islandSection.after(diningSection);
      diningSection.after(travelSection);
      if (travelPageSection) travelSection.after(travelPageSection);
    }
    const renderIcons = () => {
      if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
        return true;
      }
      if (!window.__lucideRetry) {
        let tries = 0;
        window.__lucideRetry = window.setInterval(() => {
          tries += 1;
          if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
            window.clearInterval(window.__lucideRetry);
            window.__lucideRetry = null;
          } else if (tries > 25) {
            window.clearInterval(window.__lucideRetry);
            window.__lucideRetry = null;
          }
        }, 120);
      }
      return false;
    };
    const SITE_CONTENT_CACHE_KEY = "feealiBuddiesInn.siteContent.v1";
    const readCachedSiteContent = () => {
      try {
        const cached = localStorage.getItem(SITE_CONTENT_CACHE_KEY);
        return cached ? JSON.parse(cached) : null;
      } catch {
        return null;
      }
    };
    const writeCachedSiteContent = (content) => {
      try {
        localStorage.setItem(SITE_CONTENT_CACHE_KEY, JSON.stringify(content));
      } catch {}
    };
    const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
    const cleanText = (value) => String(value ?? "").trim();
    const parseMoney = (value) => {
      const match = cleanText(value).replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
      return match ? Number(match[1]) : null;
    };
    const formatDollar = (amount) => {
      if (!Number.isFinite(amount)) return "";
      const rounded = Math.round(amount * 100) / 100;
      return `$${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(2)}`;
    };
    const getDiscountPercent = (item = {}) => {
      const percent = Number(cleanText(item.discountPercent || item.offerPercent).replace("%", ""));
      return Number.isFinite(percent) && percent > 0 ? Math.min(percent, 95) : 0;
    };
    const getRegularPrice = (item = {}) => {
      const amount = parseMoney(item.price);
      return amount !== null ? formatDollar(amount) : cleanText(item.price);
    };
    const getOfferPrice = (item = {}) => {
      const percent = getDiscountPercent(item);
      const regularAmount = parseMoney(item.price);
      if (percent && regularAmount !== null) return formatDollar(regularAmount * (1 - percent / 100));
      const fallbackAmount = parseMoney(item.offerPrice || item.discountPrice);
      return fallbackAmount !== null ? formatDollar(fallbackAmount) : cleanText(item.offerPrice || item.discountPrice);
    };
    const getDisplayPrice = (item = {}) => getOfferPrice(item) || getRegularPrice(item) || "Ask";
    const renderPriceMarkup = (item = {}) => {
      const offer = getOfferPrice(item);
      const regular = getRegularPrice(item);
      const percent = getDiscountPercent(item);
      const label = percent ? `${percent}% OFF` : cleanText(item.offerLabel || item.discountLabel || "Offer");
      if (offer) {
        return `<strong>${escapeHtml(offer)}</strong>${regular ? `<del>${escapeHtml(regular)}</del>` : ""}<em>${escapeHtml(label)}</em>`;
      }
      return `<strong>${escapeHtml(regular || "Ask")}</strong>`;
    };
    const mergeContent = (base, remote) => {
      if (!remote || typeof remote !== "object") return base;
      const output = Array.isArray(base) ? [...base] : { ...base };
      Object.keys(remote).forEach((key) => {
        if (remote[key] && typeof remote[key] === "object" && !Array.isArray(remote[key]) && base[key]) {
          output[key] = mergeContent(base[key], remote[key]);
        } else {
          output[key] = remote[key];
        }
      });
      return output;
    };
    const mergeList = (defaults = [], remote = []) => {
      const remoteList = Array.isArray(remote) ? remote : [];
      const length = Math.max(defaults.length, remoteList.length);
      return Array.from({ length }, (_, index) => mergeContent(defaults[index] || {}, remoteList[index] || {}));
    };
    const toPhoto = (item, fallbackAlt = "Feeali Buddies Inn photo") => {
      if (!item) return null;
      if (typeof item === "string") return { image: item, alt: fallbackAlt };
      if (item.image) return { image: item.image, alt: item.alt || item.title || fallbackAlt };
      return null;
    };
    const uniquePhotos = (items = [], fallbackAlt = "Feeali Buddies Inn photo") => {
      const seen = new Set();
      return items.map((item) => toPhoto(item, fallbackAlt)).filter((photo) => {
        if (!photo?.image || seen.has(photo.image)) return false;
        seen.add(photo.image);
        return true;
      });
    };
    const renderMovingStrip = (id, photos = [], fallbackAlt = "Feeali Buddies Inn photo") => {
      const strip = document.getElementById(id);
      if (!strip) return;
      const cleanPhotos = uniquePhotos(photos, fallbackAlt);
      if (!cleanPhotos.length) {
        strip.innerHTML = "";
        strip.hidden = true;
        return;
      }
      strip.hidden = false;
      const loopPhotos = [...cleanPhotos, ...cleanPhotos, ...cleanPhotos];
      strip.innerHTML = `<div class="detail-moving-track">${loopPhotos.map((photo) => `<img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || fallbackAlt)}" />`).join("")}</div>`;
    };
    const renderTwoRowGallery = (id, photos = [], fallbackAlt = "Feeali Buddies Inn photo") => {
      const holder = document.getElementById(id);
      if (!holder) return;
      const cleanPhotos = uniquePhotos(photos, fallbackAlt);
      if (!cleanPhotos.length) {
        holder.innerHTML = "";
        return;
      }
      const firstRow = [...cleanPhotos, ...cleanPhotos];
      const secondRow = [...cleanPhotos].reverse();
      const secondLoop = [...secondRow, ...secondRow];
      holder.innerHTML = `
        <div class="detail-gallery-track">${firstRow.map((photo) => `<img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || fallbackAlt)}" />`).join("")}</div>
        <div class="detail-gallery-track reverse">${secondLoop.map((photo) => `<img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || fallbackAlt)}" />`).join("")}</div>`;
    };
    const renderOtherRoomsSlider = (id, rooms = [], currentIndex = 0) => {
      const holder = document.getElementById(id);
      if (!holder) return;
      const otherRooms = rooms
        .map((room, index) => ({ room, index }))
        .filter(({ room, index }) => index !== currentIndex && room?.image);
      if (!otherRooms.length) {
        holder.innerHTML = "";
        return;
      }
      const card = ({ room, index }) => `
        <button class="other-room" type="button" data-room-index="${index}">
          <img src="${escapeHtml(room.image)}" alt="${escapeHtml(room.title)}" />
          <div><strong>${escapeHtml(room.title)}</strong><span>${escapeHtml(getDisplayPrice(room))} per night</span></div>
        </button>`;
      holder.innerHTML = otherRooms.map(card).join("");
    };
    let roomsSuiteTimer;
    const setupRoomsSuiteAnimation = () => {
      clearInterval(roomsSuiteTimer);
      const stage = document.querySelector("[data-rooms-suite-stage]");
      if (!stage) return;
      const cards = [...stage.querySelectorAll(".room-gallery-card")];
      if (!cards.length) return;
      let index = 0;
      const cycleCount = Math.max(...cards.map((card) => card.querySelectorAll("img").length), 1);
      roomsSuiteTimer = setInterval(() => {
        index = (index + 1) % cycleCount;
        cards.forEach((card, cardIndex) => {
          const imgs = [...card.querySelectorAll("img")];
          imgs.forEach((img) => img.classList.remove("active"));
          imgs[(index + cardIndex) % imgs.length]?.classList.add("active");
        });
      }, 4800);
    };
    let diningSuiteTimer;
    const setupDiningSuiteAnimation = () => {
      clearInterval(diningSuiteTimer);
      const stage = document.querySelector("[data-dining-suite-stage]");
      if (!stage) return;
      const cards = [...stage.querySelectorAll(".dining-gallery-card")];
      if (!cards.length) return;
      let index = 0;
      const cycleCount = Math.max(...cards.map((card) => card.querySelectorAll("img").length), 1);
      diningSuiteTimer = setInterval(() => {
        index = (index + 1) % cycleCount;
        cards.forEach((card, cardIndex) => {
          const imgs = [...card.querySelectorAll("img")];
          imgs.forEach((img) => img.classList.remove("active"));
          imgs[(index + cardIndex) % imgs.length]?.classList.add("active");
        });
      }, 4600);
    };

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value || "";
    };
    let heroMediaTimer;
    const DEFAULT_HERO_STOCK_IMAGE = "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2400&q=88";
    const DEFAULT_ROOM_IMAGE_PATTERNS = [
      "images.unsplash.com/photo-1566073771259",
      "images.unsplash.com/photo-1590490360182",
      "images.unsplash.com/photo-1611892440504",
      "images.unsplash.com/photo-1582719478250",
      "images.unsplash.com/photo-1584132967334",
      "images.unsplash.com/photo-1566665797739",
      "images.unsplash.com/photo-1596394516093"
    ];
    const cleanMediaUrl = (url = "") => {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = String(url || "").trim();
      return textarea.value.replace(/^["']|["']$/g, "").trim();
    };
    const BAD_HERO_MEDIA_VALUES = new Set(["FeealiBeach.MP4", "./FeealiBeach.MP4", "assets/FeealiBeach.MP4"]);
    const isBadHeroMediaUrl = (url = "") => {
      const cleanUrl = cleanMediaUrl(url);
      return !cleanUrl || BAD_HERO_MEDIA_VALUES.has(cleanUrl) || cleanUrl === DEFAULT_HERO_STOCK_IMAGE;
    };
    const isValidHeroMediaUrl = (url = "") => {
      const cleanUrl = cleanMediaUrl(url);
      if (isBadHeroMediaUrl(cleanUrl)) return false;
      return /^(https?:|data:|blob:|\/|\.\/|assets\/)/i.test(cleanUrl) ||
        /\.(m3u8|mp4|webm|mov|m4v|png|jpe?g|webp|gif|avif)(?:[?#].*)?$/i.test(cleanUrl);
    };
    const decodeMediaUrl = (url = "") => {
      const cleanUrl = cleanMediaUrl(url);
      try { return decodeURIComponent(cleanUrl); }
      catch { return cleanUrl; }
    };
    const heroLandscapeUrl = (item = {}) => {
      if (typeof item === "string") return cleanMediaUrl(item);
      return cleanMediaUrl(item?.url || item?.landscapeUrl || item?.desktopUrl || item?.landscapeMedia || item?.desktopMedia || item?.src || item?.image || item?.video || "");
    };
    const heroPortraitUrl = (item = {}) => {
      if (typeof item === "string") return "";
      return cleanMediaUrl(item?.portraitUrl || item?.mobileUrl || item?.portraitMedia || item?.mobileMedia || item?.portrait || item?.mobile || "");
    };
    const getHeroMediaUrl = (item) => {
      if (typeof item === "string") return cleanMediaUrl(item);
      return heroLandscapeUrl(item) || heroPortraitUrl(item) || cleanMediaUrl(item?.poster || item?.posterPortrait || "");
    };
    const isPortraitHero = () => (
      (window.matchMedia && window.matchMedia("(orientation: portrait)").matches) ||
      window.innerWidth <= 760
    );
    const getHeroMediaUrlForViewport = (item, preferPortrait = isPortraitHero(), allowFallback = true) => {
      if (typeof item === "string") return cleanMediaUrl(item);
      const landscapeUrl = heroLandscapeUrl(item);
      const portraitUrl = heroPortraitUrl(item);
      return preferPortrait ? (portraitUrl || (allowFallback ? landscapeUrl : "")) : (landscapeUrl || (allowFallback ? portraitUrl : ""));
    };
    const getResponsiveHeroMediaUrl = (item, allowFallback = true) => {
      if (typeof item === "string") return cleanMediaUrl(item);
      return getHeroMediaUrlForViewport(item, isPortraitHero(), allowFallback);
    };
    const getResponsiveHeroPoster = (item) => {
      if (typeof item === "string") return "";
      return cleanMediaUrl(isPortraitHero()
        ? (item?.posterPortrait || item?.portraitPoster || item?.mobilePoster || item?.poster || "")
        : (item?.poster || item?.landscapePoster || item?.desktopPoster || ""));
    };
    const keepHeroVideoAlive = (video) => {
      if (!video) return;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.controls = false;
      const tryPlay = () => video.play().catch(() => {});
      const recovery = () => {
        if (video.readyState < 2) video.load();
        tryPlay();
      };
      video.addEventListener("canplay", tryPlay, { once: true });
      video.addEventListener("stalled", recovery);
      video.addEventListener("waiting", () => setTimeout(recovery, 900));
      video.addEventListener("error", recovery);
      requestAnimationFrame(tryPlay);
      setTimeout(() => {
        if (video.paused || video.readyState < 2) recovery();
      }, 900);
    };
    const isCustomHeroMedia = (item) => isValidHeroMediaUrl(getHeroMediaUrl(item));
    const isLegacyDefaultHeroMedia = (item) => (
      item?.url === "FeealiBeach.MP4" &&
      item?.portraitUrl === "FeealiBeach.MP4" &&
      item?.alt === "Feeali Buddies Inn hero video"
    );
    const toHeroMediaList = (media) => {
      if (Array.isArray(media)) {
        const entries = media.filter((item) => item && (
          (typeof item === "string" && isValidHeroMediaUrl(item)) ||
          (typeof item === "object" && isCustomHeroMedia(item))
        ));
        if (entries.length) return entries;
        return getHeroMediaUrl(media) ? [{ ...media }] : [];
      }
      if (typeof media === "string") return isValidHeroMediaUrl(media) ? [media] : [];
      if (media && typeof media === "object") return getHeroMediaUrl(media) ? [media] : [];
      return [];
    };
    const isDefaultRoomImage = (url = "") => DEFAULT_ROOM_IMAGE_PATTERNS.some((pattern) => String(url).includes(pattern));
    const clampNumber = (value, min, max, fallback) => {
      const number = Number(value);
      if (!Number.isFinite(number)) return fallback;
      return Math.min(max, Math.max(min, number));
    };
    const getHeroCropStyle = (item = {}) => {
      const portrait = isPortraitHero();
      const focusX = clampNumber(portrait ? item.mobileFocusX ?? item.focusX : item.focusX, 0, 100, 50);
      const focusY = clampNumber(portrait ? item.mobileFocusY ?? item.focusY : item.focusY, 0, 100, 50);
      const zoom = clampNumber(portrait ? item.mobileZoom ?? item.zoom : item.zoom, 1, 4, 1);
      const rotate = clampNumber(portrait ? item.mobileRotate ?? item.rotate : item.rotate, -270, 270, 0);
      return `--hero-focus-x:${focusX}%;--hero-focus-y:${focusY}%;--hero-zoom:${zoom};--hero-rotate:${rotate}deg;--hero-fit:cover;`;
    };
    const isHlsUrl = (url = "") => {
      const cleanUrl = cleanMediaUrl(url).toLowerCase();
      return /\.m3u8(?:[?#].*)?$/.test(cleanUrl) || cleanUrl.includes(".m3u8?");
    };
    const isVideoUrl = (url = "") => {
      const cleanUrl = decodeMediaUrl(cleanMediaUrl(url)).toLowerCase();
      const pathOnly = cleanUrl.split("?")[0].split("#")[0];
      return /\.(mp4|webm|mov|m4v)$/.test(pathOnly) ||
        /\.(mp4|webm|mov|m4v)(?:[?#]|$)/.test(cleanUrl) ||
        cleanUrl.includes("/videos/") ||
        cleanUrl.includes("contenttype=video");
    };
    const videoMimeForUrl = (url = "") => {
      const cleanUrl = decodeMediaUrl(cleanMediaUrl(url)).toLowerCase();
      if (/\.webm(?:[?#]|$)/.test(cleanUrl)) return "video/webm";
      if (/\.mov(?:[?#]|$)/.test(cleanUrl)) return "video/quicktime";
      if (/\.m4v(?:[?#]|$)/.test(cleanUrl)) return "video/x-m4v";
      return "video/mp4";
    };
    const attachHeroHls = (video, url) => {
      if (!video || !url) return;
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.load();
        return;
      }
      const setupHls = () => {
        if (window.Hls && window.Hls.isSupported()) {
          if (video._heroHls) video._heroHls.destroy();
          const hls = new window.Hls({
            enableWorker: true,
            lowLatencyMode: false,
            backBufferLength: 30
          });
          video._heroHls = hls;
          hls.loadSource(url);
          hls.attachMedia(video);
        } else {
          video.src = url;
          video.load();
        }
      };
      if (window.Hls) setupHls();
      else window.addEventListener("load", setupHls, { once: true });
    };
    const hasCustomRoomImage = (room = {}) => [
      room.image,
      ...((room.gallery || [])),
      ...((room.interiorImages || [])),
      ...((room.bathroomImages || []))
    ].some((url) => url && !isDefaultRoomImage(url));
    const renderHeroMedia = (media = [], fallbackImage = "", fallbackAlt = "Feeali Buddies Inn") => {
      const holder = document.getElementById("heroMedia");
      if (!holder) return;
      const heroEl = document.getElementById("home");
      clearInterval(heroMediaTimer);
      heroMediaTimer = null;
      holder.classList.add("video-waiting");
      holder.classList.remove("video-ready");
      const markHeroReady = () => {
        holder.classList.add("video-ready");
        holder.classList.remove("video-waiting");
      };
      const preferPortraitMedia = isPortraitHero();
      const preparedMedia = toHeroMediaList(media)
        .map((item) => {
          if (typeof item === "string") {
            const url = cleanMediaUrl(item);
            return { type: isHlsUrl(url) ? "hls" : isVideoUrl(url) ? "video" : "image", url, alt: fallbackAlt };
          }
          const copy = item || {};
          const viewportUrl = getHeroMediaUrlForViewport(copy, preferPortraitMedia);
          const inferredType = isHlsUrl(viewportUrl) ? "hls" : isVideoUrl(viewportUrl) ? "video" : String(copy.type || "image").toLowerCase();
          return { ...copy, type: inferredType };
        })
        .filter((item) => isCustomHeroMedia(item) && !isLegacyDefaultHeroMedia(item));
      const cleanMedia = preparedMedia.filter((item) =>
        isValidHeroMediaUrl(getHeroMediaUrlForViewport(item, preferPortraitMedia, true))
      );
      let slides = cleanMedia;
      if (!slides.length && fallbackImage && fallbackImage !== DEFAULT_HERO_STOCK_IMAGE) {
        const fallbackType = isHlsUrl(fallbackImage) ? "hls" : isVideoUrl(fallbackImage) ? "video" : "image";
        slides = [{ type: fallbackType, url: fallbackImage, alt: fallbackAlt }];
      }
      if (!slides.length) {
        holder.innerHTML = "";
        holder.style.backgroundImage = "";
        heroEl?.classList.remove("has-hero-media");
        markHeroReady();
        return;
      }
      heroEl?.classList.add("has-hero-media");
      const firstPreview = (() => {
        const first = slides[0] || {};
        const url = getResponsiveHeroMediaUrl(first);
        const poster = getResponsiveHeroPoster(first);
        const typeValue = String(first.type || "").toLowerCase();
        const isVideo = typeValue.includes("video") || typeValue.includes("hls") || isVideoUrl(url) || isHlsUrl(url);
        return poster || (!isVideo ? url : "");
      })();
      // Do not put the default hero image behind a video; it can become visible
      // around the video while its first frame is loading.
      holder.style.backgroundImage = firstPreview ? `url("${firstPreview.replace(/"/g, "%22")}")` : "none";
      markHeroReady();
      holder.innerHTML = slides.map((item, index) => {
        const rawUrl = getResponsiveHeroMediaUrl(item);
        if (!isValidHeroMediaUrl(rawUrl)) return "";
        const typeValue = String(item.type || "").toLowerCase();
        const hls = typeValue === "hls" || typeValue.includes("hls") || isHlsUrl(rawUrl);
        const type = typeValue === "video" || typeValue.includes("video") || hls || isVideoUrl(rawUrl) ? "video" : "image";
        const alt = escapeHtml(item.alt || fallbackAlt);
        const url = escapeHtml(rawUrl);
        const posterUrl = getResponsiveHeroPoster(item);
        const poster = posterUrl ? ` poster="${escapeHtml(posterUrl)}"` : "";
        const cropStyle = escapeHtml(getHeroCropStyle(item));
        const start = 0;
        const end = 0;
        if (type === "video") {
          const hlsAttr = hls ? ` data-hls="${url}"` : "";
          const source = hls ? "" : `<source src="${url}" type="${escapeHtml(videoMimeForUrl(rawUrl))}">`;
          const srcAttr = hls ? "" : ` src="${url}"`;
          return `<div class="hero-media-item ${item.manualHeroVideo ? "manual-hero-video" : ""} ${index === 0 ? "active" : ""}" style="${cropStyle}"><video${srcAttr} muted playsinline webkit-playsinline autoplay preload="${index === 0 ? "auto" : "metadata"}" data-start="${start}" data-end="${end}"${hlsAttr}${poster}>${source}</video></div>`;
        }
        return `<div class="hero-media-item ${index === 0 ? "active" : ""}" style="${cropStyle}"><img src="${url}" alt="${alt}" loading="${index === 0 ? "eager" : "lazy"}" ${index === 0 ? 'fetchpriority="high"' : ""} /></div>`;
      }).join("");
      const renderedSlides = [...holder.querySelectorAll(".hero-media-item")];
      const activateNextHeroSlide = (currentSlide) => {
        const currentIndex = renderedSlides.indexOf(currentSlide);
        const nextSlide = renderedSlides.find((slide, index) => index !== currentIndex && slide.isConnected);
        if (!nextSlide) {
          currentSlide?.remove();
          markHeroReady();
          return;
        }
        currentSlide?.classList.remove("active");
        nextSlide.classList.add("active");
        markHeroReady();
      };
      holder.querySelectorAll("img").forEach((image, index) => {
        const slide = image.closest(".hero-media-item");
        const readyImage = () => {
          if (index === 0 || slide?.classList.contains("active")) markHeroReady();
        };
        image.addEventListener("load", readyImage, { once: true });
        image.addEventListener("error", () => activateNextHeroSlide(slide), { once: true });
        if (image.complete && image.naturalWidth > 0) readyImage();
        if (index === 0) setTimeout(markHeroReady, 700);
      });
      holder.querySelectorAll("video").forEach((video, index) => {
        if (video.dataset.hls) attachHeroHls(video, video.dataset.hls);
        video.addEventListener("error", () => {
          const slide = video.closest(".hero-media-item");
          if (renderedSlides.length > 1) activateNextHeroSlide(slide);
          else markHeroReady();
        }, { once: true });
        if (index === 0) {
          video.addEventListener("playing", markHeroReady, { once: true });
          video.addEventListener("canplay", markHeroReady, { once: true });
          video.addEventListener("loadeddata", markHeroReady, { once: true });
          video.addEventListener("loadedmetadata", markHeroReady, { once: true });
          if (video.readyState >= 2) markHeroReady();
          if (renderedSlides.length > 1) video.play().catch(() => {});
          else {
            video.loop = true;
            keepHeroVideoAlive(video);
          }
          setTimeout(markHeroReady, 500);
        }
      });
      if (renderedSlides.length > 1) {
        let activeIndex = 0;
        const showSlide = (nextIndex) => {
          clearTimeout(heroMediaTimer);
          const previousVideo = renderedSlides[activeIndex]?.querySelector("video");
          if (previousVideo) previousVideo.pause();
          renderedSlides[activeIndex]?.classList.remove("active");
          activeIndex = nextIndex % renderedSlides.length;
          const activeSlide = renderedSlides[activeIndex];
          activeSlide.classList.add("active");
          const video = activeSlide.querySelector("video");
          if (video) {
            video.loop = false;
            video.currentTime = Number(video.dataset.start || 0) || 0;
            video.play().catch(() => {});
          } else {
            heroMediaTimer = setTimeout(() => showSlide(activeIndex + 1), 6000);
          }
        };
        renderedSlides.forEach((slide, index) => {
          const video = slide.querySelector("video");
          if (video) video.addEventListener("ended", () => {
            if (index === activeIndex) showSlide(activeIndex + 1);
          });
        });
        showSlide(0);
      }
    };
    const renderReadingText = (id, text = "", options = {}) => {
      const el = document.getElementById(id);
      if (!el) return;
      const baseDelay = Number(options.baseDelay || 0.18);
      const step = Number(options.step || 0.16);
      const className = options.className || "intro-reading-line";
      const parts = String(text)
        .split(options.splitter || /(?<=,)|(?<=\.)\s+/)
        .map((part) => part.trim())
        .filter(Boolean);
      el.innerHTML = parts.map((part, index) => (
        `<span class="${className}" style="animation-delay:${(baseDelay + index * step).toFixed(2)}s">${escapeHtml(part)}</span>`
      )).join("");
    };

    const applyContent = (content) => {
      const c = mergeContent(window.DEFAULT_SITE_CONTENT, content);
      c.hero.badge = "Slow island days";
      c.hero.titleLines = ["Real Maldivian Life"];
      c.hero.text = "Sandy palm-shaded lanes, home-cooked meals, blue lagoons, and sunset trips from a welcoming guest house in F. Feeali.";
      const defaultHeroMedia = toHeroMediaList(window.DEFAULT_SITE_CONTENT.hero.media);
      const firebaseHeroImages = toHeroMediaList(c.hero.media).filter((item) => {
        const landscapeUrl = getHeroMediaUrlForViewport(item, false);
        const portraitUrl = getHeroMediaUrlForViewport(item, true);
        const typeValue = String(item?.type || "").toLowerCase();
        const videoMedia = typeValue.includes("video") || typeValue.includes("hls") ||
          isVideoUrl(landscapeUrl) || isVideoUrl(portraitUrl) ||
          isHlsUrl(landscapeUrl) || isHlsUrl(portraitUrl);
        return !videoMedia && isCustomHeroMedia(item) && !isLegacyDefaultHeroMedia(item);
      });
      // Always play the local video first, followed by Firebase hero images.
      c.hero.media = [...defaultHeroMedia, ...firebaseHeroImages];
      const incomingRooms = content && content !== window.DEFAULT_SITE_CONTENT && Array.isArray(content.rooms?.items) ? content.rooms.items : [];
      c.rooms.items = incomingRooms.filter((room) => room && hasCustomRoomImage(room));
      c.activities.items = mergeList(window.DEFAULT_SITE_CONTENT.activities.items, c.activities.items);
      const pdfActivityPrices = {
        "Morning Fishing": "$120",
        "Night Fishing": "$120",
        "Snorkeling Trip": "$250",
        "Island Excursion": "$180",
        "Sandbank Trip": "$100"
      };
      c.activities.items.forEach((activity) => {
        if (pdfActivityPrices[activity.title]) activity.price = pdfActivityPrices[activity.title];
      });
      const sharkPointActivity = window.DEFAULT_SITE_CONTENT.activities.items.find((activity) => activity.title === "Shark Point to V. Atoll");
      if (sharkPointActivity && !c.activities.items.some((activity) => activity.title === "Shark Point to V. Atoll")) {
        c.activities.items.push(sharkPointActivity);
      }
      c.travel.routes = mergeList(window.DEFAULT_SITE_CONTENT.travel.routes, c.travel?.routes);
      c.travel.speedboats = Array.isArray(c.travel?.speedboats) ? c.travel.speedboats : [];
      c.island.sliderImages = mergeList(window.DEFAULT_SITE_CONTENT.island.sliderImages, c.island.sliderImages);
      document.title = `${c.site.name} | Guest House in ${c.site.island}`;
      document.documentElement.style.setProperty("--hero-image", `url("${c.site.heroImage || 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2400&q=88'}")`);
      document.documentElement.style.setProperty("--island-image", `url("${c.island.image}")`);
      document.documentElement.style.setProperty("--activities-bg-image", `url("${c.activities.backgroundImage || c.activities.items?.[0]?.image || c.site.heroImage}")`);
      document.documentElement.style.setProperty("--activities-bg-opacity", c.activities.backgroundOpacity || "0.18");
      document.documentElement.style.setProperty("--footer-bg-image", `url("${c.contact.footerBackgroundImage || c.site.heroImage}")`);
      document.documentElement.style.setProperty("--footer-bg-opacity", c.contact.footerBackgroundOpacity || "0.22");
      document.documentElement.style.setProperty("--menu-image", `url("${c.site.menuImage || c.site.heroImage}")`);
      document.documentElement.style.setProperty("--menu-opacity", c.site.menuOpacity || "0.78");
      const travelImages = c.travel.backgroundImages?.length ? c.travel.backgroundImages : window.DEFAULT_SITE_CONTENT.travel.backgroundImages;
      document.getElementById("travel").style.setProperty("--travel-bg-one", `url("${travelImages[0] || c.site.heroImage}")`);
      document.getElementById("travel").style.setProperty("--travel-bg-two", `url("${travelImages[1] || travelImages[0] || c.site.heroImage}")`);
      document.getElementById("travel").style.setProperty("--travel-bg-three", `url("${travelImages[2] || travelImages[0] || c.site.heroImage}")`);
      document.getElementById("travel").style.setProperty("--travel-bg-opacity", c.travel.backgroundOpacity || "0.82");
      document.querySelectorAll("[data-brand-name]").forEach((el) => { el.textContent = c.site.name; });
      setText("heroBadge", c.hero.badge);
      renderHeroMedia(c.hero.media, "", c.site.name);
      document.getElementById("heroTitle").innerHTML = `
        <span class="desktop-break">${c.hero.titleLines.map((line) => `<span>${escapeHtml(line)}</span>`).join("")}</span>
        <span class="mobile-break">${c.hero.titleLines.map((line) => `<span>${escapeHtml(line)}</span>`).join("")}</span>`;
      setText("heroText", c.hero.text);
      setText("bookingTitle", c.hero.bookingTitle);
      setText("bookingText", c.hero.bookingText);
      setText("bookingNote", c.hero.bookingNote);
      document.getElementById("heroFacts").innerHTML = c.hero.facts.map((item) => `<div class="fact"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.text)}</span></div>`).join("");

      setText("aboutEyebrow", c.about.eyebrow);
      renderReadingText("aboutTitle", c.about.title, { baseDelay: 0.18, step: 0.17, splitter: /(?<=,)|(?<=\.)\s+/ });
      renderReadingText("aboutText", c.about.text, { baseDelay: 0.92, step: 0.14, splitter: /(?<=,)|(?<=\.)\s+/ });
      document.getElementById("amenitiesGrid").innerHTML = c.about.amenities.map((item, index) => `
        <article class="experience ${item.image ? "" : "no-photo"}">
          ${item.image ? `<div class="experience-photo"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" /></div>` : ""}
          <div class="experience-body">
            <span class="experience-icon"><i data-lucide="${escapeHtml(item.icon || "sparkles")}" class="icon"></i></span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.text)}</p>
            <span class="experience-link">Explore</span>
          </div>
        </article>`).join("");

      setText("travelEyebrow", c.travel.eyebrow);
      setText("travelTitle", c.travel.title);
      setText("travelText", c.travel.text);
      document.getElementById("travelOptions").innerHTML = (c.travel.routes || []).map((route, index) => `
        <button class="travel-option ${index === 0 ? "active" : ""}" type="button" data-travel-route="${escapeHtml(route.key || (index === 1 ? "velana-maamigili" : "male-feeali"))}" style="--travel-card-image:url('${escapeHtml(route.image || travelImages[index % travelImages.length] || c.site.heroImage)}')">
          <span><i data-lucide="${escapeHtml(route.icon || "ship")}" class="icon"></i></span>
          <div><strong>${escapeHtml(route.title)}</strong><small>${escapeHtml(route.text)}</small></div>
          <em class="price-pill">${escapeHtml(route.price || "")}</em>
        </button>`).join("");

      setText("roomsEyebrow", c.rooms.eyebrow);
      setText("roomsTitle", c.rooms.title);
      setText("roomsText", c.rooms.text);
      const room = (c.rooms.items || []).find((item) => item?.image || item?.gallery?.length || item?.interiorImages?.length || item?.bathroomImages?.length);
      const roomPhotos = room ? uniquePhotos([
        { image: room.image, alt: room.title || "Room" },
        ...((room.gallery || []).map((image) => ({ image, alt: room.title || "Room" }))),
        ...((room.interiorImages || []).map((image) => ({ image, alt: `${room.title || "Room"} interior` }))),
        ...((room.bathroomImages || []).map((image) => ({ image, alt: `${room.title || "Room"} bathroom` })))
      ], "Room photo") : [];
      const roomVideoPhotos = roomPhotos.length
        ? Array.from({ length: Math.max(15, roomPhotos.length * 3) }, (_, index) => roomPhotos[index % roomPhotos.length])
        : (room?.image ? Array.from({ length: 15 }, () => ({ image: room.image, alt: room.title || "Room" })) : []);
      const roomPanelTitles = ["Room Escape", "Interior", "Comfort", "Details", "Island Rest"];
      const roomPanelHtml = roomPanelTitles.map((title, panelIndex) => {
        const panelPhotos = Array.from({ length: 3 }, (_, imageIndex) => roomVideoPhotos[(panelIndex + imageIndex) % roomVideoPhotos.length]);
        return `
          <article class="room-gallery-card ${panelIndex === 0 ? "large" : ""}">
            ${panelPhotos.map((photo, imageIndex) => `<img class="${imageIndex === 0 ? "active" : ""}" src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || title)}" />`).join("")}
          </article>`;
      }).join("");
      document.getElementById("roomsGrid").innerHTML = room ? `
        <button class="single-room-card" type="button" data-room-index="0" aria-label="View room details">
          <div class="single-room-hero" data-rooms-suite-stage>
            <div class="single-room-slides">
              ${roomPanelHtml}
            </div>
            <div class="single-room-copy">
              <h3>${escapeHtml(room.title || "Rooms")}</h3>
              <p>${escapeHtml(room.text || room.detailText || c.rooms.text || "")}</p>
              <span class="room-link">View room details <i data-lucide="arrow-right" class="icon"></i></span>
            </div>
          </div>
        </button>` : "";
      setupRoomsSuiteAnimation();
      renderRoomsPage(c);

      setText("diningEyebrow", c.dining.eyebrow);
      setText("diningTitle", c.dining.title);
      setText("diningText", c.dining.text);
      document.getElementById("diningItems").innerHTML = c.dining.items.map((item) => `<div class="dining-item"><span><i data-lucide="${escapeHtml(item.icon || "utensils")}" class="icon"></i></span>${escapeHtml(item.text)}</div>`).join("");
      const diningPhotos = uniquePhotos(
        (c.dining.photos && c.dining.photos.length ? c.dining.photos : window.DEFAULT_SITE_CONTENT.dining.photos) || [],
        "Restaurant photo"
      );
      const diningPanelPhotos = diningPhotos.length
        ? Array.from({ length: 5 }, (_, index) => diningPhotos[index % diningPhotos.length])
        : [{ image: c.site.heroImage, alt: "Restaurant photo" }];
      const diningPanelHtml = diningPanelPhotos.map((photo, panelIndex) => `
        <article class="dining-gallery-card ${panelIndex === 0 ? "large" : ""}">
          <img class="active" src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || "Restaurant photo")}" />
          ${panelIndex === 0 ? `<div class="dining-card-copy"><h3>${escapeHtml(c.dining.eyebrow || "Restaurant")}</h3><p>${escapeHtml(c.dining.featureText || c.dining.text || "")}</p><span class="room-link">View restaurant details <i data-lucide="arrow-right" class="icon"></i></span></div>` : ""}
        </article>`).join("");
      document.getElementById("diningMosaic").innerHTML = `
        <button class="dining-suite-stage" type="button" data-open-restaurant aria-label="View restaurant details">
          ${diningPanelHtml}
        </button>
      `;
      renderRestaurantDetail(c);

      setText("islandEyebrow", c.island.eyebrow);
      setText("islandTitle", c.island.title);
      setText("islandText", c.island.text);
      const islandSlides = c.island.sliderImages?.length ? c.island.sliderImages : [{ image: c.island.image, alt: c.island.title }];
      document.getElementById("islandBgSlider").innerHTML = islandSlides.slice(0, 4).map((photo) => `<img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || "F. Feeali experience")}" />`).join("");
      document.getElementById("islandPoints").innerHTML = c.island.points.map((item, index) => `<button class="island-point" type="button" data-island-experience="${index}" aria-label="Open ${escapeHtml(item.text)} gallery"><i data-lucide="${escapeHtml(item.icon || "waves")}" class="icon"></i><strong>${escapeHtml(item.text)}</strong><span class="island-point-arrow"><i data-lucide="arrow-right" class="icon"></i></span></button>`).join("");

      setText("activitiesEyebrow", c.activities.eyebrow);
      setText("activitiesTitle", c.activities.title);
      setText("activitiesText", c.activities.text);
      document.getElementById("activitiesGrid").innerHTML = (c.activities.items || []).map((item, index) => `
        <button class="activity-card" type="button" data-activity-index="${index}" aria-label="Discover ${escapeHtml(item.title)}">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />
          <div class="activity-card-copy">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.shortText)}</p>
            <div class="activity-price"><span class="price-stack">${renderPriceMarkup(item)}</span><span>${escapeHtml(item.priceNote)}</span></div>
            <span class="activity-discover">Discover more <i data-lucide="arrow-right" class="icon"></i></span>
          </div>
        </button>`).join("");
      setupActivityCarousel();

      setText("galleryEyebrow", c.gallery.eyebrow);
      setText("galleryTitle", c.gallery.title);
      setText("galleryText", c.gallery.text);
      const galleryImages = uniquePhotos(c.gallery.images || [], "Feeali Buddies Inn gallery");
      const galleryLoop = [...galleryImages, ...galleryImages];
      const galleryReverseLoop = [...galleryImages].reverse().concat([...galleryImages].reverse());
      document.getElementById("galleryStrip").innerHTML = `
        <div class="gallery-track">${galleryLoop.map((photo) => `<img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || "Gallery image")}" />`).join("")}</div>
        <div class="gallery-track reverse">${galleryReverseLoop.map((photo) => `<img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || "Gallery image")}" />`).join("")}</div>`;

      setText("reviewsEyebrow", c.reviews.eyebrow);
      setText("reviewsTitle", c.reviews.title);
      setText("reviewsText", c.reviews.text);
      const reviewItems = [...(c.reviews.items || []), ...(c.reviews.items || [])];
      document.getElementById("reviewsGrid").innerHTML = reviewItems.map((item) => `
        <article class="review-card">
          <div class="stars" aria-label="${escapeHtml(item.rating || 5)} stars">${Array.from({ length: Number(item.rating || 5) }, () => '<i data-lucide="star" class="icon"></i>').join("")}</div>
          <p>${escapeHtml(item.text)}</p>
          <h3>${escapeHtml(item.title)}</h3>
        </article>`).join("");

      setText("contactEyebrow", c.contact.eyebrow);
      setText("contactTitle", c.contact.title);
      setText("contactText", c.contact.text);
      setText("footerText", c.contact.footerText);
      const whatsappUrl = `https://wa.me/${String(c.site.whatsapp).replace(/\D/g, "")}`;
      document.getElementById("whatsappLink").href = whatsappUrl;
      const restaurantReserveWhatsapp = document.getElementById("restaurantReserveWhatsapp");
      if (restaurantReserveWhatsapp) {
        const restaurantMessage = encodeURIComponent(`Hello ${c.site.name}, I would like to reserve a table at your restaurant.`);
        restaurantReserveWhatsapp.href = `${whatsappUrl}?text=${restaurantMessage}`;
      }
      const footerEmail = document.getElementById("footerEmail");
      if (footerEmail) {
        footerEmail.href = `mailto:${c.contact.email || "feealibuddiesinn@gmail.com"}`;
        footerEmail.textContent = c.contact.email || "feealibuddiesinn@gmail.com";
      }
      const footerPhone = document.getElementById("footerPhone");
      if (footerPhone) {
        footerPhone.href = `tel:+${String(c.site.whatsapp).replace(/\D/g, "")}`;
        footerPhone.textContent = c.site.phoneDisplay;
      }
      document.getElementById("facebookLink").href = c.contact.facebookUrl || "#";
      document.getElementById("instagramLink").href = c.contact.instagramUrl || "#";
      document.getElementById("tiktokLink").href = c.contact.tiktokUrl || "#";
      document.getElementById("contactCard").innerHTML = `
        <div class="contact-row"><span><i data-lucide="map-pin" class="icon"></i></span><div><strong>Location</strong><p>${escapeHtml(c.contact.location)}</p></div></div>
        <div class="contact-row"><span><i data-lucide="phone" class="icon"></i></span><div><strong>Phone / WhatsApp</strong><a href="${whatsappUrl}" target="_blank" rel="noopener">${escapeHtml(c.site.phoneDisplay)}</a></div></div>
        <div class="contact-row"><span><i data-lucide="ship" class="icon"></i></span><div><strong>Travel Support</strong><p>${escapeHtml(c.contact.travelText)}</p></div></div>`;

      window.currentSiteContent = c;
      document.body.classList.remove("site-loading");
      renderRoomDetailFromHash();
      if (isReloadNavigation) {
        requestAnimationFrame(forceHeroOnReload);
      } else if (!window.location.hash) {
        requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
      }
      renderIcons();
    };

    const renderRoomsPage = (content = window.currentSiteContent || window.DEFAULT_SITE_CONTENT) => {
      const rooms = content.rooms?.items || [];
      const sliderImages = content.rooms?.sliderImages?.length
        ? content.rooms.sliderImages
        : rooms.map((room) => ({ image: room.image, alt: room.title })).filter((item) => item.image);
      document.getElementById("roomsHeroSlider").innerHTML = sliderImages.slice(0, 4).map((photo) => `<img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || "Room photo")}" />`).join("");
      renderMovingStrip("roomsMovingStrip", [], "Room photo");
      setText("roomsPageTitle", content.rooms?.title || "Rooms & Suites");
      setText("roomsPageText", content.rooms?.text || "");
      const room = rooms[0] || {};
      const interiorImages = room.interiorImages?.length ? room.interiorImages : (room.gallery || []).slice(0, 4);
      const bathroomImages = room.bathroomImages?.length ? room.bathroomImages : (room.gallery || []).slice(4, 8);
      document.getElementById("roomsShowcaseGrid").innerHTML = `
        <article class="rooms-showcase-card">
          <img src="${escapeHtml(room.image || sliderImages[0]?.image || "")}" alt="${escapeHtml(room.title || "Room")}" />
          <div class="rooms-showcase-copy">
            <span class="room-price">${renderPriceMarkup(room)}</span>
            <h3>${escapeHtml(room.title || "Our Rooms")}</h3>
            <p>${escapeHtml(room.detailText || room.text || content.rooms?.text || "")}</p>
            <div class="comfort-grid">${(room.features || []).slice(0, 4).map((feature) => `
              <div class="comfort-card">
                <i data-lucide="${escapeHtml(feature.icon || "sparkles")}" class="icon"></i>
                <strong>${escapeHtml(feature.title || "")}</strong>
                <span>${escapeHtml(feature.text || "")}</span>
              </div>`).join("")}</div>
            <div class="contact-actions">
              <a class="btn btn-primary" href="#room-0"><i data-lucide="arrow-right" class="icon"></i>View Details</a>
              <button class="btn btn-sun reserve-room-open" type="button"><i data-lucide="calendar-check" class="icon"></i>Reserve</button>
            </div>
          </div>
        </article>
        <section class="room-media-section">
          <span class="eyebrow">Interior Rooms</span>
          <h3>Soft beds, cool air, and calm room details.</h3>
          <p>Interior photos can be managed from backend room settings. Add bedroom, sitting area, window, desk, and detail images here.</p>
          <div class="room-media-grid">
            ${interiorImages.map((image, index) => `<img src="${escapeHtml(image)}" alt="${escapeHtml(room.title || "Room")} interior ${index + 1}" />`).join("")}
          </div>
        </section>
        <section class="room-media-section">
          <span class="eyebrow">Bathroom</span>
          <h3>Fresh bathroom spaces ready for every stay.</h3>
          <p>Bathroom images are managed separately in backend, so guests can clearly see the room and facilities before booking.</p>
          <div class="room-media-grid">
            ${bathroomImages.map((image, index) => `<img src="${escapeHtml(image)}" alt="${escapeHtml(room.title || "Room")} bathroom ${index + 1}" />`).join("")}
          </div>
        </section>`;
    };

    const showRoomsPage = () => {
      renderRoomsPage();
      document.body.classList.add("detail-mode");
      document.getElementById("roomsPage").classList.add("active-detail");
      document.getElementById("roomDetail").classList.remove("active", "active-detail");
      document.getElementById("restaurantDetail").classList.remove("active-detail");
      document.getElementById("activityDetail").classList.remove("active-detail");
      document.getElementById("travelPage").classList.remove("active-detail");
      document.getElementById("bookingPage").classList.remove("active-detail");
      document.getElementById("roomsPage").scrollIntoView({ behavior: "smooth", block: "start" });
      renderIcons();
    };

    const renderRoomDetail = (index = 0) => {
      const content = window.currentSiteContent || window.DEFAULT_SITE_CONTENT;
      const rooms = content.rooms?.items || [];
      const room = rooms[index] || rooms[0];
      if (!room) return;
      document.documentElement.style.setProperty("--room-detail-image", `url("${room.image}")`);
      document.body.classList.add("detail-mode");
      document.getElementById("roomsPage").classList.remove("active-detail");
      document.getElementById("roomDetail").classList.add("active");
      document.getElementById("roomDetail").classList.add("active-detail");
      document.getElementById("restaurantDetail").classList.remove("active-detail");
      document.getElementById("activityDetail").classList.remove("active-detail");
      document.getElementById("travelPage").classList.remove("active-detail");
      document.getElementById("bookingPage").classList.remove("active-detail");
      setText("roomDetailTag", "Rooms");
      setText("roomDetailTitle", room.title);
      setText("roomDetailText", room.detailText || room.text);
      document.getElementById("roomDetailPrice").innerHTML = renderPriceMarkup(room);
      setText("roomDetailNote", room.note || "Ask our team for availability, transfers, and meal plan options.");
      document.getElementById("roomComforts").innerHTML = (room.features || []).map((feature) => `
        <div class="comfort-card">
          <i data-lucide="${escapeHtml(feature.icon || "sparkles")}" class="icon"></i>
          <strong>${escapeHtml(feature.title)}</strong>
          <span>${escapeHtml(feature.text)}</span>
        </div>`).join("");
      const gallery = uniquePhotos([
        { image: room.image, alt: room.title },
        ...((room.gallery || []).map((image) => ({ image, alt: room.title }))),
        ...((room.interiorImages || []).map((image) => ({ image, alt: `${room.title || "Room"} interior` }))),
        ...((room.bathroomImages || []).map((image) => ({ image, alt: `${room.title || "Room"} bathroom` })))
      ], "Room photo");
      const roomGallery = document.getElementById("roomDetailGallery");
      roomGallery.classList.add("static-room-gallery");
      const activePhoto = gallery[0] || { image: room.image, alt: room.title || "Room photo" };
      roomGallery.innerHTML = `
        <div class="room-gallery-viewer">
          <div class="room-gallery-main">
            <img id="roomGalleryMainImage" src="${escapeHtml(activePhoto.image)}" alt="${escapeHtml(activePhoto.alt || "Room photo")}" />
          </div>
          <div class="room-gallery-thumbs" aria-label="Room image thumbnails">
            ${gallery.map((photo, photoIndex) => `
              <button class="room-thumb ${photoIndex === 0 ? "active" : ""}" type="button" data-room-photo="${escapeHtml(photo.image)}" data-room-photo-alt="${escapeHtml(photo.alt || "Room photo")}">
                <img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || "Room photo")}" />
              </button>`).join("")}
          </div>
        </div>`;
      const site = content.site || window.DEFAULT_SITE_CONTENT.site;
      const roomMessage = encodeURIComponent(`Hello ${site.name}, I want to check availability for ${room.title} (${getDisplayPrice(room)}).`);
      document.getElementById("roomWhatsapp").href = `https://wa.me/${String(site.whatsapp).replace(/\D/g, "")}?text=${roomMessage}`;
      renderIcons();
    };

    const renderRestaurantDetail = (content = window.currentSiteContent || window.DEFAULT_SITE_CONTENT) => {
      const dining = content.dining || window.DEFAULT_SITE_CONTENT.dining;
      const photos = uniquePhotos(dining.photos?.length ? dining.photos : window.DEFAULT_SITE_CONTENT.dining.photos, "Restaurant photo");
      const activePhoto = photos[0] || { image: content.site?.heroImage || window.DEFAULT_SITE_CONTENT.site.heroImage, alt: "Restaurant photo" };
      const galleryPhotos = photos.length ? photos : [activePhoto];
      document.documentElement.style.setProperty("--restaurant-detail-image", `url("${activePhoto.image}")`);
      setText("restaurantDetailEyebrow", dining.eyebrow || "Restaurant");
      setText("restaurantDetailTitle", dining.title || "Seaside Dining");
      setText("restaurantDetailText", dining.text || "");
      setText("restaurantFeatureTitle", dining.featureTitle || "Flavour Meets View");
      setText("restaurantFeatureText", dining.featureText || "");
      document.getElementById("restaurantMenuList").innerHTML = (dining.items || []).map((item) => `<li><i data-lucide="${escapeHtml(item.icon || "utensils")}" class="icon"></i><span>${escapeHtml(item.text)}</span></li>`).join("");
      const photoGrid = document.getElementById("restaurantPhotoGrid");
      photoGrid.classList.add("viewer-mode");
      photoGrid.innerHTML = `
        <div class="room-gallery-viewer restaurant-gallery-viewer" data-restaurant-gallery>
          <div class="room-gallery-main">
            <img id="restaurantGalleryMainImage" data-restaurant-main-photo src="${escapeHtml(activePhoto.image)}" alt="${escapeHtml(activePhoto.alt || "Restaurant photo")}" />
          </div>
          <div class="room-gallery-thumbs" aria-label="Restaurant image thumbnails">
            ${galleryPhotos.map((photo, photoIndex) => `
              <button class="room-thumb restaurant-thumb ${photoIndex === 0 ? "active" : ""}" type="button" data-restaurant-photo="${escapeHtml(photo.image)}" data-restaurant-photo-alt="${escapeHtml(photo.alt || "Restaurant photo")}">
                <img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || "Restaurant photo")}" />
              </button>`).join("")}
          </div>
        </div>`;
    };

    const showRestaurantDetail = () => {
      renderRestaurantDetail();
      document.body.classList.add("detail-mode");
      document.getElementById("roomsPage").classList.remove("active-detail");
      document.getElementById("roomDetail").classList.remove("active", "active-detail");
      document.getElementById("restaurantDetail").classList.add("active-detail");
      document.getElementById("activityDetail").classList.remove("active-detail");
      document.getElementById("travelPage").classList.remove("active-detail");
      document.getElementById("bookingPage").classList.remove("active-detail");
      document.getElementById("restaurantDetail").scrollIntoView({ behavior: "smooth", block: "start" });
      renderIcons();
    };

    const renderActivityDetail = (index = 0) => {
      const content = window.currentSiteContent || window.DEFAULT_SITE_CONTENT;
      const activities = content.activities?.items || [];
      const activity = activities[index] || activities[0];
      if (!activity) return;
      const gallery = activity.gallery?.length ? activity.gallery : [activity.image];
      document.documentElement.style.setProperty("--activity-detail-image", `url("${activity.image}")`);
      document.body.classList.add("detail-mode");
      document.getElementById("roomsPage").classList.remove("active-detail");
      document.getElementById("roomDetail").classList.remove("active", "active-detail");
      document.getElementById("restaurantDetail").classList.remove("active-detail");
      document.getElementById("activityDetail").classList.add("active-detail");
      document.getElementById("travelPage").classList.remove("active-detail");
      document.getElementById("bookingPage").classList.remove("active-detail");
      setText("activityDetailTag", "Ocean Adventure");
      setText("activityDetailTitle", activity.title);
      setText("activityDetailText", activity.detailText || activity.shortText);
      document.getElementById("activityDetailPrice").innerHTML = renderPriceMarkup(activity);
      setText("activityDetailPriceNote", activity.priceNote || "");
      const activityPhotos = uniquePhotos([
        { image: activity.image, alt: activity.title },
        ...gallery.map((image) => ({ image, alt: activity.title })),
        ...activities.filter((other, otherIndex) => otherIndex !== index).flatMap((other) => [{ image: other.image, alt: other.title }, ...(other.gallery || []).map((image) => ({ image, alt: other.title }))])
      ], "Activity photo").slice(0, 5);
      const activityGallery = document.getElementById("activityDetailGallery");
      activityGallery.classList.add("static-room-gallery");
      const activePhoto = activityPhotos[0] || { image: activity.image, alt: activity.title || "Activity photo" };
      activityGallery.innerHTML = `
        <div class="room-gallery-viewer">
          <div class="room-gallery-main">
            <img id="activityGalleryMainImage" src="${escapeHtml(activePhoto.image)}" alt="${escapeHtml(activePhoto.alt || "Activity photo")}" />
          </div>
          <div class="room-gallery-thumbs" aria-label="Activity image thumbnails">
            ${activityPhotos.map((photo, photoIndex) => `
              <button class="room-thumb activity-thumb ${photoIndex === 0 ? "active" : ""}" type="button" data-activity-photo="${escapeHtml(photo.image)}" data-activity-photo-alt="${escapeHtml(photo.alt || "Activity photo")}">
                <img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || "Activity photo")}" />
              </button>`).join("")}
          </div>
        </div>`;
      document.getElementById("activityDetailHighlights").innerHTML = (activity.highlights || []).map((item) => `<li><i data-lucide="${escapeHtml(item.icon || "sparkles")}" class="icon"></i><span><strong>${escapeHtml(item.title)}</strong><br>${escapeHtml(item.text)}</span></li>`).join("");
      const site = content.site || window.DEFAULT_SITE_CONTENT.site;
      const message = encodeURIComponent(`Hello ${site.name}, I want to book or ask about ${activity.title} (${getDisplayPrice(activity)}).`);
      document.getElementById("activityWhatsapp").href = `https://wa.me/${String(site.whatsapp).replace(/\D/g, "")}?text=${message}`;
      renderIcons();
    };

    let currentVisibleSpeedboats = [];

    const boatCardHtml = (boat, index = 0) => `
      <article class="boat-card">
        <div class="boat-card-image" style="--boat-image:url('${escapeHtml(boat.image)}')">
          ${boat.badge ? `<span class="status-pill">${escapeHtml(boat.badge)}</span>` : ""}
          <h5><span><i data-lucide="${escapeHtml(boat.icon)}" class="icon"></i></span>${escapeHtml(boat.title)}</h5>
        </div>
        <div class="boat-card-body">
          <p>${escapeHtml(boat.text)}</p>
          <div class="boat-meta">
            <div><span>Price</span><strong>${escapeHtml(boat.price)}</strong></div>
            <div><span>Arrival</span><strong>${escapeHtml(boat.time)}</strong></div>
            ${boat.contact ? `<div><span>Contact</span><strong>${escapeHtml(boat.contact)}</strong></div>` : ""}
          </div>
          <button class="btn btn-primary" type="button" data-boat-schedule="${index}"><i data-lucide="calendar-clock" class="icon"></i>${escapeHtml(boat.action || "Check Schedule")}</button>
        </div>
      </article>`;
    const oldDefaultSpeedboatTitles = new Set(["Public Speedboat", "Private Speedboat", "Group Speedboat", "Morning Speedboat", "Evening Speedboat", "Charter Launch"]);

    const getBoatTimes = (boat = {}) => {
      if (Array.isArray(boat.scheduleTimes) && boat.scheduleTimes.length) return boat.scheduleTimes;
      if (typeof boat.scheduleTimes === "string" && boat.scheduleTimes.trim()) return boat.scheduleTimes.split("\n").map((time) => time.trim()).filter(Boolean);
      return ["Morning schedule", "Afternoon schedule"];
    };

    const showBoatSchedule = (index = 0) => {
      const panel = document.getElementById("speedboatSchedulePanel");
      if (!panel) return;
      const boat = currentVisibleSpeedboats[index] || currentVisibleSpeedboats[0];
      if (!boat) return;
      const site = window.currentSiteContent?.site || window.DEFAULT_SITE_CONTENT.site;
      const dateValue = toDateValue(new Date());
      const times = getBoatTimes(boat);
      panel.classList.add("show");
      panel.innerHTML = `
        <div class="schedule-head">
          <div>
            <span class="eyebrow">Travel Schedule</span>
            <h4>${escapeHtml(boat.title || "Speed Boat Schedule")}</h4>
            <p>${escapeHtml(boat.scheduleNote || "Choose your travel date and preferred time. Our team will confirm the latest seats and weather-safe departure.")}</p>
          </div>
          <button class="schedule-close" type="button" data-close-schedule aria-label="Close schedule"><i data-lucide="x" class="icon"></i></button>
        </div>
        <div class="schedule-form">
          <div class="field"><label for="boatScheduleDate">Travel Date</label><div class="field-row"><i data-lucide="calendar" class="icon" aria-hidden="true"></i><input id="boatScheduleDate" type="date" min="${dateValue}" value="${dateValue}"></div></div>
          <div class="field"><label for="boatScheduleTime">Preferred Time</label><div class="field-row"><i data-lucide="clock" class="icon" aria-hidden="true"></i><select id="boatScheduleTime">${times.map((time) => `<option value="${escapeHtml(time)}">${escapeHtml(time)}</option>`).join("")}</select></div></div>
          <button class="btn btn-primary" type="button" data-request-boat-schedule="${index}"><i data-lucide="message-circle" class="icon"></i>Request Schedule</button>
        </div>
        <p class="schedule-note"><strong>Guide info:</strong> ${escapeHtml(boat.price || "Price on request")} / ${escapeHtml(boat.time || "arrival time to confirm")}. Final schedule depends on weather, seat availability, and your flight arrival time.</p>`;
      panel.scrollIntoView({ behavior: "smooth", block: "center" });
      renderIcons();
    };

    const requestBoatSchedule = (index = 0) => {
      const boat = currentVisibleSpeedboats[index] || currentVisibleSpeedboats[0];
      if (!boat) return;
      const site = window.currentSiteContent?.site || window.DEFAULT_SITE_CONTENT.site;
      const date = document.getElementById("boatScheduleDate")?.value || "";
      const time = document.getElementById("boatScheduleTime")?.value || "";
      const message = [
        `Hello ${site.name}, I want to check speedboat schedule.`,
        "",
        `Boat: ${boat.title || "Speed Boat"}`,
        `Travel date: ${date}`,
        `Preferred time: ${time}`,
        `Guide price: ${boat.price || "Ask team"}`,
        `Arrival / travel time: ${boat.time || "Confirm"}`,
        "",
        "Please confirm seats, exact departure time, and pickup details."
      ].join("\n");
      window.open(`https://wa.me/${String(site.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    };

    const showTravelPage = (route = "male-feeali") => {
      const travelPage = document.getElementById("travelPage");
      const travelPageContent = document.getElementById("travelPageContent");
      const content = window.currentSiteContent || window.DEFAULT_SITE_CONTENT;
      const travel = mergeContent(window.DEFAULT_SITE_CONTENT.travel, content.travel || {});
      travel.routes = mergeList(window.DEFAULT_SITE_CONTENT.travel.routes, travel.routes);
      travel.speedboats = Array.isArray(travel.speedboats) ? travel.speedboats : [];
      const visibleSpeedboats = travel.speedboats.filter((boat) => !oldDefaultSpeedboatTitles.has(String(boat.title || "").trim()));
      currentVisibleSpeedboats = visibleSpeedboats;
      const airplane = travel.airplane || window.DEFAULT_SITE_CONTENT.travel.airplane;
      document.body.classList.add("detail-mode");
      document.getElementById("roomsPage").classList.remove("active-detail");
      document.getElementById("roomDetail").classList.remove("active", "active-detail");
      document.getElementById("restaurantDetail").classList.remove("active-detail");
      document.getElementById("activityDetail").classList.remove("active-detail");
      document.getElementById("bookingPage").classList.remove("active-detail");
      travelPage.classList.add("active-detail");

      if (route === "velana-maamigili") {
        travelPage.style.setProperty("--travel-page-image", `url('${airplane.heroImage || window.DEFAULT_SITE_CONTENT.travel.airplane.heroImage}')`);
        travelPageContent.innerHTML = `
          <div class="travel-page-hero" aria-hidden="true"></div>
          <div class="room-detail-intro travel-detail-intro">
            <div class="container room-detail-copy">
              <span class="eyebrow">Airplane Route</span>
              <h2>${escapeHtml(airplane.title || "Velana Airport to Maamigili Airport")}</h2>
              <p>${escapeHtml(airplane.text || "")}</p>
              <div class="room-detail-actions">
                <a class="btn btn-sun" href="#contact"><i data-lucide="message-circle" class="icon"></i>Ask Flight Timing</a>
                <a class="btn btn-ghost" href="#travel"><i data-lucide="arrow-left" class="icon"></i>Back to Travel</a>
              </div>
            </div>
          </div>
          <div class="travel-page-body">
            <div class="container">
              <div class="travel-page-head">
                <span class="eyebrow">Live Route Style</span>
                <h3>${escapeHtml(airplane.routeTitle || "Male to Maamigili by air.")}</h3>
                <p>${escapeHtml(airplane.routeText || "")}</p>
              </div>
              <div class="flight-map">
                <div class="flight-route">
                  <div class="flight-line"></div>
                  <div class="flight-plane"><i data-lucide="plane" class="icon"></i></div>
                  <div class="airport-card"><span><i data-lucide="plane-takeoff" class="icon"></i></span><strong>Velana International Airport</strong><small>Domestic check-in after international arrival in Male.</small></div>
                  <div class="airport-card"><span><i data-lucide="plane-landing" class="icon"></i></span><strong>Villa International Airport Maamigili</strong><small>Arrive near Feeali, then continue by arranged sea transfer.</small></div>
                </div>
              </div>
              <div class="travel-facts">
                <div class="travel-fact"><span><i data-lucide="badge-dollar-sign" class="icon"></i>Guide Price</span><strong>${escapeHtml(airplane.price || "from $160")}</strong><small>per person</small></div>
                <div class="travel-fact"><span><i data-lucide="clock" class="icon"></i>Flight Time</span><strong>${escapeHtml(airplane.flightTime || "20-30 min")}</strong><small>plus check-in time</small></div>
                <div class="travel-fact"><span><i data-lucide="waves" class="icon"></i>Next Route</span><strong>${escapeHtml(airplane.nextRoute || "Sea Transfer")}</strong><small>Maamigili to Feeali</small></div>
              </div>
              <p class="travel-note"><strong>Planning tip:</strong> Share your international flight number, arrival date, number of guests, and luggage count. Our team can help confirm the latest domestic timing and onward transfer plan.</p>
              <div class="travel-actions"><a class="btn btn-primary" href="#contact"><i data-lucide="send" class="icon"></i>Request Travel Plan</a></div>
            </div>
          </div>`;
      } else {
        travelPage.style.setProperty("--travel-page-image", `url('${travel.speedboatHeroImage || window.DEFAULT_SITE_CONTENT.travel.speedboatHeroImage}')`);
        travelPageContent.innerHTML = `
          <div class="travel-page-hero" aria-hidden="true"></div>
          <div class="room-detail-intro travel-detail-intro">
            <div class="container room-detail-copy">
              <span class="eyebrow">Speed Boat</span>
              <h2>Male to Feeali Speed Boat</h2>
              <p>See all boat options, guide prices, and arrival timing for travelling from Male or Velana Airport area to F. Feeali.</p>
              <div class="room-detail-actions">
                <a class="btn btn-sun" href="#contact"><i data-lucide="message-circle" class="icon"></i>Check Boat Schedule</a>
                <a class="btn btn-ghost" href="#travel"><i data-lucide="arrow-left" class="icon"></i>Back to Travel</a>
              </div>
            </div>
          </div>
          <div class="travel-page-body">
            <div class="container">
              <div class="travel-page-head">
                <span class="eyebrow">Male to Feeali</span>
                <h3>All Speedboat Options</h3>
                <p>Guide prices and arrival times are shown for planning. Final schedule depends on weather, seat availability, and your flight arrival time.</p>
              </div>
              ${visibleSpeedboats.length ? `<div class="boat-options-grid">${visibleSpeedboats.map(boatCardHtml).join("")}</div><div class="speedboat-schedule-panel" id="speedboatSchedulePanel" aria-live="polite"></div>` : `<p class="travel-note"><strong>No speedboats added yet:</strong> Open backend Travel, add speedboat options, then save to Firebase.</p>`}
              <p class="travel-note"><strong>Important:</strong> These are guide prices for planning. Message us with your flight number, arrival date, number of guests, and luggage count so we can confirm the latest boat name, seat availability, exact departure time, and final price.</p>
            </div>
          </div>`;
      }

      travelPage.scrollIntoView({ behavior: "auto", block: "start" });
      renderIcons();
    };

    const closeDetailViews = () => {
      document.body.classList.remove("detail-mode");
      document.getElementById("roomsPage").classList.remove("active-detail");
      document.getElementById("roomDetail").classList.remove("active", "active-detail");
      document.getElementById("restaurantDetail").classList.remove("active-detail");
      document.getElementById("activityDetail").classList.remove("active-detail");
      document.getElementById("travelPage").classList.remove("active-detail");
      document.getElementById("bookingPage").classList.remove("active-detail");
    };

    const showBookingPage = () => {
      document.body.classList.add("detail-mode");
      document.getElementById("roomsPage").classList.remove("active-detail");
      document.getElementById("roomDetail").classList.remove("active", "active-detail");
      document.getElementById("restaurantDetail").classList.remove("active-detail");
      document.getElementById("activityDetail").classList.remove("active-detail");
      document.getElementById("travelPage").classList.remove("active-detail");
      document.getElementById("bookingPage").classList.add("active-detail");
      document.getElementById("bookingPage").scrollIntoView({ behavior: "smooth", block: "start" });
      renderIcons();
    };

    const updateActivityFeatured = () => {
      const grid = document.getElementById("activitiesGrid");
      if (!grid) return;
      const cards = [...grid.querySelectorAll(".activity-card")];
      if (!cards.length) return;
      const center = window.innerWidth / 2;
      let closest = cards[0];
      let closestDistance = Infinity;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs((rect.left + rect.width / 2) - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = card;
        }
      });
      cards.forEach((card) => card.classList.toggle("featured", card === closest));
    };

    const centerActivityCard = (card, behavior = "smooth") => {
      const grid = document.getElementById("activitiesGrid");
      if (!grid || !card) return;
      const rect = card.getBoundingClientRect();
      const target = grid.scrollLeft + ((rect.left + rect.width / 2) - (window.innerWidth / 2));
      grid.scrollTo({ left: Math.max(0, target), behavior });
    };

    let activityCarouselTimer = null;
    const isLandscapeActivityLayout = () => window.matchMedia("(orientation: landscape) and (min-width: 700px)").matches;
    const startActivityAutoCenter = () => {
      const grid = document.getElementById("activitiesGrid");
      if (!grid || !isLandscapeActivityLayout()) return;
      const cards = [...grid.querySelectorAll(".activity-card")];
      if (cards.length < 2) return;
      window.clearInterval(activityCarouselTimer);
      activityCarouselTimer = window.setInterval(() => {
        if (!isLandscapeActivityLayout() || document.body.classList.contains("detail-mode")) return;
        const activeIndex = Math.max(0, cards.findIndex((card) => card.classList.contains("featured")));
        const nextCard = cards[(activeIndex + 1) % cards.length] || cards[0];
        centerActivityCard(nextCard, "smooth");
        window.setTimeout(updateActivityFeatured, 360);
      }, 3800);
    };

    const setupActivityCarousel = () => {
      const grid = document.getElementById("activitiesGrid");
      if (!grid) return;
      if (!grid.dataset.boundCenter) {
        grid.dataset.boundCenter = "true";
        grid.addEventListener("scroll", () => window.requestAnimationFrame(updateActivityFeatured), { passive: true });
        grid.addEventListener("wheel", (event) => {
          if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.preventDefault();
            grid.scrollLeft += event.deltaY;
          }
        }, { passive: false });
        window.addEventListener("resize", updateActivityFeatured);
        grid.addEventListener("mouseenter", () => window.clearInterval(activityCarouselTimer));
        grid.addEventListener("mouseleave", startActivityAutoCenter);
        grid.addEventListener("touchstart", () => window.clearInterval(activityCarouselTimer), { passive: true });
        grid.addEventListener("touchend", () => window.setTimeout(startActivityAutoCenter, 900), { passive: true });
      }
      requestAnimationFrame(() => {
        const cards = [...grid.querySelectorAll(".activity-card")];
        const startCard = cards[Math.min(3, Math.max(0, Math.floor(cards.length / 2)))] || cards[0];
        centerActivityCard(startCard, "auto");
        requestAnimationFrame(() => {
          updateActivityFeatured();
          startActivityAutoCenter();
        });
      });
    };

    const renderRoomDetailFromHash = () => {
      const match = window.location.hash.match(/^#room-(\d+)$/);
      const activityMatch = window.location.hash.match(/^#activity-(\d+)$/);
      const travelMatch = window.location.hash.match(/^#travel-(speedboat|airplane)$/);
      if (match) {
        renderRoomDetail(Number(match[1]));
        requestAnimationFrame(() => {
          document.getElementById("roomDetail").scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else if (activityMatch) {
        renderActivityDetail(Number(activityMatch[1]));
        requestAnimationFrame(() => {
          document.getElementById("activityDetail").scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else if (travelMatch) {
        requestAnimationFrame(() => showTravelPage(travelMatch[1] === "airplane" ? "velana-maamigili" : "male-feeali"));
      } else if (window.location.hash === "#rooms") {
        closeDetailViews();
        requestAnimationFrame(() => document.getElementById("rooms").scrollIntoView({ behavior: "smooth", block: "start" }));
      } else if (window.location.hash === "#dining") {
        closeDetailViews();
        requestAnimationFrame(() => document.getElementById("dining").scrollIntoView({ behavior: "smooth", block: "start" }));
      } else if (window.location.hash === "#restaurant-detail") {
        requestAnimationFrame(showRestaurantDetail);
      } else if (window.location.hash === "#booking") {
        requestAnimationFrame(showBookingPage);
      } else {
        closeDetailViews();
      }
    };

    const renderMenuIcon = (name) => {
      menuToggle.innerHTML = `<i data-lucide="${name}" class="icon" aria-hidden="true"></i><span class="menu-icon-fallback" aria-hidden="true">${name === "x" ? "×" : "☰"}</span>`;
      renderIcons();
    };
    let menuScrollY = 0;
    const setMenu = (isOpen) => {
      navLinks.classList.toggle("open", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
      document.documentElement.classList.toggle("menu-open", isOpen);
      if (isOpen) {
        menuScrollY = window.scrollY || document.documentElement.scrollTop || 0;
        document.body.style.position = "fixed";
        document.body.style.top = `-${menuScrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
      } else {
        const shouldRestore = document.body.style.position === "fixed";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        if (shouldRestore) window.scrollTo(0, menuScrollY);
      }
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      renderMenuIcon(isOpen ? "x" : "menu");
    };
    menuToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
    menuClose.addEventListener("click", () => setMenu(false));
    navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
    navLinks.addEventListener("click", (event) => { if (event.target === navLinks) setMenu(false); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenu(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 860) setMenu(false); });

    const experienceGalleryModal = document.getElementById("experienceGalleryModal");
    const experienceGalleryStage = document.getElementById("experienceGalleryStage");
    const experienceGalleryTitle = document.getElementById("experienceGalleryTitle");
    const experienceGalleryCount = document.getElementById("experienceGalleryCount");
    let experienceGalleryPhotos = [];
    let experienceGalleryIndex = 0;
    let experienceGalleryTimer = null;
    const showExperienceGalleryImage = (index) => {
      if (!experienceGalleryPhotos.length) return;
      experienceGalleryIndex = (index + experienceGalleryPhotos.length) % experienceGalleryPhotos.length;
      experienceGalleryStage.querySelectorAll("img").forEach((image, imageIndex) => image.classList.toggle("active", imageIndex === experienceGalleryIndex));
      experienceGalleryCount.textContent = `${experienceGalleryIndex + 1} / ${experienceGalleryPhotos.length}`;
      clearInterval(experienceGalleryTimer);
      experienceGalleryTimer = setInterval(() => showExperienceGalleryImage(experienceGalleryIndex + 1), 4200);
    };
    const setExperienceGallery = (open, pointIndex = 0) => {
      clearInterval(experienceGalleryTimer);
      experienceGalleryTimer = null;
      if (!open) {
        experienceGalleryModal.classList.remove("open");
        experienceGalleryModal.setAttribute("aria-hidden", "true");
        return;
      }
      const content = window.currentSiteContent || window.DEFAULT_SITE_CONTENT;
      const point = content.island?.points?.[pointIndex] || {};
      const fallbackPhotos = content.island?.sliderImages || [];
      experienceGalleryPhotos = uniquePhotos(point.gallery?.length ? point.gallery : fallbackPhotos, point.text || "F. Feeali experience");
      if (!experienceGalleryPhotos.length) return;
      experienceGalleryTitle.textContent = point.text || "F. Feeali Experience";
      experienceGalleryStage.innerHTML = experienceGalleryPhotos.map((photo, index) => `<img class="${index === 0 ? "active" : ""}" src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || point.text || "F. Feeali experience")}" />`).join("");
      experienceGalleryModal.classList.add("open");
      experienceGalleryModal.setAttribute("aria-hidden", "false");
      showExperienceGalleryImage(0);
      renderIcons();
    };
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && experienceGalleryModal.classList.contains("open")) setExperienceGallery(false);
    });

    document.addEventListener("click", (event) => {
      const roomButton = event.target.closest("[data-room-index]");
      const activityButton = event.target.closest("[data-activity-index]");
      const travelButton = event.target.closest("[data-travel-route]");
      const boatScheduleButton = event.target.closest("[data-boat-schedule]");
      const boatScheduleRequest = event.target.closest("[data-request-boat-schedule]");
      const closeSchedule = event.target.closest("[data-close-schedule]");
      const activityScrollButton = event.target.closest("[data-activity-scroll]");
      const roomThumb = event.target.closest("[data-room-photo]");
      const restaurantThumb = event.target.closest("[data-restaurant-photo]");
      const activityThumb = event.target.closest("[data-activity-photo]");
      const reserveButton = event.target.closest(".reserve-room-open");
      const restaurantButton = event.target.closest("[data-open-restaurant]");
      const islandExperienceButton = event.target.closest("[data-island-experience]");
      const experienceGalleryStep = event.target.closest("[data-experience-gallery-step]");
      const closeExperienceGallery = event.target.closest("[data-close-experience-gallery]");
      if (closeExperienceGallery || event.target === experienceGalleryModal) {
        setExperienceGallery(false);
      } else if (experienceGalleryStep) {
        showExperienceGalleryImage(experienceGalleryIndex + Number(experienceGalleryStep.dataset.experienceGalleryStep || 1));
      } else if (islandExperienceButton) {
        setExperienceGallery(true, Number(islandExperienceButton.dataset.islandExperience || 0));
      } else if (reserveButton) {
        event.preventDefault();
        event.stopPropagation();
        const detailMatch = window.location.hash.match(/^#room-(\d+)$/);
        setReserveModal(true, detailMatch ? Number(detailMatch[1]) : 0);
      } else if (restaurantButton) {
        event.preventDefault();
        history.pushState(null, "", "#restaurant-detail");
        showRestaurantDetail();
      } else if (roomThumb) {
        const mainImage = document.getElementById("roomGalleryMainImage");
        if (mainImage) {
          mainImage.src = roomThumb.dataset.roomPhoto;
          mainImage.alt = roomThumb.dataset.roomPhotoAlt || "Room photo";
        }
        document.querySelectorAll(".room-thumb").forEach((thumb) => thumb.classList.toggle("active", thumb === roomThumb));
      } else if (restaurantThumb) {
        const viewer = restaurantThumb.closest("[data-restaurant-gallery]");
        const mainImage = viewer?.querySelector("[data-restaurant-main-photo]");
        if (mainImage) {
          mainImage.src = restaurantThumb.dataset.restaurantPhoto;
          mainImage.alt = restaurantThumb.dataset.restaurantPhotoAlt || "Restaurant photo";
        }
        viewer?.querySelectorAll(".restaurant-thumb").forEach((thumb) => thumb.classList.toggle("active", thumb === restaurantThumb));
      } else if (activityThumb) {
        const mainImage = document.getElementById("activityGalleryMainImage");
        if (mainImage) {
          mainImage.src = activityThumb.dataset.activityPhoto;
          mainImage.alt = activityThumb.dataset.activityPhotoAlt || "Activity photo";
        }
        document.querySelectorAll(".activity-thumb").forEach((thumb) => thumb.classList.toggle("active", thumb === activityThumb));
      } else if (activityScrollButton) {
        const grid = document.getElementById("activitiesGrid");
        const direction = Number(activityScrollButton.dataset.activityScroll || 1);
        const cards = [...grid.querySelectorAll(".activity-card")];
        const activeIndex = Math.max(0, cards.findIndex((card) => card.classList.contains("featured")));
        const nextIndex = Math.min(cards.length - 1, Math.max(0, activeIndex + direction));
        centerActivityCard(cards[nextIndex], "smooth");
        setTimeout(updateActivityFeatured, 320);
      } else if (roomButton) {
        const index = Number(roomButton.dataset.roomIndex);
        history.pushState(null, "", `#room-${index}`);
        renderRoomDetail(index);
        document.getElementById("roomDetail").scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (activityButton) {
        if (!activityButton.classList.contains("featured")) {
          centerActivityCard(activityButton, "smooth");
          setTimeout(updateActivityFeatured, 280);
          return;
        }
        const index = Number(activityButton.dataset.activityIndex);
        history.pushState(null, "", `#activity-${index}`);
        renderActivityDetail(index);
        document.getElementById("activityDetail").scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (travelButton) {
        const route = travelButton.dataset.travelRoute;
        document.querySelectorAll("[data-travel-route]").forEach((button) => button.classList.toggle("active", button === travelButton));
        history.pushState(null, "", route === "velana-maamigili" ? "#travel-airplane" : "#travel-speedboat");
        showTravelPage(route);
      } else if (boatScheduleButton) {
        showBoatSchedule(Number(boatScheduleButton.dataset.boatSchedule || 0));
      } else if (boatScheduleRequest) {
        requestBoatSchedule(Number(boatScheduleRequest.dataset.requestBoatSchedule || 0));
      } else if (closeSchedule) {
        document.getElementById("speedboatSchedulePanel")?.classList.remove("show");
      }
    });
    window.addEventListener("hashchange", renderRoomDetailFromHash);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const toDateValue = (date) => new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");
    if (checkin && checkout) {
      checkin.min = toDateValue(today);
      checkout.min = toDateValue(tomorrow);
      checkin.value = toDateValue(today);
      checkout.value = toDateValue(tomorrow);
      checkin.addEventListener("change", () => {
        const selected = new Date(checkin.value);
        const nextDay = new Date(selected);
        nextDay.setDate(selected.getDate() + 1);
        checkout.min = toDateValue(nextDay);
        if (!checkout.value || new Date(checkout.value) <= selected) checkout.value = toDateValue(nextDay);
      });
    }
    const reserveModal = document.getElementById("reserveModal");
    const reservePickerHero = document.getElementById("reservePickerHero");
    const reservePickerTitle = document.getElementById("reservePickerTitle");
    const reservePickerText = document.getElementById("reservePickerText");
    const currentRoomForBooking = (roomIndex = 0) => {
      const rooms = window.currentSiteContent?.rooms?.items || window.DEFAULT_SITE_CONTENT.rooms.items;
      return rooms[roomIndex] || rooms[0] || {};
    };
    const setReserveModal = (open, roomIndex = 0) => {
      const room = currentRoomForBooking(roomIndex);
      reserveModal.classList.toggle("open", open);
      reserveModal.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
      reservePickerHero.style.setProperty("--reserve-image", `url("${room.image || window.currentSiteContent?.site?.heroImage || ""}")`);
      reservePickerTitle.textContent = room.title ? `Book ${room.title}` : "Book Feeali Buddies Inn";
      reservePickerText.textContent = "Choose your dates and complete your reservation securely through Beds24.";
      renderIcons();
    };
    document.getElementById("reserveCancel").addEventListener("click", () => setReserveModal(false));
    reserveModal.addEventListener("click", (event) => { if (event.target === reserveModal) setReserveModal(false); });
    document.getElementById("book").addEventListener("submit", (event) => {
      event.preventDefault();
      window.location.hash = "#booking";
    });

    const reviewModal = document.getElementById("reviewModal");
    const reviewForm = document.getElementById("guestReviewForm");
    const reviewStatus = document.getElementById("reviewFormStatus");
    const setReviewModal = (open) => {
      reviewModal.classList.toggle("open", open);
      reviewModal.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) document.getElementById("reviewName").focus();
    };
    document.getElementById("openReviewForm").addEventListener("click", () => setReviewModal(true));
    document.getElementById("closeReviewForm").addEventListener("click", () => setReviewModal(false));
    reviewModal.addEventListener("click", (event) => {
      if (event.target === reviewModal) setReviewModal(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && reviewModal.classList.contains("open")) setReviewModal(false);
    });
    reviewForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const review = {
        title: document.getElementById("reviewName").value.trim(),
        rating: Number(document.getElementById("reviewRating").value),
        text: document.getElementById("reviewText").value.trim(),
        status: "pending"
      };
      if (!review.title || !review.text) {
        reviewStatus.textContent = "Please add your name and review note.";
        return;
      }
      try {
        if (window.saveGuestReview) await window.saveGuestReview(review);
        reviewStatus.textContent = "Thank you. Your review was saved for admin approval.";
        reviewForm.reset();
        setTimeout(() => setReviewModal(false), 1200);
      } catch {
        reviewStatus.textContent = "Review could not be saved. Please try again.";
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("show"); });
    }, { threshold: 0.14 });
    document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
    const cachedSiteContent = readCachedSiteContent();
    const cachedHasHeroMedia = toHeroMediaList(cachedSiteContent?.hero?.media).some(isCustomHeroMedia);
    applyContent(cachedHasHeroMedia ? cachedSiteContent : window.DEFAULT_SITE_CONTENT);
    let lastHeroPortraitMode = isPortraitHero();
    const refreshHeroForScreenMode = () => {
      const nextHeroPortraitMode = isPortraitHero();
      if (nextHeroPortraitMode === lastHeroPortraitMode) return;
      lastHeroPortraitMode = nextHeroPortraitMode;
      const content = window.currentSiteContent || readCachedSiteContent() || window.DEFAULT_SITE_CONTENT;
      renderHeroMedia(toHeroMediaList(content.hero?.media), "", content.site?.name || "Feeali Buddies Inn");
    };
    window.addEventListener("resize", refreshHeroForScreenMode);
    window.addEventListener("orientationchange", () => setTimeout(refreshHeroForScreenMode, 180));
    window.addEventListener("load", () => {
      renderIcons();
      setTimeout(renderIcons, 250);
      setTimeout(renderIcons, 1000);
      forceHeroOnReload();
    });
    window.addEventListener("pageshow", () => {
      forceHeroOnReload();
      setTimeout(renderIcons, 120);
    });

    // Browser-side content protection. This discourages casual copying and
    // saving while preserving normal typing, selection, and copying in forms.
    const isEditableContent = (target) => target instanceof Element && Boolean(
      target.closest('input, textarea, select, option, [contenteditable="true"]')
    );

    document.addEventListener("contextmenu", (event) => event.preventDefault());
    document.addEventListener("dragstart", (event) => {
      if (event.target instanceof Element && event.target.closest("img, video")) {
        event.preventDefault();
      }
    });
    document.addEventListener("selectstart", (event) => {
      if (!isEditableContent(event.target)) event.preventDefault();
    });
    document.addEventListener("copy", (event) => {
      if (!isEditableContent(event.target)) event.preventDefault();
    });
    document.addEventListener("cut", (event) => {
      if (!isEditableContent(event.target)) event.preventDefault();
    });
    document.addEventListener("keydown", (event) => {
      const key = String(event.key || "").toLowerCase();
      const commandKey = event.ctrlKey || event.metaKey;
      const blockedCommand = commandKey && ["u", "s", "p"].includes(key);
      const blockedCopy = commandKey && key === "c" && !isEditableContent(event.target);
      const blockedDeveloperShortcut = commandKey && event.shiftKey && ["i", "j", "c", "k"].includes(key);
      if (key === "f12" || blockedCommand || blockedCopy || blockedDeveloperShortcut) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);

    const protectMedia = (root = document) => {
      root.querySelectorAll?.("img, video").forEach((media) => {
        media.draggable = false;
        media.setAttribute("draggable", "false");
        if (media instanceof HTMLVideoElement) {
          media.controls = false;
          media.disablePictureInPicture = true;
          media.setAttribute("controlslist", "nodownload noremoteplayback nofullscreen");
          media.setAttribute("disablepictureinpicture", "");
        }
      });
    };
    protectMedia();
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          if (node.matches("img, video")) protectMedia(node.parentElement || document);
          else protectMedia(node);
        }
      }));
    }).observe(document.body, { childList: true, subtree: true });

    window.SiteApp = Object.freeze({
      readCachedSiteContent,
      writeCachedSiteContent,
      applyContent
    });
    window.dispatchEvent(new Event("site-app-ready"));


 
