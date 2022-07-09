import { Pokemon } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { prisma } from '../../../db';
import { PokemonModel } from '../../../db/zod-schemas';

export const appRouter = trpc
  .router()
  .query('pokemon-duel', {
    async resolve() {
      const POKEMON_COUNT = 898;
      const pokemon: Pokemon[] = [];

      for (let i = 0; i < 2; i++) {
        let pokeId = Math.floor(Math.random() * POKEMON_COUNT) + 1;

        while (pokemon.find(p => p.id === pokeId)) {
          pokeId = Math.floor(Math.random() * POKEMON_COUNT) + 1;
        }

        const dbPokemon = await prisma.pokemon.findUnique({
          where: { id: pokeId },
        });

        if (!dbPokemon) {
          throw new Error('Pokemon not found');
        }

        pokemon.push(dbPokemon);
      }

      return pokemon;
    },
  })
  .mutation('pokemon-vote', {
    input: z.object({
      winner: PokemonModel,
      loser: PokemonModel,
    }),
    async resolve({ input }) {
      const { winner, loser } = input;

      const winnerVotes = winner.votesUp + 1;
      const loserVotes = loser.votesDown + 1;

      await prisma.pokemon.update({
        where: { id: winner.id },
        data: { votesUp: winnerVotes },
      });

      await prisma.pokemon.update({
        where: { id: loser.id },
        data: { votesDown: loserVotes },
      });
    },
  })
  .query('pokemon-list', {
    input: z.object({
      limit: z.number().default(5),
    }),
    async resolve({ input: { limit } }) {
      const VOTES_TO_COUNT = 10;

      const dbPokemon = await prisma.pokemon.findMany();

      const voteCount =
        dbPokemon.reduce((acc, a) => acc + a.votesDown + a.votesUp, 0) / 2;

      const pokemon = dbPokemon.filter(
        p => p.votesDown + p.votesUp > VOTES_TO_COUNT
      );

      const getPercent = (pokemon: Pokemon) =>
        Math.round(
          (pokemon.votesUp / (pokemon.votesDown + pokemon.votesUp)) * 100
        );

      const mostVoted = pokemon
        .sort((a, b) => {
          return getPercent(b) - getPercent(a);
        })
        .slice(0, limit);

      const leastVoted = pokemon
        .sort((a, b) => {
          return getPercent(a) - getPercent(b);
        })
        .slice(0, limit);

      return {
        mostVoted,
        leastVoted,
        voteCount,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
