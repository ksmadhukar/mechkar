import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { MapPin, X } from 'lucide-react-native';

import { AppText, Divider } from '../components/atoms';
import { useLocations } from '../hooks/useLocations';
import { Colors, Radius, Shadow, Spacing } from '../theme';
import type { Location } from '../types';

const { height: SCREEN_H } = Dimensions.get('window');
const SHEET_HEIGHT = 260;

const INITIAL_REGION = {
  latitude: 31.7683,
  longitude: 35.2137,
  latitudeDelta: 20,
  longitudeDelta: 20,
};

export default function MapScreen() {
  const locations = useLocations();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const sheetAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  function openSheet(location: Location) {
    setSelectedLocation(location);
    Animated.spring(sheetAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
  }

  function closeSheet() {
    Animated.spring(sheetAnim, {
      toValue: SHEET_HEIGHT,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start(() => setSelectedLocation(null));
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <AppText variant="label" color={Colors.goldAccent}>
          Mechkar
        </AppText>
        <AppText variant="h1" color={Colors.textPrimary} style={styles.title}>
          Map
        </AppText>
        <AppText variant="body" color={Colors.textSecondary} style={styles.subtitle}>
          Biblical lands and places
        </AppText>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={INITIAL_REGION}
          customMapStyle={darkMapStyle}
        >
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
              onPress={() => openSheet(loc)}
            >
              <View
                style={[
                  styles.markerContainer,
                  selectedLocation?.id === loc.id && styles.markerActive,
                ]}
              >
                <MapPin
                  size={16}
                  color={selectedLocation?.id === loc.id ? Colors.backgroundPrimary : Colors.goldAccent}
                  strokeWidth={2}
                />
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Bottom Sheet */}
        {selectedLocation && (
          <Animated.View
            style={[
              styles.sheet,
              { transform: [{ translateY: sheetAnim }] },
            ]}
          >
            <View style={styles.sheetHandle} />
            <View style={styles.sheetContent}>
              <View style={styles.sheetHeader}>
                <View style={styles.sheetTitleGroup}>
                  <AppText variant="label" color={Colors.goldAccent}>
                    Location
                  </AppText>
                  <AppText variant="h2" color={Colors.textPrimary} style={styles.sheetTitle}>
                    {selectedLocation.name}
                  </AppText>
                </View>
                <TouchableOpacity onPress={closeSheet} style={styles.closeBtn}>
                  <X size={18} color={Colors.textSecondary} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <Divider spacing={Spacing.md} />

              <AppText variant="body" color={Colors.textSecondary}>
                {selectedLocation.description}
              </AppText>

              <View style={styles.significanceBox}>
                <AppText variant="label" color={Colors.goldAccent} style={styles.sigLabel}>
                  Significance
                </AppText>
                <AppText variant="bodySmall" color={Colors.textPrimary}>
                  {selectedLocation.significance}
                </AppText>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0C1A2B' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0C1A2B' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#A7B1C2' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#111F33' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1B2A40' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#2C3E57' }] },
];

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.backgroundPrimary,
    flex: 1,
  },
  header: {
    gap: 4,
    paddingBottom: Spacing.base,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
  },
  title: {
    marginTop: 4,
  },
  subtitle: {
    marginTop: 4,
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.goldAccent,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    height: 36,
    justifyContent: 'center',
    width: 36,
    ...Shadow.card,
  },
  markerActive: {
    backgroundColor: Colors.goldAccent,
  },
  sheet: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    bottom: 0,
    height: SHEET_HEIGHT,
    left: 0,
    position: 'absolute',
    right: 0,
    ...Shadow.card,
  },
  sheetHandle: {
    alignSelf: 'center',
    backgroundColor: Colors.divider,
    borderRadius: Radius.full,
    height: 4,
    marginTop: Spacing.md,
    width: 40,
  },
  sheetContent: {
    flex: 1,
    padding: Spacing.base,
  },
  sheetHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sheetTitleGroup: {
    flex: 1,
    gap: 4,
  },
  sheetTitle: {
    marginTop: 2,
  },
  closeBtn: {
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.full,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  significanceBox: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Radius.md,
    gap: Spacing.xs,
    marginTop: Spacing.md,
    padding: Spacing.md,
  },
  sigLabel: {
    marginBottom: 2,
  },
});
