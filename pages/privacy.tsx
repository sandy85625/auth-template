import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to your desired URL
    router.push('https://docs.google.com/document/d/13z48I_ojj4d3ZsjCAY6Suix6Dl693NYUYPW-x0VrkAw/edit?usp=sharing');
  }, [router]);

  return null;  // Render nothing
};

export default RedirectPage;
