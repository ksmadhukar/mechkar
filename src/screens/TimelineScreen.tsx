import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Divider } from '../components/atoms';
import { TimelineNode } from '../components/molecules';
import { useTimeline } from '../hooks/useTimeline';
import { Colors, Spacing } from '../theme';

export default function TimelineScreen() {
  const { timelineEvents, activeIndex, setActiveIndex } = useTimeline();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <AppText variant="label" color={Colors.goldAccent}>
          Mechkar
        </AppText>
        <AppText variant="h1" color={Colors.textPrimary} style={styles.title}>
          Timeline
        </AppText>
        <AppText variant="body" color={Colors.textSecondary} style={styles.subtitle}>
          Key events in biblical history
        </AppText>
      </View>

      <Divider spacing={Spacing.base} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {timelineEvents.map((event, index) => (
          <TimelineNode
            key={event.id}
            event={event}
            isActive={index === activeIndex}
            isLast={index === timelineEvents.length - 1}
            onPress={() => setActiveIndex(index)}
          />
        ))}
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
  header: {
    gap: 4,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  title: {
    marginTop: 4,
  },
  subtitle: {
    marginTop: 4,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
  },
  bottomPad: {
    height: Spacing.xxxl,
  },
});
