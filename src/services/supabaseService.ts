import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function fetchCharacters() {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .order('name');
  if (error) throw error;
  return data;
}

export async function fetchLocations() {
  const { data, error } = await supabase
    .from('locations')
    .select('*');
  if (error) throw error;
  return data;
}

export async function fetchTimelineEvents() {
  const { data, error } = await supabase
    .from('timeline_events')
    .select('*')
    .order('year_numeric');
  if (error) throw error;
  return data;
}

export async function fetchCharacterDetails(id: string) {
  const { data, error } = await supabase
    .from('characters')
    .select(`
      *,
      character_events(timeline_events(*)),
      character_locations(locations(*)),
      character_verses(verses(*))
    `)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchRelatedCharacters(
  eventIds: string[],
  locationIds: string[],
  excludeId: string
) {
  const characterIds = new Set<string>();

  if (eventIds.length > 0) {
    const { data } = await supabase
      .from('character_events')
      .select('character_id')
      .in('event_id', eventIds)
      .neq('character_id', excludeId);
    data?.forEach((r) => characterIds.add(r.character_id));
  }

  if (locationIds.length > 0) {
    const { data } = await supabase
      .from('character_locations')
      .select('character_id')
      .in('location_id', locationIds)
      .neq('character_id', excludeId);
    data?.forEach((r) => characterIds.add(r.character_id));
  }

  if (characterIds.size === 0) return [];

  const { data, error } = await supabase
    .from('characters')
    .select('id, name, title, era, image_url, slug')
    .in('id', [...characterIds]);

  if (error) return [];
  return data ?? [];
}

export async function fetchVerseOfDay() {
  const { data, error } = await supabase
    .from('verses')
    .select('*')
    .limit(1)
    .single();
  if (error) throw error;
  return data;
}
