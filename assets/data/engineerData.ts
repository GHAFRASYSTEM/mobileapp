
export type Engineer = {
  id: string;
  name: string;
  role: string;
  /** remote URL or local require() path */
  avatar: string;
  /** 1-2 sentence teaser shown on the card */
  shortBio: string;
  /** Full paragraph shown in the modal */
  fullBio: string;
  /** Bullet-point list of project contributions */
  contributions: string[];
  linkedin?: string;
  portfolio?: string;
  github?: string;
  email?: string;
};

export const ENGINEERS: Engineer[] = [
  {
    id: 'agyemang-dev',
    name: 'GYAMFI Nana Agyemang (AgyemangDev)',
    role: 'Lead Full-Stack Engineer',
    avatar: 'https://media.licdn.com/dms/image/v2/D4E35AQHjbaBBxsc3Gw/profile-framedphoto-shrink_800_800/B4EZvcFcYiIEAg-/0/1768923973451?e=1778230800&v=beta&t=CxeJe4awnQxpa4anNKzZJmys7u6fh_-CDE_v0CT1Pj8',
    shortBio:
      "Led mobile & backend engineering — architecting the systems that power GHAFRA's core digital infrastructure.",
fullBio: 'AgyemangDev holds a BSc in Computer Science from KNUST and an ongoing MSc in Software Engineering from Junia, France. He is the Lead Technical Officer of HostelHubb, a platform simplifying campus life for university students across Ghana. His expertise lies in mobile and web system architecture — he has worked across multiple startups, helping bring their ideas to life and strengthening their digital presence.',
   contributions: [
  'Developed the GHAFRA mobile application end-to-end',
  'Built and architected the entire backend system and APIs',
  'Integrated and engineered the payment system',
  'Developed the AI-powered learning and level selection feature',
  'Led full system architecture design and user experience',
],
    linkedin: 'https://www.linkedin.com/in/gyamfi-nana-agyemang/',
    github: 'https://github.com/AgyemangDev',
    email: 'gyamfiagyemang999@gmail.com',
    portfolio: 'https://agyemangdev-portfolio.vercel.app/',
  },
 {
  "id": "2",
  "name": "Derrick Marfo",
  "role": "Software Engineer & AI Specialist",
  "avatar": "https://media.licdn.com/dms/image/v2/D5603AQG-_voWV55OlA/profile-displayphoto-crop_800_800/B56ZpjQwk8HIAI-/0/1762601930578?e=1779321600&v=beta&t=3u-uQtTGuJbZe31aBNIVhs0n-hXYuH0S1FK8RM4I7VQ",
  "shortBio": "Computer science graduate and AI master's student building scalable systems and intelligent applications across web and mobile platforms.",
  "fullBio": "Derrick is a software engineer with a strong foundation in computer science and a growing specialization in artificial intelligence. Currently pursuing a master's in AI, he focuses on building intelligent systems, scalable web applications, and data-driven solutions. He has experience working across frontend and backend technologies, integrating APIs, and developing platforms that support real-time data flow. His work also explores machine learning models and AI-driven features to enhance user experience and system capabilities.",
  "contributions": [
    "Built the admin platform dashboard controlling mobile app content and database operations",
    "Integrated APIs to enable seamless data flow between admin platform, backend database, and mobile application",
    "Designed the data pipeline architecture for efficient information flow across systems",
    "Leading the orchestration of a RAG-based AI chatbot system to handle Ghafra-related queries in the mobile app"
  ],
  "linkedin": "https://www.linkedin.com/in/derrick-marfo-7155a4309/",
  "github": "https://github.com/Prostorm11",
  "email": "marfoofficial111@gmail.com",
  "portfolio": ""
},
 {
  "id": "alpatson-dev",
  "name": "Alpatson Cobbina Siaw",
  "role": "Full-Stack Developer",
  "avatar": "https://media.licdn.com/dms/image/v2/D4E03AQEFz6mmohKvSQ/profile-displayphoto-crop_800_800/B4EZntitlLGcAI-/0/1760626924403?e=1779321600&v=beta&t=ca73YlY0C__tGSi9ZexEdk2opa4vRLMDGOUlnE0R96Y",
  "shortBio": "Software engineering student and chess enthusiast focused on building high-performance full-stack applications with strategic precision.",
  "fullBio": "Alpatson is a software engineering student with three years of experience transitioning from a backend-focused background into comprehensive full-stack development. Much like his approach to chess, he views coding as a series of strategic maneuvers, prioritizing efficiency and long-term scalability in every build. He thrives on solving complex technical puzzles and is currently honing his expertise in modern web frameworks and cloud-integrated systems.",
  "contributions": [
    "Designed and developed the secure user authentication and login architecture",
    "Architected and implemented the comprehensive administrative dashboard interface",
    "Developed the front-end logic to ensure a seamless and intuitive user experience",
    "Collaborated on full-stack integration to bridge backend services with client-side functionality"
  ],
  "linkedin": "https://www.linkedin.com/in/alpatson-cobbina-siaw/",
  "github": "https://github.com/ALpatson",
  "email": "cobbinaalpatson@gmail.com",
  "portfolio": "https://alpatsonportfolio.vercel.app/"
},
{
    id: '123',
    name: 'Anthony Teye-Adjei',
    role: 'Software Developer',
    avatar: 'https://2.gravatar.com/avatar/9004ef53f0abf295a0ac4ad6fee9be0c3a5898936370700064dfb2c9c712bd34?size=512',
    shortBio:
      "Building solutions for a better tomorrow with technology.",
    fullBio:
      'Anthony has a passion for using technology to deliver solutions that solve societies issues, impacting lives positively.',
    contributions: [
      "Co-design and development of GHAFRA's website",
    ],
    linkedin: 'https://www.linkedin.com/in/antonadjei/',
    github: 'https://github.com/tonyadjei',
    email: 'tonyteyeadjei@gmail.com',
    portfolio: '',
  }
];