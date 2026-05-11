// francePlaces.ts
import type { PlaceItem } from "@/assets/data/tourData/tourTypes";

export const FRANCE_PLACES: PlaceItem[] = [
  {
    id: "eiffel-tower",
    name: "Eiffel Tower",
    location: "Paris, Île-de-France",
    type: "History",
    emoji: "🗼",
    rating: 4.9,
    reviews: 87400,
    country: "france",
    gradientColors: ["#1a1a2e", "#4a4a8a"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/1280px-Tour_Eiffel_Wikimedia_Commons.jpg",
    desc: "Built in 1889 as the entrance arch to the World's Fair, the Eiffel Tower stands 330 metres tall and remains the world's most visited paid monument. At night its 20,000 sparkling lights create one of the most iconic light shows on Earth — visible across all of Paris.",
    gallery: [
      {
        caption: "Eiffel Tower from Trocadéro",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/1280px-Tour_Eiffel_Wikimedia_Commons.jpg",
      },
      {
        caption: "Eiffel Tower at night with light show",
        imageUrl:
          "https://www.pariscityvision.com/library/image/5165.jpg",
      },
      {
        caption: "View from the Seine river at dusk",
        imageUrl:
          "https://media.istockphoto.com/id/1498516775/photo/the-eiffel-tower-in-paris-france-at-sunset.jpg?s=612x612&w=0&k=20&c=V4StdESr6-QQWOjXm6R8b1T-_slWLxasMnN6SWdV9ko=",
      },
      {
        caption: "Champ de Mars gardens below the tower",
        imageUrl:
          "https://www.civitatis.com/f/francia/paris/guia/campo-marte.jpg",
      },
    ],
    chips: ["📍 7th arr., Paris", "⏱ 2–3 hrs", "💰 €27.50 top", "🚇 Bir-Hakeim RER"],
    tips: [
      "Book tickets online months in advance — queues without a booking can be 3+ hours",
      "The best free view of the tower is from the Trocadéro esplanade across the Seine",
      "Come after 9pm for the hourly light show — absolutely breathtaking",
      "Level 1 has a glass floor walkway added in 2014 — not for the faint-hearted",
    ],
  },

  {
    id: "mont-saint-michel",
    name: "Mont Saint-Michel",
    location: "Normandy",
    type: "History",
    emoji: "⛪",
    rating: 4.9,
    reviews: 31200,
    country: "france",
    gradientColors: ["#1a2e3a", "#3a7a9c"],
    imageUrl:
      "https://www.le-mont-saint-michel.com/app/uploads/2024/02/mont-saint-michel-nuit.jpeg",
    desc: "Rising from a tidal island in Normandy, this UNESCO World Heritage medieval abbey has been a pilgrimage site since the 8th century. At high tide the sea encircles the mount completely, cutting it off from the mainland in a scene that appears almost supernatural.",
    gallery: [
      {
        caption: "Mont Saint-Michel at high tide",
        imageUrl:
          "https://normandygiteholidays.com/wp-content/uploads/2019/01/1547917825.jpg",
      },
      {
        caption: "Aerial view of the island abbey",
        imageUrl:
          "https://myfrenchcountryhomemagazine.com/wp-content/uploads/2021/09/msm-featured.jpg",
      },
      {
        caption: "Medieval streets inside the mount",
        imageUrl:
          "https://www.ot-montsaintmichel.com/en/wp-content/uploads/sites/2/2020/05/%C2%A9audic2417-47-960x1200.jpg",
      },
      {
        caption: "The abbey spire and golden archangel statue",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/8/8f/Statue_of_Saint_Michael_and_the_dragon_%28Spire_of_Mont_Saint-Michel_Abbey%29_PA00110460_%284%29.jpg",
      },
    ],
    chips: ["📍 Normandy, Manche", "⏱ Half–Full day", "💰 €13 abbey", "🚌 4h from Paris"],
    tips: [
      "Check tide tables before visiting — the dramatic 'island' effect only happens at high tide",
      "Arrive early morning to explore the cobbled streets before tour groups arrive at 10am",
      "The abbey's Gothic halls and cloisters are staggering — hire an audio guide",
      "Stay overnight to see the mount lit up at night after day visitors leave — magical",
    ],
  },

  {
    id: "palace-of-versailles",
    name: "Palace of Versailles",
    location: "Versailles, Île-de-France",
    type: "History",
    emoji: "👑",
    rating: 4.8,
    reviews: 54600,
    country: "france",
    gradientColors: ["#4a3a00", "#c8a800"],
    imageUrl:
      "https://cdn-imgix.headout.com/media/images/00a87210d0b9efdc10c1230b916c105f-269-paris-paris--palace-of-versailles-01.jpg",
    desc: "The pinnacle of French royal opulence, Versailles was home to Louis XIV and 20,000 courtiers. The Hall of Mirrors — 357 mirrors reflecting 20,000 candles — has no equal in the world. The 800-hectare gardens with their musical fountain shows are as monumental as the palace itself.",
    gallery: [
      {
        caption: "Versailles palace facade and gardens",
        imageUrl:
          "https://c8.alamy.com/comp/2DM06TF/gardens-and-facade-of-the-palace-of-versailles-a-royal-chateau-in-versailles-france-2DM06TF.jpg",
      },
      {
        caption: "Hall of Mirrors — 357 mirrors, 20,000 candles",
        imageUrl:
          "https://www.hotel-roys-versailles.com/wp-content/uploads/roys-versailles/blog/hotel-des-roys-versailles-galerie-des-glaces.webp",
      },
      {
        caption: "Grand Canal and formal gardens",
        imageUrl:
          "https://www.versailles-tourisme.com/medias/images/prestataires/multitailles/640x480_149008-vgp_0524_31.jpg",
      },
      {
        caption: "Marie Antoinette's Hamlet at the Petit Trianon",
        imageUrl:
          "https://www.francetraveltips.com/wp-content/uploads/2017/03/Versailles-Empress-Bedroom-at-Petit-Trianon.jpg",
      },
    ],
    chips: ["📍 Versailles, 20km from Paris", "⏱ Full day", "💰 €20 palace", "🚇 RER C 40min"],
    tips: [
      "Book the 'Musical Fountain Show' on Saturdays (Apr–Oct) — the gardens come alive with music",
      "Rent a golf cart or bike to cover the 800-hectare gardens — they are enormous",
      "Visit on a Tuesday — it's one of the quieter weekdays after the Monday closure",
      "Don't miss Marie Antoinette's Petit Trianon and Hamlet — a surreal pastoral escape",
    ],
  },

  {
    id: "gorges-du-verdon",
    name: "Gorges du Verdon",
    location: "Provence-Alpes-Côte d'Azur",
    type: "Nature",
    emoji: "🏞️",
    rating: 4.8,
    reviews: 18700,
    country: "france",
    gradientColors: ["#003333", "#00897b"],
    imageUrl:
      "https://www.rivieraloisirs.com/public/uploads/2020/04/gorges-du-verdon-iStock-474863300-1024x683.jpg",
    desc: "Europe's answer to the Grand Canyon — 25 km long, up to 700 metres deep, carved by a river so turquoise it looks like liquid glass. Kayak through towering limestone walls, drive the legendary Route des Crêtes, or hike the Sentier Martel trail to views that will stop you in your tracks.",
    gallery: [
      {
        caption: "Gorges du Verdon — turquoise river from the rim",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Verdon_Gorge_1.jpg/1280px-Verdon_Gorge_1.jpg",
      },
      {
        caption: "Kayaking through the canyon walls",
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/54acc4b9e4b017b15a9f362a/1497298648040-R4CA9CFX9Z3KN7ZW1E31/labyrinth-canyon-0980-min.jpg",
      },
      {
        caption: "Lac de Sainte-Croix — turquoise reservoir at canyon end",
        imageUrl:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ca/d7/23/scorci.jpg?w=1200&h=-1&s=1",
      },
      {
        caption: "Moustiers-Sainte-Marie village above the gorge",
        imageUrl:
          "https://images.ctfassets.net/43cg184ejz07/1hfIaYGyJC42dGnr8IMWTQ/25155d384a4de8a1f9a8d90ea078b98d/Moustiers.fr.jpg?fm=jpg&w=1024&h=683&fit=fill",
      },
    ],
    chips: ["📍 Alpes-de-Haute-Provence", "⏱ Full day+", "💰 Free entry", "🚗 1.5h from Nice"],
    tips: [
      "Rent a kayak or pedal boat at the Galetas Bridge — the only way to truly feel the canyon walls",
      "Drive the Route des Crêtes (D23) for the most dramatic rim views — stop at Point Sublime",
      "Swim in Lac de Sainte-Croix at the western end — the water is warm and impossibly blue",
      "Stay in Moustiers-Sainte-Marie, one of France's most beautiful villages, for a perfect base",
    ],
  },
  {
    id: "annecy",
    name: "Annecy Old Town & Lake",
    location: "Haute-Savoie, Auvergne-Rhône-Alpes",
    type: "Nature",
    emoji: "🏔️",
    rating: 4.8,
    reviews: 22100,
    country: "france",
    gradientColors: ["#002244", "#0077b6"],
    imageUrl:
      "https://frenchmoments.eu/wp-content/uploads/2014/05/Annecy-Old-Town-copyright-French-Moments.jpg",
    desc: "Called the Venice of the Alps, Annecy pairs a pastel-coloured medieval old town with the purest lake in Europe, ringed by snow-capped mountains. Canal bridges draped in flowers, a 12th-century island prison, and crystal-clear aquamarine waters make this the most romantic town in France.",
    gallery: [
      {
        caption: "Annecy old town canals with Alps backdrop",
        imageUrl:
          "https://media.houseandgarden.co.uk/photos/658161a32268d27b8458fd3f/1:1/w_4438,h_4438,c_limit/1091721158",
      },
      {
        caption: "Palais de l'Île — 12th century island prison",
        imageUrl:
          "https://frenchmoments.eu/wp-content/uploads/2014/05/Annecy-Palais-de-lIle-03-copyright-French-Moments.jpg",
      },
      {
        caption: "Lake Annecy — Europe's cleanest lake",
        imageUrl:
          "https://gites-production-wr-wp.s3.eu-central-1.amazonaws.com/uploads/sites/2/2023/05/Luchtfoto-van-het-Meer-van-Annecy-in-de-zomer-L-scaled-1-1328x640.jpg",
      },
      {
        caption: "Pont des Amours — the famous Lovers' Bridge",
        imageUrl:
          "https://www.locationlacannecy.fr/blog/wp-content/uploads/elementor/thumbs/Pont-damour-annecy-rizrqo688dbvytotxwog74h2m7sdj2q5n5wvxcprvo.jpg",
      },
    ],
    chips: ["📍 Haute-Savoie, Alps", "⏱ Full day+", "💰 Free old town", "🚆 2h from Lyon"],
    tips: [
      "Visit the Tuesday and Friday markets in the old town for the best local cheeses and charcuterie",
      "Rent a paddleboard or take a boat tour — the lake views of the Alps are otherworldly",
      "Paragliding from Forclaz above the lake is the most spectacular way to see Annecy — bookable locally",
      "Arrive in June for the legendary Annecy International Animation Film Festival",
    ],
  },

  {
    id: "carcassonne",
    name: "Cité de Carcassonne",
    location: "Occitanie",
    type: "History",
    emoji: "🏰",
    rating: 4.7,
    reviews: 19800,
    country: "france",
    gradientColors: ["#3a1a00", "#8b5e3c"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/25/1_carcassonne_aerial_2016.jpg",
    desc: "The world's largest and best-preserved medieval fortified city — 3 km of double walls, 52 towers, and a castle within a castle. This UNESCO World Heritage walled city looks exactly as it did in the Middle Ages and stands as one of the great achievements of European military architecture.",
    gallery: [
      {
        caption: "Carcassonne — the complete medieval city from the south",
        imageUrl:
          "https://visit-carcassonne.com/cdn/shop/collections/medieval-cite-of-carcassonne.png?v=1753446348",
      },
      {
        caption: "Double ramparts and towers at dusk",
        imageUrl:
          "https://www.visit-occitanie.com/uploads/sites/2/2021/1/la-cite-de-carcassonne-la-nuit_hjrivas-de-pixabay.jpg",
      },
      {
        caption: "Château Comtal inside the walled city",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNzfdpD_ZZPfvZUOiodqvcEf6uT7fmdKi3DA&s",
      },
      {
        caption: "Medieval streets of the Cité",
        imageUrl:
          "https://loveincorporated.blob.core.windows.net/contentimages/gallery/d5d69fe5-14e5-423d-8df9-ddb9bb608a1e-medievalcities-york.jpg",
      },
    ],
    chips: ["📍 Occitanie, southern France", "⏱ Half–Full day", "💰 €12 castle", "🚆 4.5h from Paris TGV"],
    tips: [
      "Walk the outer ramparts at sunset when the crowds thin and the light turns the stone gold",
      "Book the Château Comtal guided tour — the history of sieges and Cathars is extraordinary",
      "July 14th (Bastille Day) sees Carcassonne host one of France's most spectacular fireworks shows",
      "Stay in the lower Bastide Saint-Louis (new town) — accommodation inside the Cité is expensive",
    ],
  },

  {
    id: "provence-lavender",
    name: "Provence Lavender Fields",
    location: "Provence, Alpes-de-Haute-Provence",
    type: "Nature",
    emoji: "💜",
    rating: 4.9,
    reviews: 14300,
    country: "france",
    gradientColors: ["#2d0060", "#9b59b6"],
    imageUrl:
      "https://www.lelongweekend.com/wp-content/uploads/2020/06/DSC03193-1024x682.jpg",
    desc: "The Plateau de Valensole in July is one of the most breathtaking natural spectacles in Europe — endless rows of purple lavender rolling toward limestone hills, buzzing with bees, and filling the air with a scent so intense it feels like a dream. Van Gogh and Cézanne came here for a reason.",
    gallery: [
      {
        caption: "Valensole Plateau in full bloom — July",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_HtG1pP6d3u9g4ybVKDqythmAWvI4niRv9A&s",
      },
      {
        caption: "Lavender rows at sunrise, Luberon",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7G5F6K2KreHPudvyPw4TWWBzZIfV4QiEL1g&s",
      },
      {
        caption: "Sénanque Abbey surrounded by lavender",
        imageUrl:
          "https://luxeadventuretraveler.com/wp-content/uploads/2012/07/Jdombs-Travels-Abbey-3.jpg",
      },
      {
        caption: "Lavender distillery at Manosque",
        imageUrl:
          "https://uk.destinationluberon.com/image/116812-normal-500-300-5:3.webp",
      },
    ],
    chips: ["📍 Valensole & Luberon, Provence", "⏱ Full day", "💰 Free fields", "🚗 1.5h from Aix-en-Provence"],
    tips: [
      "Peak bloom is late June to mid-July — the exact week varies by year, check local forecasts",
      "Go at 6am for empty fields, perfect golden light, and misty morning atmosphere",
      "The Sénanque Abbey (near Gordes) framed by lavender is the single most photographed scene in Provence",
      "Visit a lavender distillery — the essential oil extraction process in July is fascinating",
    ],
  },

  {
    id: "colmar",
    name: "Colmar — Little Venice of Alsace",
    location: "Alsace, Grand Est",
    type: "Lifestyle",
    emoji: "🍷",
    rating: 4.8,
    reviews: 16500,
    country: "france",
    gradientColors: ["#3a0011", "#c0392b"],
    imageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/none/path/sa6549607c78f5c11/image/ieddf14d3fb4320f6/version/1521120743/little-venice-colmar-france.jpg",
    desc: "Colmar is what every fairy-tale European town wishes it could be — half-timbered houses in candy colours reflected in the canal of Petite Venise, flower boxes overflowing from every window, and wine that rivals Burgundy. At Christmas it transforms into arguably the most beautiful Christmas market in the world.",
    gallery: [
      {
        caption: "Petite Venise — the iconic canal quarter",
        imageUrl:
          "https://res.cloudinary.com/hzekpb1cg/image/upload/q_95,f_auto/s3/public/prod/2023-12/petite-venise-barque-lauch.jpg",
      },
      {
        caption: "Half-timbered houses on Rue des Marchands",
        imageUrl:
          "https://media01.stockfood.com/largepreviews/MjE3NDc2ODU0NA==/70153824-Rue-des-Marchands-Half-timbered-houses-in-the-old-town-of-Colmar-Colmar-Alsace-France.jpg",
      },
      {
        caption: "Colmar Christmas market in winter",
        imageUrl:
          "https://www.museeduvin-colmar.fr/wp-content/uploads/2024/06/thio-noel-colmar-aaa-nis-for-1600x900-1.jpg",
      },
      {
        caption: "Alsace wine tasting in a Winstub",
        imageUrl:
          "https://static.visit.alsace/wp-content/uploads/lei/pictures/222000136-restaurant-winstub-au-bon-pichet-1-1600x900.jpg",
      },
    ],
    chips: ["📍 Colmar, Alsace", "⏱ Full day", "💰 Free to walk", "🚆 2.5h from Paris TGV"],
    tips: [
      "Rent a flat-bottom boat in Petite Venise for the most magical perspective of the coloured houses",
      "Visit the Unterlinden Museum — home to the extraordinary Isenheim Altarpiece (1515)",
      "Drive the Route des Vins d'Alsace — 170 km of vineyards connecting Strasbourg to Colmar",
      "Arrive in late November for one of Europe's most spectacular Christmas markets — 5 separate markets in the old town",
    ],
  },

  {
    id: "dune-du-pilat",
    name: "Dune du Pilat",
    location: "Arcachon, Nouvelle-Aquitaine",
    type: "Nature",
    emoji: "🏜️",
    rating: 4.7,
    reviews: 12400,
    country: "france",
    gradientColors: ["#7a4f00", "#e8a020"],
    imageUrl:
      "https://i0.wp.com/whats-the-plan.com/wp-content/uploads/2026/01/Randonnee-Dune-du-Pilat-Nouvelle-Aquitaine.jpg?resize=1024%2C683&ssl=1",
    desc: "Europe's tallest sand dune — 110 metres high, 3 km long — sits at the edge of a pine forest facing the Atlantic Ocean. Climb barefoot through the soft sand and reach a summit where the ocean stretches left, the green forest spreads right, and the Arcachon Bay glitters below. Nothing in Europe looks like this.",
    gallery: [
      {
        caption: "Dune du Pilat — Europe's tallest dune",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/d/d4/DunePyla.JPG",
      },
      {
        caption: "View from the summit over the Atlantic Ocean",
        imageUrl:
          "https://www.biscagrandslacs.com/sites/default/files/styles/ogimage/public/medias/images/dune-du-pilat-gironde.jpg.webp?itok=evmGzlXJ",
      },
      {
        caption: "The dune edge meets the pine forest",
        imageUrl:
          "https://www.domainedelaforge.com/en/images/1741609490/landscape-large/histoire-dune-pilat-jpg.jpg",
      },
      {
        caption: "Arcachon Bay and oyster beds at low tide",
        imageUrl:
          "https://img.mauritius-images.com/OTON/cprev/09181654.jpg/save_as_name/mauritius%20images%20-%2009181654%20-%20France%2C%20New%20Aquitaine%2C%20Arcachon%20Bay%2C%20Cap%20Ferret%2C%20oyster%20farming.jpg",
      },
    ],
    chips: ["📍 Arcachon, Gironde", "⏱ Half day", "💰 Free (parking fee)", "🚆 1h from Bordeaux"],
    tips: [
      "Climb in the early morning before the midday sun makes the sand too hot to walk barefoot",
      "The descent is steep — most people slide down on their bottoms; it's as fun as it sounds",
      "Combine with oyster tasting in the Arcachon village of Gujan-Mestras on the same day",
      "Paragliding from the top is legal and spectacular — several operators are based at the dune",
    ],
  },

  {
    id: "etretat",
    name: "Étretat Cliffs",
    location: "Normandy, Seine-Maritime",
    type: "Nature",
    emoji: "🌊",
    rating: 4.7,
    reviews: 9800,
    country: "france",
    gradientColors: ["#003366", "#1a6699"],
    imageUrl:
      "https://www.francetraveltips.com/wp-content/uploads/2018/07/Falaise-dAval-Etretat-J.-Chung.jpg",
    desc: "The chalk cliffs of Étretat — immortalised by Monet and Guy de Maupassant — arch dramatically into the English Channel, pierced by natural sea arches carved over millennia. The Porte d'Aval arch and the soaring Aiguille rock needle are among the most painted and photographed coastal scenes in Europe.",
    gallery: [
      {
        caption: "Porte d'Aval arch and the Aiguille needle",
        imageUrl:
          "https://www.shutterstock.com/image-photo/framed-perspective-needle-aval-arch-600nw-2763758655.jpg",
      },
      {
        caption: "Étretat beach and chalk cliffs from below",
        imageUrl:
          "https://media.istockphoto.com/id/2255850388/photo/%C3%A9tretat-white-chalk-cliffs-and-natural-rock-arch-aerial-view.jpg?s=612x612&w=0&k=20&c=UommimjrkiQUkpRdR8MEm9oJ3mlq8lvTR1rUxXb6H4o=",
      },
      {
        caption: "Sunset over the Falaise d'Aval arch",
        imageUrl:
          "https://en.normandie-tourisme.fr/app/uploads/2023/05/aiguille-creuse-etretat-rochagneux-fotolia-com.jpg",
      },
      {
        caption: "Étretat village and market square",
        imageUrl:
          "https://www.lehavre-etretat-tourisme.com/uploads/2020/04/etretat_0000-00_village-d-etretat_vincent-rustuel-1024x682.jpg",
      },
    ],
    chips: ["📍 Normandy coast, Seine-Maritime", "⏱ Half–Full day", "💰 Free", "🚗 3h from Paris"],
    tips: [
      "Hike the Falaise d'Aval path to the top of the arch — the view down is vertiginous and extraordinary",
      "Come at low tide to walk under the arch on the beach — check local tide tables",
      "The Jardins d'Étretat above the village have modern sculpted gardens with cliff views — worth the entry fee",
      "Visit on a weekday in May or September to avoid the summer crowds on the pebble beach",
    ],
  },

  {
    id: "chamonix",
    name: "Chamonix & Mont Blanc",
    location: "Haute-Savoie, French Alps",
    type: "Nature",
    emoji: "🏔️",
    rating: 4.9,
    reviews: 27600,
    country: "france",
    gradientColors: ["#1a2e4a", "#4a90d9"],
    imageUrl:
      "https://alpina-relocation.fr/wp-content/uploads/2025/07/Chamonix-Mont-Blanc-Featured-Image-copyright-French-Moments.jpg",
    desc: "Home to Europe's highest peak (4,808 m) and the most extreme mountain landscape on the continent. The Aiguille du Midi cable car lifts you to 3,842 metres in 20 minutes — above the clouds — for a 360° panorama of the Alps that is genuinely life-changing. World capital of alpinism and adventure sports.",
    gallery: [
      {
        caption: "Chamonix valley and Mont Blanc massif",
        imageUrl:
          "https://cdn.prod.website-files.com/67293151b30f60a50b802423/679101e9085142b84827a772_Massif%20du%20Mont-Blanc%20-%20Les%20Aiglons.webp",
      },
      {
        caption: "Aiguille du Midi cable car station at 3,842m",
        imageUrl:
          "https://www.chamonix.net/sites/default/files/images/aig-du-midi/aiguille-du-midi-cable-car-photo.jpg",
      },
      {
        caption: "Mer de Glace glacier — France's largest",
        imageUrl:
          "https://iugs-geoheritage.org/wp-content/uploads/2024/07/112-1-Mer-Glace.jpg",
      },
      {
        caption: "Skiing the Vallée Blanche — 20km off-piste run",
        imageUrl:
          "https://www.chamonix.net/sites/default/files/post-gallery/vallee-blanche-yan-2023-1.jpg",
      },
    ],
    chips: ["📍 Chamonix, Haute-Savoie", "⏱ 2+ days", "💰 €65 Aiguille cable car", "🚆 1h from Geneva"],
    tips: [
      "Book the Aiguille du Midi cable car weeks ahead — it sells out and the weather window matters",
      "The Vallée Blanche off-piste ski run (20 km) is one of the greatest ski experiences on Earth — hire a guide",
      "Take the Montenvers train to the Mer de Glace glacier and walk inside the ice caves",
      "Summer hiking (July–September) on the Tour du Mont Blanc trails offers views without ski crowds",
    ],
  },

  {
    id: "loire-chateaux",
    name: "Châteaux of the Loire Valley",
    location: "Centre-Val de Loire",
    type: "History",
    emoji: "🏯",
    rating: 4.8,
    reviews: 23400,
    country: "france",
    gradientColors: ["#2e3a00", "#6b8e23"],
    imageUrl:
      "https://gobargingwp-s3.s3.eu-west-1.amazonaws.com/wp-content/uploads/2022/11/Chateau-de-Chenonceau-in-the-Loire-Valley.jpg",
    desc: "The Loire Valley's 300+ châteaux are the ultimate expression of French Renaissance power and elegance. Chambord's double-helix staircase (attributed to Leonardo da Vinci) and Chenonceau spanning the River Cher on arched bridges are among the most beautiful buildings ever constructed in Europe.",
    gallery: [
      {
        caption: "Château de Chambord — François I's hunting lodge",
        imageUrl:
          "https://rachelsruminations.com/wp-content/uploads/2024/10/Chambord-side-view.jpg",
      },
      {
        caption: "Château de Chenonceau spanning the River Cher",
        imageUrl:
          "https://thumbs.dreamstime.com/b/chateau-de-chenonceau-french-castle-spanning-river-cher-near-chenonceaux-village-loire-valley-france-view-small-165234465.jpg",
      },
      {
        caption: "Château d'Amboise above the Loire River",
        imageUrl:
          "https://loirelovers.fr/wp-content/uploads/2022/11/chateau-amboise-castle-visit.jpeg",
      },
      {
        caption: "Loire Valley vineyards at harvest time",
        imageUrl:
          "https://www.destination-angers.com/app/uploads/destination-angers-tourisme/2022/08/thumbs/vignoble-savennieres-640x640.jpg",
      },
    ],
    chips: ["📍 Loire Valley, Centre-Val de Loire", "⏱ 2–3 days", "💰 €14–17 per château", "🚆 1h from Paris"],
    tips: [
      "Rent a bike in Blois or Amboise — the châteaux are connected by quiet lanes perfect for cycling",
      "Chenonceau is the most beautiful single château — go at opening time (9am) before tour coaches arrive",
      "Chambord's rooftop terrace gives an extraordinary view of 365 chimneys — book a rooftop tour",
      "Visit in September for the harvest season — Loire wines (Vouvray, Sancerre, Muscadet) are exceptional",
    ],
  },
];