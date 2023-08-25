import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ICollection, fetchCollectionsIfPublished } from '../../api/collection';
import { useAuth } from '../../hooks/useAuth';
import CollectionCard from '../cards/dashboard-cards/CollectionCard';
import ProgramCard from '../cards/dashboard-cards/ProgramCard';
import { IProgram } from '../dashboard/AdminLanding';
import { addInterestedUsers, fetchAllPrograms } from '../../api/program';
import LoadingSpinner from '../loaders/LoadingSpinner';

function UserLanding() {
    const router = useRouter();
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCollections = async () => {
            try {
                const collectionsData = await fetchCollectionsIfPublished();
                setCollections(collectionsData);

                const programsData = await fetchAllPrograms();
                setPrograms(programsData);

                setIsLoading(false);
            } catch (error) {
                alert('Some error occured! Try again!')
                setIsLoading(false); 
            }
        }
        
        getCollections();
    }, []);

    const [collections, setCollections] = useState<ICollection[]>([]);
    const [programs, setPrograms] = useState<IProgram[]>([]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <section className='bg-white rounded text-indigo-500 md:px-8 py-8'>
            <div>
            <div className='flex items-center justify-center'>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Published Programs</h1>
            </div>
            <div className="px-4 sm:px-6 pb-8 md:px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {programs.length === 0 ? (
                    <p className="col-span-full text-center text-gray-200">No Programs available!</p>
                ) : (
                    programs.map(program => (
                        <ProgramCard 
                            key={program.id} 
                            title={`${program.ProgramName}`} 
                            description={program.ProgramDescription} 
                            onShowInterestClick={async () => {
                                if(user) {
                                    await addInterestedUsers(program.id, user?.uid!)
                                }
                                else {
                                    alert('Please login to continue!')
                                    router.push('/login')
                                }
                            }}
                            onClick={() => router.push(`/programs/${program.id}`)}
                        />
                    ))
                )}
                </div>
            </div> 
            </div>
            <div>
            <div className='flex items-center justify-center'>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Published Collections</h1>
            </div>
            <div className="px-4 sm:px-6 pb-8 md:px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {collections.length === 0 ? (
                    <p className="col-span-full text-center text-gray-200">No collections available!</p>
                ) : (
                    collections.map(collection => (
                        <CollectionCard 
                            key={collection.id} 
                            title={`${collection.CollectionName}`} 
                            description={collection.CollectionDescription} 
                            price={collection.CollectionBasePrice}
                            onClick={() => router.push(`/collections/${collection.id}`)}
                        />
                    ))
                )}
                </div>
            </div> 
            </div>
        </section>
    )
}

export default UserLanding
