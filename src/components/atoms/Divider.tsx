import React, { memo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../../theme';

interface DividerProps {
  vertical?: boolean;
  color?: string;
  spacing?: number;
  style?: ViewStyle;
}

const Divider = memo(function Divider({
  vertical = false,
  color = Colors.divider,
  spacing = Spacing.lg,
  style,
}: DividerProps) {
  if (vertical) {
    return (
      <View
        style={[
          styles.vertical,
          { backgroundColor: color, marginHorizontal: spacing / 2 },
          style,
        ]}
      />
    );
  }
  return (
    <View
      style={[
        styles.horizontal,
        { backgroundColor: color, marginVertical: spacing },
        style,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  horizontal: {
    height: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
  vertical: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
});

export default Divider;
