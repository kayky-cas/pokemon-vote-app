import { Pokemon } from '@prisma/client';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { PokemonView } from '../components/pokemon.components';
import { Spinner } from '../components/spinner.components';
import { RequestPokemonBody } from './api/pokemon';

// TODO: Add a most voted table page
const PokeVote: NextPage<any> = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const vote = (winnerPokemon: Pokemon) => {
    const body = {
      votedPokemonId: winnerPokemon.id,
      pokemon,
    };

    setPokemon([]);

    fetch('/api/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => {
      if (res.status === 200) {
        fetchPokemons();
      }
    });
  };

  const fetchPokemons = () => {
    fetch('/api/pokemon')
      .then(res => res.json())
      .then(setPokemon);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="m-auto w-6/12 ">
      {pokemon.length === 0 ? (
        <Spinner />
      ) : (
        <PokemonView onVote={vote} pokemon={pokemon} />
      )}
      <div className="mt-10 text-center">
        <Link href="/votes">
          <a className="text-fuchsia-400">Most voted table!</a>
        </Link>
      </div>
    </div>
  );
};

export default PokeVote;
