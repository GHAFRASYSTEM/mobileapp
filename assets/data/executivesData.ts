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
    department: 'Executive Board',
    image:      require('@/assets/images/executives/president.jpeg'),
    bio:        'Mustapha has led GHAFRA since the beginning, driving membership growth and strengthening ties between the Ghanaian community and French institutions. With a background in international relations and over 7 years of community leadership, he brings vision and dedication to every initiative.',
    email:      'ghafra.nord@gmail.com',
    since:      '2024',
  },
  {
    id:         '2',
    name:       'Dr. Felix Ofori-Agyemang',
    role:       'Vice President',
    department: 'Executive Board',
    image:      require('@/assets/images/executives/vicepresident.png'),
    bio:        'Felix has been actively involved in GHAFRA since its inception in March 2024, contributing to the growth and cohesion of the Ghanaian community in Lille. As Vice-President, he is committed to leveraging his skills and resources to create an enabling environment where Ghanaians can thrive. With a strong passion for community development and collaboration, he focuses on fostering unity, supporting members, and strengthening the presence of Ghanaians within the local and international space.',
    email:      'ghafra.nord@gmail.com',
    since:      '2024',
  },
    {
    id:         '10',
    name:       'Kofi Mensah',
    role:       'Administrator',
    department: 'Administration',
    image:      require('@/assets/images/executives/gensecretary.png'),
    bio:        'Kofi manages all administrative operations, meeting minutes, and official correspondence. His meticulous approach ensures the association runs smoothly and transparently.',
    email:      'ghafra.nord@gmail.com',
    since:      '2022',
  },
  {
    id:         '3',
    name:       'Kofi Mensah',
    role:       'General Secretary',
    department: 'Administration',
    image:      require('@/assets/images/executives/gensecretary.png'),
    bio:        'Kofi manages all administrative operations, meeting minutes, and official correspondence. His meticulous approach ensures the association runs smoothly and transparently.',
    email:      'ghafra.nord@gmail.com',
    since:      '2022',
  },
  {
    id:         '4',
    name:       'Efua Darko',
    role:       'Treasurer',
    department: 'Finance',
    image:      require('@/assets/images/executives/treasurer.png'),
    bio:        'Efua is a certified accountant who oversees GHAFRA\'s finances, dues collection, and budget reporting. She ensures full financial transparency and accountability to all members.',
    email:      'ghafra.nord@gmail.com',
    since:      '2022',
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
    department: 'Communications',
    image:      require('@/assets/images/executives/iromain.jpeg'),
    bio:        'Estherlla joined GHAFRA in September 2024, contributing to international initiatives and community-focused projects. With a background in finance and project management, she brings a structured and collaborative approach to her work. She is driven by a vision to strengthen integration and increase access to opportunities in France, helping members stay informed and connected.',
    since:      '2024',
  },
    {
    id:         '60',
    name:       'Benedict Owusu-Doubreh',
    role:       'Ass. International Relations Officer',
    department: 'Communications',
    image:      require('@/assets/images/executives/iro.jpeg'),
    bio:        'Benedict has been serving with GHAFRA, supporting initiatives that assist Ghanaians in navigating life in France. In his role, he contributes to strategies that promote smooth transitions for members arriving, living, and departing the country. He is motivated by the need to provide practical guidance and reliable support, ensuring that Ghanaian nationals feel prepared, informed, and confident as they settle and adapt to life in France.',
    since:      '2024',
  },
];

export const DEPARTMENTS = [...new Set(EXECUTIVES.map(e => e.department))];