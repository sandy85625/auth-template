import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ICollection, fetchCollectionsIfPublished } from '../../api/collection';
import { useAuth } from '../../hooks/useAuth';
import CollectionCard from '../cards/dashboard-cards/CollectionCard';
import ProgramCard from '../cards/dashboard-cards/ProgramCard';
import { IProgram } from '../dashboard/AdminLanding';
import { addInterestedUsers, fetchAllPrograms } from '../../api/program';

function UserLanding() {
    const router = useRouter();
    const { user, loading } = useAuth()

    useEffect(() => {
        if (loading) {
        // maybe show a loading spinner here
        return;
        }

        if(user !== null){
            const getCollections = async () => {
                const collectionsData = await fetchCollectionsIfPublished();
                setCollections(collectionsData);

                fetchAllPrograms().then(setPrograms).catch(console.error)
            }
            getCollections();
        }
    }, [user, router, loading]);

    const [collections, setCollections] = useState<ICollection[]>([]);
    const [programs, setPrograms] = useState<IProgram[]>([]);

    return (
        <section className='m-4 bg-white rounded text-indigo-500 md:px-8 py-8'>
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
                        // Render your collection item card here
                        <ProgramCard 
                            key={program.id} 
                            title={`${program.ProgramName}`} 
                            description={program.ProgramDescription} 
                            onShowInterestClick={async () => {
                                await addInterestedUsers(program.id, user?.uid!)
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
                        // Render your collection item card here
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
