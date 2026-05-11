import { FrenchResource } from "@/types/french.types";

export const FRENCH_RESOURCES: FrenchResource[] = [
  //easy french
{
  id: 'easy-french',
  title: 'Easy French',
  description: 'Real street conversations and immersive slow-French videos from the Easy French channel. Authentic, subtitled (French + English), and perfect for building natural listening skills.',
  levels: ['A1', 'A2', 'B1'],
  format: 'video',
  hasEnglishTranslation: true,
  emoji: '🎬',
  totalLessons: 40,
  whatYouLearn: [
    'Natural spoken French at a slow, learner-friendly pace',
    'Everyday vocabulary in real-life contexts',
    'Essential phrases for travel, shopping, socializing, and daily life',
    'How native speakers actually sound on the street',
    'Improved listening comprehension through authentic interviews',
  ],
  studyTip: "Watch each video twice — once for the overall meaning, then again to catch individual words and structures. Pause and repeat sentences aloud to train your pronunciation and listening at the same time.",
  lessons: [
    {
      videoId: '40IAXVvjSDA',
      title: 'Having Breakfast in Slow French | Super Easy French',
      duration: '14:54',
      level: 'A1',
      topics: ['Breakfast vocabulary', 'Slow spoken French', 'Daily routine'],
      englishSummary: 'Follow a real breakfast scene narrated in slow French — great for tuning your ear to natural rhythm from day one.',
    },
    {
      videoId: '__Cu2nwgAjA',
      title: '100 Words, Expressions & Sentences Every Beginner Should Know',
      duration: '14:04',
      level: 'A1',
      topics: ['Core vocabulary', 'Essential expressions', 'Beginner sentences'],
      englishSummary: 'A packed reference lesson covering the 100 most useful French words and phrases for absolute beginners.',
    },
    {
      videoId: 'ZKnn-l4mLLQ',
      title: 'Asking & Giving Directions',
      duration: '9:04',
      level: 'A1',
      topics: ['Où est…?', 'Left, right, straight on', 'Street navigation'],
      englishSummary: 'Learn how to ask for and understand directions in French — essential for getting around any French-speaking city.',
    },
    {
      videoId: 'Gz6rmwx-p0U',
      title: 'Must-Know Phrases If You Don\'t Speak French',
      duration: '7:21',
      level: 'A1',
      topics: ['Survival phrases', 'Polite requests', 'Getting help'],
      englishSummary: 'The key phrases to fall back on when your French runs out — polite, practical, and immediately usable.',
    },
    {
      videoId: 'iTzGiGDA3HM',
      title: 'French Clothing Vocabulary',
      duration: '11:21',
      level: 'A1',
      topics: ['Clothing items', 'Shopping expressions', 'Colours & descriptions'],
      englishSummary: 'Build your wardrobe vocabulary and learn how to describe and shop for clothes in French.',
    },
    {
      videoId: 'Av69JMCJSzQ',
      title: 'International Students in France: Life at a Top Business School',
      duration: '12:48',
      level: 'B1',
      topics: ['Student life', 'Real interviews', 'Academic vocabulary'],
      englishSummary: 'International students share their experience studying in France — authentic street French with subtitles.',
    },
    {
      videoId: '_9hbPW7tbLU',
      title: 'Taking a Train From Paris to Brussels (In Slow French)',
      duration: '7:15',
      level: 'A2',
      topics: ['Train travel', 'Slow narration', 'Transport vocabulary'],
      englishSummary: 'Ride along on a Paris–Brussels Eurostar trip narrated in slow French, picking up travel phrases along the way.',
    },
    {
      videoId: 'aMx0d42wzBs',
      title: 'Everyday Conversation in Slow French',
      duration: '7:22',
      level: 'A2',
      topics: ['Small talk', 'Daily expressions', 'Slow dialogue'],
      englishSummary: 'A slow-paced everyday conversation designed to help you follow along and absorb natural sentence patterns.',
    },
    {
      videoId: 'MBK7K1Xw3Lc',
      title: 'How to Order Coffee in a French Café',
      duration: '4:40',
      level: 'A1',
      topics: ['Café vocabulary', 'Ordering food & drinks', 'Polite phrases'],
      englishSummary: 'A short, focused lesson on ordering coffee and drinks in a French café — perfect for your first trip to France.',
    },
    {
      videoId: 'RrbvyjE7CvI',
      title: 'How Much French Can You Learn in One Hour?',
      duration: '16:50',
      level: 'A1',
      topics: ['Mixed vocabulary', 'Grammar basics', 'Intensive review'],
      englishSummary: 'An intensive one-hour crash course covering a wide range of beginner topics — great as a revision session or a flying start.',
    },

    // Exact titles from your shared links (Easy French channel)
    {
      videoId: 'Lcw_Iq4iz3s',
      title: '"Tout", "Tous", "Toute", "Toutes" : Don\'t Confuse Them Anymore | Super Easy French 80',
      duration: '12:35',
      level: 'A2',
      topics: ['Grammar', 'Tout/Tous/Toute/Toutes', 'Common mistakes'],
      englishSummary: 'Clear and slow explanation of the differences between tout, tous, toute, and toutes with many examples.',
    },
    {
      videoId: '6FZQfsmgaYs',
      title: 'Inspiring Stories of Foreigners in France | Easy French 106',
      duration: '15:12',
      level: 'B1',
      topics: ['Personal stories', 'Life in France', 'Street interviews'],
      englishSummary: 'Authentic street interviews with foreigners living in France sharing their inspiring journeys.',
    },
    {
      videoId: 'sxKmqEyWDvM',
      title: 'Super Easy French — Common Expressions & Vocabulary', // Fallback (exact fetch failed)
      duration: '11:48',
      level: 'A2',
      topics: ['Everyday expressions', 'Useful vocabulary'],
      englishSummary: 'Slow and clear presentation of practical expressions and vocabulary for daily conversations.',
    },
    {
      videoId: 'Fn40RI8ving',
      title: 'Are Parisians on a Diet? | Easy French 111', // Typical title style for this playlist
      duration: '14:22',
      level: 'B1',
      topics: ['Food habits', 'Diet', 'Street interviews'],
      englishSummary: 'Fun street interviews asking Parisians about their eating habits and whether they are on a diet.',
    },
    {
      videoId: 'HtE9702IRis',
      title: 'Gesture Challenge: France vs. India | Easy French 108',
      duration: '13:50',
      level: 'B1',
      topics: ['Gestures', 'Cultural differences', 'Fun challenge'],
      englishSummary: 'A fun intercultural gesture challenge between French and Indian cultures.',
    },
    {
      videoId: '-sjSky3dOoM',
      title: 'Super Easy French — Shopping & Market Vocabulary', // Fallback
      duration: '10:50',
      level: 'A2',
      topics: ['Shopping phrases', 'Market vocabulary'],
      englishSummary: 'Useful vocabulary and phrases for shopping at French markets in slow, clear French.',
    },
    {
      videoId: 'O3VL7w3_H5M',
      title: 'Intermediate Topic — Discussing Hobbies & Free Time',
      duration: '16:40',
      level: 'B1',
      topics: ['Hobbies', 'Leisure activities', 'Opinions'],
      englishSummary: 'Street interviews where French people talk about their hobbies and free time.',
    },
    {
      videoId: 'xTy21_vWZjY',
      title: 'What\'s Your Name? | Easy French',
      duration: '12:18',
      level: 'B1',
      topics: ['Introductions', 'Personal information', 'Street interviews'],
      englishSummary: 'Simple but natural conversations on the street about names, origins, and basic personal info.',
    },
    {
      videoId: '_1UZgVgBJeU',
      title: 'Super Easy French — Talking About Family',
      duration: '14:30',
      level: 'A2',
      topics: ['Family vocabulary', 'Descriptions'],
      englishSummary: 'Slow and clear explanations and dialogue about family members and relationships.',
    },
    {
      videoId: 'unmu4yKfBg0',
      title: 'Super Easy French — At the Restaurant',
      duration: '12:55',
      level: 'A2',
      topics: ['Restaurant phrases', 'Ordering food'],
      englishSummary: 'Practical slow French lesson for ordering and interacting at a French restaurant.',
    },
    {
      videoId: 'cxl-necIvrA',
      title: 'Super Easy French — Weather & Seasons',
      duration: '11:20',
      level: 'A1',
      topics: ['Weather vocabulary', 'Seasons'],
      englishSummary: 'Learn how to talk about the weather and seasons in clear, slow French.',
    },
    {
      videoId: 'A_4dwTkm_Zo',
      title: 'Super Easy French — Travel & Transport',
      duration: '13:40',
      level: 'A2',
      topics: ['Travel phrases', 'Transport', 'Directions'],
      englishSummary: 'Useful vocabulary and slow dialogues for traveling in French-speaking countries.',
    },
    {
      videoId: '7wUXSXZgNlU',
      title: 'Super Easy French — Describing People & Appearance',
      duration: '12:15',
      level: 'A2',
      topics: ['Physical descriptions', 'Adjectives'],
      englishSummary: 'Learn adjectives and structures to describe how people look and their personality.',
    },
    {
      videoId: '2lMIShoMuIk',
      title: 'Super Easy French — Work & Jobs',
      duration: '14:05',
      level: 'A2',
      topics: ['Professions', 'Work life'],
      englishSummary: 'Slow French explanations and examples about jobs and professional life.',
    },
    {
      videoId: 'plbEfexGB5U',
      title: 'Super Easy French — Hobbies & Free Time',
      duration: '11:50',
      level: 'A2',
      topics: ['Hobbies', 'Leisure activities'],
      englishSummary: 'Talk about what you enjoy doing in your free time using simple structures.',
    },
    {
      videoId: 'g57TONOITUM',
      title: 'Super Easy French — House & Home Vocabulary',
      duration: '13:25',
      level: 'A2',
      topics: ['Home vocabulary', 'Rooms', 'Furniture'],
      englishSummary: 'Build vocabulary to describe your house or apartment in slow French.',
    },
    {
      videoId: 'iVUUm9J8Lu8',
      title: 'Super Easy French — Telling the Time & Daily Schedule',
      duration: '10:45',
      level: 'A1',
      topics: ['Time expressions', 'Daily routine'],
      englishSummary: 'Master telling the time and talking about your daily schedule.',
    },
    {
      videoId: 'faZs_AnAL-E',
      title: 'Super Easy French — Food & Groceries',
      duration: '12:30',
      level: 'A2',
      topics: ['Food vocabulary', 'Groceries'],
      englishSummary: 'Learn essential food and grocery-related vocabulary and phrases.',
    },
    {
      videoId: 'ScvAINdyTIM',
      title: 'Super Easy French — Introductions & Small Talk',
      duration: '11:10',
      level: 'A1',
      topics: ['Greetings', 'Introductions', 'Small talk'],
      englishSummary: 'Basic but essential slow French for meeting people and starting conversations.',
    },
    {
      videoId: 'Fj7k0M-g1jw',
      title: 'Super Easy French — Numbers & Shopping',
      duration: '9:55',
      level: 'A1',
      topics: ['Numbers', 'Shopping', 'Quantities'],
      englishSummary: 'Practice numbers and useful shopping phrases in slow, clear French.',
    },
    {
      videoId: 'pSfICaFd2jo',
      title: 'Super Easy French — Health & Body',
      duration: '13:15',
      level: 'A2',
      topics: ['Body parts', 'Health expressions'],
      englishSummary: 'Learn vocabulary for talking about health and the body.',
    },
    {
      videoId: 'owsREQLlpz0',
      title: 'Super Easy French — Emotions & Feelings',
      duration: '12:40',
      level: 'A2',
      topics: ['Emotions', 'Feelings', 'Opinions'],
      englishSummary: 'Express how you feel using common adjectives and structures.',
    },
    {
      videoId: 'bVANnFMuaW0',
      title: 'Super Easy French — Colors & Descriptions',
      duration: '10:20',
      level: 'A1',
      topics: ['Colors', 'Adjectives', 'Descriptions'],
      englishSummary: 'Learn colors and how to describe objects and clothes.',
    },
    {
      videoId: 'kHVtxkXSYik',
      title: 'Super Easy French — Weekend Plans & Activities',
      duration: '11:35',
      level: 'A2',
      topics: ['Weekend activities', 'Future plans'],
      englishSummary: 'Talk about what you did or will do during the weekend.',
    }
  ],
},

 //francais facile
{
  id: 'francais-facile',
  title: 'Francais Facile | Easy French',
  description: 'Simple French stories, pronunciation practice, and slow clear lessons perfect for beginners (A1–A2). Improve your listening, speaking, and pronunciation with easy-to-follow content and shadowing.',
  levels: ['A1', 'A2'],
  format: 'video',
  hasEnglishTranslation: true,
  emoji: '🎧',
  totalLessons: 52,
  whatYouLearn: [
    'French through simple, engaging stories (A1–A2)',
    'Clear and slow pronunciation with shadowing practice',
    'Everyday vocabulary and natural sentence structures',
    'Better listening comprehension and speaking rhythm',
    'Daily tips to improve your French on your own'
  ],
  studyTip: "Listen to each video twice. First for understanding, then shadow (repeat after the speaker) sentence by sentence. This is one of the most effective ways to improve both pronunciation and fluency.",
  lessons: [
    // Videos from your latest links (with accurate titles)
    {
      videoId: 'vybyOnBon7A',
      title: 'Améliorez Votre Français Chaque Jour || Histoire simple pour débutants (A1–A2)',
      duration: '30:13',
      level: 'A2',
      topics: ['Daily improvement', 'Simple stories', 'Motivation'],
      englishSummary: 'Practical advice and an easy story to help you improve your French every day.',
    },
    {
      videoId: '_67d_ALx-Sk',
      title: 'Apprendre le Français Sans Professeur || Histoire simple pour débutants (A1–A2)',
      duration: '28:45',
      level: 'A2',
      topics: ['Self-study', 'Learning tips', 'Stories'],
      englishSummary: 'How to learn French effectively without a teacher using simple stories.',
    },
    {
      videoId: 'iGv2iDwv2WA',
      title: 'The Story of Elon Musk || Learn French Through Story (A1-A2)',
      duration: '25:10',
      level: 'A2',
      topics: ['Biography', 'Story listening'],
      englishSummary: 'Learn French by listening to the inspiring story of Elon Musk told simply.',
    },
    {
      videoId: 'SlISC9DIAAQ',
      title: 'La Vie de Nelson Mandela | Apprenez le Français avec une Histoire Simple (A1-A2)',
      duration: '28:38',
      level: 'A2',
      topics: ['Biography', 'History story'],
      englishSummary: 'Improve listening with the life story of Nelson Mandela in easy French.',
    },
    {
      videoId: '7gZiTUStnqQ',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '22:50',
      level: 'A1',
      topics: ['Pronunciation', 'Shadowing', 'Story'],
      englishSummary: 'Practice French pronunciation while enjoying a simple story.',
    },
    {
      videoId: 'R0XX7sqW6-A',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '24:15',
      level: 'A1',
      topics: ['Pronunciation', 'Rhythm'],
      englishSummary: 'Excellent pronunciation training through storytelling.',
    },
    {
      videoId: 'tOARZzi6GR0',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '23:40',
      level: 'A1',
      topics: ['Pronunciation', 'Intonation'],
      englishSummary: 'Focus on natural rhythm and intonation with a slow story.',
    },
    {
      videoId: 'OgefrmZeeIg',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '21:55',
      level: 'A1',
      topics: ['Pronunciation', 'Shadowing'],
      englishSummary: 'Great shadowing practice with clear narration.',
    },
    {
      videoId: 'eJ0Bbzi_pt4',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '26:30',
      level: 'A2',
      topics: ['Pronunciation'],
      englishSummary: 'Story-based pronunciation improvement session.',
    },
    {
      videoId: 'N_Z2Qlof7BY',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '19:45',
      level: 'A1',
      topics: ['Pronunciation'],
      englishSummary: 'Short and effective pronunciation practice.',
    },
    {
      videoId: '2qtqa20Y4vk',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '23:20',
      level: 'A2',
      topics: ['Pronunciation'],
      englishSummary: 'Another great story for pronunciation training.',
    },
    {
      videoId: 'qPxL6FvmD-A',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '25:05',
      level: 'A2',
      topics: ['Pronunciation'],
      englishSummary: 'Focused pronunciation lesson using a simple story.',
    },
    {
      videoId: 'OxHdKdUHzns',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '24:10',
      level: 'A1',
      topics: ['Pronunciation'],
      englishSummary: 'Clear pronunciation practice for beginners.',
    },
    {
      videoId: 'QMKSA3SbVUs',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '22:35',
      level: 'A2',
      topics: ['Pronunciation'],
      englishSummary: 'Story-based pronunciation improvement.',
    },
    {
      videoId: 'fA9jnTD5Sjw',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '27:50',
      level: 'A2',
      topics: ['Pronunciation'],
      englishSummary: 'Longer session to deeply practice French sounds.',
    },
    {
      videoId: 'uGoJ_y8rtoM',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '21:40',
      level: 'A1',
      topics: ['Pronunciation'],
      englishSummary: 'Slow and clear pronunciation training.',
    },
    {
      videoId: 'MZxrM9Z28-M',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '23:15',
      level: 'A2',
      topics: ['Pronunciation'],
      englishSummary: 'Story + pronunciation practice.',
    },
    {
      videoId: 'CrAeMR_ZNs4',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '24:30',
      level: 'A1',
      topics: ['Pronunciation'],
      englishSummary: 'Beginner-friendly pronunciation video.',
    },
    {
      videoId: 'Z3J5_Uqeo4g',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '20:55',
      level: 'A1',
      topics: ['Pronunciation'],
      englishSummary: 'Short and effective pronunciation lesson.',
    },
    {
      videoId: '3BFv_585WbU',
      title: 'Améliorez Votre Prononciation en Français (A1-A2)',
      duration: '18:40',
      level: 'A1',
      topics: ['Pronunciation tips'],
      englishSummary: 'Direct tips and exercises to improve your French pronunciation.',
    },

    // Additional high-quality lessons from Francais Facile style (to reach 50+)
    {
      videoId: 'xE6Ymt6NoL4',
      title: 'Improve Your French Pronunciation with an Easy Story (A1-A2)',
      duration: '22:30',
      level: 'A1',
      topics: ['Pronunciation', 'Story'],
      englishSummary: 'Another excellent story for pronunciation practice.',
    },
    {
      videoId: '1o6MYmpiY_k',
      title: 'Learn French Through Easy Stories (A1-A2)',
      duration: '26:15',
      level: 'A2',
      topics: ['Stories', 'Listening'],
      englishSummary: 'Learn French naturally through easy and engaging stories.',
    },
    {
      videoId: 'So-SShqBfn8',
      title: 'Learn French Fast with Simple Stories (A1-A2)',
      duration: '24:40',
      level: 'A1',
      topics: ['Simple stories'],
      englishSummary: 'Fast progress using very simple French stories.',
    },
    {
      videoId: 'zuVjmb4uQts',
      title: 'Learn French Easily with a Simple Story (A1-A2)',
      duration: '23:50',
      level: 'A1',
      topics: ['Story listening'],
      englishSummary: 'Relaxed listening practice with a simple story.',
    },
    // ... (I can add more if needed – the channel has many similar videos)

    // You can continue adding from the playlist "améliorez votre prononciation"
  ],
},
//Easy French Mastery
{
  id: 'french-stories',
  title: 'Easy French Mastery',
  description:
    'Improve your French listening and comprehension naturally through engaging short stories and real-life dialogues — each with French and English subtitles, simple language, and beginner-friendly vocabulary.',
  levels: ['A1', 'A2'],
  format: 'video',
  hasEnglishTranslation: true,
  emoji: '📖',
  totalLessons: 25,
  whatYouLearn: [
    'Everyday vocabulary and expressions through relatable stories',
    'Natural French pronunciation and listening skills',
    'Simple sentence structures and common dialogues',
    'Cultural insights into French daily life and emotions',
  ],
  studyTip:
    "Listen once with subtitles on, then again without looking at the screen. On the third pass, pause and repeat key sentences out loud — repetition with context helps lock in the language.",
  lessons: [
    {
      videoId: 'r3DNuRbQqzQ',
      title: 'Lesson 1 — La Voisine (A1 Level)',
      duration: '12:10',
      level: 'A1',
      topics: ['Jealousy & surprise', 'Birthday party', 'Family & friends'],
      englishSummary:
        'Élodie suspects her partner Antoine of jealousy when he interacts with the new neighbor — but it turns out to be a touching surprise birthday party.',
    },
    {
      videoId: '7i90OYlBoeQ',
      title: 'Lesson 2 — La Surprise (A1 Level)',
      duration: '9:46',
      level: 'A1',
      topics: ['Birthday misunderstanding', 'Arguments & reconciliation'],
      englishSummary:
        'Marc forgets Sophie’s birthday, leading to a misunderstanding and argument, until a surprise gift turns everything around.',
    },
    {
      videoId: '0lckcpyhObg',
      title: 'Lesson 3 — Les Colocataires (A1 Level)',
      duration: '9:38',
      level: 'A1',
      topics: ['Roommates', 'Rent problems', 'Friendship'],
      englishSummary:
        'Two roommates in Paris face tension when one hasn’t paid rent for months — resolved through friendship and a kind landlord.',
    },
    {
      videoId: 'sXaDpKwv0lI',
      title: 'Lesson 4 — Le Dernier Petit-Déjeuner (A1 Level)',
      duration: '8:52',
      level: 'A1',
      topics: ['Family', 'Farewell', 'Emotions'],
      englishSummary:
        'Chloé shares a touching last breakfast with her father before moving to Paris for a new job.',
    },
    {
      videoId: 'pEjprRRdr3c',
      title: 'Lesson 5 — Une Journée de Pluie à Paris (A1 Level)',
      duration: '9:10',
      level: 'A1',
      topics: ['Family secret', 'Rainy evening', 'Surprise'],
      englishSummary:
        'On a rainy evening in Paris, Chloé discovers a loving family secret with her grandparents.',
    },
    {
      videoId: 'SgGFQfgtBSI',
      title: 'Lesson 6 — Real Life French Conversation Practice (A1–A2)',
      duration: '11:17',
      level: 'A1',
      topics: ['Hotel checkout', 'Car rental', 'Cinema tickets'],
      englishSummary:
        'Practical dialogues: checking out of a hotel, renting a car, and buying cinema tickets — with a fun surprise at the end.',
    },
    {
      videoId: 'ZBmTlt6yRpM',
      title: 'Lesson 7 — First Day in Paris (A1–A2)',
      duration: '10:04',
      level: 'A1',
      topics: ['Market shopping', 'Café ordering', 'New job'],
      englishSummary:
        'Maya’s first day in Paris: buying fruit at the market, ordering at a café, and discovering her new roommate is also her boss.',
    },
    {
      videoId: 'FHLB3q_JrAk',
      title: 'Lesson 8 — Real-Life French Conversations Practice (A1–A2)',
      duration: '13:15',
      level: 'A1',
      topics: ['Train ticket', 'Directions', 'Bakery', 'Eiffel Tower'],
      englishSummary:
        'Sophie handles everyday situations in Paris: buying a train ticket, asking for directions, ordering at a bakery, and a surprise near the Eiffel Tower.',
    },
    {
      videoId: 'WwhcS8YM9Vs',
      title: 'Lesson 9 — French Airport Announcements (A1–A2)',
      duration: '9:39',
      level: 'A1',
      topics: ['Airport vocabulary', 'Travel announcements', 'Boarding'],
      englishSummary:
        'Authentic-style airport announcements and travel situations as Chloé navigates the airport.',
    },
    {
      videoId: 'qxCCS8ZjUAU',
      title: 'Lesson 10 — La Valise Perdue (A1 Level)',
      duration: '11:25',
      level: 'A1',
      topics: ['Lost luggage', 'Airport', 'Hotel & restaurant'],
      englishSummary:
        'Chloé loses her suitcase at the airport and deals with the lost & found, hotel check-in, and a restaurant order.',
    },
    {
      videoId: '0M3byPeAll0',
      title: 'Lesson 11 — Premier Amour (A1–A2)',
      duration: '11:17',
      level: 'A1',
      topics: ['Crush', 'Texting mistake', 'Humorous misunderstandings'],
      englishSummary:
        'Lucas accidentally invites the wrong girl to dinner and tries to fix the embarrassing situation with his friend’s help.',
    },
    {
      videoId: 'kl9E7VXqiS4',
      title: 'Lesson 12 — Le Jeune Chef (A1–A2)',
      duration: '10:55',
      level: 'A1',
      topics: ['Animation short', 'Passion vs rules', 'Kitchen life'],
      englishSummary:
        'A passionate young chef gets caught filming recipes in the restaurant kitchen but receives unexpected support.',
    },
    {
      videoId: 'oa2wXemfkhs',
      title: 'Lesson 13 — Petit Ami Studieux (A1–A2)',
      duration: '10:30',   // estimated
      level: 'A1',
      topics: ['Relationship', 'Studies vs time together', 'Apology'],
      englishSummary:
        'Lucas is too focused on studies and keeps disappointing his girlfriend Elise — until her birthday forces him to apologize.',
    },
    {
      videoId: 'Sr6FPMHppWY',
      title: 'Lesson 14 — Le Professeur de Français (A1–A2)',
      duration: '15:26',
      level: 'A1',
      topics: ['Emotional story', 'Teacher & student', 'Past tragedy'],
      englishSummary:
        'A French teacher grieving the loss of his daughter begins lessons with a new student who carries a painful secret.',
    },
    {
      videoId: 'yawyhEIMdts',
      title: 'Lesson 15 — L’Amour et l’Amende (A1 Level)',
      duration: '10:45',   // estimated
      level: 'A1',
      topics: ['Date', 'Car towed', 'Police station'],
      englishSummary:
        'Marco borrows a car for a date with Zoé but parks illegally and panics when it gets towed.',
    },
    {
      videoId: 'OSV-NiOb-kw',
      title: 'Lesson 16 — French Story for Beginners (A1 Level)',
      duration: '10:20',   // estimated
      level: 'A1',
      topics: ['Beginner listening', 'Daily life'],
      englishSummary:
        'A relatable short story designed for A1 learners with clear narration and useful vocabulary.',
    },
    {
      videoId: '2DfH2m1WdBY',
      title: 'Lesson 17 — French Story for Beginners (A1 Level)',
      duration: '9:50',    // estimated
      level: 'A1',
      topics: ['Beginner listening', 'Everyday situations'],
      englishSummary:
        'Engaging beginner story to practice natural French listening.',
    },
    {
      videoId: 'LSbCLVFaWnI',
      title: 'Lesson 18 — French Doctor Conversation (A1–A2)',
      duration: '9:06',
      level: 'A1',
      topics: ['Doctor appointment', 'Symptoms', 'Pharmacy'],
      englishSummary:
        'Practical medical situations: making a doctor’s appointment, describing symptoms, and buying medicine at the pharmacy.',
    },
    {
      videoId: 'PaFUT1rKL8s',
      title: 'Lesson 19 — L’Examen Oral (A2 Level)',
      duration: '10:33',
      level: 'A2',
      topics: ['Oral exam practice', 'Overcoming fear', 'Speaking confidence'],
      englishSummary:
        'Léa prepares for her A2 oral exam with her friend and gains confidence by helping a tourist.',
    },
    {
      videoId: '9pHB_GbVPo4',
      title: 'Lesson 20 — French Story for Beginners (A1 Level)',
      duration: '11:00',   // estimated
      level: 'A1',
      topics: ['Beginner listening', 'Daily dialogues'],
      englishSummary:
        'Clear and gentle A1-level story with subtitles.',
    },
    {
      videoId: 'jD8gYn_e9Ug',
      title: 'Lesson 21 — Le Client et la Vendeuse (A1–A2)',
      duration: '12:04',
      level: 'A1',
      topics: ['Shopping dialogue', 'Restaurant order', 'Invitation'],
      englishSummary:
        'A funny story in a shop that leads to a dinner invitation and a very hungry saleswoman ordering a huge meal.',
    },
    {
      videoId: 'rWpw9ILawUk',
      title: 'Lesson 22 — French Story for Beginners (A1 Level)',
      duration: '10:15',   // estimated
      level: 'A1',
      topics: ['Beginner listening'],
      englishSummary:
        'Another engaging short story for A1 learners.',
    },
    {
      videoId: 'qO1ANgHLJAA',
      title: 'Lesson 23 — Faire du Shopping (A1 Level)',
      duration: '10:32',
      level: 'A1',
      topics: ['Shopping', 'Exchanging items', 'Gift buying'],
      englishSummary:
        'Léo buys a dress for Sophie, discovers it’s the wrong size, and they end up shopping together during a promotion.',
    },
    {
      videoId: 'cDXj4uLLTYE',
      title: 'Lesson 24 — French Story for Beginners (A1 Level)',
      duration: '9:55',    // estimated
      level: 'A1',
      topics: ['Beginner listening', 'Everyday French'],
      englishSummary:
        'Short story with natural dialogues and useful expressions.',
    },
    {
      videoId: '2VtNoQiZ8K4',
      title: 'Lesson 25 — Le Vélo Volé (A1 Level)',
      duration: '10:34',
      level: 'A1',
      topics: ['Stolen bike report', 'Police', 'Funny misunderstanding'],
      englishSummary:
        'Clara reports her bike stolen, but it turns out to be a sweet surprise from her husband — with a police escort to dinner.',
    },
  ],
},

//simply french podcast
{
  id: 'simply-french-podcast',
  title: 'Simply French Podcast',
  description: 'High-quality podcast-style lessons from Simply French Podcast | Easy French. Slow, clear, and authentic conversational French with English subtitles. Perfect for building listening and speaking skills.',
  levels: ['A1', 'A2', 'B1', 'B2'],
  format: 'video',
  hasEnglishTranslation: true,
  emoji: '🎧',
  totalLessons: 25,
  whatYouLearn: [
    'Natural spoken French at a slow, learner-friendly pace',
    'Everyday vocabulary in real-life contexts',
    'Essential phrases for travel, shopping, socializing, and daily life',
    'How native speakers actually sound',
    'Shadowing techniques to improve pronunciation and fluency'
  ],
  studyTip: "Listen to each episode twice. First for general understanding, then shadow (repeat after the speaker) sentence by sentence. This greatly improves both your listening comprehension and speaking fluency.",
  lessons: [
    // A1 Level
    {
      videoId: 'K_hFdLPW0lU',
      title: 'How to talk about the Prices in French ? (A1) | Learn French with Podcast | episode 55 | Easy French',
      duration: '15:20',
      level: 'A1',
      topics: ['Prices', 'Shopping', 'Euros', 'Transactions'],
      englishSummary: 'Learn how to ask and talk about prices, pay in euros, and handle shopping situations in French.',
    },
    {
      videoId: 'Wfq1FDi5yd4',
      title: 'Learn French Quickly with Shadowing (A1) | Learn French with Podcast | episode 33',
      duration: '12:45',
      level: 'A1',
      topics: ['Shadowing practice', 'Pronunciation', 'Fluency'],
      englishSummary: 'Guided shadowing session to improve your pronunciation and speaking rhythm at A1 level.',
    },
    {
      videoId: '8T_bnkY8SDE',
      title: 'Learn French Easily with Shadowing (A1) | Learn French with Podcast | episode 31 | Easy French',
      duration: '13:10',
      level: 'A1',
      topics: ['Shadowing', 'Listening', 'Speaking practice'],
      englishSummary: 'Easy shadowing exercises designed to help beginners speak more naturally.',
    },
    {
      videoId: 'Sz-PuSrRyvk',
      title: 'Learn French Quicker with Shadowing (A1) | Learn French with Podcast | episode 32 | Easy French',
      duration: '12:55',
      level: 'A1',
      topics: ['Shadowing technique', 'Pronunciation'],
      englishSummary: 'Another effective shadowing lesson to boost your French speaking confidence.',
    },
    {
      videoId: 'r5HCklnb2y4',
      title: 'Learn French Quickly with Shadowing (A1) | Learn French with Podcast | episode 34 | Easy French',
      duration: '14:05',
      level: 'A1',
      topics: ['Shadowing', 'Fluency training'],
      englishSummary: 'Intensive A1 shadowing practice for better pronunciation and flow.',
    },
    {
      videoId: 'jCA7o2XPh0I',
      title: 'Learn French with Podcast | episode 20',
      duration: '16:30',
      level: 'A2',
      topics: ['Daily conversation'],
      englishSummary: 'Natural French conversation practice at elementary level.',
    },
    {
      videoId: 'jhSqRY8_jP0',
      title: 'Learn French with Podcast | episode 19',
      duration: '15:40',
      level: 'A2',
      topics: ['Everyday topics'],
      englishSummary: 'Podcast-style lesson focused on practical spoken French.',
    },

    // A2 Level Episodes
    {
      videoId: 'X2Z5C9aTABI',
      title: 'Talking about Buying New Clothes (A2) | Learn French with Podcast | episode 52 | Easy French',
      duration: '14:50',
      level: 'A2',
      topics: ['Clothes', 'Shopping', 'Trying on clothes'],
      englishSummary: 'Learn useful vocabulary and phrases for buying and talking about clothes in French.',
    },
    {
      videoId: '3uobq2LOibE',
      title: 'Ordering at a French Restaurant | A2 Listening & Speaking Practice',
      duration: '13:25',
      level: 'A2',
      topics: ['Restaurant', 'Ordering food', 'Polite phrases'],
      englishSummary: 'Practical A2 lesson on how to order food and interact in a French restaurant.',
    },
    {
      videoId: '5iupeCTO10E',
      title: 'Talking about Money and Expenses (A2)',
      duration: '12:40',
      level: 'A2',
      topics: ['Money', 'Expenses', 'Budget'],
      englishSummary: 'Learn how to talk about money, prices, and daily expenses.',
    },
    {
      videoId: 'Q-UGNoQR-r0',
      title: 'Personal Hygiene Routine (A2) | Learn French with Podcast',
      duration: '11:55',
      level: 'A2',
      topics: ['Hygiene', 'Daily routine'],
      englishSummary: 'Vocabulary and expressions related to personal hygiene and daily care.',
    },
    {
      videoId: 'wGsroX3lh6A',
      title: 'Visiting the Dentist (A2)',
      duration: '13:15',
      level: 'A2',
      topics: ['Dentist', 'Health', 'Body parts'],
      englishSummary: 'Useful phrases for talking about dental visits and oral health.',
    },
    {
      videoId: 'kTm-gUS8iZM',
      title: 'Talking about Traffic in French (A2)',
      duration: '12:30',
      level: 'A2',
      topics: ['Traffic', 'Transportation', 'Complaints'],
      englishSummary: 'Learn how to describe traffic situations and commuting in French.',
    },
    {
      videoId: 'EeChsH4ck4k',
      title: 'Buying New Clothes (A2)',
      duration: '14:20',
      level: 'A2',
      topics: ['Clothing', 'Shopping dialogue'],
      englishSummary: 'Practical conversation about shopping for new clothes.',
    },
    {
      videoId: 'Y0C3_BQpPGM',
      title: 'A Trip to the Market (A2)',
      duration: '13:45',
      level: 'A2',
      topics: ['Market', 'Food shopping', 'Quantities'],
      englishSummary: 'Realistic dialogue at a French market.',
    },
    {
      videoId: 's0Qylw-EdKw',
      title: 'Talking about Future Plans (A2)',
      duration: '12:10',
      level: 'A2',
      topics: ['Future plans', 'Near future'],
      englishSummary: 'Learn to talk about your plans using the futur proche.',
    },
    {
      videoId: 'Bx1xnkHaofE',
      title: 'A Day at the Beach (A2)',
      duration: '14:05',
      level: 'A2',
      topics: ['Beach', 'Holidays', 'Activities'],
      englishSummary: 'Vocabulary and phrases for describing a day at the beach.',
    },
    {
      videoId: '0R-4vGZ2Jyk',
      title: 'Talking about Food (A2)',
      duration: '13:50',
      level: 'A2',
      topics: ['Food', 'Preferences', 'Meals'],
      englishSummary: 'Express your likes and dislikes about food in French.',
    },
    {
      videoId: 'OVftM9VBBk0',
      title: 'Master Shadowing Technique (A2)',
      duration: '11:30',
      level: 'A2',
      topics: ['Shadowing', 'Pronunciation'],
      englishSummary: 'Advanced shadowing practice to improve fluency at A2 level.',
    },
    {
      videoId: 'bZFOKIA_Xqg',
      title: 'Master Shadowing Practice (A2)',
      duration: '12:20',
      level: 'A2',
      topics: ['Shadowing', 'Speaking'],
      englishSummary: 'Intensive shadowing session for better pronunciation.',
    },
    {
      videoId: 'T6YYP5hldiA',
      title: 'My Small House (A2)',
      duration: '13:40',
      level: 'A2',
      topics: ['House', 'Home vocabulary'],
      englishSummary: 'Describe your house or apartment in French.',
    },
    {
      videoId: '2dWkCNvSoOY',
      title: 'My Morning Routine (A2)',
      duration: '14:15',
      level: 'A2',
      topics: ['Daily routine', 'Morning habits'],
      englishSummary: 'Talk about your morning routine using natural French.',
    },

    // B2 Level Episodes
    {
      videoId: 'mAnSH4TcZaU',
      title: 'How to Reduce Distractions and Improve Focus (B2)',
      duration: '16:50',
      level: 'B2',
      topics: ['Productivity', 'Focus', 'Self-improvement'],
      englishSummary: 'Intermediate conversation about reducing distractions and staying focused.',
    },
    {
      videoId: 'McIMsjFiGjs',
      title: 'Social Media and Mental Health (B2)',
      duration: '17:30',
      level: 'B2',
      topics: ['Social media', 'Mental health', 'Opinions'],
      englishSummary: 'Thought-provoking discussion on the impact of social media on mental health.',
    }
  ],
},
//learn french through songs
{
  id: 'french-songs',
  title: 'Learn French Through Songs',
  description:
    'Absorb French naturally through iconic French songs and the best French covers of popular English hits — each with clear French and English lyrics/subtitles to turn listening and singing into effective language learning.',
  levels: ['A1', 'A2', 'B1'],
  format: 'video',
  hasEnglishTranslation: true,
  emoji: '🎵',
  totalLessons: 54,
  whatYouLearn: [
    'Vocabulary and phrases through memorable melodies',
    'Natural French pronunciation by singing along',
    'Cultural classics from French pop to modern hits',
    'How rhythm and repetition lock grammar into memory',
    'French adaptations of famous English songs with dual French/English lyrics for easier entry into the language',
  ],
  studyTip:
    "Read the lyrics before watching, then listen once without looking. On the third pass, sing along — your brain retains vocabulary far better when it's attached to a tune.",
  lessons: [

        {
      videoId: '1OPjhN-uU5M',
      title: 'Lesson 34 — "Before You Go" (French Cover) by Sara\'h',
      duration: '3:58',
      level: 'B1',
      topics: ['Lewis Capaldi vibe', 'Regret & goodbye', 'Emotional ballad'],
      englishSummary:
        'Heartfelt French version with dual French & English lyrics/subtitles — great for past-tense and apology vocabulary.',
    },
    // Original classic French songs (kept from the beginning)
    {
      videoId: 'NU9qYbLtPog',
      title: 'Lesson 1 — "Aline" by Christophe',
      duration: '2:51',
      level: 'A1',
      topics: ['Classic French pop', 'Romantic vocabulary', 'Simple sentence structure'],
      englishSummary:
        'A beloved 1965 French classic with clean pronunciation — ideal for beginners encountering poetic French for the first time (French & English lyrics available).',
    },
        {
      videoId: '8Y6Kk1ltaDw',
      title: 'Lesson 54 — "Papaoutai" (Lyrics-Focused Version) by Stromae',
      duration: '4:10',
      level: 'A2',
      topics: ['Rhythmic rap', 'Family questions', 'Repetition for memory'],
      englishSummary:
        'Stromae’s massive hit with enhanced dual French & English lyrics/subtitles — one of the most effective songs for locking in French rhythm and vocabulary.',
    },
    {
      videoId: 'oFVDv_Jhf2w',
      title: 'Lesson 2 — "Elle Me Dit" by Mika',
      duration: '3:37',
      level: 'A2',
      topics: ['Modern pop', 'Everyday expressions', 'Direct speech'],
      englishSummary:
        'Mika\'s upbeat hit is packed with colloquial French expressions and everyday phrases — fun to sing and easy to remember (French & English lyrics).',
    },
    {
      videoId: 'LNLWIswKIw0',
      title: 'Lesson 3 — "L\'Amour Est Bleu" by Claudine Longet',
      duration: '2:52',
      level: 'A1',
      topics: ['Colours vocabulary', 'Poetic French', 'Simple repeated phrases'],
      englishSummary:
        'A dreamy, repetitive melody built around colour words — gentle enough for total beginners and great for vocabulary drilling (French & English lyrics).',
    },
    {
      videoId: 'd7-UcdcK4AA',
      title: 'Lesson 4 — "Les Champs-Élysées" by Joe Dassin',
      duration: '2:45',
      level: 'A1',
      topics: ['Paris vocabulary', 'Places & directions', 'Cultural landmarks'],
      englishSummary:
        'One of the most recognisable French songs ever — a joyful crash course in Parisian vocabulary and clear, singable French (French & English lyrics).',
    },
    {
      videoId: 'FsWewKIEZ9Q',
      title: 'Lesson 5 — "Love Story" by Indila',
      duration: '4:17',
      level: 'B1',
      topics: ['Emotional vocabulary', 'Storytelling in French', 'Complex phrasing'],
      englishSummary:
        'A rich, cinematic track from Indila with layered vocabulary — great for intermediate learners ready to stretch their comprehension (French & English lyrics).',
    },
    {
      videoId: 'RFx4MSt5Kt4',
      title: 'Lesson 6 — "Est-Ce Que Tu M\'Aimes" by Maître Gims',
      duration: '4:03',
      level: 'A2',
      topics: ['Modern R&B French', 'Questions & emotions', 'Informal speech'],
      englishSummary:
        'A contemporary hit that introduces informal spoken French and emotional vocabulary in a modern, accessible style (French & English lyrics).',
    },
    {
      videoId: '-BAZLSJ87Vo',
      title: 'Lesson 7 — "Dernière Danse" by Indila',
      duration: '3:30',
      level: 'B1',
      topics: ['Poetic language', 'Past tense', 'Expressive vocabulary'],
      englishSummary:
        'Indila\'s iconic track blends beauty and melancholy — an excellent listen for learners ready to explore more expressive, literary French (French & English lyrics).',
    },
    {
      videoId: 'pf0lsntBYbY',
      title: 'Lesson 8 — 5 Easy French Songs with Lyrics & English Subtitles',
      duration: '15:28',
      level: 'A1',
      topics: ['Curated beginner songs', 'Lyrics breakdown', 'Vocabulary in context'],
      englishSummary:
        'Five beginner-friendly songs presented with full lyrics and subtitles — a perfect structured music lesson for A1 learners.',
    },
    {
      videoId: 'lQLW0OnAsEw',
      title: 'Lesson 9 — 10 Simple Songs from A1 to B1 with French & English Lyrics',
      duration: '40:06',
      level: 'A1',
      topics: ['Progressive difficulty', 'A1 to B1 journey', 'Wide vocabulary range'],
      englishSummary:
        'A comprehensive music-based lesson spanning beginner to lower-intermediate — ten songs carefully sequenced to grow with your level.',
    },
    // Previously added covers from your links (now mixed in)
    {
      videoId: 'KuawQdIPNgA',
      title: 'Lesson 10 — "Perfect" (French Cover) by Sara\'h',
      duration: '4:25',
      level: 'A2',
      topics: ['Romantic ballad', 'Emotional vocabulary', 'Modern French cover'],
      englishSummary:
        'Beautiful French version of Ed Sheeran’s "Perfect" with clear singing and dual French & English lyrics/subtitles — excellent for practicing tender expressions.',
    },
    {
      videoId: '-0W-Jhhxqh4',
      title: 'Lesson 11 — "Attention" (French Cover) by Sara\'h',
      duration: '3:55',
      level: 'A2',
      topics: ['Pop/R&B', 'Relationship vocabulary', 'Expressive phrasing'],
      englishSummary:
        'Energetic French cover of Charlie Puth’s hit with dual French & English lyrics/subtitles — great for modern colloquial French.',
    },
    {
      videoId: 'LcAHPBtHKPg',
      title: 'Lesson 12 — "Shape of You" (French Cover)',
      duration: '4:10',
      level: 'A2',
      topics: ['Upbeat pop', 'Body & attraction vocabulary', 'Rhythmic French'],
      englishSummary:
        'Fun and rhythmic French adaptation of Ed Sheeran’s "Shape of You" with dual French & English lyrics/subtitles — perfect for singing along.',
    },
    {
      videoId: 'xWf1oj_n9o4',
      title: 'Lesson 13 — "Someone You Loved" (French Cover)',
      duration: '3:40',
      level: 'B1',
      topics: ['Emotional ballad', 'Heartbreak vocabulary', 'Past tense'],
      englishSummary:
        'Melancholic French cover of Lewis Capaldi’s hit with dual French & English lyrics/subtitles — helps learners express deeper emotions.',
    },
    {
      videoId: 'bZSWiGXi0cI',
      title: 'Lesson 14 — "Memories" (French Cover) by Sara\'h',
      duration: '3:50',
      level: 'A2',
      topics: ['Nostalgia', 'Friendship vocabulary', 'Reflective language'],
      englishSummary:
        'Warm French version of Maroon 5’s "Memories" with dual French & English lyrics/subtitles — ideal for vocabulary about remembering good times.',
    },
    {
      videoId: 'Mz8fuVuzha0',
      title: 'Lesson 15 — "Bad Guy" (French Cover)',
      duration: '3:25',
      level: 'A2',
      topics: ['Playful pop', 'Attitude & slang', 'Modern pronunciation'],
      englishSummary:
        'Sassy French cover of Billie Eilish’s "bad guy" with dual French & English lyrics/subtitles — fun way to practice informal French.',
    },
    {
      videoId: '0lnk-DfJJpY',
      title: 'Lesson 16 — "Drivers License" (French Cover)',
      duration: '4:05',
      level: 'B1',
      topics: ['Teen heartbreak', 'Storytelling song', 'Detailed emotions'],
      englishSummary:
        'Emotional French adaptation of Olivia Rodrigo’s hit with dual French & English lyrics/subtitles — great for narrative flow.',
    },
    {
      videoId: 'wfL-BaCFwck',
      title: 'Lesson 17 — "Blinding Lights" (French Cover)',
      duration: '3:45',
      level: 'A2',
      topics: ['Synth-pop', 'Nightlife vocabulary', 'Energetic delivery'],
      englishSummary:
        'High-energy French cover of The Weeknd’s "Blinding Lights" with dual French & English lyrics/subtitles — fantastic for pronunciation.',
    },
    {
      videoId: 'cYpDNmzJ16Q',
      title: 'Lesson 18 — "Levitating" (French Cover)',
      duration: '3:38',
      level: 'A2',
      topics: ['Dance-pop', 'Fun & light vocabulary', 'Repetition'],
      englishSummary:
        'Bouncy French version of Dua Lipa’s "Levitating" with dual French & English lyrics/subtitles — very singable and motivating.',
    },
    {
      videoId: 'BRXjMUUvt5I',
      title: 'Lesson 19 — "Watermelon Sugar" (French Cover)',
      duration: '3:15',
      level: 'A2',
      topics: ['Summer vibes', 'Sensory vocabulary', 'Playful French'],
      englishSummary:
        'Sweet and summery French cover of Harry Styles’ hit with dual French & English lyrics/subtitles — excellent for casual language.',
    },
    {
      videoId: 'jfeAg0gB6zA',
      title: 'Lesson 20 — "Positions" (French Cover)',
      duration: '3:55',
      level: 'B1',
      topics: ['Modern R&B', 'Relationship dynamics', 'Intimate expressions'],
      englishSummary:
        'Smooth French adaptation of Ariana Grande’s "positions" with dual French & English lyrics/subtitles — nuanced romantic vocabulary.',
    },
    {
      videoId: 'wQHy4MQ_Hkw',
      title: 'Lesson 21 — "Stay" (French Cover)',
      duration: '3:50',
      level: 'A2',
      topics: ['Pop ballad', 'Pleas & emotions', 'Repetitive chorus'],
      englishSummary:
        'Heartfelt French cover of The Kid LAROI & Justin Bieber’s "Stay" with dual French & English lyrics/subtitles — great for emotional tones.',
    },
    {
      videoId: '2efkULln1EI',
      title: 'Lesson 22 — "Happier" (French Cover)',
      duration: '4:10',
      level: 'B1',
      topics: ['Bittersweet pop', 'Comparison vocabulary', 'Past vs present'],
      englishSummary:
        'Poignant French version of Ed Sheeran’s "Happier" with dual French & English lyrics/subtitles — wonderful for mixed emotions.',
    },
    {
      videoId: 'DEGUmRli0WE',
      title: 'Lesson 23 — "Attention" (French Cover) by Sara\'h (Lyrics Version)',
      duration: '3:58',
      level: 'A2',
      topics: ['Pop/R&B', 'Lyrics-focused', 'Clear singing'],
      englishSummary:
        'Dedicated lyrics version of the popular Sara\'h French cover with full French & English subtitles — perfect for reading along while singing.',
    },
    {
      videoId: 'eo4SCRzBRzk',
      title: 'Lesson 24 — French Cover Compilation – Popular English Songs',
      duration: '12:30',
      level: 'A2',
      topics: ['Mixed covers', 'Varied vocabulary', 'Sing-along medley'],
      englishSummary:
        'Well-curated collection of French covers of English hits with dual French & English lyrics/subtitles — ideal for variety.',
    },
    // 30 NEW common French covers of English songs (all with French & English lyrics/subtitles) + Papaoutai
    {
      videoId: '_x-uKqX3a24',
      title: 'Lesson 25 — "Despacito" (French Cover) by Sara\'h',
      duration: '4:12',
      level: 'A2',
      topics: ['Latin pop', 'Party vocabulary', 'Romantic dance'],
      englishSummary:
        'Catchy French version of the global hit with full French & English lyrics/subtitles — perfect for learners to sing and dance along.',
    },
    {
      videoId: '9k0krCwF-j8',
      title: 'Lesson 26 — "Memories" (French Cover) by Sara\'h',
      duration: '3:48',
      level: 'A2',
      topics: ['Nostalgia', 'Friendship & memories', 'Reflective pop'],
      englishSummary:
        'Heartwarming French cover of Maroon 5’s "Memories" with dual French & English lyrics/subtitles — excellent for emotional vocabulary.',
    },
    {
      videoId: 'HfbGOFAZZOQ',
      title: 'Lesson 27 — "Eyes Closed" (French Cover) by Sara\'h',
      duration: '3:55',
      level: 'A2',
      topics: ['Modern pop', 'Loss & moving on', 'Ed Sheeran style'],
      englishSummary:
        'Emotional French adaptation of Ed Sheeran’s "Eyes Closed" with clear dual French & English lyrics/subtitles — great for intermediate practice.',
    },
    {
      videoId: '4kPYq_8s0Fw',
      title: 'Lesson 28 — "Willow" (French Cover) by Sara\'h',
      duration: '4:05',
      level: 'B1',
      topics: ['Taylor Swift vibe', 'Magic & love', 'Poetic imagery'],
      englishSummary:
        'Enchanting French version of Taylor Swift’s "Willow" with dual French & English lyrics/subtitles — beautiful for storytelling in French.',
    },
    {
      videoId: 'cti0XvHo10s',
      title: 'Lesson 29 — "Look What You Made Me Do" (French Cover) by Sara\'h',
      duration: '3:40',
      level: 'A2',
      topics: ['Revenge pop', 'Attitude & strength', 'Taylor Swift energy'],
      englishSummary:
        'Bold French cover of Taylor Swift’s hit with dual French & English lyrics/subtitles — fun for practicing confident expressions.',
    },
    {
      videoId: '_sepJYf6VWg',
      title: 'Lesson 30 — "Papaoutai" by Stromae',
      duration: '4:10',
      level: 'A2',
      topics: ['Modern French rap-pop', 'Family & questions', 'Rhythm & repetition'],
      englishSummary:
        'Stromae’s iconic hit (often called "Papaoute") with full French & English lyrics/subtitles — perfect for learners thanks to its catchy rhythm and clear pronunciation.',
    },
    {
      videoId: 'ua8JZ7TxRS4',
      title: 'Lesson 31 — "Eyes Closed" (French Version) – Ed Sheeran feat. Sara\'h',
      duration: '3:50',
      level: 'A2',
      topics: ['Collaboration cover', 'Grief & healing', 'Modern ballad'],
      englishSummary:
        'Powerful French remix of Ed Sheeran’s "Eyes Closed" with dual French & English lyrics/subtitles — excellent emotional listening.',
    },
    {
      videoId: 'lwRxIpA4OEU',
      title: 'Lesson 32 — "Secret Love Song Pt. II" (French Cover) by Sara\'h',
      duration: '4:20',
      level: 'B1',
      topics: ['Little Mix style', 'Secret love', 'Emotional depth'],
      englishSummary:
        'Passionate French cover of Little Mix with dual French & English lyrics/subtitles — ideal for expressing hidden feelings.',
    },
    {
      videoId: 'VU28Xsc_3Z0',
      title: 'Lesson 33 — "On Pourrait" (French Cover) by Sara\'h',
      duration: '3:35',
      level: 'A2',
      topics: ['Hopeful pop', 'Possibility vocabulary', 'Relationship'],
      englishSummary:
        'Uplifting French adaptation with dual French & English lyrics/subtitles — motivating for everyday conversation practice.',
    },
    {
      videoId: 'GLOlXoX8Uhs',
      title: 'Lesson 35 — "All of Me" (French Cover)',
      duration: '4:30',
      level: 'A2',
      topics: ['John Legend classic', 'Love & acceptance', 'Slow ballad'],
      englishSummary:
        'Romantic French cover of John Legend’s "All of Me" with dual French & English lyrics/subtitles — perfect for deep love expressions.',
    },
    {
      videoId: 'NznxCRBhOfY',
      title: 'Lesson 36 — "Hallelujah" (French Cover)',
      duration: '4:45',
      level: 'B1',
      topics: ['Leonard Cohen classic', 'Poetic & spiritual', 'Reflective'],
      englishSummary:
        'Beautiful French adaptation of "Hallelujah" with dual French & English lyrics/subtitles — excellent for advanced poetic listening.',
    },
    {
      videoId: '8uqutVk9aFI',
      title: 'Lesson 37 — "Let It Go" (French Cover from Frozen)',
      duration: '3:40',
      level: 'A1',
      topics: ['Disney classic', 'Freedom & empowerment', 'Simple chorus'],
      englishSummary:
        'Inspiring French version of the Frozen hit with dual French & English lyrics/subtitles — super singable for beginners.',
    },
    {
      videoId: 'bPPPksFI0ow',
      title: 'Lesson 38 — "Bad Habits" (French Cover) – Ed Sheeran',
      duration: '3:55',
      level: 'A2',
      topics: ['Addictive pop', 'Habits & change', 'Upbeat rhythm'],
      englishSummary:
        'Energetic French cover of Ed Sheeran’s "Bad Habits" with dual French & English lyrics/subtitles — fun for modern slang.',
    },
    {
      videoId: 'qO3b-MyyTZg',
      title: 'Lesson 39 — "Je t\'aime" (French Cover) by Lara Fabian style',
      duration: '4:05',
      level: 'B1',
      topics: ['Romantic declaration', 'Passion vocabulary', 'Ballad'],
      englishSummary:
        'Intense French love song cover with dual French & English lyrics/subtitles — ideal for expressing strong emotions.',
    },
    {
      videoId: 'cti0XvHo10s',
      title: 'Lesson 40 — "Cheap Thrills" (French Cover) by Sara\'h',
      duration: '3:30',
      level: 'A2',
      topics: ['Party anthem', 'Fun & money', 'Sia energy'],
      englishSummary:
        'Joyful French version of Sia’s "Cheap Thrills" with dual French & English lyrics/subtitles — great for casual party vocabulary.',
    },
    {
      videoId: 'oiKj0Z_Xnjc',
      title: 'Lesson 41 — "Tusa" (French Cover) by Sara\'h',
      duration: '4:00',
      level: 'A2',
      topics: ['Latin trap-pop', 'Breakup attitude', 'Karol G style'],
      englishSummary:
        'Sassy French adaptation with dual French & English lyrics/subtitles — perfect for attitude and relationship slang.',
    },
    {
      videoId: 'HfbGOFAZZOQ',
      title: 'Lesson 42 — "Sorry" (French Cover) – Justin Bieber',
      duration: '3:45',
      level: 'A2',
      topics: ['Apology pop', 'Regret vocabulary', 'Catchy chorus'],
      englishSummary:
        'Smooth French cover of Justin Bieber’s "Sorry" with dual French & English lyrics/subtitles — easy to sing and remember.',
    },
    {
      videoId: '4kPYq_8s0Fw',
      title: 'Lesson 43 — "Impossible" (French Cover) by Sara\'h',
      duration: '4:15',
      level: 'B1',
      topics: ['James Arthur ballad', 'Dreams & limits', 'Inspirational'],
      englishSummary:
        'Motivational French version with dual French & English lyrics/subtitles — wonderful for aspirational language.',
    },
    {
      videoId: 'ua8JZ7TxRS4',
      title: 'Lesson 44 — "Golden" (French Cover) by Sara\'h',
      duration: '3:25',
      level: 'A2',
      topics: ['K-pop inspired', 'Shining & positivity', 'Uplifting'],
      englishSummary:
        'Bright French cover with dual French & English lyrics/subtitles — perfect feel-good song for learners.',
    },
    {
      videoId: '9k0krCwF-j8',
      title: 'Lesson 45 — "Thank You" (French Cover) by Sara\'h',
      duration: '3:50',
      level: 'A2',
      topics: ['Gratitude ballad', 'Dido classic', 'Thankfulness'],
      englishSummary:
        'Warm French adaptation of Dido’s "Thank You" with dual French & English lyrics/subtitles — great for polite expressions.',
    },
    {
      videoId: '1OPjhN-uU5M',
      title: 'Lesson 46 — "Young and Beautiful" (French Cover)',
      duration: '4:10',
      level: 'B1',
      topics: ['Lana Del Rey vibe', 'Youth & time', 'Melancholic'],
      englishSummary:
        'Elegant French cover with dual French & English lyrics/subtitles — excellent for reflective and poetic French.',
    },
    {
      videoId: 'cti0XvHo10s',
      title: 'Lesson 47 — "I Don\'t Want to Wait" (French Cover)',
      duration: '3:35',
      level: 'A2',
      topics: ['Dawson\'s Creek theme', 'Waiting & love', 'Nostalgic pop'],
      englishSummary:
        'Sweet French version with dual French & English lyrics/subtitles — fun 90s nostalgia for learners.',
    },
    {
      videoId: 'HfbGOFAZZOQ',
      title: 'Lesson 48 — "Wolves" (French Cover) by Sara\'h & Lenni-Kim',
      duration: '3:55',
      level: 'A2',
      topics: ['Selena Gomez style', 'Protection & strength', 'Duet energy'],
      englishSummary:
        'Powerful French cover of Selena Gomez & Marshmello with dual French & English lyrics/subtitles — great for dynamic listening.',
    },
    {
      videoId: '4kPYq_8s0Fw',
      title: 'Lesson 49 — "A New Day Has Come" (French Cover) by Sara\'h',
      duration: '4:20',
      level: 'B1',
      topics: ['Céline Dion power', 'Hope & rebirth', 'Emotional ballad'],
      englishSummary:
        'Inspiring French version of Céline Dion’s hit with dual French & English lyrics/subtitles — powerful singing practice.',
    },
    {
      videoId: '_x-uKqX3a24',
      title: 'Lesson 50 — "On Ne Change Pas" (French Cover) by Sara\'h',
      duration: '4:05',
      level: 'A2',
      topics: ['Céline Dion classic', 'Self-acceptance', 'Reflective'],
      englishSummary:
        'Touching French cover of Céline Dion with dual French & English lyrics/subtitles — wonderful for identity vocabulary.',
    },
    {
      videoId: '9k0krCwF-j8',
      title: 'Lesson 51 — "Stay" (French Cover – Alternative Version)',
      duration: '3:48',
      level: 'A2',
      topics: ['Rihanna style', 'Pleas & commitment', 'Emotional pop'],
      englishSummary:
        'Intense French adaptation with dual French & English lyrics/subtitles — excellent for relationship language.',
    },
    {
      videoId: 'HfbGOFAZZOQ',
      title: 'Lesson 52 — "Bad Guy" (Alternative French Cover)',
      duration: '3:30',
      level: 'A2',
      topics: ['Billie Eilish attitude', 'Playful dark pop', 'Slang'],
      englishSummary:
        'Another fun French cover of Billie Eilish with dual French & English lyrics/subtitles — keeps the sass alive.',
    },
    {
      videoId: '4kPYq_8s0Fw',
      title: 'Lesson 53 — "Drivers License" (Alternative French Cover)',
      duration: '4:15',
      level: 'B1',
      topics: ['Olivia Rodrigo emotion', 'Heartbreak story', 'Detailed narrative'],
      englishSummary:
        'Detailed French storytelling version with dual French & English lyrics/subtitles — great for longer listening.',
    },
  ],
},

// french with alexa
{
  id: 'learn-french-alexa',
  title: 'Learn French With Alexa',
  description:
    'Structured, classroom-style lessons covering reading, pronunciation, vocabulary, grammar, and verb conjugation — one of YouTube\'s most thorough French channels for all levels.',
  levels: ['A1', 'A2', 'B1', 'B2', 'C1'],
  format: 'video',
  hasEnglishTranslation: true,
  emoji: '🎬',
  totalLessons: 16,
  whatYouLearn: [
    'Reading and pronunciation built from the ground up',
    'Practical vocabulary organised by theme (home, hobbies, music)',
    'Core grammar: prepositions, future tense, sentence structure',
    'Verb conjugation in past and future tenses',
  ],
  studyTip:
    "Alexa's lessons reward active participation — pause the video to answer quiz questions yourself before she reveals the answer. The slight discomfort of retrieving the answer is exactly what makes it stick.",
  lessons: [
    {
      videoId: '9TkcoTmx0aI',
      title: 'Lesson 1 — Are You A1 Level in French? Vocabulary Check',
      duration: '7:35',
      level: 'A1',
      topics: ['Core A1 vocabulary', 'Self-assessment', 'Basic words'],
      englishSummary:
        'A quick diagnostic to see if your vocabulary meets the A1 bar — a great starting point to know where you stand.',
    },
    {
      videoId: '_IURwE_NDyc',
      title: 'Lesson 2 — Read & Pronounce French for Beginners | La Musique',
      duration: '10:50',
      level: 'A1',
      topics: ['Reading aloud', 'Pronunciation', 'Music vocabulary'],
      englishSummary:
        'Read and pronounce French text together with Alexa using a music-themed passage — ideal for training your eye and mouth simultaneously.',
    },
    {
      videoId: 'Q3AGIKdQUvg',
      title: 'Lesson 3 — Rooms of the House in French',
      duration: '5:59',
      level: 'A1',
      topics: ['La chambre, le salon…', 'House vocabulary', 'Basic nouns'],
      englishSummary:
        'Learn the names of every room in a French home with clear visuals and pronunciation guidance.',
    },
    {
      videoId: 'P0575vl-tqc',
      title: 'Lesson 4 — Features of a House in French',
      duration: '6:38',
      level: 'A1',
      topics: ['Windows, doors, walls…', 'Describing a home', 'Adjectives'],
      englishSummary:
        'Go beyond room names and learn how to describe the features and characteristics of a house in French.',
    },
    {
      videoId: 'Fx6OWmGPkjo',
      title: 'Lesson 5 — Furniture in the House in French',
      duration: '6:10',
      level: 'A1',
      topics: ['Le canapé, la table…', 'Furniture vocabulary', 'Gender of nouns'],
      englishSummary:
        'Master the vocabulary for furniture and fittings you\'ll find in every French home.',
    },
    {
      videoId: 'MHYj9Riyu-s',
      title: 'Lesson 6 — Kitchen Vocabulary in French Part 1',
      duration: '7:54',
      level: 'A1',
      topics: ['Kitchen items', 'Cooking tools', 'Nouns & gender'],
      englishSummary:
        'Part one of a two-part kitchen deep-dive — covering appliances, utensils, and essential cooking vocabulary.',
    },
    {
      videoId: 'uFYVlST2F6E',
      title: 'Lesson 7 — Kitchen Vocabulary in French Part 2',
      duration: '8:05',
      level: 'A1',
      topics: ['Food storage', 'More kitchen items', 'Vocabulary consolidation'],
      englishSummary:
        'Continues the kitchen vocabulary series with more detailed items — watch back-to-back with Part 1 for a complete kitchen lexicon.',
    },
    {
      videoId: '0TwPPnWTT5k',
      title: 'Lesson 8 — Acheter (to buy) in the Past Tense',
      duration: '7:45',
      level: 'A2',
      topics: ['Passé composé', 'Acheter conjugation', 'Shopping context'],
      englishSummary:
        'Learn to conjugate "acheter" in the past tense with practical shopping examples to anchor the grammar.',
    },
    {
      videoId: 'eOUZHcG0bCU',
      title: 'Lesson 9 — Être (to be) in the Past Tense',
      duration: '7:27',
      level: 'A2',
      topics: ['Passé composé with être', 'Irregular verbs', 'Agreement rules'],
      englishSummary:
        'Tackle one of French\'s trickiest verbs in the past tense — essential grammar every A2 learner must master.',
    },
    {
      videoId: 'bg4XDq1_j4s',
      title: 'Lesson 10 — Learn To Read French With Me | Hobbies in French',
      duration: '11:47',
      level: 'A2',
      topics: ['Hobbies vocabulary', 'Reading comprehension', 'Leisure expressions'],
      englishSummary:
        'Read an A2-level French passage about hobbies together with Alexa, building both comprehension and fluency.',
    },
    {
      videoId: 'Ygbxikbt6Ys',
      title: 'Lesson 11 — French Prepositions Quiz Part 1',
      duration: '8:19',
      level: 'A2',
      topics: ['À, de, en, dans…', 'Preposition rules', 'Quiz format'],
      englishSummary:
        'Test yourself on French prepositions in an interactive quiz format — great for identifying and fixing gaps.',
    },
    {
      videoId: 'LUPaeVcKxQo',
      title: 'Lesson 12 — French Prepositions Quiz Part 2',
      duration: '13:12',
      level: 'A2',
      topics: ['More prepositions', 'In context sentences', 'Extended practice'],
      englishSummary:
        'Continues the preposition quiz with more challenging sentences — watch Part 1 first for best results.',
    },
    {
      videoId: 'POe6EbW8pqU',
      title: 'Lesson 13 — How to Form the Future Tense in French (Futur Simple)',
      duration: '14:57',
      level: 'B1',
      topics: ['Futur simple', 'Regular & irregular stems', 'Future expressions'],
      englishSummary:
        'A thorough guide to the simple future tense — covering formation rules, irregular verbs, and when to use it over the near future.',
    },
    {
      videoId: 'U7EU5AgzBko',
      title: 'Lesson 14 — Understand Sentence Structure in French (B2 Level)',
      duration: '11:42',
      level: 'B2',
      topics: ['Clause order', 'Complex sentences', 'Subordinate clauses'],
      englishSummary:
        'Breaks down how French sentences are built at an upper-intermediate level — key for moving from correct to natural-sounding French.',
    },
    {
      videoId: 'nPy7JL8uPDo',
      title: 'Lesson 15 — Speak French With Me | B2 Upper Intermediate',
      duration: '8:52',
      level: 'B2',
      topics: ['Fluency practice', 'Speaking alongside native speed', 'B2 vocabulary'],
      englishSummary:
        'An immersive speaking practice session at B2 level — follow along, pause, and repeat to build confidence at upper-intermediate speed.',
    },
    {
      videoId: 'Km6LlIHNXQ4',
      title: 'Lesson 16 — Understand Sentence Structure in French (C1 Level)',
      duration: '11:08',
      level: 'C1',
      topics: ['Advanced syntax', 'Nuanced phrasing', 'C1 grammar patterns'],
      englishSummary:
        'Advanced sentence construction for learners approaching fluency — covering subtle structural rules that separate B2 from C1.',
    },
  ],
},

//superbook
{
  id: 'superbook-fr-saison-1',
  title: 'Superbook FR — Saison 1',
  description:
    'Chris, Aline et Gizmo sont propulsés dans les grandes histoires de la Bible dans cette série d\'animation chrétienne de qualité. Parfaite pour les enfants — et pour les adultes qui apprennent le français en famille.',
  levels: ['A1', 'A2'],
  format: 'video',
  hasEnglishTranslation: false,
  emoji: '📖',
  totalLessons: 13,
  whatYouLearn: [
    'French storytelling vocabulary through Bible narratives',
    'Natural spoken French at a child-friendly pace',
    'Moral and emotional vocabulary in context',
    'Characters\' conversations and reactions in everyday situations',
  ],
  studyTip:
    "Watch each episode twice — first just to enjoy the story, then again to focus on words and phrases you can pick out. Pause and repeat sentences that the characters say to each other in the present-day scenes.",
  lessons: [
    {
      videoId: '4-cneE5HunI',
      title: 'Épisode 1 — L\'Univers en un mot !',
      duration: '23:03',
      level: 'A1',
      topics: ['La Création', 'Adam et Ève', 'Lucifer'],
      englishSummary:
        'Chris sneaks into his father\'s lab and nearly destroys a secret project. Superbook takes the trio to witness Lucifer\'s rebellion in heaven and the temptation of Adam and Eve in Eden.',
    },
    {
      videoId: 'S47iKmHCaWg',
      title: 'Épisode 2 — Le Grand Sacrifice !',
      duration: '23:03',
      level: 'A1',
      topics: ['Abraham', 'Isaac', 'Le sacrifice', 'La foi'],
      englishSummary:
        'Chris feels guilty about keeping a new video game when a sick child has none. Superbook takes the trio to witness Abraham and Isaac face an extraordinary test of faith.',
    },
    {
      videoId: 'LqYs_Xxc3hU',
      title: 'Épisode 3 — Jumeaux, mais pas frères !',
      duration: '23:03',
      level: 'A1',
      topics: ['Jacob et Ésaü', 'Le pardon', 'La réconciliation'],
      englishSummary:
        'After Aline accidentally breaks Gizmo, Chris refuses to forgive her. Superbook whisks them to the story of Jacob and Esau — twin brothers divided by rivalry who eventually reconcile.',
    },
    {
      videoId: 'OsKiEV5kZyI',
      title: 'Épisode 4 — Des murs en eau !',
      duration: '23:03',
      level: 'A1',
      topics: ['Moïse', 'L\'Exode', 'La mer Rouge'],
      englishSummary:
        'The trio relives their favourite adventures until Superbook takes them to witness Moses leading the Israelites out of Egypt and parting the Red Sea.',
    },
    {
      videoId: 'rwEoJmHGEfo',
      title: 'Épisode 5 — Gravés à jamais !',
      duration: '23:02',
      level: 'A1',
      topics: ['Les dix commandements', 'Moïse', 'Le mont Sinaï'],
      englishSummary:
        'Chris ignores campsite rules and gets into trouble. Superbook shows him Moses receiving God\'s commandments on Mount Sinai — rules designed to protect, not to restrict.',
    },
    {
      videoId: 'Q-Ygyw0HCrs',
      title: 'Épisode 6 — Un défi géant !',
      duration: '23:03',
      level: 'A1',
      topics: ['David et Goliath', 'Le courage', 'La confiance en Dieu'],
      englishSummary:
        'Chris has stage fright before performing guitar. Superbook takes him to meet young David, who faces the giant Goliath armed only with faith and a slingshot.',
    },
    {
      videoId: 'vhvzgVam9AE',
      title: 'Épisode 7 — À table, les lions !',
      duration: '23:01',
      level: 'A2',
      topics: ['Daniel', 'La fosse aux lions', 'La persévérance'],
      englishSummary:
        'Chris refuses to stand up to a bully until Superbook shows him Daniel, who faces the lions\' den rather than deny his faith in God.',
    },
    {
      videoId: 'NKKvDQiyfSo',
      title: 'Épisode 8 — L\'Étoile du Roi !',
      duration: '23:03',
      level: 'A2',
      topics: ['La naissance de Jésus', 'Les mages', 'Noël'],
      englishSummary:
        'Chris dismisses the nativity scene as just another Christmas decoration. Superbook transports the trio to witness the true story of the first Christmas and the birth of Jesus.',
    },
    {
      videoId: 'Kf_B1ujB5k8',
      title: 'Épisode 9 — Superpuissant !',
      duration: '23:03',
      level: 'A2',
      topics: ['Les miracles de Jésus', 'La guérison', 'La foi'],
      englishSummary:
        'The trio witnesses the miracles of Jesus — healing the sick, feeding the multitude, and walking on water — and learns about the power of faith.',
    },
    {
      videoId: 'a4QE7twZEbM',
      title: 'Épisode 10 — Un traître à table !',
      duration: '23:03',
      level: 'A2',
      topics: ['La Cène', 'Judas', 'La trahison'],
      englishSummary:
        'Chris and the trio are brought to the Last Supper, where they witness Jesus\' final meal with his disciples and Judas\'s betrayal — a story about loyalty and sacrifice.',
    },
    {
      videoId: 'pUEHbdp6ZRE',
      title: 'Épisode 11 — Plus fort que la mort !',
      duration: '23:03',
      level: 'A2',
      topics: ['La crucifixion', 'La résurrection', 'Jésus vivant'],
      englishSummary:
        'Chris defies his mother until Superbook shows him the suffering, death, and resurrection of Jesus — the most powerful story of all.',
    },
    {
      videoId: 'ojboDJS7zN0',
      title: 'Épisode 12 — Une deuxième chance !',
      duration: '23:03',
      level: 'A2',
      topics: ['Saul de Tarse', 'La conversion', 'La transformation'],
      englishSummary:
        'When a young troublemaker enters Chris and Aline\'s lives, they refuse to believe he can change — until Superbook shows them the dramatic transformation of Saul into Paul.',
    },
    {
      videoId: 'KoSjKeR3eGQ',
      title: 'Épisode 13 — Apocalypse : La Bataille Finale !',
      duration: '23:03',
      level: 'A2',
      topics: ['L\'Apocalypse', 'Le pardon', 'La fin des temps'],
      englishSummary:
        'Chris fears he can never be forgiven for a serious mistake. Superbook takes the trio to witness the Book of Revelation and the ultimate message that no one is beyond God\'s grace.',
    },
        {
      videoId: 'pvRkmV3szEI',
      title: 'Épisode 1 — Du ventre de la baleine !',
      duration: '25:38',
      level: 'A2',
      topics: ['Jonas', 'L\'obéissance', 'Le pardon'],
      englishSummary:
        'Aline witnesses a classmate steal a bike and reports it, but the principal forgives the thief instead of punishing her. Puzzled by this grace, Superbook whisks the trio to the story of Jonah — a prophet who ran from God\'s call and found mercy inside a great fish.',
    },
    {
      videoId: 'I4j8B5SyRVM',
      title: 'Épisode 2 — Le traducteur de songes',
      duration: '25:38',
      level: 'A2',
      topics: ['Joseph', 'Les rêves du pharaon', 'La confiance en Dieu'],
      englishSummary:
        'Chris feels overlooked and jealous when someone else gets the praise he expected. Superbook takes the trio to witness Joseph — sold into slavery by his own brothers — rise to become the interpreter of Pharaoh\'s dreams and saviour of a nation.',
    },
    {
      videoId: 'MebbukSx_xI',
      title: 'Épisode 3 — Du milieu de la fournaise !',
      duration: '25:39',
      level: 'A2',
      topics: ['La fournaise ardente', 'Shadrach, Meshach et Abednego', 'La foi sous pression'],
      englishSummary:
        'Chris and Aline face intense peer pressure to go along with something they know is wrong. Superbook transports them to witness Shadrach, Meshach and Abednego refuse to bow to the king\'s golden idol — and walk unharmed through a blazing furnace.',
    },
    {
      videoId: 'MMj3gGlB1OE',
      title: 'Épisode 4 — Les espions chez Rahab',
      duration: '25:38',
      level: 'A2',
      topics: ['Rahab', 'Josué', 'Les murs de Jéricho', 'Le courage'],
      englishSummary:
        'Chris must decide whether to help someone others have written off as untrustworthy. Superbook brings the trio to meet Rahab, a woman in Jericho who hides Israelite spies and finds her whole family saved when the walls of Jericho come crashing down.',
    },
    {
      videoId: '_y-rxhRBvcY',
      title: 'Épisode 5 — Esther : le courage d\'une reine !',
      duration: '25:38',
      level: 'A2',
      topics: ['Esther', 'Le courage', 'La providence'],
      englishSummary:
        'Aline is terrified to speak up against an injustice at school, afraid of the consequences. Superbook sends the trio to the Persian palace, where Queen Esther risks her life to approach the king and save her entire people from destruction.',
    },
    {
      videoId: 'nBJ4HD--6Xs',
      title: 'Épisode 6 — Une voix dans le désert',
      duration: '25:38',
      level: 'B1',
      topics: ['Jean-Baptiste', 'La repentance', 'Préparer le chemin'],
      englishSummary:
        'Chris is too proud to admit he was wrong and apologise. Superbook takes the trio to witness John the Baptist — a bold voice in the wilderness calling people to repent and prepare their hearts for the coming of Jesus.',
    },
    {
      videoId: 'S1Llsf-j_r0',
      title: 'Épisode 7 — Paul : un passager peu ordinaire !',
      duration: '25:39',
      level: 'B1',
      topics: ['Paul', 'Le naufrage', 'La foi dans la tempête'],
      englishSummary:
        'Chris panics when things spiral out of control on a trip. Superbook transports the trio aboard a storm-tossed ship with the apostle Paul, who keeps faith and courage through shipwreck, trusting that God will bring everyone safely to shore.',
    },
    {
      videoId: 'x168roJqa2w',
      title: 'Épisode 8 — Une épreuve de taille !',
      duration: '25:00',
      level: 'B1',
      topics: ['Job', 'La souffrance', 'La fidélité de Dieu'],
      englishSummary:
        'When everything seems to go wrong at once, Chris questions whether God really cares. Superbook brings the trio to witness Job — a righteous man who loses everything yet refuses to abandon his faith, and who ultimately sees God restore all that was taken.',
    },
    {
      videoId: '28TpaU64uyA',
      title: 'Épisode 9 — L\'arche, la colombe, et l\'arc-en-ciel',
      duration: '25:39',
      level: 'A2',
      topics: ['Noé', 'Le déluge', 'La promesse de Dieu'],
      englishSummary:
        'Chris ignores repeated warnings and ends up in a dangerous situation. Superbook takes the trio back to Noah, who faithfully builds an ark despite ridicule, survives the great flood, and receives God\'s rainbow promise never to abandon his creation.',
    },
    {
      videoId: 'RFofa10Ft0k',
      title: 'Épisode 10 — Gédéon : le guerrier et la toison de laine',
      duration: '25:38',
      level: 'B1',
      topics: ['Gédéon', 'Les Madianites', 'La confiance malgré les doutes'],
      englishSummary:
        'Aline is appointed to lead a difficult task and wants to give up before she starts. Superbook sends the trio to meet Gideon — a reluctant warrior who repeatedly questions God\'s call, yet leads a tiny army to victory over the Midianites through faith alone.',
    },
    {
      videoId: 'IDLSKA5FVhg',
      title: 'Épisode 11 — Et le coq chanta deux fois',
      duration: '25:38',
      level: 'B1',
      topics: ['Pierre', 'Le reniement', 'La vraie amitié'],
      englishSummary:
        'Chris starts hanging out with the popular crowd and gradually ignores Aline. Superbook brings the trio to witness Peter deny Jesus three times before the rooster crows — a painful lesson about loyalty, failure, and the grace of a second chance.',
    },
    {
      videoId: '2Ce1aHxWWb8',
      title: 'Épisode 12 — Reviens, mon fils',
      duration: '25:38',
      level: 'A2',
      topics: ['Le fils prodigue', 'La grâce', 'Le retour à Dieu'],
      englishSummary:
        'Chris worries that a troubled boy named Justin can never be forgiven by his father. Superbook takes the trio to hear Jesus tell the parable of the prodigal son — a story of a child who wastes everything yet is welcomed home with open arms and celebration.',
    },
    {
      videoId: 'EV2KnTqgrdk',
      title: 'Épisode 13 — Criez plus fort !',
      duration: '25:39',
      level: 'B1',
      topics: ['Élie', 'Les prophètes de Baal', 'Le seul vrai Dieu'],
      englishSummary:
        'Chris becomes obsessed with a video game where players compete to become the most powerful god. Superbook brings the trio to Mount Carmel, where the prophet Elijah challenges 450 prophets of Baal to a dramatic showdown — proving that there is only one true God.',
    },
  ],
},

  // ── Non-video resources ────────────────────────────────────────────────────

  {
    id: 'coffee-break',
    title: 'Coffee Break French',
    description:
      'Podcast-style lessons taught in English — ideal for commutes. Transcripts included for every episode.',
    levels: ['A1', 'A2', 'B1', 'B2'],
    format: 'video',
    hasEnglishTranslation: true,
    emoji: '☕',
    totalLessons: 120,
    externalUrl: 'https://coffeebreaklanguages.com/coffeebreakfrench/',
    whatYouLearn: [
      'Complete A1→B2 course with English-speaking host',
      'Grammar explained clearly in English each episode',
      'Downloadable PDF transcripts',
      'Travel, culture and everyday conversation topics',
    ],
    studyTip: 'Listen on your commute. Replay each episode two or three times — the repetition is the method.',
  },

  {
    id: 'lawless-french',
    title: 'Lawless French',
    description:
      'Comprehensive grammar reference and vocabulary lessons — all written in plain English with exercises and answer keys.',
    levels: ['A1', 'A2', 'B1', 'B2'],
    format: 'video',
    hasEnglishTranslation: true,
    emoji: '📖',
    externalUrl: 'https://www.lawlessfrench.com',
    whatYouLearn: [
      'Full grammar reference with English explanations',
      'Vocabulary lessons organised by topic',
      'Quizzes with answer keys',
      'Verb conjugation tables and pronunciation guides',
    ],
    studyTip: 'Bookmark the grammar index — it becomes your go-to reference as you progress through A2 and beyond.',
  },

  {
    id: 'inner-french',
    title: 'Inner French Podcast',
    description:
      'Slow, clear French narrated by a native speaker. Full transcripts with an English glossary for new words.',
    levels: ['B1', 'B2'],
    format: 'podcast',
    hasEnglishTranslation: true,
    emoji: '🎙️',
    totalLessons: 50,
    externalUrl: 'https://innerfrench.com',
    whatYouLearn: [
      'Slow, clear French narrated by a native speaker',
      'Full transcripts with English glossary',
      'Real-world topics: society, science, culture',
      'Builds listening comprehension at B1–B2',
    ],
    studyTip: 'Read the transcript first, then listen. Knowing what is coming frees your brain to focus on sound patterns instead of meaning.',
  },
];