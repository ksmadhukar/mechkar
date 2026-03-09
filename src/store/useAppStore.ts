import { create } from 'zustand';

import type { AppState, Character, Location, TimelineEvent, Verse } from '../types';

const useAppStore = create<AppState>((set) => ({
  characters: [],
  locations: [],
  timelineEvents: [],
  verseOfDay: null,
  activeTimelineIndex: 0,

  setCharacters: (characters: Character[]) => set({ characters }),
  setLocations: (locations: Location[]) => set({ locations }),
  setTimelineEvents: (events: TimelineEvent[]) => set({ timelineEvents: events }),
  setVerseOfDay: (verse: Verse) => set({ verseOfDay: verse }),
  setActiveTimelineIndex: (index: number) => set({ activeTimelineIndex: index }),
}));

export default useAppStore;
