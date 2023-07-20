import { FC } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ErrorPageProps } from '../../interfaces';
  
const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <Head>
                <title>Error Page</title>
            </Head>
            <h1 className="text-3xl font-bold">Oops! Something went wrong...</h1>
            <p className="mt-4 text-lg">{error || "We're sorry for the inconvenience. Our team is looking into it."}</p>
            <Link href="/">
                <div  className="mt-8 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Go to Home Page
                </div>
            </Link>
        </div>
    );
};

export default ErrorPage;
