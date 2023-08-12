import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to your desired URL
    router.push('https://docs.google.com/document/d/1tsiaTSJga1_dNK-x5OSIB4hi9WRcuk-6uJmfgT3HAAQ/edit?usp=sharing');
  }, [router]);

  return null;  // Render nothing
};

export default RedirectPage;
