import { useEffect, useState } from "react";
import { getCharacters } from "rickmortyapi";
import { Character, CharacterFilter } from "rickmortyapi/dist/interfaces";

export default function useCharacters(filters?: CharacterFilter) {
  const [characters, setCharacters] = useState<Character[]>();

  useEffect(() => {
    const req = async () => {
      const res = await getCharacters(filters);
      setCharacters(res.data.results);
    };
    req();
  }, [filters]);

  return { characters };
}
