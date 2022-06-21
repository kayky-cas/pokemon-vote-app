import { Pokemon } from '@prisma/client';

type VoteButtonProps = {
  pokemon: Pokemon;
  // eslint-disable-next-line no-unused-vars
  onVote: (pokemon: Pokemon) => void;
  isRed?: boolean;
};

export const VoteButton: React.FC<VoteButtonProps> = props => {
  if (props.isRed) {
    return (
      <button
        onClick={() => props.onVote(props.pokemon)}
        className="bg-red-500 shadow-lg shadow-red-500/5 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
      >
        Vote
      </button>
    );
  }

  return (
    <button
      onClick={() => props.onVote(props.pokemon)}
      className="bg-cyan-500 shadow-lg shadow-cyan-500/5 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full"
    >
      Vote
    </button>
  );
};
