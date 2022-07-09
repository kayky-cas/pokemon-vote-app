import { Pokemon } from '@prisma/client';
import type { NextPage } from 'next';
import Link from 'next/link';

import { PokemonView } from '../components/pokemon.components';
import { Spinner } from '../components/spinner.components';
import { trpc } from '../utils/trpc';

const PokeVote: NextPage<any> = () => {
  const {
    data: pokemon,
    isLoading,
    isRefetching,
    refetch,
  } = trpc.useQuery(['pokemon-duel'], {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const mutation = trpc.useMutation(['pokemon-vote']);

  const vote = (winnerPokemon: Pokemon) => {
    if (!pokemon) {
      return;
    }
    const looserPokemon = pokemon.filter(p => p.id !== winnerPokemon.id)[0];

    if (!looserPokemon) {
      return;
    }

    mutation.mutate({
      winner: winnerPokemon,
      loser: looserPokemon,
    });

    refetch();
  };

  return (
    <div className="m-auto w-6/12 ">
      {isLoading || !pokemon || isRefetching ? (
        <Spinner />
      ) : (
        <PokemonView onVote={vote} pokemon={pokemon} />
      )}
      <div className="mt-10 text-center">
        <h1>{process.env.VERCEL_URL}</h1>
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
