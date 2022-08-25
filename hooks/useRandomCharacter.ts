import { useEffect, useState } from "react";
import { Character } from "rickmortyapi/dist/interfaces";
import { CharactersService } from "../services/characters.service";

export default function useRandomCharacter() {
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    let subscribe = true;
    const service = new CharactersService();
    service.random().then((v) => {
      if (!subscribe) return;
      setCharacter(v);
    });
    return () => {
      subscribe = false;
    };
  }, []);

  return { character };
}
