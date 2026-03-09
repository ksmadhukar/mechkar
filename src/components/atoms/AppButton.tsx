import React, { memo } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import AppText from './AppText';
import { Colors, Spacing, Radius } from '../../theme';

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const AppButton = memo(function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
}: AppButtonProps) {
  const containerStyle: ViewStyle[] = [
    styles.base,
    styles[variant],
    styles[`size_${size}`] as ViewStyle,
    disabled || loading ? styles.disabled : {},
    style ?? {},
  ];

  const textColor =
    variant === 'primary' ? Colors.backgroundPrimary : Colors.goldAccent;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.backgroundPrimary : Colors.goldAccent}
        />
      ) : (
        <AppText variant="label" color={textColor}>
          {label}
        </AppText>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
  },
  primary: {
    backgroundColor: Colors.goldAccent,
  },
  secondary: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.goldAccent,
  },
  ghost: {
    backgroundColor: Colors.transparent,
  },
  size_sm: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  size_md: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  size_lg: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default AppButton;
