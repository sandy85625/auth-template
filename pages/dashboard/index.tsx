import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/navbars/DashboardNavbar';
import ItemsCard from '../../components/cards/dashboard-cards/ItemsCard';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) return null;

  const handleNewProgramClick = () => {
    console.log("new program");
  }

  const handleImportDataClick = () => {
    console.log("import data");
  }

  return (
    <div>
      <Navbar />
      <section className="py-8 px-8">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
      </section>
      <section className="px-6">
        <div className="flex flex-row">
          <div className="w-1/4 px-2">
            <ItemsCard title="Create New" description="Click to create a new program" onClick={handleNewProgramClick} />
          </div>
          <div className="w-1/4 px-2">
            <ItemsCard title="Import Data" description="Click to import new dataset" onClick={handleImportDataClick} />
          </div>
        </div>
        <hr className="my-8 border-gray-300" />
        <div className="grid grid-cols-3 gap-6">
          <p className="col-span-3 text-center text-gray-600">No programs created!</p>
          {/* Render your already created cards here */}
        </div>
      </section>
    </div>
  );
}
