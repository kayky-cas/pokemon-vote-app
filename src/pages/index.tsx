import { Pokemon } from '@prisma/client';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { prisma } from '../db/client';

import { PokemonView } from '../components/pokemon.components';
import {
  dataToPokemon,
  fetchPokemon,
  getPokemonCount,
} from '../helpers/pokemon.helpers';

const PokeVote: NextPage<any> = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const fetchPokemons = () => {
    fetch('/api/pokemon')
      .then((res) => res.json())
      .then(setPokemon);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="h-screen w-screen bg-neutral-800">
      <div className="md:container md:mx-auto h-screen flex w-screen">
        {pokemon.length != 0 ? (
          <PokemonView pokemon={pokemon} />
        ) : (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          ></div>
        )}
      </div>
    </div>
  );
};

export default PokeVote;
