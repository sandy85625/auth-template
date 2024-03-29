import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '../components/navbars/Navbar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <>
      <Head>
        <title>Tickets App</title>
        <meta name="description" content="A platform for creating loyality program." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main className="overflow-auto">
        <Component {...pageProps} />
      </main>
      <footer>
        <Footer />
      </footer>
      </>
    );
}

export default MyApp;
