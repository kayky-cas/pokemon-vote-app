import { Pokemon } from '@prisma/client';
import Image from 'next/image';
import { getPokemonImageUrl } from '../helpers/pokemon.helpers';
import { VoteButton } from './vote-button.component';

type PokeCardProps = {
  pokemon: Pokemon;
  isRed?: boolean;
  onVote: (pokemon: Pokemon) => void;
};

type PokeVirewProps = {
  pokemon: Pokemon[];
  onVote: (pokemon: Pokemon) => void;
};

const PokemonCard: React.FC<PokeCardProps> = ({ pokemon, isRed, onVote }) => {
  return (
    <div className="w-full max-w-xs	rounded overflow-hidden shadow-xl shadow-neutral-900 mb-4 text-center pb-10 bg-neutral-900">
      <Image
        className="w-full"
        src={getPokemonImageUrl(pokemon)}
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

      <VoteButton pokemon={pokemon} isRed={isRed} onVote={onVote} />
    </div>
  );
};

export const PokemonView: React.FC<PokeVirewProps> = ({ pokemon, onVote }) => {
  if (!pokemon) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-between">
      {pokemon.map((p, i) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isRed={i % 2 != 0}
          onVote={onVote}
        />
      ))}
    </div>
  );
};
