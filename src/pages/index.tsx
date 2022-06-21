import { Pokemon } from '@prisma/client';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useQuery } from 'react-query';

import { PokemonView } from '../components/pokemon.components';
import { Spinner } from '../components/spinner.components';

const fetchPokemons = async (): Promise<Pokemon[]> => {
  const response = await fetch('/api/pokemon');
  return await response.json();
};

const PokeVote: NextPage<any> = () => {
  const {
    data: pokemon,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery('pokemon', fetchPokemons, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
  });

  const vote = (winnerPokemon: Pokemon) => {
    refetch();

    const body = {
      votedPokemonId: winnerPokemon.id,
      pokemon,
    };

    fetch('/api/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => {
      if (res.status === 200) {
      }
    });
  };

  return (
    <div className="m-auto w-6/12 ">
      {isLoading || !pokemon || isRefetching ? (
        <Spinner />
      ) : (
        <PokemonView onVote={vote} pokemon={pokemon} />
      )}
      <div className="mt-10 text-center">
        <Link href="/votes">
          <a className="text-fuchsia-400">Most voted table</a>
        </Link>
      </div>
      <div className="mt-3 text-center">
        <a
          target="blank"
          href="http://github.com/kayky-cas/pokemon-vote-app"
          className="text-sky-300"
        >
          Github
        </a>
      </div>
    </div>
  );
};

export default PokeVote;
