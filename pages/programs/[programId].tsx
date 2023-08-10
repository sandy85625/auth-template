import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import CollectionCard from '../../components/cards/dashboard-cards/CollectionCard';
import { ICollection, fetchCollectionById } from '../../api/collection';
import { IProgram, fetchCollectionsByProgramId, fetchProgramById } from '../../api/program';

export default function Collections() {
  const router = useRouter();
  const { programId } = router.query;
  const [collections, setCollections] = useState<ICollection[]>([]);
  const { user } = useAuth();
  const [program, setProgram]= useState<IProgram | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');


  useEffect(() => {
    if (programId && user) {
      fetchProgramById(programId as string)
        .then(setProgram)
        .catch(console.error)

      fetchCollectionsByProgramId(programId as string)
        .then((collectionIds) => {
          const fetchPromises = collectionIds.map((collectionId) => fetchCollectionById(collectionId));
          Promise.all(fetchPromises)
            .then((collections) => {
              // Filter out any null values from the collections array
              const nonNullCollections = collections.filter((collection): collection is ICollection => collection !== null);
              setCollections(nonNullCollections);
            })
            .catch((error: Error) => setErrorMessage(error.message));
        })
        .catch((error: Error) => setErrorMessage(error.message));
    }
  }, [programId, user]);
  


  return (
    <div className='min-h-screen bg-white'>
        {errorMessage && (
            <div className="alert alert-danger bg-red-100 text-red-800 border-red-500 p-4 rounded-lg m-4 shadow" role="alert">
            {errorMessage}
            </div>
        )}
        <div className="bg-blue-100 shadow rounded-lg p-6 m-4">
            <h2 className="text-2xl text-center my-4 font-bold text-blue-700">{program?.ProgramName}</h2>
            <p className="text-sm text-center text-gray-700 my-2">{program?.ProgramDescription}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 md:p-6 my-2 md:m-4 flex flex-wrap justify-center">
            {collections.map((collection, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                <CollectionCard title={collection.CollectionName} description={collection.CollectionDescription} price={collection.CollectionBasePrice} onClick={() => router.push(`/collections/${collection.id}`)} />
            </div>
            ))}
        </div>
    </div>
  );
}
