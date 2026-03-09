import { useEffect } from 'react';

import { SEED_CHARACTERS } from '../services/seedData';
import { fetchCharacters } from '../services/supabaseService';
import useAppStore from '../store/useAppStore';

export function useCharacters() {
  const characters = useAppStore((s) => s.characters);
  const setCharacters = useAppStore((s) => s.setCharacters);

  useEffect(() => {
    if (characters.length > 0) return;
    fetchCharacters()
      .then((data) => setCharacters(data?.length ? data : SEED_CHARACTERS))
      .catch(() => setCharacters(SEED_CHARACTERS));
  }, [characters.length, setCharacters]);

  return characters;
}
