
    // Manual hero video setup:
    // Place two video files in the site folder and set these file names.
    // Example: set `landscape: 'hero-landscape.mp4'` and `portrait: 'hero-portrait.mp4'`.
    // Landscape is used on desktop/large viewports; portrait is used on mobile.
    window.MANUAL_HERO_VIDEO = {
      // Replace these values with your video file names (relative paths are fine).
      // Separate files are selected automatically for each screen orientation.
      landscape: "original.webm",
      portrait: "hero-portrait.webm",
      landscapePoster: "",
      portraitPoster: "",
      // Zoom and focus control the crop. Keep defaults or tweak as needed.
      landscapeZoom: "1",
      portraitZoom: "1",
      landscapeFocusX: "50",
      landscapeFocusY: "50",
      portraitFocusX: "50",
      portraitFocusY: "50",
      // Rotate the portrait-format source only on landscape screens.
      landscapeRotate: "90",
      portraitRotate: "0"
    };

    window.DEFAULT_SITE_CONTENT = {
      site: {
        name: "Feeali Buddies Inn",
        island: "F. Feeali",
        whatsapp: "9609131220",
        phoneDisplay: "+960 913 1220",
        heroImage: "",
        menuImage: "",
        menuOpacity: "0.78"
      },
      hero: {
        badge: "Slow island days",
        titleLines: ["Real Maldivian Life"],
        text: "Sandy palm-shaded lanes, home-cooked meals, blue lagoons, and sunset trips from a welcoming guest house in F. Feeali.",
        media: [
          {
            type: "video",
            url: window.MANUAL_HERO_VIDEO.landscape,
            portraitUrl: window.MANUAL_HERO_VIDEO.portrait,
            poster: window.MANUAL_HERO_VIDEO.landscapePoster,
            posterPortrait: window.MANUAL_HERO_VIDEO.portraitPoster,
            alt: "Feeali Buddies Inn hero video",
            manualHeroVideo: true,
            rotate: window.MANUAL_HERO_VIDEO.landscapeRotate,
            mobileRotate: window.MANUAL_HERO_VIDEO.portraitRotate,
            focusX: window.MANUAL_HERO_VIDEO.landscapeFocusX,
            focusY: window.MANUAL_HERO_VIDEO.landscapeFocusY,
            mobileFocusX: window.MANUAL_HERO_VIDEO.portraitFocusX,
            mobileFocusY: window.MANUAL_HERO_VIDEO.portraitFocusY,
            zoom: window.MANUAL_HERO_VIDEO.landscapeZoom,
            mobileZoom: window.MANUAL_HERO_VIDEO.portraitZoom
          }
        ],
        facts: [
          { title: "F. Feeali", text: "Peaceful local island setting" },
          { title: "Lagoon", text: "Snorkeling, sandbank and boat trips" },
          { title: "Dining", text: "Fresh meals with island flavour" }
        ],
        bookingTitle: "Make a Reservation",
        bookingText: "Send your preferred dates directly to WhatsApp and our team will confirm availability.",
        bookingNote: "Fast replies by WhatsApp for room availability, transfers, and excursions."
      },
      about: {
        eyebrow: "Welcome to Feeali",
        title: "A guest house made for slow mornings, clear water, and easy island living.",
        text: "Located in beautiful F. Feeali, our guesthouse offers an authentic Maldivian local island experience with traditional culture, modern comfort, ocean adventures, and white sand beach moments.",
        signature: "",
        amenities: [
          { icon: "wifi", title: "Fast Wi-Fi", text: "Stay connected for work, travel plans, calls, and sharing holiday moments." },
          { icon: "snowflake", title: "Air-Conditioned Rooms", text: "Cool, clean spaces prepared for restful nights after sunny island days." },
          { icon: "utensils", title: "Island Dining", text: "Enjoy breakfast, seafood, Maldivian favourites, and flexible meal requests." },
          { icon: "ship", title: "Transfer Help", text: "Ask our team for guidance with speedboat travel and arrival planning." },
          { icon: "life-buoy", title: "Excursion Planning", text: "Snorkeling, fishing, sandbank trips, dolphin cruises, and beach picnics." },
          { icon: "coffee", title: "Relaxed Common Areas", text: "Comfortable spots to sip coffee, plan the day, and enjoy island breezes." }
        ]
      },
      travel: {
        eyebrow: "Travel Planning",
        title: "Plan your route to F. Feeali.",
        text: "Choose a route and see guide prices, timing, and arrival notes. Our team can confirm the latest schedule before you travel.",
        backgroundOpacity: "0.82",
        backgroundImages: [
          "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1800&q=82",
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=82",
          "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1800&q=82"
        ],
        routes: [
          { key: "male-feeali", title: "Speed Boat", text: "Male to Feeali direct transfer", icon: "ship", price: "from $65", image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=82" },
          { key: "velana-maamigili", title: "Airplane", text: "Velana Airport to Maamigili Airport", icon: "plane", price: "from $160", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=82" }
        ],
        airplane: {
          heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=86",
          title: "Velana Airport to Maamigili Airport",
          text: "Domestic flight planning from Velana International Airport to Villa International Airport Maamigili, with onward transfer support to F. Feeali.",
          routeTitle: "Male to Maamigili by air.",
          routeText: "Use this route when you want a faster island connection before the final sea transfer to Feeali.",
          price: "from $160",
          flightTime: "20-30 min",
          nextRoute: "Sea Transfer"
        },
        speedboatHeroImage: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1800&q=86",
        speedboats: []
      },
      rooms: {
        eyebrow: "Rooms & Suites",
        title: "Bright rooms for couples, friends, and families.",
        text: "Choose a cozy double, spacious deluxe room, or family stay. Every room is designed to feel calm, fresh, and easy to settle into.",
        sliderImages: [],
        items: []
      },
      dining: {
        eyebrow: "Restaurant",
        title: "Fresh island flavours after a day in the sun.",
        text: "Enjoy relaxed meals with seafood, local recipes, Sri Lankan favourites, tropical drinks, and friendly service.",
        featureTitle: "Flavour Meets View",
        featureText: "Easy meals, fresh ingredients, and a calm island mood.",
        items: [
          { icon: "fish", text: "Fresh seafood and grilled favourites" },
          { icon: "sunset", text: "Private dinners and sunset-style setups" },
          { icon: "croissant", text: "Breakfast before excursions and beach days" }
        ],
        photos: [
          { image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=86", alt: "Restaurant seating with warm lights" },
          { image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=900&q=86", alt: "Fresh seafood meal served at a table" },
          { image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=86", alt: "Tropical drink on a table" },
          { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=86", alt: "Colourful dinner dishes" },
          { image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=86", alt: "Fresh pizza and island meal" },
          { image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=86", alt: "Warm restaurant bar lights" }
        ]
      },
      island: {
        eyebrow: "F. Feeali Experiences",
        title: "Step from guest house comfort into the rhythm of the island.",
        text: "Spend your days in clear water, quiet beaches, coral gardens, and friendly village streets.",
        image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=2200&q=86",
        sliderImages: [
          { image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=2200&q=86", alt: "Tropical island beach and palms" },
          { image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=2200&q=86", alt: "Turquoise sandbank lagoon" },
          { image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2200&q=86", alt: "Palm beach and clear ocean" },
          { image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=2200&q=86", alt: "Maldives lagoon and island" }
        ],
        points: [
          { icon: "waves", text: "Snorkeling reefs and lagoon trips", gallery: [
            "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1800&q=86",
            "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1800&q=86"
          ] },
          { icon: "sailboat", text: "Sandbank picnics and fishing", gallery: [
            "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1800&q=86",
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1800&q=86"
          ] },
          { icon: "camera", text: "Photo-worthy sunsets and beach walks", gallery: [
            "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1800&q=86",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=86"
          ] }
        ]
      },
      activities: {
        eyebrow: "Ocean Adventures",
        title: "Ocean Adventures & Activities",
        text: "Discover the beauty of Maldivian waters and marine life with easy trips arranged from Feeali Buddies Inn.",
        backgroundImage: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=2200&q=86",
        backgroundOpacity: "0.18",
        items: [
          {
            title: "Morning Fishing",
            price: "$120",
            priceNote: "Group price (min. 2 people)",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=86",
            shortText: "Morning fishing or night fishing in the pristine waters around Feeali.",
            detailText: "Head out in the morning calm with local guidance, simple equipment, and clear water all around. This trip is relaxed, scenic, and great for guests who want a real island fishing experience.",
            gallery: [
              "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=86",
              "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=86",
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=86"
            ],
            highlights: [
              { icon: "fish", title: "Local fishing style", text: "A guided trip with island knowledge." },
              { icon: "sun", title: "Morning sea light", text: "Best timing for calm water and photos." },
              { icon: "users", title: "Small groups", text: "Comfortable for couples, friends, and families." }
            ]
          },
          {
            title: "Snorkeling Trip",
            price: "$250",
            priceNote: "Group price (min. 5 people)",
            image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1000&q=86",
            shortText: "Explore vibrant coral reefs and tropical fish in crystal clear waters.",
            detailText: "Visit beautiful reef areas with clear lagoon views, colourful fish, and peaceful ocean time. The team helps plan timing, gear, and the best nearby spots for the day.",
            gallery: [
              "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1000&q=86",
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=86",
              "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=900&q=86"
            ],
            highlights: [
              { icon: "waves", title: "Clear reef water", text: "Perfect for marine life viewing." },
              { icon: "life-buoy", title: "Guided support", text: "Easy planning for first timers too." },
              { icon: "camera", title: "Photo moments", text: "Lagoon colours and reef memories." }
            ]
          },
          {
            title: "Night Fishing",
            price: "$120",
            priceNote: "Group price (min. 2 people)",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=86",
            shortText: "Experience the thrill of night fishing under the starlit Maldivian sky.",
            detailText: "A calm evening trip with ocean air, starry views, and traditional fishing around Feeali. Ideal for guests who want a slower adventure after sunset.",
            gallery: [
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=86",
              "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=86",
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=86"
            ],
            highlights: [
              { icon: "moon", title: "Evening trip", text: "A quiet ocean experience after sunset." },
              { icon: "fish", title: "Traditional fishing", text: "Try simple local methods." },
              { icon: "sparkles", title: "Starry atmosphere", text: "Peaceful views from the boat." }
            ]
          },
          {
            title: "Full Day Fishing",
            price: "$250",
            priceNote: "Group price (min. 5 people)",
            image: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&w=1000&q=86",
            shortText: "A complete fishing adventure with lunch and multiple fishing spots.",
            detailText: "Spend a full day at sea with more time to explore different spots, enjoy lunch, and make the day feel like a proper island adventure.",
            gallery: [
              "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&w=1000&q=86",
              "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=86",
              "https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?auto=format&fit=crop&w=900&q=86"
            ],
            highlights: [
              { icon: "ship", title: "Longer boat time", text: "More ocean, more locations." },
              { icon: "utensils", title: "Lunch included", text: "A relaxed full-day plan." },
              { icon: "fish", title: "Multiple spots", text: "Try different fishing areas." }
            ]
          },
          {
            title: "Island Excursion",
            price: "$180",
            priceNote: "Group price (min. 2 people)",
            image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=86",
            shortText: "Visit beautiful island corners, quiet beaches, and natural scenery.",
            detailText: "Discover local island life, beach paths, photo spots, and peaceful shoreline views. A gentle trip for guests who want to see more of the area.",
            gallery: [
              "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=86",
              "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=86",
              "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=900&q=86"
            ],
            highlights: [
              { icon: "camera", title: "Photo stops", text: "Beautiful quiet corners and sea views." },
              { icon: "footprints", title: "Easy walking", text: "A relaxed pace around the island." },
              { icon: "leaf", title: "Natural scenery", text: "Beach, palms, and local charm." }
            ]
          },
          {
            title: "Sandbank Trip",
            price: "$100",
            priceNote: "Group price (min. 2 people)",
            image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=86",
            shortText: "Relax on a pristine sandbank surrounded by turquoise water.",
            detailText: "A classic Maldives moment: bright sand, shallow blue water, swimming, photos, and time to relax away from the island.",
            gallery: [
              "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=86",
              "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=86",
              "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=86"
            ],
            highlights: [
              { icon: "sun", title: "Pristine sandbank", text: "Clear water and soft white sand." },
              { icon: "waves", title: "Swimming time", text: "Relax in shallow turquoise water." },
              { icon: "camera", title: "Best photos", text: "A must-do Maldives scene." }
            ]
          },
          {
            title: "Shark Point to V. Atoll",
            price: "$350",
            priceNote: "Group price (min. 6 people)",
            image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=1000&q=86",
            shortText: "A full-day special marine adventure with shark watching and atoll exploration.",
            detailText: "Experience the ultimate marine adventure with shark watching and V. Atoll exploration. This full-day group trip is arranged for guests who want a bigger ocean experience.",
            gallery: [
              "https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=1000&q=86",
              "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1000&q=86",
              "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=86"
            ],
            highlights: [
              { icon: "fish", title: "Shark point", text: "Special full-day marine adventure." },
              { icon: "map", title: "V. Atoll route", text: "Explore beyond Feeali waters." },
              { icon: "users", title: "Group price", text: "Minimum 6 people." }
            ]
          }
        ]
      },
      gallery: {
        eyebrow: "Gallery",
        title: "Moments from Feeali Buddies Inn.",
        text: "A visual taste of soft beds, turquoise water, tropical meals, beach walks, and warm island days.",
        images: [
          { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=86", alt: "White sand beach and turquoise sea" },
          { image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=86", alt: "Maldives lagoon with villas" },
          { image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=86", alt: "Palm beach by blue water" },
          { image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=900&q=86", alt: "Clear tropical lagoon" },
          { image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=86", alt: "Tropical shoreline and blue ocean" },
          { image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=86", alt: "Resort bedroom with white bedding" },
          { image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1000&q=86", alt: "Snorkeling over clear reef water" },
          { image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=86", alt: "Warm restaurant seating" },
          { image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=86", alt: "Tropical drink by the water" },
          { image: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&w=1000&q=86", alt: "Fishing trip on blue water" },
          { image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=86", alt: "Aerial Maldives lagoon" },
          { image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=86", alt: "Comfortable guest room" }
        ]
      },
      reviews: {
        eyebrow: "Guest Notes",
        title: "The kind of stay guests remember.",
        text: "Warm service, clean rooms, good food, and simple island planning create the Feeali Buddies Inn experience.",
        items: [
          { title: "Couple Stay", rating: 5, text: "Clean room, kind staff, and easy help with island activities. The stay felt peaceful from the first day." },
          { title: "Family Holiday", rating: 5, text: "Great food, comfortable air conditioning, and friendly local recommendations for snorkeling and beaches." },
          { title: "Island Explorer", rating: 5, text: "A beautiful local island base with warm people, clear water nearby, and a relaxed guest house atmosphere." }
        ]
      },
      contact: {
        eyebrow: "Book Your Stay",
        title: "Your Feeali holiday starts with one message.",
        text: "Tell us your dates, number of guests, and travel plans. We will help with availability, room options, transfers, meals, and excursion ideas.",
        location: "Feeali Buddies Inn, F. Feeali, Maldives",
        travelText: "Ask about speedboat transfers and island arrival times.",
        email: "feealibuddieshotel@gmail.com",
        footerText: "Feeali Buddies Inn provides comfortable guest house accommodation in F. Feeali, close to island beaches, local dining, and lagoon experiences.",
        footerBackgroundImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=86",
        footerBackgroundOpacity: "0.22",
        facebookUrl: "https://facebook.com/",
        instagramUrl: "https://instagram.com/",
        tiktokUrl: "https://www.tiktok.com/"
      }
    };
