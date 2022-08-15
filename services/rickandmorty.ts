import * as rickandmorty from "rickmortyapi";
import { Character } from "rickmortyapi/dist/interfaces";

export async function getRandomCharacter() {
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
