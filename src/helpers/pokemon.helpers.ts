import { Pokemon } from '@prisma/client';

export const getPokemonImageUrl = (pokemon: Pokemon) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
};

export const fetchPokemon = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return dataToPokemon(data);
};

export const getPokemonCount = async (): Promise<number> => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
  const data = await response.json();
  return data.count;
};

export const dataToPokemon = (data: PokemonData): Pokemon => {
  return {
    id: data.id,
    name: titleCase(data.name.trim()),
    votesDown: 0,
    votesUp: 0,
  };
};

export type PokemonData = {
  id: number;
  name: string;
};

const titleCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
