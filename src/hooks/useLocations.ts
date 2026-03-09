import { useEffect } from 'react';

import { SEED_LOCATIONS } from '../services/seedData';
import { fetchLocations } from '../services/supabaseService';
import useAppStore from '../store/useAppStore';

export function useLocations() {
  const locations = useAppStore((s) => s.locations);
  const setLocations = useAppStore((s) => s.setLocations);

  useEffect(() => {
    if (locations.length > 0) return;
    fetchLocations()
      .then((data) => setLocations(data?.length ? data : SEED_LOCATIONS))
      .catch(() => setLocations(SEED_LOCATIONS));
  }, [locations.length, setLocations]);

  return locations;
}
