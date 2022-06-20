import { Pokemon } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { dataToPokemon, fetchPokemon } from '../../helpers/pokemon.helpers';
import { prisma } from '../../db/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pokemonCount = 150;

  const pokemon: Pokemon[] = [];

  for (let i = 0; i < 2; i++) {
    const pokeId = Math.floor(Math.random() * pokemonCount) + 1;

    let pokemonOnData = await prisma.pokemon.findUnique({
      where: { id: pokeId },
    });

    if (!pokemonOnData) {
      pokemonOnData = dataToPokemon(await fetchPokemon(pokeId));
      await prisma.pokemon.create({
        data: pokemonOnData,
      });
    }

    pokemon.push(pokemonOnData);
  }

  res.json(pokemon);
};

export default handler;
