import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';

// TODO: Add a custom layout here
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div>
      <Head>
        <title>PokeVote</title>
      </Head>
      <div className="h-screen w-screen bg-neutral-800">
        <div className="md:container md:mx-auto h-screen flex w-screen">
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
}

export default MyApp;
