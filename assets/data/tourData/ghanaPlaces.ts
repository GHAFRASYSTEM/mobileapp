// ghanaPlaces.ts
import type { PlaceItem } from "@/assets/data/tourData/tourTypes";

export const GHANA_PLACES: PlaceItem[] = [
  {
    id: "akosombo",
    name: "Akosombo Dam",
    location: "Eastern Region",
    type: "Nature",
    emoji: "💧",
    rating: 4.7,
    reviews: 1240,
    country: "ghana",
    gradientColors: ["#1a4a2e", "#5BA380"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Akosombo_dam_ghana.jpg/1280px-Akosombo_dam_ghana.jpg",
    desc: "One of the largest man-made lakes in the world, the Akosombo Dam forms Lake Volta and is a marvel of mid-century engineering. Built in 1965, it powers much of Ghana and West Africa. Cruise across the serene waters, spot eagles, and witness the scale of this incredible feat.",
    gallery: [
      {
        caption: "Akosombo Dam from Volta Hotel",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Akosombo_dam_ghana.jpg/1280px-Akosombo_dam_ghana.jpg",
      },
      {
        caption: "Dam structure and spillway",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Akosombo_Dam.jpg/1280px-Akosombo_Dam.jpg",
      },
      {
        caption: "Lake Volta at Akosombo",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Overview_of_Akosombo_dam.jpg/1280px-Overview_of_Akosombo_dam.jpg",
      },
      {
        caption: "Aerial view of the dam",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Akosombo_Dam.jpg/1280px-Akosombo_Dam.jpg",
      },
    ],
    chips: ["📍 Akosombo", "⏱ 3–5 hrs", "💰 GH₵ 30", "🚌 2h from Accra"],
    tips: [
      "Take the morning ferry for calm waters",
      "Hire a local guide for dam tours",
      "Visit the dam view point at sunset",
      "Wear light clothing — it gets hot!",
    ],
  },
  {
    id: "cape-coast",
    name: "Cape Coast Castle",
    location: "Central Region",
    type: "History",
    emoji: "🏰",
    rating: 4.9,
    reviews: 3280,
    country: "ghana",
    gradientColors: ["#4a3a1a", "#baa040"],
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEprWfLwVwKrFcyikxT79RfBpOGnN2oasyQyMUU6r0kF2G_4LVkbVdCOikxgW9Vjh-sOeeeRuZelUzGLF5X7hDvlFOSIr4BhrE8xv-0Yit4wsqE98286WOqko8ZmI5pDezir44K=s1360-w1360-h1020-rw",
    desc: 'A UNESCO World Heritage site and poignant reminder of the transatlantic slave trade. The castle\'s "Door of No Return" is a deeply moving experience. Walk through the dungeons, hear the stories, and stand at the edge of the Atlantic where millions were shipped away.',
    gallery: [
      {
        caption: "Castle exterior",
        imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAG6_wLXD29Vr7zOCiNSb3ZarYl4O1VgpUHtZLCbCxseJFpSj_hM61kxeupWmR2woQfHteQL1qzoB428grcWGd89uYadFk2Ak-vGEvN2HUZ6JEO3tBmMchKKU9EwEIluDaHVEx8G=s1360-w1360-h1020-rw",
      },
      {
        caption: "Door of No Return",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/%22Door_of_no_return%22_Cape_Coast_castle%2C_Ghana.jpg/1280px-%22Door_of_no_return%22_Cape_Coast_castle%2C_Ghana.jpg",
      },
      {
        caption: "View from the sea",
        imageUrl: "https://t4.ftcdn.net/jpg/02/11/59/15/360_F_211591506_wHH5v3dak8fnAgDiBAd30YZbhXyS8Lgu.jpg",
      },
      {
        caption: "Interior of the castle",
        imageUrl: "https://www.traveladventures.org/countries/ghana/images/cape-coast-castle11.jpg",
      },
    ],
    chips: ["📍 Cape Coast", "⏱ 2–3 hrs", "💰 GH₵ 50", "🚌 3h from Accra"],
    tips: [
      "Book a guided tour — worth every pesewa",
      "Visit the Kakum canopy walk next door",
      "Mornings are less crowded",
      "Bring water and sunscreen",
    ],
  },
  {
    id: "mole",
    name: "Mole National Park",
    location: "Savannah Region",
    type: "Wildlife",
    emoji: "🐘",
    rating: 4.8,
    reviews: 892,
    country: "ghana",
    gradientColors: ["#4a3a0a", "#aA9030"],
    imageUrl: "https://molenationalpark.org/images/landscape/l1.jpg",
    desc: "Ghana's largest national park is home to elephants, warthogs, baboons, and over 300 bird species. Morning walking safaris put you within metres of wild elephants — an unforgettable, intimate experience unlike anything in East Africa.",
    gallery: [
      {
        caption: "Elephant herd at waterhole",
        imageUrl: "https://akwaaba.app/wp-content/uploads/2025/01/zElephants_134.jpg.webp",
      },
      {
        caption: "Elephants cooling in pond",
        imageUrl: "https://molenationalpark.org/images/wildlife/w2.jpg",
      },
      {
        caption: "Savanna landscape",
        imageUrl: "https://dagbonkingdom.com/wp-content/uploads/2024/09/national-park-mole-national-park-tourism-ghana-safari.jpg",
      },
      {
        caption: "Close encounter with elephant",
        imageUrl: "https://i0.wp.com/thebftonline.com/wp-content/uploads/2024/06/d397051bcb8b5de0fec11cde6f1fd676-mole-national-park.jpg?fit=1360%2C888&ssl=1",
      },
    ],
    chips: ["📍 Damongo", "⏱ Full day", "💰 GH₵ 100", "✈️ 1h flight + drive"],
    tips: [
      "Walk safari at 6:30am for elephant sightings",
      "Stay at Mole Motel for the best views",
      "Rainy season (May–Oct) has lush scenery",
      "Binoculars are essential",
    ],
  },
  {
    id: "labadi",
    name: "Labadi Beach",
    location: "Greater Accra",
    type: "Lifestyle",
    emoji: "🏖️",
    rating: 4.3,
    reviews: 5600,
    country: "ghana",
    gradientColors: ["#0a4a8a", "#2aaada"],
    imageUrl: "https://images.trvl-media.com/lodging/1000000/10000/1600/1558/3dee1124.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    desc: "Accra's most iconic and vibrant beach pulses with highlife music, beach football, horse rides, and the best local food shacks. Weekends are electric as locals come out en masse for a true Ghanaian seaside celebration.",
    gallery: [
      {
        caption: "Labadi Beach overview",
        imageUrl: "https://ghanafixer.com/wp-content/uploads/2024/12/Facts-about-Labadi-Beach.jpg",
      },
      {
        caption: "Beach scene with people",
        imageUrl: "https://images.imagerenderer.com/images/artworkimages/mediumlarge/2/a-view-of-labadi-beach-in-accra-ghana-black-and-abroad.jpg",
      },
      {
        caption: "Sunset at Labadi Beach",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/ba/18/bb/dsc-0786-largejpg.jpg?w=1200&h=-1&s=1",
      },
      {
        caption: "Local activity on the beach",
        imageUrl: "https://res.cloudinary.com/dywx9brz8/image/upload/w_900/surfspots/eekokozugldysjncw1w6",
      },
    ],
    chips: ["📍 Labadi, Accra", "⏱ Half day", "💰 GH₵ 20 entry", "🚕 20min from center"],
    tips: [
      "Go on a Saturday for the full vibe",
      "Negotiate horse ride prices upfront",
      "Try red-red from the beach shacks",
      "Leave valuables at your hotel",
    ],
  },
   {
    id: "wli-falls",
    name: "Wli Agumatsa Waterfalls",
    location: "Volta Region",
    type: "Nature",
    emoji: "💦",
    rating: 4.8,
    reviews: 2140,
    country: "ghana",
    gradientColors: ["#0d3d2e", "#2d9e6b"],
    imageUrl:
      "https://tour.visitwli.com.gh/wp-content/uploads/2023/07/IMG_1557-scaled-1.jpg",
 
    desc: "The highest waterfall in West Africa at 80 metres, Wli (pronounced 'vlee') Agumatsa Falls thunder into a clear pool within the lush Volta Region forest. Thousands of fruit bats roost on the surrounding cliffs, creating an otherworldly spectacle. Two trails lead to the lower and the even more dramatic upper falls.",
 
    gallery: [
      {
        caption: "Wli lower falls and natural pool",
        imageUrl:
          "https://silvertraveladvisor.com/wp-content/uploads/2024/03/20240125_160959.jpg",
      },
      {
        caption: "Rainforest trail through Agumatsa Wildlife Sanctuary",
        imageUrl:
          "https://d2exd72xrrp1s7.cloudfront.net/www/000/1k7/1s/1svps0jigv4lcyvz3p7gmk6314myrlv73-uhi62334657/0?width=768&height=576&crop=true",
      },
      {
        caption: "Mount Afadjato — Ghana's highest peak, nearby",

        imageUrl:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/ec/56/38/afadjato-mount-afadjato.jpg?w=1200&h=1200&s=1",
      },
      {
        caption: "Fruit bats colony above the falls",
        // Wikimedia Commons CC BY-SA – straw-coloured fruit bats
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bats_at_Wli_Waterfall_2.JPG/330px-Bats_at_Wli_Waterfall_2.JPG",
      },
    ],
 
 
    chips: ["📍 Hohoe, Volta Region", "⏱ Half–Full day", "💰 GH₵ 20", "🚗 4–5h from Accra"],
    tips: [
      "Arrive early — the lower falls trail takes only 30 minutes but gets crowded by 10am",
      "The upper falls hike is 2–3 hours and requires a mandatory guide; book at the visitor centre",
      "Visit April–October (rainy season) for the most powerful flow and fullest pool",
      "Bring swimwear — the pool at the base is cold, clear, and absolutely worth it",
    ],
  },
  {
    id: "kakum",
    name: "Kakum Canopy Walkway",
    location: "Central Region",
    type: "Nature",
    emoji: "🌿",
    rating: 4.7,
    reviews: 4820,
    country: "ghana",
    gradientColors: ["#1a3d1a", "#4caf50"],

    imageUrl:
      "https://akwaaba.app/wp-content/uploads/2025/01/Kakum-National-Park-3-1536x1024-1.jpeg",
 
    desc: "One of only three canopy walkways in Africa, Kakum's 350-metre bridge system floats 40 metres above the ancient rainforest floor. Seven suspension bridges connect centuries-old hardwood trees (ebony, mahogany) offering a bird's-eye view of one of West Africa's last intact coastal rainforests.",
 
    gallery: [
      {
        caption: "Kakum canopy walkway above the forest",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://gubatours.com/wp-content/uploads/2025/01/kakum.webp",
      },
      {
        caption: "Looking down through the Kakum rainforest canopy",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://s.yimg.com/ny/api/res/1.2/F2Bd0bSF3dKRB5cAJAVVoQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTUzNTtjZj13ZWJw/https://media.zenfs.com/en/buzzfeed_articles_778/0e4101cb4592e7524173087005737fe5",
      },
      {
        caption: "Suspension bridge at Kakum National Park",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://us.images.westend61.de/0001951265pw/aerial-view-of-kakum-national-park-canopy-walk-central-region-ghana-AAEF27435.jpg",
      },
      {
        caption: "Forest interior — Kakum tropical rainforest",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://adventurertraveler.com/wp-content/uploads/2024/10/640px-Kakum.jpg",
      },
    ],
 
    chips: ["📍 Central Region", "⏱ 2–3 hrs", "💰 GH₵ 60", "🚌 3–4h from Accra"],
    tips: [
      "Arrive before 9am on weekdays — the walkway fills up fast with school groups by mid-morning",
      "The walk is 40–60 minutes; guides are mandatory and very knowledgeable — tip generously",
      "Night hikes are available for bat and nocturnal animal sightings — book ahead",
      "Combine with Cape Coast Castle (32 km south) for a full Central Region day",
    ],
  },
  {
    id: "manhyia-palace",
    name: "Manhyia Palace Museum",
    location: "Ashanti Region",
    type: "History",
    emoji: "👑",
    rating: 4.6,
    reviews: 3150,
    country: "ghana",
    gradientColors: ["#5c3a00", "#d4aa00"],
 
  
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Manhyia_Palace_Museum_%28Kumasi%2C_Ghana_2017%29.jpg",
 
    desc: "The living heart of the Ashanti Kingdom in Kumasi, Manhyia Palace was built in 1925 as the residence of Asantehene Prempeh I after his return from British-imposed exile. Now a museum, it holds royal thrones, golden artefacts looted by colonial forces, and life-sized wax effigies — all narrated through the Ashanti people's own voice.",
 
    gallery: [
      {
        caption: "Manhyia Palace exterior, Kumasi",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://images.ghanatrvl.com/images/gh/articles/place-to-see_manhyia-palace-museum_manhyia-palace-museum-exterior-view_2024-02-19_968_1880-l.webp",
      },
      {
        caption: "Kumasi city centre and cultural hub",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://route-pricing-server-production-production.up.railway.app/media/railbucket-production-ofnqas/686dbc449cdd65113dc07225_photo_e6721db9c8.jpeg",
      },
      {
        caption: "Kente Weaving demonstration at the palace",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://app.advcollective.com/_next/image?url=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fattractions-splice-spp-720x480%2F0a%2F6b%2Fdc%2Fe9.jpg&w=3840&q=75",
      },
      {
        caption: "Artifacts — Ashanti cultural symbol",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://www.vam.ac.uk/blog/wp-content/uploads/Fig-2-1.jpg",
      },
    ],
 
    chips: ["📍 Kumasi, Ashanti Region", "⏱ 1–2 hrs", "💰 GH₵ 100", "✈️ 40min flight from Accra"],
    tips: [
      "Time your visit to coincide with the Akwasidae Festival (every 42 days) for royal pageantry",
      "Photography inside is restricted — respect the rules and let the guide narrate the artefacts",
      "Combine with Kejetia Market (2 km away) — West Africa's largest open-air market",
      "Guided tour is 30–45 minutes; tip your guide for added context and stories",
    ],
  },

  {
    id: "ada-foah",
    name: "Ada Foah Estuary",
    location: "Greater Accra Region",
    type: "Nature",
    emoji: "⛵",
    rating: 4.5,
    reviews: 1870,
    country: "ghana",
    gradientColors: ["#003366", "#1e90ff"],
 
    imageUrl:
      "https://visaliv.s3.ap-south-1.amazonaws.com/Ada-Foah-Ghana.jpg",
 
    desc: "Where the mighty Volta River dissolves into the Atlantic Ocean, Ada Foah is Ghana's most serene coastal escape. Palm-lined estuary beaches, sailing on the Volta, boat cruises to thousand-island communities, sea turtle nesting sites and fresh grilled tilapia from stilted riverside shacks make it the perfect weekend antidote to Accra.",
 
    gallery: [
      {
        caption: "Ada Foah estuary — Volta meets the Atlantic",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Volta_River_Estuary.jpg/960px-Volta_River_Estuary.jpg",
      },
      {
        caption: "Fishing boats on the Volta River at Ada",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://media02.stockfood.com/largepreviews/MjIxNDIyMjg5NQ==/71426545-Ada-Foah-fishing-village-with-thatched-huts-and-brightly-painted-boats-on-the-banks-of-the-Volta-River-in-the.jpg",
      },
      {
        caption: "Mangrove ecosystem at the Volta estuary",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://live.staticflickr.com/1916/44892309304_0f3a42c48a_b.jpg",
      },
      {
        caption: "Sunset over Ada Foah beach",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1uENcC8RwDsQRac72vh5CKmyotdkCJqfdqw&s",
      },
    ],
 
    chips: ["📍 Ada East District, Greater Accra", "⏱ Full day / Weekend", "💰 Free beach", "🚗 ~1.5h from Accra"],
    tips: [
      "Rent a boat at the harbour to cruise among the Volta delta islands — worth every cedi",
      "Book the Aqua Safari Resort or Maranatha Beach Camp for a full riverside stay",
      "Visit in August for the spectacular Asafotufiami Festival — traditional warrior dances",
      "Sea turtles nest on the beach Nov–Feb; ask locally for responsible turtle-watching tours",
    ],
  },
 
  {
    id: "jamestown",
    name: "Jamestown Lighthouse & Old Accra",
    location: "Greater Accra",
    type: "History",
    emoji: "🏮",
    rating: 4.4,
    reviews: 2680,
    country: "ghana",
    gradientColors: ["#2c1a0e", "#c05a00"],
 
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuimi87n9qITOke2QmNVv3wR43xrX2hEjUaQ&s",
 
    desc: "Accra's oldest neighbourhood pulses with colour and contradictions: Dutch colonial forts, a candy-striped lighthouse overlooking the Atlantic, world-famous boxing gyms, and explosion of street art during the Chale Wote Festival. Climb the Jamestown Lighthouse for the finest panorama of Accra's seafront — at sunrise it's breathtaking.",
 
    gallery: [
{
        caption: "Jamestown Lighthouse on the Accra seafront",
        imageUrl: "https://i.ytimg.com/vi/XyYg8BaXhiA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCcgcNqboYgx6BZLgaAmZQH9u06EQ", 
      },
      {
        caption: "Ussher Fort in Jamestown, Accra",
        imageUrl: "https://media.gettyimages.com/id/815849472/fr/photo/people-walk-by-the-jamestown-lighthouse-and-the-james-fort-prison-built-by-the-british-as-a.jpg?s=1024x1024&w=gi&k=20&c=oCw3iVk4bTSFz_3SvTBpl1NdyulTp7HASX68zCSWr7g=",
      },
      {
        caption: "Fishing boats at James Town harbour",
        imageUrl: "https://cdn.allafrica.com/download/pic/main/main/csiid/00530334:a12d5df6d7b9dedea5d0f868a3bb478b:arc614x376:w1200.jpg",
      },
      {
        caption: "Chale Wote Street Art Festival, Jamestown",
        imageUrl: "https://www.musicinafrica.net/sites/default/files/images/article/202303/chalewote-477.jpg",
      },
    ],
 
    chips: ["📍 Jamestown, Central Accra", "⏱ 2–3 hrs", "💰 GH₵ 10 lighthouse", "🚕 10–15 min from centre"],
    tips: [
      "Climb the lighthouse at sunrise for the most dramatic view over the Atlantic and old Accra",
      "Visit during the Chale Wote Street Art Festival (typically August) for an unmissable experience",
      "Ask a local guide to take you into the Bukom boxing gyms — Accra's legendary fight culture",
      "Hire a local photographer for a portrait shoot — Jamestown's colours and textures are incredible",
    ],
  },
  {
    id: "lake-bosomtwi",
    name: "Lake Bosomtwi",
    location: "Ashanti Region",
    type: "History",
    emoji: "🌊",
    rating: 4.6,
    reviews: 1340,
    country: "ghana",
    gradientColors: ["#0a2e5c", "#1e6fad"],
    imageUrl:
      "https://iugs-geoheritage.org/wp-content/uploads/2024/07/199-1-Lake-Bosumtwi-Impact-Crater.jpg",
 
    desc: "Formed by a meteorite strike 1.07 million years ago, Lake Bosumtwi sits inside a lush, forested crater 10.5 km wide. Sacred to the Ashanti, tradition forbids motorised boats — visitors paddle wooden plank-boards on the pristine water. Ten fish species exist nowhere else on Earth, and the rim hike reveals one of Ghana's most otherworldly panoramas.",
 
    gallery: [
      {
        caption: "Lake Bosumtwi from the crater rim",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHrBFynHrlwUFW_UXtgU91L5RC3s5jMb34Ag&s",
      },
      {
        caption: "Traditional opadee paddleboards on the lake",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://www.pelago.com/img/products/GH-Ghana/-lake-bosomtwe-boat-cruisely-and-kumasi-city-tours-/e05ab5d0-8c5a-4e24-8c32-f3bd7064c377_-lake-bosomtwe-boat-cruisely-and-kumasi-city-tours--large.jpg",
      },
      {
        caption: "Forested crater walls surrounding the lake",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQK158DFo3paVD4QOMHsofCeh7njB4yZPiA&s",
      },
      {
        caption: "Fishing village on the lake shore",
        // Wikimedia Commons CC BY-SA
        imageUrl:
          "https://ghana.arocha.org/wp-content/uploads/sites/42/2025/04/Picture7.jpg",
      },
    ],
 
 
    chips: ["📍 Ashanti Region, near Kumasi", "⏱ Half–Full day", "💰 GH₵ 15", "🚗 ~5h from Accra via Kumasi"],
    tips: [
      "Hire an opadee (traditional plank-board) to paddle on the sacred lake — no motors allowed",
      "The crater rim hike takes 2–3 hours with a guide and offers jaw-dropping views of the lake below",
      "Best combined with Manhyia Palace Museum in Kumasi (35 km north) as a full Ashanti day",
      "Early morning mist rising off the water turns the crater basin into a scene from a dream",
    ],
  },


  //Keta Lagoon, Boti Falls, Nzulezu Stilt Village, Elmina Castle, W.E.B. Du Bois Centre (Accra), Cape Three Points (southernmost tip of Ghana), Aburi Botanical Gardens (near Accra), Paga Crocodile Pond (Upper East Region),Shai Hills Resource Reserve (Greater Accra),Tafi Atome Monkey Sanctuary (Volta Region) 
  // History - Larabanga Mosque, Assin Manso Slave River ,Kwame Nkrumah Memorial Park (Accra)
  //Food - Osu Night Market (Accra), Chorkor Fish Market (Accra), kejetia Market (Kumasi), 
  // Culture - National Museum of Ghana (Accra), Panafest (biennial cultural festival in Cape Coast), Homowo Festival (Accra, Ga people), Akwasidae Festival (Ashanti Kingdom, Kumasi),Okomfo Anokye Sword Site (Kumasi),Tongo Hills (Upper East)
];