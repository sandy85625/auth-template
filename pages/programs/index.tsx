import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { IProgram, addInterestedUsers, fetchAllProgramsByUserUID } from '../../api/program';
import ProgramCard from '../../components/cards/dashboard-cards/ProgramCard';

export default function Collections() {
  const router = useRouter();
  const { user } = useAuth();
  const [program, setProgram]= useState<IProgram[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');


  useEffect(() => {
    if (user) {
      fetchAllProgramsByUserUID(user.uid as string)
        .then(setProgram)
        .catch(setErrorMessage)
    }
  }, [user]);

  return (
    <div className='min-h-screen bg-blue-100'>
        {errorMessage && (
            <div className="bg-red-200 text-red-800 border-red-600 p-4 rounded-lg m-4 shadow-md" role="alert">
            {errorMessage}
            </div>
        )}
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 my-2 md:m-4 flex flex-wrap justify-center">
            {program && program.map((programs, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                <ProgramCard 
                    key={programs.id} 
                    title={`${programs.ProgramName}`} 
                    description={programs.ProgramDescription} 
                    onShowInterestClick={async () => {
                        await addInterestedUsers(programs.id, user?.uid!)
                    }}
                    onClick={() => router.push(`/admin/programs/${programs.id}`)}
                />
            </div>
            ))}
        </div>
        </div>

  );
}
