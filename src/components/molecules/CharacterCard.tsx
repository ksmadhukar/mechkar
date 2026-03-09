import React, { memo } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '../atoms/AppText';
import { Colors, Spacing, Radius, Shadow } from '../../theme';
import { Character } from '../../types';

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
  size?: 'compact' | 'full';
}

const CharacterCard = memo(function CharacterCard({
  character,
  onPress,
  size = 'full',
}: CharacterCardProps) {
  const isCompact = size === 'compact';

  return (
    <TouchableOpacity
      style={[styles.container, isCompact && styles.containerCompact]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: character.image_url }}
        style={[styles.image, isCompact && styles.imageCompact]}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.info}>
        <AppText variant="label" color={Colors.goldAccent} numberOfLines={1}>
          {character.era}
        </AppText>
        <AppText variant="h3" color={Colors.textPrimary} numberOfLines={1} style={styles.name}>
          {character.name}
        </AppText>
        {!isCompact && (
          <AppText variant="bodySmall" color={Colors.textSecondary} numberOfLines={1}>
            {character.title}
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.card,
  },
  containerCompact: {
    width: 140,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  imageCompact: {
    aspectRatio: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    background: 'transparent',
    // Gradient-like overlay handled via linear gradient on top
    backgroundColor: 'rgba(12, 26, 43, 0.35)',
    top: '45%',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    paddingTop: Spacing.xl,
    // Bottom gradient
    backgroundColor: 'rgba(12, 26, 43, 0.85)',
    gap: 2,
  },
  name: {
    marginTop: 2,
  },
});

export default CharacterCard;
