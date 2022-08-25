import * as rickandmorty from "rickmortyapi";
import { Character, CharacterFilter } from "rickmortyapi/dist/interfaces";

export class CharactersService {
  async findOne(id: number) {
    const res = await rickandmorty.getCharacter(id);
    return res.data;
  }

  async findAll(
    filters: CharacterFilter = {
      page: 1,
    }
  ) {
    const res = await rickandmorty.getCharacters(filters);

    return { results: res.data.results, info: res.data.info };
  }

  async random() {
    const res = await rickandmorty.getCharacters();
    const total = res.data.info?.count as number;
    const pages = res.data.info?.pages as number;

    const itemsPerPage = total / pages;

    const randomPage = Math.floor(Math.random() * pages);
    const randomItem = Math.floor(Math.random() * itemsPerPage);
    const randomRes = await rickandmorty.getCharacters({
      page: randomPage,
    });

    const randomCharacter = (randomRes.data.results as Character[])[randomItem];
    return randomCharacter;
  }
}
