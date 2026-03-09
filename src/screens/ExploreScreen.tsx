import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';

import { AppText } from '../components/atoms';
import { CharacterCard } from '../components/molecules';
import { useCharacters } from '../hooks/useCharacters';
import { Colors, Radius, Spacing } from '../theme';
import type { Character, RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ExploreScreen() {
  const navigation = useNavigation<Nav>();
  const characters = useCharacters();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return characters;
    return characters.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.era.toLowerCase().includes(q)
    );
  }, [characters, query]);

  function renderItem({ item, index }: { item: Character; index: number }) {
    const isLeft = index % 2 === 0;
    return (
      <View style={[styles.cardWrapper, isLeft ? styles.cardLeft : styles.cardRight]}>
        <CharacterCard
          character={item}
          onPress={() => navigation.navigate('Character', { characterId: item.id })}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <AppText variant="label" color={Colors.goldAccent}>
          Mechkar
        </AppText>
        <AppText variant="h1" color={Colors.textPrimary} style={styles.title}>
          Explore
        </AppText>
        <AppText variant="body" color={Colors.textSecondary} style={styles.subtitle}>
          Discover the people of Scripture
        </AppText>

        {/* Search bar */}
        <View style={styles.searchWrap}>
          <Search size={16} color={Colors.textSecondary} strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name, title, or era…"
            placeholderTextColor={Colors.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyWrap}>
          <AppText variant="body" color={Colors.textSecondary} style={styles.empty}>
            No characters match "{query}"
          </AppText>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.backgroundPrimary,
    flex: 1,
  },
  header: {
    gap: 4,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.base,
  },
  title: {
    marginTop: 4,
  },
  subtitle: {
    marginTop: 4,
  },
  searchWrap: {
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.md,
    borderColor: Colors.divider,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  searchInput: {
    color: Colors.textPrimary,
    flex: 1,
    fontSize: 15,
  },
  grid: {
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.xxxl,
  },
  cardWrapper: {
    flex: 1,
    padding: Spacing.sm,
  },
  cardLeft: {},
  cardRight: {},
  emptyWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  empty: {
    opacity: 0.6,
    textAlign: 'center',
  },
});
