import { MaterialIcons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

type Section = {
  label:    string;
  sub:      string;
  icon:     IconName;
  route:    string;
  accent:   string;
  accentTx: string;
};

export const SECTIONS: Section[] = [
  {
    label:    'Housing',
    sub:      'Find accommodation',
    icon:     'home',
    route:    '/(tabs)/(community)/housing',
    accent:   '#E8F5EE',
    accentTx: '#006B3F',
  },
  {
    label:    'Event Calendar',
    sub:      'Upcoming events',
    icon:     'calendar-today',
    route:    '/(tabs)/(community)/eventCalendar',
    accent:   '#FFF8DC',
    accentTx: '#7A5500',
  },

  {
    label:    'Jobs & Internships',
    sub:      'Find jobs, internships, and career opportunities',
    icon:     'work',
    route:    '/(tabs)/(community)/jobInternship',
    accent:   '#E6EEFF',
    accentTx: '#002395',
  },
  {
    label:    'Tour & Explore',
    sub:      'Discover cities, culture, and hidden gems',
    icon:     'explore',
    route:    '/(tabs)/(community)/tour',
    accent:   '#E8F5EE',
    accentTx: '#006B3F',
  },

  {
    label:    'GhaFra Care',
    sub:      'Support & assistance',
    icon:     'favorite',
    route:    '/(tabs)/(community)/ghafra_care',
    accent:   '#FDECEA',
    accentTx: '#A50D1E',
  },

  // OTA Update
  {
    label:    'Market & Services',
    sub:      'Buy, sell & hire',
    icon:     'storefront',
    route:    '/(tabs)/(community)/marketservice',
    accent:   '#FFF8DC',
    accentTx: '#7A5500',
  },
];