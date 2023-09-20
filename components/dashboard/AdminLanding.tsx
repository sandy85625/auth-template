import { useRouter } from 'next/router';
import ItemsCard from '../cards/dashboard-cards/ItemsCard';
import React, { useEffect, useState }  from 'react';
import { useAuth } from '../../hooks/useAuth';
import { fetchAllProgramsByUserUID } from '../../api/program';
import { ProgramFormData } from '../../interfaces/nft-forms';
import ProgramCard from '../cards/dashboard-cards/ProgramCard';

export interface IProgram extends ProgramFormData {
    id: string;
  }

function Landing() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) {
        // maybe show a loading spinner here
        return;
        }

        if(user !== null){
            const getCollections = async () => {
                const programsData = await fetchAllProgramsByUserUID(user.uid);
                setPrograms(programsData);
            }
            getCollections();
        }
    }, [user, loading]);

    const [programs, setPrograms] = useState<IProgram[]>([]);

    const handleNewProgramClick = () => {
        router.push('/admin/programs/new')
      }
    
      const handleImportDataClick = () => {
        console.log("import data");
      }
  
    return (
        <section className='min-h-screen bg-white text-gray-800 md:px-8 py-8'>
            <div>
                <div className="flex flex-row gap-4">
                    <div className="w-1/4 px-2">
                        <ItemsCard title="Create New" description="Click to create a new program" onClick={handleNewProgramClick} />
                    </div>
                    <div className="w-1/4 px-2">
                        <ItemsCard title="Import Data" description="Click to import new dataset" onClick={handleImportDataClick} />
                    </div>
                </div>
                <hr className="my-8 border-blue-300" />
                <div className="px-2 grid grid-cols-3 gap-6">
                {programs.length === 0 ? (
                    <p className="col-span-3 text-center text-gray-500">No collections created!</p>
                ) : (
                    programs.map(program => (
                        // Render your program item card here
                        <ProgramCard 
                            key={program.id} 
                            title={`${program.ProgramName}`} 
                            description={program.ProgramDescription} 
                            onClick={() => router.push(`/admin/programs/${program.id}`)}
                        />
                    ))
                )}
                </div>
            </div>
        </section>
  )
}

export default Landing