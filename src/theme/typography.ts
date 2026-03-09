import { TextStyle } from 'react-native';

export const FontFamily = {
  heading: 'PlayfairDisplay_700Bold',
  headingRegular: 'PlayfairDisplay_400Regular',
  headingItalic: 'PlayfairDisplay_400Regular_Italic',
  body: 'Inter_400Regular',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;

export const Typography: Record<string, TextStyle> = {
  hero: {
    fontFamily: FontFamily.heading,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  h1: {
    fontFamily: FontFamily.heading,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: FontFamily.heading,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily: FontFamily.headingRegular,
    fontSize: 18,
    lineHeight: 26,
  },
  bodyLarge: {
    fontFamily: FontFamily.body,
    fontSize: 17,
    lineHeight: 26,
  },
  body: {
    fontFamily: FontFamily.body,
    fontSize: 15,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: FontFamily.body,
    fontSize: 13,
    lineHeight: 20,
  },
  label: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  verse: {
    fontFamily: FontFamily.headingItalic,
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  caption: {
    fontFamily: FontFamily.body,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
};
