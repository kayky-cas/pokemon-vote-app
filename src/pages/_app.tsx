import '../styles/globals.css';
import type { AppProps } from 'next/app';

// TODO: Add a custom layout here
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
