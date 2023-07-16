import '../styles/globals.css';
import type { AppProps } from 'next/app';
import withAuth from '../hocs/withAuth';

function MyApp({ Component, pageProps }: AppProps) {
  const exceptions = ['/login', '/register', '/reset-password', '/'];
  return withAuth(Component, exceptions)(pageProps);
}

export default MyApp;