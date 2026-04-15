// Ghana 🇬🇭 + France 🇫🇷 palette
export const ACCENT_COLORS = [
  '#CE1126', // Red
  '#FCD116', // Yellow
  '#006B3F', // Green
  '#b48686', // White
  '#002395', // Blue
];

// deterministic color from name
export function getExecutiveAccent(seed: string) {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length];
}