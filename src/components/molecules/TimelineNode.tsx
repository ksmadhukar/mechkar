import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Radius, Shadow, Spacing } from '../../theme';
import { Colors } from '../../theme/colors';
import type { TimelineEvent } from '../../types';
import AppText from '../atoms/AppText';

interface TimelineNodeProps {
  event: TimelineEvent;
  isActive: boolean;
  isLast?: boolean;
  onPress: () => void;
}

const GOLD_MID = 'rgba(198,168,90,0.3)';

const TimelineNode = memo(function TimelineNode({
  event,
  isActive,
  isLast = false,
  onPress,
}: TimelineNodeProps) {
  return (
    <View style={styles.wrapper}>
      {!isLast && <View style={styles.connector} />}

      <TouchableOpacity
        style={[styles.container, isActive && { ...styles.containerActive, borderColor: GOLD_MID }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={[styles.dot, isActive && styles.dotActive]} />

        <View style={styles.content}>
          <AppText
            variant="label"
            color={isActive ? Colors.goldAccent : Colors.textSecondary}
          >
            {event.year_label}
          </AppText>
          <AppText
            variant="h3"
            color={isActive ? Colors.textPrimary : Colors.textSecondary}
            style={styles.title}
          >
            {event.title}
          </AppText>
          {isActive && (
            <AppText variant="bodySmall" color={Colors.textSecondary} numberOfLines={2}>
              {event.description}
            </AppText>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: Spacing.base,
  },
  connector: {
    backgroundColor: Colors.divider,
    bottom: -Spacing.base,
    left: 11,
    position: 'absolute',
    top: 28,
    width: 1,
  },
  container: {
    alignItems: 'flex-start',
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.md,
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.md,
    ...Shadow.subtle,
  },
  containerActive: {
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
  },
  dot: {
    backgroundColor: Colors.divider,
    borderRadius: Radius.full,
    flexShrink: 0,
    height: 10,
    marginTop: 6,
    width: 10,
  },
  dotActive: {
    backgroundColor: Colors.goldAccent,
    elevation: 4,
    shadowColor: Colors.goldAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
  },
});

export default TimelineNode;
