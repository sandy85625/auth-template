import { useRouter } from 'next/router';
import { User } from 'firebase/auth';
import ItemsCard from '../cards/dashboard-cards/ItemsCard';
import React from 'react';

type Props = {
    user: User
}

function Landing(props: Props) {
    const router = useRouter();

    const handleNewProgramClick = () => {
        router.push('/admin/collections/new')
      }
    
      const handleImportDataClick = () => {
        console.log("import data");
      }
  
    return (
        <section>
            <div className="py-8 px-8">
                <h1 className="text-2xl font-bold mb-4">Welcome, {props.user.email}</h1>
            </div>
            <div className="px-6">
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
            </div> 
        </section>
  )
}

export default Landing