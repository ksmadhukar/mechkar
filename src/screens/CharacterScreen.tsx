import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, RouteProp } from '@react-navigation/native-stack';
import { ChevronLeft, Clock, MapPin, Users } from 'lucide-react-native';

import { AppText } from '../components/atoms';
import { fetchCharacterDetails, fetchRelatedCharacters } from '../services/supabaseService';
import useAppStore from '../store/useAppStore';
import { Colors, Radius, Shadow, Spacing } from '../theme';
import type {
  CharacterDetails,
  CharacterRef,
  Location,
  RootStackParamList,
  TimelineEvent,
  Verse,
} from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'Character'>;
type Tab = 'overview' | 'events' | 'locations' | 'verses';

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'events', label: 'Events' },
  { key: 'locations', label: 'Locations' },
  { key: 'verses', label: 'Verses' },
];

type RawCharacterDetails = {
  character_events?: { timeline_events: TimelineEvent | null }[];
  character_locations?: { locations: Location | null }[];
  character_verses?: { verses: Verse | null }[];
  [key: string]: unknown;
};

function dedupeById<T extends { id: string }>(items: T[]): T[] {
  return [...new Map(items.map((i) => [i.id, i])).values()];
}

export default function CharacterScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { characterId } = route.params;

  const characters = useAppStore((s) => s.characters);
  const storeLocations = useAppStore((s) => s.locations);
  const baseCharacter = characters.find((c) => c.id === characterId);

  const [details, setDetails] = useState<CharacterDetails | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // Fetch character with events, locations, verses
  useEffect(() => {
    fetchCharacterDetails(characterId)
      .then((raw: RawCharacterDetails) => {
        const events: TimelineEvent[] = dedupeById(
          (raw.character_events ?? []).map((r) => r.timeline_events).filter((e): e is TimelineEvent => e !== null)
        );
        const locations: Location[] = dedupeById(
          (raw.character_locations ?? []).map((r) => r.locations).filter((l): l is Location => l !== null)
        );
        const verses: Verse[] = dedupeById(
          (raw.character_verses ?? []).map((r) => r.verses).filter((v): v is Verse => v !== null)
        );
        setDetails({ ...(raw as unknown as CharacterDetails), events, locations, verses, relatedCharacters: [] });
      })
      .catch(() => {
        if (baseCharacter) {
          setDetails({ ...baseCharacter, events: [], locations: [], verses: [], relatedCharacters: [] });
        }
      });
  }, [characterId, baseCharacter]);

  // Fetch related characters once details are loaded
  useEffect(() => {
    if (!details) return;
    const eventIds = details.events.map((e) => e.id);
    const locationIds = details.locations.map((l) => l.id);
    if (!eventIds.length && !locationIds.length) return;

    fetchRelatedCharacters(eventIds, locationIds, characterId)
      .then((related) =>
        setDetails((prev) => (prev ? { ...prev, relatedCharacters: related as CharacterRef[] } : null))
      )
      .catch(() => {});
  }, [details, characterId]);

  const character = details ?? baseCharacter;
  if (!character) return null;

  function locationNameForEvent(event: TimelineEvent): string | null {
    if (!event.location_id) return null;
    return storeLocations.find((l) => l.id === event.location_id)?.name ?? null;
  }

  const stats = details
    ? [
        { label: 'Events', count: details.events.length },
        { label: 'Locations', count: details.locations.length },
        { label: 'Verses', count: details.verses.length },
      ]
    : [];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image source={{ uri: character.image_url }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay} />

          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={22} color={Colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>

          <View style={styles.heroInfo}>
            <AppText variant="label" color={Colors.goldAccent}>
              {character.era}
            </AppText>
            <AppText variant="hero" color={Colors.textPrimary} style={styles.heroName}>
              {character.name}
            </AppText>
            <AppText variant="body" color={Colors.textSecondary}>
              {character.title}
            </AppText>
          </View>
        </View>

        {/* Stats row */}
        {stats.length > 0 && (
          <View style={styles.statsRow}>
            {stats.map((s, i) => (
              <View key={s.label} style={[styles.statItem, i < stats.length - 1 && styles.statBorder]}>
                <AppText variant="h2" color={Colors.goldAccent}>
                  {s.count}
                </AppText>
                <AppText variant="bodySmall" color={Colors.textSecondary}>
                  {s.label}
                </AppText>
              </View>
            ))}
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabRow}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.7}
              >
                <AppText variant="label" color={isActive ? Colors.goldAccent : Colors.textSecondary}>
                  {tab.label}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab Content */}
        <View style={styles.body}>

          {/* ── Overview ── */}
          {activeTab === 'overview' && (
            <>
              <AppText variant="bodyLarge" color={Colors.textSecondary} style={styles.overview}>
                {character.overview}
              </AppText>

              {(details?.relatedCharacters.length ?? 0) > 0 && (
                <View style={styles.relatedSection}>
                  <View style={styles.relatedHeader}>
                    <Users size={14} color={Colors.goldAccent} strokeWidth={1.8} />
                    <AppText variant="label" color={Colors.goldAccent} style={styles.relatedTitle}>
                      Connected People
                    </AppText>
                  </View>
                  <View style={styles.relatedList}>
                    {(details?.relatedCharacters ?? []).map((ref) => (
                      <TouchableOpacity
                        key={ref.id}
                        style={styles.relatedChip}
                        onPress={() => navigation.push('Character', { characterId: ref.id })}
                        activeOpacity={0.75}
                      >
                        {ref.image_url ? (
                          <Image source={{ uri: ref.image_url }} style={styles.relatedAvatar} />
                        ) : (
                          <View style={[styles.relatedAvatar, styles.relatedAvatarFallback]} />
                        )}
                        <View style={styles.relatedChipText}>
                          <AppText variant="label" color={Colors.textPrimary} numberOfLines={1}>
                            {ref.name}
                          </AppText>
                          <AppText variant="bodySmall" color={Colors.textSecondary} numberOfLines={1}>
                            {ref.title}
                          </AppText>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </>
          )}

          {/* ── Events ── */}
          {activeTab === 'events' && (
            details?.events.length ? (
              details.events.map((event) => {
                const locName = locationNameForEvent(event);
                return (
                  <View key={event.id} style={styles.card}>
                    <View style={styles.cardIconWrap}>
                      <Clock size={16} color={Colors.goldAccent} strokeWidth={1.8} />
                    </View>
                    <View style={styles.cardContent}>
                      <View style={styles.cardMeta}>
                        <AppText variant="label" color={Colors.goldAccent}>
                          {event.year_label}
                        </AppText>
                        {locName && (
                          <View style={styles.locBadge}>
                            <MapPin size={10} color={Colors.textSecondary} strokeWidth={2} />
                            <AppText variant="bodySmall" color={Colors.textSecondary}>
                              {locName}
                            </AppText>
                          </View>
                        )}
                      </View>
                      <AppText variant="h3" color={Colors.textPrimary} style={styles.cardTitle}>
                        {event.title}
                      </AppText>
                      <AppText variant="bodySmall" color={Colors.textSecondary}>
                        {event.description}
                      </AppText>
                      <View style={styles.categoryBadge}>
                        <AppText variant="bodySmall" color={Colors.goldAccent}>
                          {event.category}
                        </AppText>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <AppText variant="body" color={Colors.textSecondary} style={styles.empty}>
                No events linked yet.
              </AppText>
            )
          )}

          {/* ── Locations ── */}
          {activeTab === 'locations' && (
            details?.locations.length ? (
              details.locations.map((loc) => (
                <View key={loc.id} style={styles.card}>
                  <View style={styles.cardIconWrap}>
                    <MapPin size={16} color={Colors.goldAccent} strokeWidth={1.8} />
                  </View>
                  <View style={styles.cardContent}>
                    <AppText variant="h3" color={Colors.textPrimary}>
                      {loc.name}
                    </AppText>
                    <AppText variant="bodySmall" color={Colors.textSecondary} style={styles.cardTitle}>
                      {loc.description}
                    </AppText>
                    {loc.significance ? (
                      <View style={styles.significanceBadge}>
                        <AppText variant="bodySmall" color={Colors.goldAccent}>
                          {loc.significance}
                        </AppText>
                      </View>
                    ) : null}
                    <AppText variant="bodySmall" color={Colors.divider} style={styles.coordText}>
                      {loc.latitude.toFixed(4)}°N · {loc.longitude.toFixed(4)}°E
                    </AppText>
                  </View>
                </View>
              ))
            ) : (
              <AppText variant="body" color={Colors.textSecondary} style={styles.empty}>
                No locations linked yet.
              </AppText>
            )
          )}

          {/* ── Verses ── */}
          {activeTab === 'verses' && (
            details?.verses.length ? (
              details.verses.map((verse) => (
                <View key={verse.id} style={styles.verseCard}>
                  <View style={styles.verseBar} />
                  <View style={styles.verseContent}>
                    <View style={styles.verseTopRow}>
                      <AppText variant="label" color={Colors.goldAccent}>
                        {verse.reference}
                      </AppText>
                      <View style={styles.testamentBadge}>
                        <AppText variant="bodySmall" color={Colors.textSecondary}>
                          {verse.testament === 'old' ? 'OT' : 'NT'}
                        </AppText>
                      </View>
                    </View>
                    <AppText variant="body" color={Colors.textPrimary} style={styles.verseText}>
                      "{verse.text}"
                    </AppText>
                    <AppText variant="bodySmall" color={Colors.textSecondary}>
                      {verse.book} {verse.chapter}:{verse.verse}
                    </AppText>
                  </View>
                </View>
              ))
            ) : (
              <AppText variant="body" color={Colors.textSecondary} style={styles.empty}>
                No verses linked yet.
              </AppText>
            )
          )}

          <View style={styles.bottomPad} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: Colors.backgroundPrimary, flex: 1 },
  hero: { height: 420, position: 'relative' },
  heroImage: { height: '100%', width: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(12,26,43,0.5)' },
  backBtn: {
    alignItems: 'center',
    backgroundColor: 'rgba(12,26,43,0.7)',
    borderRadius: Radius.full,
    height: 40,
    justifyContent: 'center',
    left: Spacing.base,
    position: 'absolute',
    top: Spacing.base,
    width: 40,
  },
  heroInfo: {
    bottom: Spacing.xl,
    gap: 4,
    left: Spacing.base,
    position: 'absolute',
    right: Spacing.base,
  },
  heroName: { marginTop: 4 },
  statsRow: {
    backgroundColor: Colors.backgroundSecondary,
    borderBottomColor: Colors.divider,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  statItem: { alignItems: 'center', flex: 1, gap: 2, paddingVertical: Spacing.md },
  statBorder: { borderRightColor: Colors.divider, borderRightWidth: 1 },
  tabRow: {
    borderBottomColor: Colors.divider,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: Spacing.md },
  tabActive: { borderBottomColor: Colors.goldAccent, borderBottomWidth: 2 },
  body: { padding: Spacing.base, paddingTop: Spacing.lg },
  overview: { lineHeight: 28 },
  empty: { marginTop: Spacing.xl, opacity: 0.6, textAlign: 'center' },
  relatedSection: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.lg,
    gap: Spacing.md,
    marginTop: Spacing.lg,
    padding: Spacing.base,
    ...Shadow.subtle,
  },
  relatedHeader: { alignItems: 'center', flexDirection: 'row', gap: Spacing.xs },
  relatedTitle: { marginLeft: 2 },
  relatedList: { gap: Spacing.sm },
  relatedChip: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.md,
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.sm,
  },
  relatedAvatar: { borderRadius: Radius.full, height: 40, width: 40 },
  relatedAvatarFallback: { backgroundColor: Colors.divider },
  relatedChipText: { flex: 1, gap: 2 },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.lg,
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.base,
    ...Shadow.subtle,
  },
  cardIconWrap: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.md,
    flexShrink: 0,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  cardContent: { flex: 1, gap: Spacing.xs },
  cardMeta: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { marginTop: 2 },
  locBadge: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.sm,
    flexDirection: 'row',
    gap: 3,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.goldAccentLight,
    borderRadius: Radius.sm,
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  significanceBadge: {
    backgroundColor: Colors.goldAccentLight,
    borderRadius: Radius.sm,
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  coordText: { marginTop: 4 },
  verseCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.lg,
    flexDirection: 'row',
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadow.subtle,
  },
  verseBar: { backgroundColor: Colors.goldAccent, width: 4 },
  verseContent: { flex: 1, gap: Spacing.xs, padding: Spacing.base },
  verseTopRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  testamentBadge: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  verseText: { fontStyle: 'italic', lineHeight: 24 },
  bottomPad: { height: Spacing.xxxl },
});
