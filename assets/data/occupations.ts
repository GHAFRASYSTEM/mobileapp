export const OCCUPATION_MAP: [RegExp, string][] = [
  // Students & education
  [/^stud[ae]?n?t?s?$/i,               'Student'],
  [/^pupil?s?$/i,                     'Student'],
  [/^interns?$/i,                     'Intern'],
  [/^trainee?s?$/i,                   'Trainee'],

  // Healthcare
  [/^nurs[eo]?s?$/i,                  'Nurse'],
  [/^doc?t?o?r?s?$|^physician?s?$/i,  'Doctor'],
  [/^dent[ia]?s?t?s?$/i,              'Dentist'],
  [/^pharmac[yi]?s?t?s?$/i,           'Pharmacist'],
  [/^midwife?s?$/i,                   'Midwife'],

  // Tech
  [/^dev[ae]?l?o?p[ae]?r?s?$/i,       'Developer'],
  [/^softw?are\s*eng(ineer)?s?$/i,    'Software Engineer'],
  [/^data\s*scientist?s?$/i,          'Data Scientist'],
  [/^cyber\s*sec(urity)?$/i,          'Cybersecurity Specialist'],
  [/^it\s*support$/i,                 'IT Support'],

  // Business / Office
  [/^account[ae]?n?t?s?$/i,           'Accountant'],
  [/^mana?g[ae]?r?s?$/i,              'Manager'],
  [/^consult[ae]?n?t?s?$/i,           'Consultant'],
  [/^hr$/i,                          'HR'],
  [/^admin(istrator)?s?$/i,           'Administrator'],

  // Creative
  [/^des[iy]?gn[ae]?r?s?$/i,          'Designer'],
  [/^photograph[ae]?r?s?$/i,          'Photographer'],
  [/^videograph[ae]?r?s?$/i,          'Videographer'],
  [/^journalist?s?$/i,                'Journalist'],

  // Skilled / manual
  [/^dri?v[ae]?r?s?$/i,               'Driver'],
  [/^chefs?|cook?s?$/i,               'Chef'],
  [/^mechanic?s?$/i,                  'Mechanic'],
  [/^electrician?s?$/i,               'Electrician'],
  [/^plumber?s?$/i,                   'Plumber'],

  // Misc
  [/^lawy[ae]?r?s?$/i,                'Lawyer'],
  [/^arch[ie]t[ae]c?t?s?$/i,          'Architect'],
  [/^entrepreneur?s?$/i,              'Entrepreneur'],
  [/^social\s*work[ae]?r?s?$/i,       'Social Worker'],
];