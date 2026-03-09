import { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowRight, BookOpen, Clock, Compass } from 'lucide-react-native';

import { AppButton, AppText, Divider } from '../components/atoms';
import { CharacterCard, VerseCard } from '../components/molecules';
import { useCharacters } from '../hooks/useCharacters';
import { useTimeline } from '../hooks/useTimeline';
import { SEED_VERSE_OF_DAY } from '../services/seedData';
import { fetchVerseOfDay } from '../services/supabaseService';
import useAppStore from '../store/useAppStore';
import { Colors, Radius, Shadow, Spacing } from '../theme';
import type { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const QUICK_EXPLORE = [
  { label: 'Characters', icon: Compass, tab: 'Explore' },
  { label: 'Timeline', icon: Clock, tab: 'Timeline' },
  { label: 'Scripture', icon: BookOpen, tab: 'AIStudy' },
] as const;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { verseOfDay, setVerseOfDay } = useAppStore();
  const characters = useCharacters();
  const { timelineEvents } = useTimeline();

  useEffect(() => {
    if (verseOfDay) return;
    fetchVerseOfDay()
      .then((data) => setVerseOfDay(data ?? SEED_VERSE_OF_DAY))
      .catch(() => setVerseOfDay(SEED_VERSE_OF_DAY));
  }, [verseOfDay, setVerseOfDay]);

  const featuredCharacter = characters[0];
  const timelineHighlight = timelineEvents[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <AppText variant="label" color={Colors.goldAccent}>
              ChristianStack
            </AppText>
            <AppText variant="h1" color={Colors.textPrimary} style={styles.logo}>
              Mechkar
            </AppText>
          </View>
          <AppText variant="bodySmall" color={Colors.textSecondary} style={styles.tagline}>
            Bible Intelligence
          </AppText>
        </View>

        <Divider spacing={Spacing.base} />

        {/* Verse of the Day */}
        {verseOfDay && (
          <View style={styles.section}>
            <VerseCard verse={verseOfDay} />
          </View>
        )}

        {/* Featured Character */}
        {featuredCharacter && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AppText variant="h3" color={Colors.textPrimary}>
                Featured Character
              </AppText>
              <TouchableOpacity
                onPress={() => navigation.navigate('Character', { characterId: featuredCharacter.id })}
                style={styles.seeAll}
              >
                <AppText variant="bodySmall" color={Colors.goldAccent}>
                  View
                </AppText>
                <ArrowRight size={14} color={Colors.goldAccent} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <CharacterCard
              character={featuredCharacter}
              onPress={() =>
                navigation.navigate('Character', { characterId: featuredCharacter.id })
              }
            />
          </View>
        )}

        {/* Timeline Highlight */}
        {timelineHighlight && (
          <View style={styles.section}>
            <AppText variant="h3" color={Colors.textPrimary} style={styles.sectionTitle}>
              Timeline Highlight
            </AppText>
            <View style={styles.timelineCard}>
              <View style={styles.timelineCardLeft}>
                <View style={styles.timelineDot} />
              </View>
              <View style={styles.timelineCardContent}>
                <AppText variant="label" color={Colors.goldAccent}>
                  {timelineHighlight.year_label}
                </AppText>
                <AppText variant="h3" color={Colors.textPrimary} style={styles.timelineTitle}>
                  {timelineHighlight.title}
                </AppText>
                <AppText variant="body" color={Colors.textSecondary} numberOfLines={3}>
                  {timelineHighlight.description}
                </AppText>
              </View>
            </View>
          </View>
        )}

        {/* Quick Explore */}
        <View style={styles.section}>
          <AppText variant="h3" color={Colors.textPrimary} style={styles.sectionTitle}>
            Quick Explore
          </AppText>
          <View style={styles.quickRow}>
            {QUICK_EXPLORE.map(({ label, icon: Icon }) => (
              <TouchableOpacity key={label} style={styles.quickCard} activeOpacity={0.8}>
                <View style={styles.quickIcon}>
                  <Icon size={20} color={Colors.goldAccent} strokeWidth={1.8} />
                </View>
                <AppText variant="bodySmall" color={Colors.textPrimary}>
                  {label}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.backgroundPrimary,
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.base,
  },
  header: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  logo: {
    letterSpacing: 1,
    marginTop: 2,
  },
  tagline: {
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  seeAll: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  timelineCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.lg,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Shadow.card,
  },
  timelineCardLeft: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: Spacing.lg,
    width: 40,
  },
  timelineDot: {
    backgroundColor: Colors.goldAccent,
    borderRadius: Radius.full,
    height: 10,
    marginTop: 6,
    shadowColor: Colors.goldAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    width: 10,
  },
  timelineCardContent: {
    flex: 1,
    gap: Spacing.sm,
    padding: Spacing.base,
  },
  timelineTitle: {
    fontSize: 16,
  },
  quickRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  quickCard: {
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.lg,
    flex: 1,
    gap: Spacing.sm,
    padding: Spacing.base,
    ...Shadow.subtle,
  },
  quickIcon: {
    alignItems: 'center',
    backgroundColor: Colors.goldAccentLight,
    borderRadius: Radius.md,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  bottomPad: {
    height: Spacing.xxxl,
  },
});
