import { useEffect } from 'react';

import { SEED_TIMELINE_EVENTS } from '../services/seedData';
import { fetchTimelineEvents } from '../services/supabaseService';
import useAppStore from '../store/useAppStore';

export function useTimeline() {
  const timelineEvents = useAppStore((s) => s.timelineEvents);
  const setTimelineEvents = useAppStore((s) => s.setTimelineEvents);
  const activeIndex = useAppStore((s) => s.activeTimelineIndex);
  const setActiveIndex = useAppStore((s) => s.setActiveTimelineIndex);

  useEffect(() => {
    if (timelineEvents.length > 0) return;
    fetchTimelineEvents()
      .then((data) => setTimelineEvents(data?.length ? data : SEED_TIMELINE_EVENTS))
      .catch(() => setTimelineEvents(SEED_TIMELINE_EVENTS));
  }, [timelineEvents.length, setTimelineEvents]);

  return { timelineEvents, activeIndex, setActiveIndex };
}
