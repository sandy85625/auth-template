import { useRouter } from 'next/router';
import ItemsCard from '../cards/dashboard-cards/ItemsCard';
import React, { useEffect, useState } from 'react';
import { ICollection, fetchAllCollectionsByUserUID } from '../../api/collection';
import { useAuth } from '../../hooks/useAuth';

function AdminLanding() {
    const router = useRouter();
    const { user, loading } = useAuth()

    useEffect(() => {
        if (loading) {
        // maybe show a loading spinner here
        return;
        }

        if(user !== null){
            const getCollections = async () => {
                const collectionsData = await fetchAllCollectionsByUserUID(user.uid);
                setCollections(collectionsData);
            }
            getCollections();
        }
    }, [user, router, loading]);

    const [collections, setCollections] = useState<ICollection[]>([]);

    const handleNewProgramClick = () => {
        router.push('/admin/collections/new')
    }

    return (
        <section className='m-4 bg-gray-200 rounded'>
            <div className="py-8 px-8">
                <h1 className="text-2xl font-bold mb-4">Your Collections</h1>
            </div>
            <div className="px-6 pb-8">
                <div className="flex flex-row">
                <div className="w-1/4 px-2">
                    <ItemsCard title="Create New" description="Click to create a new collection" onClick={handleNewProgramClick} />
                </div>
                </div>
                <hr className="my-8 border-gray-300" />
                <div className="px-2 grid grid-cols-3 gap-6">
                {collections.length === 0 ? (
                    <p className="col-span-3 text-center text-gray-600">No collections created!</p>
                ) : (
                    collections.map(collection => (
                        // Render your collection item card here
                        <ItemsCard 
                            key={collection.id} 
                            title={`${collection.CollectionName} - INR ${collection.CollectionTotalNumberOfNFTs}`} 
                            description={collection.CollectionDescription} 
                            onClick={() => router.push(`/admin/collections/${collection.id}`)}
                        />
                    ))
                )}
                </div>
            </div> 
        </section>
    )
}

export default AdminLanding
