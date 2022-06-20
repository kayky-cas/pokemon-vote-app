import type { NextPage } from 'next';
import { prisma } from '../db';

// TODO: Delete this file
const Dashboard: NextPage<any> = ({ counts }) => {
  return (
    <div>
      <h1>We have {counts} pokemons cached on the database!</h1>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = async () => {
  const pokemons = await prisma.pokemon.findMany();

  return { props: { counts: pokemons.length } };
};
