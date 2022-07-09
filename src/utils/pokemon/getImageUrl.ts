import { Pokemon } from '@prisma/client';

export function getPokemonImageUrl(pokemon: Pokemon) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
}
