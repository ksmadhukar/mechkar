import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import AppText from '../atoms/AppText';
import { Colors, Spacing, Radius, Shadow } from '../../theme';
import { Verse } from '../../types';

interface VerseCardProps {
  verse: Verse;
}

const VerseCard = memo(function VerseCard({ verse }: VerseCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.goldBar} />
      <View style={styles.content}>
        <View style={styles.header}>
          <BookOpen size={14} color={Colors.goldAccent} strokeWidth={1.8} />
          <AppText variant="label" color={Colors.goldAccent} style={styles.dayLabel}>
            Verse of the Day
          </AppText>
        </View>
        <AppText variant="verse" color={Colors.textPrimary} style={styles.verseText}>
          "{verse.text}"
        </AppText>
        <AppText variant="bodySmall" color={Colors.goldAccent} style={styles.reference}>
          — {verse.reference}
        </AppText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.lg,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Shadow.card,
  },
  goldBar: {
    width: 3,
    backgroundColor: Colors.goldAccent,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dayLabel: {
    letterSpacing: 1,
  },
  verseText: {
    color: Colors.textPrimary,
  },
  reference: {
    alignSelf: 'flex-end',
  },
});

export default VerseCard;
