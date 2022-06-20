import type { NextPage } from 'next';

import Image from 'next/image';
import React from 'react';

export type PokemonNecessary = {
  id: number;
  name: string;
  imageUrl: string;
};

// TODO fix buttons colors
const VoteButton: React.FC<{ color?: 'red' }> = ({ color }) => {
  if (color === 'red') {
    return (
      <button className="bg-red-500 shadow-lg shadow-red-500/5 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
        Vote
      </button>
    );
  }

  return (
    <button className="bg-cyan-500 shadow-lg shadow-cyan-500/5 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full">
      Vote
    </button>
  );
};

const PokemonCard = ({
  pokemon,
  buttonColor,
}: {
  pokemon: PokemonNecessary;
  buttonColor?: 'red';
}) => {
  return (
    <div className="w-full max-w-xs	rounded overflow-hidden shadow-xl shadow-neutral-900 mb-4 text-center pb-10 bg-neutral-900">
      <Image
        className="w-full"
        src={pokemon.imageUrl}
        alt="Sunset in the mountains"
        height={150}
        width={150}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-slate-50">
          {pokemon.name}
          <span className="text-slate-400	font-normal italic">
            {' #' + pokemon.id}
          </span>
        </div>
      </div>

      <VoteButton color={buttonColor} />
    </div>
  );
};

const PokemonView = () => {
  const pokemon1: PokemonNecessary = {
    id: 1,
    name: 'Bulbasaur',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  };

  const pokemon2: PokemonNecessary = {
    id: 2,
    name: 'Ivysaur',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
  };

  return (
    <div className="flex flex-wrap m-auto w-6/12 justify-between">
      <PokemonCard pokemon={pokemon1} />
      {/* <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"></div> */}
      <PokemonCard pokemon={pokemon2} buttonColor="red" />
    </div>
  );
};

const PokeVote: NextPage<any> = ({ counts }) => {
  const pokemon1: PokemonNecessary = {
    id: 1,
    name: 'Bulbasaur',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  };

  const pokemon2: PokemonNecessary = {
    id: 2,
    name: 'Ivysaur',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
  };

  return (
    <div className="h-screen w-screen bg-neutral-800">
      <div className="md:container md:mx-auto h-screen flex w-screen">
        <PokemonView />
      </div>
    </div>
  );
};

export default PokeVote;
