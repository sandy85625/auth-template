import { useRouter } from 'next/router';
import ItemsCard from '../cards/dashboard-cards/ItemsCard';
import React, { useEffect, useState } from 'react';
import { ICollection, fetchCollectionsIfPublished } from '../../api/collection';
import { useAuth } from '../../hooks/useAuth';

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
            }
            getCollections();
        } else {
            router.push('/login')
        }
    }, [user, router, loading]);

    const [collections, setCollections] = useState<ICollection[]>([]);

    return (
        <section className='m-4 bg-white rounded text-indigo-500 md:px-8 py-8'>
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
                        <ItemsCard 
                            key={collection.id} 
                            title={`${collection.CollectionName} - INR ${collection.CollectionTotalNumberOfNFTs}`} 
                            description={collection.CollectionDescription} 
                            onClick={() => router.push(`/collections/${collection.id}`)}
                        />
                    ))
                )}
                </div>
            </div> 
        </section>


    )
}

export default UserLanding
