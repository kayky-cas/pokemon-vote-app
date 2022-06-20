import { Pokemon } from '@prisma/client';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { getPokemonImageUrl } from '../helpers/pokemon.helpers';
import { prisma } from '../db';
import Link from 'next/link';

type PokemonTrProps = {
  pokemon: Pokemon;
  position: number;
};

const PokemonTr: React.FC<PokemonTrProps> = ({ pokemon, position }) => {
  const percent = Math.round(
    (pokemon.votesUp / (pokemon.votesDown + pokemon.votesUp)) * 100
  );

  return (
    <tr>
      <td className="text-lg text-slate-100	font-extrabold italic antialiased">
        {position}º{' '}
      </td>
      <td>
        <div className="flex flex-col items-center ml-5 bg-white rounded-lg border shadow-md md:flex-row  hover:bg-gray-100 border-gray-700 dark:bg-neutral-900 hover:bg-neutral-700">
          <Image
            width={75}
            height={75}
            className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={getPokemonImageUrl(pokemon)}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 w-full text-md font-medium tracking-tight text-gray-900 dark:text-white text-left">
              {pokemon.name}
            </h5>
          </div>
        </div>
      </td>
      <td>
        {percent > 50 ? (
          <span className={`ml-2 text-cyan-300`}>{percent}%</span>
        ) : (
          <span className={`ml-2 text-red-300`}>{percent}%</span>
        )}
      </td>
    </tr>
  );
};

type MostVotedTableProps = {
  pokemon: Pokemon[];
  title: string;
};

const MostVotedTable: React.FC<MostVotedTableProps> = ({ pokemon, title }) => {
  if (!pokemon) {
    return null;
  }

  return (
    <div className="ml-auto">
      <h1 className="w-full text-center mb-5 text-slate-100	font-extrabold antialiased">
        {title}
      </h1>
      <table>
        <tbody>
          {pokemon.map((p, i) => (
            <PokemonTr key={p.id} pokemon={p} position={i + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

type VotesPageProps = {
  mostVotedpokemon: Pokemon[];
  leastVotedpokemon: Pokemon[];
  voteCount: number;
};

const VotesPage: NextPage<VotesPageProps> = ({
  mostVotedpokemon,
  leastVotedpokemon,
  voteCount,
}) => {
  return (
    <div className="m-auto">
      {mostVotedpokemon.length === 0 || leastVotedpokemon.length === 0 ? (
        <h1 className="text-5xl	text-slate-100	font-extrabold">
          No pokemon vote data!
        </h1>
      ) : (
        <div>
          <h1 className="w-full text-3xl text-center mb-5 text-slate-100 italic	font-extrabold antialiased">
            {voteCount} votes
          </h1>
          <div className="flex flex-wrap justify-between space-x-20">
            <MostVotedTable pokemon={mostVotedpokemon} title="Most voted!" />
            <MostVotedTable pokemon={leastVotedpokemon} title="Least voted!" />
          </div>
        </div>
      )}
      <div className="mt-10 text-center">
        <Link href="/">
          <a className="text-fuchsia-400">Back to vote</a>
        </Link>
      </div>
    </div>
  );
};

export default VotesPage;

export const getServerSideProps = async () => {
  const pokemon = await prisma.pokemon.findMany();

  const getPercernt = (pokemon: Pokemon) => {
    if (pokemon.votesDown + pokemon.votesUp == 0) {
      return 0;
    }

    return Math.round(
      (pokemon.votesUp / (pokemon.votesDown + pokemon.votesUp)) * 100
    );
  };

  const voteCount =
    pokemon.reduce((acc, a) => acc + a.votesDown + a.votesUp, 0) / 2;

  const top5 = pokemon
    .filter(p => getPercernt(p) > 0)
    .sort((a, b) => {
      return b.votesUp - a.votesUp;
    })
    .sort((a, b) => {
      return getPercernt(b) - getPercernt(a);
    })

    .slice(0, 5);

  const top5Worst = pokemon
    .filter(p => getPercernt(p) > 0)
    .sort((a, b) => {
      return b.votesUp - a.votesUp;
    })
    .sort((a, b) => {
      return getPercernt(a) - getPercernt(b);
    })

    .slice(0, 5);

  return {
    props: {
      mostVotedpokemon: top5,
      leastVotedpokemon: top5Worst,
      voteCount,
    },
  };
};
