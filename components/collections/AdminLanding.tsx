import { useRouter } from 'next/router';
import ItemsCard from '../cards/dashboard-cards/ItemsCard';
import React, { useEffect, useState } from 'react';
import { ICollection, fetchAllCollectionsByUserUID } from '../../api/collection';
import { useAuth } from '../../hooks/useAuth';
import CollectionCard from '../cards/dashboard-cards/CollectionCard';

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
        <section className='m-4 bg-blue-100 rounded min-h-screen'>
            <div className="py-8 px-8">
                <h1 className="text-2xl font-bold text-blue-800 mb-4">Your Collections</h1>
            </div>
            <div className="px-6 pb-8">
                <div className="flex flex-row">
                    <div className="w-1/4 px-2">
                        <ItemsCard title="Create New" description="Click to create a new collection" onClick={handleNewProgramClick} />
                    </div>
                </div>
                <hr className="my-8 border-blue-300" />
                <div className="px-2 grid grid-cols-3 gap-6">
                    {collections.length === 0 ? (
                        <p className="col-span-3 text-center text-blue-600">No collections created!</p>
                    ) : (
                        collections.map(collection => (
                            // Render your collection item card here
                            <CollectionCard 
                                key={collection.id} 
                                title={`${collection.CollectionName}`} 
                                description={collection.CollectionDescription} 
                                price={collection.CollectionBasePrice}
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
