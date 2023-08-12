import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to your desired URL
    router.push('https://docs.google.com/document/d/1RGRnmY1I1_9y9G7ae78aHbAVaxGSG2IcJNTGekPgpt4/edit?usp=sharing');
  }, [router]);

  return null;  // Render nothing
};

export default RedirectPage;
