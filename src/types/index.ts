// ─── Domain Models ─────────────────────────────────────────────────────────

export interface Character {
  id: string;
  slug?: string;
  name: string;
  title: string;
  era: string;
  overview: string;
  image_url?: string;
}

export interface Location {
  id: string;
  slug?: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  significance: string;
  image_url?: string;
  ancient_name?: string;
  modern_name?: string;
  country?: string;
}

export interface TimelineEvent {
  id: string;
  slug?: string;
  title: string;
  year_label: string;     // e.g. "1446 BC", "33 AD"
  year_numeric: number;   // for sorting, negative = BC
  description: string;
  location_id?: string;
  category: 'exodus' | 'kingdom' | 'temple' | 'gospel' | 'church' | 'general';
}

export interface Verse {
  id: string;
  reference: string;      // e.g. "Psalm 51:1"
  text: string;
  book: string;
  chapter: number;
  verse: number;
  testament: 'old' | 'new';
}

export type CharacterRef = Pick<Character, 'id' | 'name' | 'title' | 'image_url' | 'slug'>;

export interface CharacterDetails extends Character {
  events: TimelineEvent[];
  locations: Location[];
  verses: Verse[];
  relatedCharacters: CharacterRef[];
}

// ─── Navigation ────────────────────────────────────────────────────────────

export type RootTabParamList = {
  Home: undefined;
  Explore: undefined;
  Timeline: undefined;
  Map: undefined;
  AIStudy: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  Character: { characterId: string };
};

// ─── AI ────────────────────────────────────────────────────────────────────

export interface AIStudySection {
  title: string;
  content: string;
}

export interface AIStudyResponse {
  query: string;
  sections: AIStudySection[];
}

// ─── Store ─────────────────────────────────────────────────────────────────

export interface AppState {
  characters: Character[];
  locations: Location[];
  timelineEvents: TimelineEvent[];
  verseOfDay: Verse | null;
  activeTimelineIndex: number;
  setCharacters: (characters: Character[]) => void;
  setLocations: (locations: Location[]) => void;
  setTimelineEvents: (events: TimelineEvent[]) => void;
  setVerseOfDay: (verse: Verse) => void;
  setActiveTimelineIndex: (index: number) => void;
}
