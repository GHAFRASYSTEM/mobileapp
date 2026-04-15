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
  department: 'Civil Engineer',
  image:      require('@/assets/images/executives/president.jpeg'),
  bio:        'Abdulai Mustapha serves as the President of GHA-FRA Nord, providing strategic leadership and guiding the association’s vision since its establishment. With a professional background in civil engineering and extensive experience in community leadership, he has played a key role in expanding membership, strengthening unity among Ghanaians in Northern France, and building meaningful partnerships with French institutions. His leadership is driven by a strong commitment to community development, integration, and the collective advancement of Ghanaians living in France.',
  email:      'ghafra.nord@gmail.com',
  since:      '2024',
},
  {
    id:         '2',
    name:       'Dr. Felix Ofori-Agyemang',
    role:       'Vice President',
    department: 'Researcher',
    image:      require('@/assets/images/executives/vicepresident.png'),
    bio:        'Felix Ofori-Agyemang, a Researcher, serves as the Vice-President of GHA-FRA Nord. Since the association’s inception in March 2024, he has played an active leadership role in supporting the growth and direction of the organization. Driven by a strong sense of service and community responsibility, Felix is committed to using his skills, knowledge, and resources to help create an enabling and supportive environment where Ghanaians in Lille can thrive socially, professionally, and culturally. Through his leadership, he contributes to strengthening unity within the community while promoting initiatives that enhance integration, collaboration, and collective progress.',
    email:      'ghafra.nord@gmail.com',
    since:      '2024',
  },
{
  id:         '10',
  name:       'Shine Afi Kuwornu',
  role:       'General Secretary',
  department: 'Plant Biotechnologist',
  image:      require('@/assets/images/executives/gensecretary.png'),
  bio:        'Shine is a plant biotechnologist with a strong passion for improving food security. As General Secretary, she supports administrative coordination and communication within the association. Motivated by her personal experience as a Ghanaian student in France, she is committed to helping others navigate challenges, while making a positive impact and continuously developing herself.',
  email:      'ghafra.nord@gmail.com',
  since:      'Nov 2024',
},
{
  id:         '3',
  name:       'Okai Jessey',
  role:       'Administrator',
  department: 'Pensioner',
  image:      require('@/assets/images/executives/admin.jpg'),
  bio:        'Jessey is a seasoned professional and pensioner who brings years of organizational wisdom to GHA-FRA. As Administrator, he focuses on strengthening the association’s administrative structure with precision and a steady hand, while mentoring the younger generation and fostering a well-organized support system for Ghanaians in France.',
  email:      'ghafra.nord@gmail.com',
  since:      'March 2025',
},
  {
    id:         '4',
    name:       'Emmanuel Baidoo',
    role:       'Treasurer',
    department: 'Agronomist',
    image:      require('@/assets/images/executives/treasurer.jpeg'),
    bio:        'Emmanuel Baidoo, an agronomist, serves as the Treasurer of GHA-FRA Nord. He is responsible for managing the association’s finances, including dues collection, record keeping, and providing transparent financial reports to ensure accountability and trust within the organization. Passionate about community development, he works to support initiatives that empower and unite the Ghanaian community in Northern France. Motivated by his personal experiences navigating integration challenges in France, Emmanuel joined GHA-FRA Nord to help build a strong support system that enables fellow Ghanaians to overcome barriers and access better opportunities. He began his role in February 2025.',
    email:      'ghafra.nord@gmail.com',
    since:      '2024',
  },
  {
    id:         '6',
    name:       'Joshua Opoku Agyemang',
    role:       'Media Head',
    department: 'Communications',
    image:      require('@/assets/images/executives/media.png'),
    bio:        'Joshua has served as Media Coordinator for GHAFRA since May 2024, contributing to the association’s digital growth and visibility. With experience in social media management, content planning, and branding, he helps ensure engaging communication across platforms. He is passionate about strengthening GHAFRA’s online presence and building a connected, informed community for Ghanaian nationals in France.',
    email:      'ghafra.nord@gmail.com',
    since:      '2024',
  },
    {
    id:         '61',
    name:       'Estherlla Abui Tamakloe',
    role:       'International Relations Officer',
    department: 'Accounting & Finance Graduate',
    image:      require('@/assets/images/executives/iromain.jpeg'),
    bio:        'Estherlla Abui Tamakloe, an Accounting and Finance graduate and International Project Manager, serves as the International Coordinator & Project Manager for GHA-FRA Nord. She brings expertise in financial analysis, organizational management, and international project coordination, with active involvement in Erasmus+ initiatives that promote youth development and community engagement across multicultural environments. Driven by a strong belief in integration and community support, Estherlla joined the association to help Ghanaians fully access opportunities available in France, particularly through international programs. Her work focuses on raising awareness, facilitating participation, and empowering members in their personal and professional growth. She began serving in September 2024.',
    since:      '2024',
  },
    {
    id:         '60',
    name:       'Benedict Owusu-Doubreh',
    role:       'Ass. International Relations Officer',
    department: 'Quality Assurance Specialist',
    image:      require('@/assets/images/executives/iro.jpeg'),
    bio:        'Benedict Owusu-Doubreh, a Quality Assurance Specialist, serves as the Assistant International Relations Officer for GHA-FRA Nord. In his role, he supports the executive team in developing strategies that assist Ghanaians in navigating life in France and ensuring smooth transitions both into and out of the country. Motivated by a desire to build a supportive community, Benedict joined the association to help Ghanaian students adapt successfully to living in France and access the guidance they need. He began serving around the first quarter of 2023.',
    since:      '2024',
  },
];

export const DEPARTMENTS = [...new Set(EXECUTIVES.map(e => e.department))];