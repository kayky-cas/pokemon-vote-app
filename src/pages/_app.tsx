import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from './api/trpc/[trpc]';

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

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
