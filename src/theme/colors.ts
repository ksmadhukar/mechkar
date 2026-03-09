export const Colors = {
  backgroundPrimary: '#0C1A2B',
  backgroundSecondary: '#111F33',
  cardBackground: '#1B2A40',
  goldAccent: '#C6A85A',
  divider: '#2C3E57',
  textPrimary: '#F5F3EE',
  textSecondary: '#A7B1C2',

  // Extra utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0,0,0,0.5)',
  goldAccentLight: 'rgba(198,168,90,0.15)',
  goldAccentMid: 'rgba(198,168,90,0.3)',
} as const;

export type ColorKey = keyof typeof Colors;
