import { useEffect, useState } from "react";
import { Character, CharacterFilter } from "rickmortyapi/dist/interfaces";
import { CharactersService } from "../services/characters.service";

export default function useCharacters(filters?: CharacterFilter) {
  const [characters, setCharacters] = useState<Character[]>();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let subscribe = true;
    const req = async () => {
      const service = new CharactersService();
      const data = await service.findAll(filters);
      if (!subscribe) return;
      setTotalPages(data.info ? data.info.pages : 1);
      setCurrentPage(filters ? (filters.page ? filters.page : 1) : 1);
      setCharacters(data.results);
    };
    req();
    return () => {
      subscribe = false;
    };
  }, [filters]);

  return { characters, totalPages, currentPage };
}
