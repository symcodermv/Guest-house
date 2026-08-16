import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
    import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
    import { getDatabase, ref, onValue, set, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyAHhY81_fI089J0nSYYdVfuhMbxvgJmGTQ",
      authDomain: "websitecilent.firebaseapp.com",
      databaseURL: "https://websitecilent-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "websitecilent",
      storageBucket: "websitecilent.firebasestorage.app",
      messagingSenderId: "491322767595",
      appId: "1:491322767595:web:ce36abdddd9112d02f66ae",
      measurementId: "G-2TE6YX11CR"
    };

const app = initializeApp(firebaseConfig);
isSupported().then((supported) => { if (supported) getAnalytics(app); }).catch(() => {});
const db = getDatabase(app);
const siteRef = ref(db, "feealiBuddiesInn/siteContent");
const reviewSubmissionsRef = ref(db, "feealiBuddiesInn/reviewSubmissions");

window.saveGuestReview = async (review) => {
      await push(reviewSubmissionsRef, {
        ...review,
        source: "index.html",
        createdAt: serverTimestamp()
      });
};

const connectSiteContent = () => {
  const siteApp = window.SiteApp;
  if (!siteApp) return;

  onValue(siteRef, (snapshot) => {
      if (snapshot.exists()) {
        const firebaseContent = snapshot.val();
        siteApp.writeCachedSiteContent(firebaseContent);
        siteApp.applyContent(firebaseContent);
      } else {
        set(siteRef, window.DEFAULT_SITE_CONTENT);
      }
    }, () => {
      const cached = siteApp.readCachedSiteContent();
      if (cached) {
        siteApp.applyContent(cached);
      } else {
        siteApp.applyContent(window.DEFAULT_SITE_CONTENT);
      }
    });
};

if (window.SiteApp) connectSiteContent();
else window.addEventListener("site-app-ready", connectSiteContent, { once: true });
