import React, { memo } from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../theme';

type Variant =
  | 'hero'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'label'
  | 'verse'
  | 'caption';

interface AppTextProps {
  variant?: Variant;
  color?: string;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  numberOfLines?: number;
}

const AppText = memo(function AppText({
  variant = 'body',
  color = Colors.textPrimary,
  style,
  children,
  numberOfLines,
}: AppTextProps) {
  return (
    <Text
      style={[Typography[variant], { color }, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
});

export default AppText;
