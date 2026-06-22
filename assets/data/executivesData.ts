export type Executive = {
  id:          string;
  name:        string;
  role:        string;
  department:  string;
  image:       any;           // require('@/assets/images/executives/...')
  bio:         string;
  email?:      string;
  phone?:      string;
  since?:      string;        // year they took the role
  social?: {
    linkedin?:  string;
    twitter?:   string;
  };
};

export const EXECUTIVES: Executive[] = [
  {
    id:         '1',
    name:       'ABDULAI Mustapha',
    role:       'President',
    department: 'Civil Engineer, Community Educator & French Youth Coach',
    image:      require('@/assets/images/executives/president.jpeg'),
    bio:        'Abdulai Mustapha is a Civil Engineer, specialized in machine operations and community educator with Itineraire and Mairie de Quartier, also serving as a French Youth Coach where he actively invests in the growth of young talent. As President of GHA-FRA Nord, he provides strategic leadership and guides the association\'s vision since its establishment in 2024. His leadership is driven by a strong commitment to community development, integration, and the collective advancement of Ghanaians living in France, working to expand membership, strengthen unity, and build meaningful partnerships with French institutions.',
    email:      'president@ghafra.com',
    since:      '2024',
  },
  {
    id:         '2',
    name:       'Dr. Felix Ofori-Agyemang',
    role:       'Vice President',
    department: 'Researcher',
    image:      require('@/assets/images/executives/vicepresident.png'),
    bio:        'Felix Ofori-Agyemang is a Researcher in Environmental Science, holding a Bachelor\'s degree from KNUST and both a Master\'s and Doctorate from JUNIA in Lille, France. As Vice-President of GHA-FRA Nord since the association\'s inception in March 2024, he plays an active leadership role in supporting the growth and direction of the organization. Driven by a strong sense of service and community responsibility, Felix is committed to using his skills, knowledge, and resources to help create an enabling environment where Ghanaians in Lille can thrive socially, professionally, and culturally.',
    email:      'ghafra.nord@gmail.com',
    since:      '2024',
  },
  {
    id:         '10',
    name:       'Shine Afi Kuwornu',
    role:       'General Secretary',
    department: 'Plant Biotechnologist',
    image:      require('@/assets/images/executives/gensecretary.jpeg'),
    bio:        'Shine Afi Kuwornu is a Plant Biotechnologist with a strong passion for improving food security and advancing agricultural research. As General Secretary of GHA-FRA Nord, she supports administrative coordination and communication within the association. Motivated by her personal experience as a Ghanaian student in France, she is committed to helping others navigate challenges, fostering a welcoming environment, and contributing to the collective growth of the Ghanaian community in Northern France.',
    email:      'ghafra.nord@gmail.com',
    since:      'Nov 2024',
  },
  {
    id:         '3',
    name:       'Okai Jessey',
    role:       'Administrator',
    department: 'Pensioner',
    image:      require('@/assets/images/executives/admin.jpg'),
    bio:        'Jessey Okai is a pensioner who brings years of organizational and administrative expertise accumulated over a distinguished career. As Administrator of GHA-FRA Nord since January 2026, he focuses on strengthening the association\'s administrative structure with precision and a steady hand, while mentoring younger members and fostering a well-organized support system for Ghanaians in France.',
    email:      'ghafra.nord@gmail.com',
    since:      'August 2025',
  },
  {
    id:         '4',
    name:       'Emmanuel Baidoo',
    role:       'Treasurer',
    department: 'Agronomist',
    image:      require('@/assets/images/executives/treasurer.jpeg'),
    bio:        'Emmanuel Baidoo is an Agronomist holding a Bachelor\'s degree from KNUST and a Master\'s degree from JUNIA in Lille, France, with expertise in sustainable agriculture and food systems. As Treasurer of GHA-FRA Nord, he is responsible for managing the association\'s finances, including dues collection, record keeping, and providing transparent financial reports to ensure accountability and trust within the organization. Motivated by his personal experiences navigating integration challenges in France, Emmanuel is committed to building a strong support system that enables fellow Ghanaians to overcome barriers and access better opportunities.',
    email:      'ghafra.nord@gmail.com',
    since:      '2024',
  },
  {
    id:         '6',
    name:       'Joshua Opoku Agyemang',
    role:       'Media Head',
    department: 'Communications',
    image:      require('@/assets/images/executives/media.png'),
    bio:        'Joshua Opoku Agyemang is an Environmental Scientist holding a Master\'s degree from JUNIA in Lille, France, combining his scientific background with a keen interest in digital communication and community outreach. As Media Head of GHA-FRA Nord since May 2024, he drives the association\'s digital growth and visibility through social media management, content planning, and branding. He is passionate about strengthening GHA-FRA Nord\'s online presence and building a connected, well-informed community for Ghanaian nationals in France.',
    email:      'ghafra.nord@gmail.com',
    since:      '2024',
  },
  {
    id:         '61',
    name:       'Estherlla Abui Tamakloe',
    role:       'International Relations Officer',
    department: 'Accounting & Finance Graduate',
    image:      require('@/assets/images/executives/iromain.jpeg'),
    bio:        'Estherlla Abui Tamakloe, an Accounting and Finance graduate and International Project Manager, brings expertise in financial analysis, organizational management, and international project coordination, with active involvement in Erasmus+ initiatives that promote youth development and community engagement across multicultural environments. As International Relations Officer of GHA-FRA Nord since September 2024, she works to help Ghanaians fully access opportunities available in France, particularly through international programs, focusing on raising awareness, facilitating participation, and empowering members in their personal and professional growth.',
    since:      '2024',
  },
  {
    id:         '60',
    name:       'Benedict Owusu-Doubreh',
    role:       'Ass. International Relations Officer',
    department: 'Quality Assurance Specialist',
    image:      require('@/assets/images/executives/iro.jpeg'),
    bio:        'Benedict Owusu-Doubreh is a Quality Assurance Specialist in Food Science, bringing a rigorous, detail-oriented approach to both his professional and community work. As Assistant International Relations Officer of GHA-FRA Nord, he supports the executive team in developing strategies that assist Ghanaians in navigating life in France and ensuring smooth transitions both into and out of the country. Motivated by a desire to build a supportive community, Benedict is dedicated to helping Ghanaian students adapt successfully to living in France and access the guidance they need.',
    since:      '2024',
  },
];

export const DEPARTMENTS = [...new Set(EXECUTIVES.map(e => e.department))];