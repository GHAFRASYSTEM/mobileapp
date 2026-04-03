import { useColorScheme } from 'react-native';

export const LightColors = {
  // Backgrounds
  background:        '#F7F6F2',
  surface:           '#FFFFFF',
  header:            '#006B3F',

  // Brand
  primary:           '#006B3F',   // Ghana Green — buttons, active icons
  primaryPressed:    '#005432',
  primarySubtle:     '#E8F5EE',

  gold:              '#FCD116',   // Ghana Gold — badges, card stripe
  goldSubtle:        '#FFF8DC',

  blue:              '#002395',   // France Blue — links, info
  blueSubtle:        '#E6EEFF',

  danger:            '#CE1126',   // Ghana Red — SOS, errors, expired
  dangerSubtle:      '#FDECEA',

  // Text
  textPrimary:       '#1A1A18',
  textSecondary:     '#5A5950',
  textMuted:         '#9A9890',
  textInverse:       '#FFFFFF',
  textLink:          '#002395',
  textSuccess:       '#004D2D',
  textWarning:       '#7A5500',
  textDanger:        '#A50D1E',

  // Borders
  border:            '#E8E6DF',
  borderFocus:       '#006B3F',
  borderDanger:      '#CE1126',

  // Membership card (never changes between modes)
cardBg:     '#FFFFFF',
cardStripe: '#006B3F',   // Ghana green stripe
cardText:   '#1A1A18',
cardMeta:   '#6A6860',
cardValid:  '#006B3F',

  // Status dots
  statusValid:       '#006B3F',
  statusExpiring:    '#FCD116',
  statusExpired:     '#CE1126',

  // Tab bar
  tabActive:         '#006B3F',
  tabInactive:       '#9A9890',
  tabBar:            '#FFFFFF',
};

export const DarkColors = {
  // Backgrounds
  background:        '#111210',
  surface:           '#1E1F1C',
  header:            '#004D2D',

  // Brand
  primary:           '#2DB875',   // Lightened for dark bg contrast
  primaryPressed:    '#3DD98A',
  primarySubtle:     '#0D3320',

  gold:              '#FCD116',   // Unchanged — works on dark
  goldSubtle:        '#2E2500',

  blue:              '#6B8FFF',   // Lightened for dark bg contrast
  blueSubtle:        '#0A1240',

  danger:            '#FF3B50',   // Brightened for dark bg visibility
  dangerSubtle:      '#2D0008',

  // Text
  textPrimary:       '#F0EEE8',
  textSecondary:     '#A8A69E',
  textMuted:         '#606058',
  textInverse:       '#1A1A18',
  textLink:          '#6B8FFF',
  textSuccess:       '#2DB875',
  textWarning:       '#FCD116',
  textDanger:        '#FF6070',

  // Borders
  border:            '#2A2B28',
  borderFocus:       '#2DB875',
  borderDanger:      '#FF3B50',

  // Membership card (intentionally same as light)
  cardBg:            '#1A1A18',
  cardStripe:        '#FCD116',
  cardText:          '#F0EEE8',
  cardMeta:          '#808078',
  cardValid:         '#2DB875',

  // Status dots
  statusValid:       '#2DB875',
  statusExpiring:    '#FCD116',
  statusExpired:     '#FF3B50',

  // Tab bar
  tabActive:         '#2DB875',
  tabInactive:       '#606058',
  tabBar:            '#1E1F1C',
};

export const Colors = {
  light: LightColors,
  dark:  DarkColors,
};

// Auto-resolves to light or dark based on device setting
export function useColors() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? DarkColors : LightColors;
}