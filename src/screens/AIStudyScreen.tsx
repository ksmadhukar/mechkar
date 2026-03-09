import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Sparkles } from 'lucide-react-native';

import { AppText, Divider } from '../components/atoms';
import { studyVerse } from '../services/aiService';
import { Colors, Radius, Shadow, Spacing } from '../theme';
import type { AIStudyResponse } from '../types';

const EXAMPLES = [
  'Explain Psalm 51',
  'What is the significance of the Exodus?',
  'Who was the Apostle Paul?',
  'Meaning of John 3:16',
];

const SECTION_ICONS: Record<string, string> = {
  'Historical Context': '🏛',
  'Theological Meaning': '✝️',
  'Application': '🌿',
};

export default function AIStudyScreen() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIStudyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  async function handleStudy(text?: string) {
    const q = text ?? query;
    if (!q.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await studyVerse(q.trim());
      setResult(response);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleExample(example: string) {
    setQuery(example);
    handleStudy(example);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.sparkleIcon}>
              <Sparkles size={20} color={Colors.goldAccent} strokeWidth={1.8} />
            </View>
            <AppText variant="label" color={Colors.goldAccent} style={styles.headerLabel}>
              Mechkar AI
            </AppText>
            <AppText variant="h1" color={Colors.textPrimary} style={styles.title}>
              AI Study
            </AppText>
            <AppText variant="body" color={Colors.textSecondary} style={styles.subtitle}>
              Ask anything about Scripture, characters, or history
            </AppText>
          </View>

          {/* Examples */}
          {!result && !loading && (
            <View style={styles.examplesSection}>
              <AppText variant="label" color={Colors.textSecondary} style={styles.examplesLabel}>
                Try asking
              </AppText>
              <View style={styles.examplesList}>
                {EXAMPLES.map((ex) => (
                  <TouchableOpacity
                    key={ex}
                    style={styles.exampleChip}
                    onPress={() => handleExample(ex)}
                    activeOpacity={0.75}
                  >
                    <AppText variant="bodySmall" color={Colors.textPrimary}>
                      {ex}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Loading */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.goldAccent} />
              <AppText variant="body" color={Colors.textSecondary} style={styles.loadingText}>
                Studying Scripture...
              </AppText>
            </View>
          )}

          {/* Error */}
          {error && (
            <View style={styles.errorCard}>
              <AppText variant="body" color={Colors.textPrimary}>
                {error}
              </AppText>
            </View>
          )}

          {/* Result */}
          {result && (
            <View style={styles.resultContainer}>
              <View style={styles.queryBadge}>
                <AppText variant="bodySmall" color={Colors.goldAccent}>
                  "{result.query}"
                </AppText>
              </View>

              {result.sections.map((section, index) => (
                <View key={section.title} style={styles.sectionCard}>
                  <View style={styles.sectionHeader}>
                    <AppText variant="body" style={styles.sectionIcon}>
                      {SECTION_ICONS[section.title] ?? '📖'}
                    </AppText>
                    <AppText variant="h3" color={Colors.textPrimary}>
                      {section.title}
                    </AppText>
                  </View>
                  {index < result.sections.length - 1 && (
                    <Divider spacing={Spacing.sm} />
                  )}
                  <AppText variant="body" color={Colors.textSecondary} style={styles.sectionBody}>
                    {section.content}
                  </AppText>
                </View>
              ))}

              <TouchableOpacity
                style={styles.newStudyBtn}
                onPress={() => { setResult(null); setQuery(''); }}
                activeOpacity={0.8}
              >
                <AppText variant="label" color={Colors.goldAccent}>
                  New Study
                </AppText>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.bottomPad} />
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder="Ask about a verse, character, or event..."
            placeholderTextColor={Colors.textSecondary}
            multiline
            returnKeyType="send"
            onSubmitEditing={() => handleStudy()}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!query.trim() || loading) && styles.sendBtnDisabled]}
            onPress={() => handleStudy()}
            disabled={!query.trim() || loading}
            activeOpacity={0.8}
          >
            <Send size={18} color={Colors.backgroundPrimary} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.backgroundPrimary,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.base,
  },
  header: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.base,
    gap: 4,
  },
  sparkleIcon: {
    alignItems: 'center',
    backgroundColor: Colors.goldAccentLight,
    borderRadius: Radius.md,
    height: 44,
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    width: 44,
  },
  headerLabel: {
    marginBottom: 2,
  },
  title: {
    marginTop: 2,
  },
  subtitle: {
    marginTop: 4,
  },
  examplesSection: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  examplesLabel: {
    marginBottom: Spacing.md,
  },
  examplesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  exampleChip: {
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.divider,
    borderRadius: Radius.full,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Shadow.subtle,
  },
  loadingContainer: {
    alignItems: 'center',
    gap: Spacing.base,
    marginTop: Spacing.xxl,
    paddingVertical: Spacing.xxl,
  },
  loadingText: {
    marginTop: Spacing.sm,
  },
  errorCard: {
    backgroundColor: 'rgba(255,80,80,0.1)',
    borderColor: 'rgba(255,80,80,0.3)',
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginTop: Spacing.lg,
    padding: Spacing.base,
  },
  resultContainer: {
    gap: Spacing.base,
    marginTop: Spacing.lg,
  },
  queryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.goldAccentLight,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  sectionCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    gap: Spacing.sm,
    ...Shadow.subtle,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionBody: {
    lineHeight: 26,
  },
  newStudyBtn: {
    alignItems: 'center',
    borderColor: Colors.divider,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginTop: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  bottomPad: {
    height: Spacing.xxl,
  },
  inputBar: {
    alignItems: 'flex-end',
    backgroundColor: Colors.backgroundSecondary,
    borderTopColor: Colors.divider,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? Spacing.xl : Spacing.md,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
  },
  input: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.lg,
    color: Colors.textPrimary,
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 22,
    maxHeight: 100,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  sendBtn: {
    alignItems: 'center',
    backgroundColor: Colors.goldAccent,
    borderRadius: Radius.md,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
});
