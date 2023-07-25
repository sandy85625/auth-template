import '../styles/globals.css';
import type { AppProps } from 'next/app';
import withAuth from '../hocs/withAuth';
import { AUTH_EXCEPTED_PUBLIC_URLS } from '../constants';
import ErrorPage from '../components/errors/ErrorPage';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  try {
    return (
      <>
      <Head>
      <title>Tickets App</title>
        <meta name="description" content="A platform for creating loyality programs for businesses." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/logo.png" />
      </Head>
      {withAuth(Component, AUTH_EXCEPTED_PUBLIC_URLS)(pageProps)}
      </>
      )
  } catch (error: any) {
    return <ErrorPage error={`${error.message}`} />
  }
}

export default MyApp;