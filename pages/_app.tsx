import '../styles/globals.css';
import type { AppProps } from 'next/app';
import withAuth from '../hocs/withAuth';
import { AUTH_EXCEPTED_PUBLIC_URLS } from '../constants';
import ErrorPage from '../components/errors/ErrorPage';

function MyApp({ Component, pageProps }: AppProps) {
  try {
    return withAuth(Component, AUTH_EXCEPTED_PUBLIC_URLS)(pageProps);
  } catch (error: any) {
    return <ErrorPage error={`${error.message}`} />
  }
}

export default MyApp;