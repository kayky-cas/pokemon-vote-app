import { Pokemon } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { dataToPokemon, fetchPokemon } from '../../helpers/pokemon.helpers';
import { prisma } from '../../db';

export type RequestPokemonBody = {
  votedPokemonId: number;
  pokemon: Pokemon[];
};

export const findPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await prisma.pokemon.findUnique({
    where: { id },
  });

  if (!response) {
    throw new Error('Pokemon not found');
  }
  return response;
};

export const increaseVotesUp = async (pokemon: Pokemon) => {
  const response = await prisma.pokemon.update({
    where: { id: pokemon.id },
    data: {
      votesUp: pokemon.votesUp + 1,
    },
  });

  if (!response) {
    throw new Error('Pokemon not found');
  }
  return response;
};

export const increaseVotesDown = async (pokemon: Pokemon) => {
  const response = await prisma.pokemon.update({
    where: { id: pokemon.id },
    data: {
      votesDown: pokemon.votesDown + 1,
    },
  });

  if (!response) {
    throw new Error('Pokemon not found');
  }
  return response;
};

// TODO: make this better
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const body: RequestPokemonBody = req.body;
    const { votedPokemonId, pokemon } = body;
    const loserPokemonId = pokemon.find(p => p.id !== votedPokemonId)?.id;

    if (!loserPokemonId) {
      res.status(400).send('No loser found');
      return;
    }

    const winnerPokemon = await findPokemonById(votedPokemonId);
    const loserPokemon = await findPokemonById(loserPokemonId);

    if (!winnerPokemon || !loserPokemon) {
      res.status(400).json({
        error: 'Pokemon not found',
      });
    }

    await increaseVotesUp(winnerPokemon);
    await increaseVotesDown(loserPokemon);
    res.status(200).json({
      winner: winnerPokemon,
      loser: loserPokemon,
    });
    return;
  }

  const pokemonCount = 150;

  const pokemon: Pokemon[] = [];

  for (let i = 0; i < 2; i++) {
    let pokeId = Math.floor(Math.random() * pokemonCount) + 1;

    while (pokemon.find(p => p.id === pokeId)) {
      pokeId = Math.floor(Math.random() * pokemonCount) + 1;
    }

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
