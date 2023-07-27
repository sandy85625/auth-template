// pages/unauthorized.tsx
import Link from 'next/link';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Unauthorized Access!</h1>
      <p>You do not have the necessary permissions to access this page.</p>
      <p>Please contact the administrator for assistance.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
};

export default UnauthorizedPage;
