import { StyleSheet, View } from 'react-native';
import { MapPin } from 'lucide-react-native';

import { Colors, Radius, Shadow } from '../../theme';
import AppText from '../atoms/AppText';

interface LocationMarkerProps {
  name: string;
  isActive?: boolean;
}

function LocationMarker({ name, isActive = false }: LocationMarkerProps) {
  return (
    <View style={[styles.container, isActive && styles.containerActive]}>
      <MapPin size={14} color={isActive ? Colors.backgroundPrimary : Colors.goldAccent} strokeWidth={2} />
      <AppText
        variant="caption"
        color={isActive ? Colors.backgroundPrimary : Colors.textPrimary}
        style={styles.label}
      >
        {name}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.goldAccent,
    borderRadius: Radius.full,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    ...Shadow.card,
  },
  containerActive: {
    backgroundColor: Colors.goldAccent,
    borderColor: Colors.goldAccent,
  },
  label: {
    fontWeight: '600',
  },
});

export default LocationMarker;
