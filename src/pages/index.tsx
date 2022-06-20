import { Pokemon } from '@prisma/client';
import type { NextPage } from 'next';
import PokemonView, { PokemonNecessary } from '../components/pokemon';
import { prisma } from '../db/client';

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
