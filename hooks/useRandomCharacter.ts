import { useEffect, useState } from "react";
import { Character } from "rickmortyapi/dist/interfaces";
import { getRandomCharacter } from "../services/rickandmorty";

export default function useRandomCharacter() {
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    getRandomCharacter().then((v) => {
      setCharacter(v);
    });
  }, []);

  return { character };
}
