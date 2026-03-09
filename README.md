# Mechkar

A cinematic Bible intelligence platform by ChristianStack. Explore Scripture through characters, history, geography, and AI insights.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native with Expo (SDK 55) |
| Language | TypeScript (strict mode) |
| Navigation | React Navigation v7 (Bottom Tabs + Native Stack) |
| State | Zustand |
| Backend | Supabase |
| AI | OpenAI API (gpt-4o-mini) |
| Maps | react-native-maps |
| Animations | react-native-reanimated |
| Icons | Lucide React Native |
| Fonts | Playfair Display + Inter (via @expo-google-fonts) |

---

## Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| `backgroundPrimary` | `#0C1A2B` | Main screen background |
| `backgroundSecondary` | `#111F33` | Tab bar, secondary surfaces |
| `cardBackground` | `#1B2A40` | Cards, input fields |
| `goldAccent` | `#C6A85A` | Active states, highlights, CTAs |
| `divider` | `#2C3E57` | Separators, borders |
| `textPrimary` | `#F5F3EE` | Headings, primary text |
| `textSecondary` | `#A7B1C2` | Body text, labels |

### Typography

| Role | Font | Usage |
|---|---|---|
| Headings | Playfair Display Bold | Screen titles, hero names |
| Heading Regular | Playfair Display Regular | Section headers |
| Verse | Playfair Display Italic | Scripture quotes |
| Body | Inter Regular | Descriptions, body copy |
| Semibold | Inter SemiBold | Labels, buttons |

### Spacing Tokens

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`

---

## Project Structure

```
src/
├── components/
│   ├── atoms/
│   │   ├── AppText.tsx          # Typed text with variant system
│   │   ├── AppButton.tsx        # Primary / secondary / ghost variants
│   │   └── Divider.tsx          # Horizontal and vertical dividers
│   ├── molecules/
│   │   ├── VerseCard.tsx        # Gold-bar verse of the day card
│   │   ├── CharacterCard.tsx    # Portrait card with era + title overlay
│   │   ├── TimelineNode.tsx     # Event node with connector line
│   │   └── LocationMarker.tsx   # Map marker pill component
│   └── organisms/               # Ready for HeroSection, CharacterGrid, etc.
├── screens/
│   ├── HomeScreen.tsx           # Verse of Day, Featured Character, Timeline Highlight, Quick Explore
│   ├── ExploreScreen.tsx        # 2-column character grid
│   ├── CharacterScreen.tsx      # Hero image, Overview, Timeline, Locations
│   ├── TimelineScreen.tsx       # Vertical scrollable timeline with active state
│   ├── MapScreen.tsx            # react-native-maps + animated bottom sheet
│   └── AIStudyScreen.tsx        # Input bar + 3-section structured AI response
├── services/
│   ├── seedData.ts              # Local seed: 5 characters, 5 locations, 5 events, 1 verse
│   ├── aiService.ts             # OpenAI fetch wrapper, returns structured JSON sections
│   └── supabaseService.ts       # Supabase client + table fetch helpers
├── hooks/
│   ├── useCharacters.ts         # Loads characters from store (falls back to seed)
│   └── useTimeline.ts           # Loads timeline events, exposes active index setter
├── store/
│   └── useAppStore.ts           # Zustand global store
├── navigation/
│   └── AppNavigator.tsx         # Stack navigator wrapping 5-tab bottom navigator
├── theme/
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── index.ts                 # Re-exports + Radius + Shadow tokens
└── types/
    └── index.ts                 # Character, Location, TimelineEvent, Verse, Nav param lists
```

---

## Navigation

Bottom tab navigator with 5 tabs:

| Tab | Screen | Icon |
|---|---|---|
| Home | HomeScreen | Home |
| Explore | ExploreScreen | Compass |
| Timeline | TimelineScreen | Clock |
| Map | MapScreen | MapPin |
| AI Study | AIStudyScreen | Sparkles |

Active tab uses `goldAccent`. A native stack sits on top for `Character` detail screen (slide-from-right animation).

---

## Screens

### Home
Discovery screen. Shows Verse of the Day (gold-bar card), Featured Character card, Timeline Highlight card, and Quick Explore shortcut buttons.

### Explore
Full-screen 2-column grid of character portrait cards. Each card shows portrait image, era label, name, and title. Tapping navigates to Character detail.

### Character Detail
Full hero image (420px) with gradient overlay, back button, character name/title/era. Scrollable body with Overview paragraph, Timeline events (TimelineNode list), and Locations list.

### Timeline
Vertical scrollable list of TimelineNode components. Tapping a node sets it as active — expands to show description. Connector lines link nodes visually.

### Map
react-native-maps with 5 biblical location markers (Jerusalem, Bethlehem, Babylon, Rome, Mount Sinai). Tapping a marker slides up an animated bottom sheet with location name, description, and significance.

### AI Study
Large scrollable view with example query chips. Text input bar at the bottom sends queries to OpenAI. Response renders as 3 structured cards: Historical Context, Theological Meaning, Application.

---

## Seed Data

### Characters
David · Moses · Esther · Paul · Abraham

### Locations
Jerusalem · Bethlehem · Babylon · Rome · Mount Sinai

### Timeline Events
The Exodus (1446 BC) · David Becomes King (1010 BC) · Temple Built (957 BC) · The Crucifixion (33 AD) · Pentecost (33 AD)

---

## Supabase Schema

```sql
-- characters
id          text primary key
name        text
title       text
era         text
overview    text
image_url   text
location_ids   text[]
timeline_event_ids text[]

-- locations
id            text primary key
name          text
description   text
latitude      float8
longitude     float8
significance  text
image_url     text

-- timeline_events
id            text primary key
title         text
year          text
year_numeric  int4
description   text
character_ids text[]
location_id   text
category      text

-- verses
id         text primary key
reference  text
text       text
book       text
chapter    int4
verse      int4
testament  text
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your keys:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_OPENAI_API_KEY=sk-...
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy and fill env
cp .env.example .env

# Start on iOS simulator
npx expo start --ios

# Start on Android
npx expo start --android
```

---

## Next Steps

- Populate Supabase tables and replace seed data with live `fetchCharacters()` / `fetchLocations()` / `fetchTimelineEvents()` calls in the hooks
- Add `expo-linear-gradient` for proper hero image gradient overlays
- Add character search/filter on the Explore screen
- Add verse bookmarking with Supabase auth
- Add `react-native-reanimated` shared element transitions for character card → detail
