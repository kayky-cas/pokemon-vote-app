export const VoteButton: React.FC<{ redButton?: boolean }> = ({
  redButton,
}) => {
  if (redButton) {
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
