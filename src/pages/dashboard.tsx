import type { NextPage } from 'next';
import { prisma } from '../db';

// TODO: Delete this file
const Dashboard: NextPage<any> = ({ counts }) => {
  return (
    <div>
      <h1 className="text-slate-100">
        We have <span className="text-sky-100">{counts}</span> pokemons cached
        on the database!
      </h1>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = async () => {
  const pokemons = await prisma.pokemon.findMany();

  return { props: { counts: pokemons.length } };
};
