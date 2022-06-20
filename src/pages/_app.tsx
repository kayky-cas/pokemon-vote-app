import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

// TODO: Add a custom layout here
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>PokeVote</title>
      </Head>
      <div className="h-screen w-screen bg-neutral-800">
        <div className="md:container md:mx-auto h-screen flex w-screen">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
