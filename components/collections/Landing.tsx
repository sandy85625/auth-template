import { useRouter } from 'next/router';
import ItemsCard from '../../components/cards/dashboard-cards/ItemsCard';
import React, { useEffect, useState } from 'react';
import { ICollection, fetchAllCollectionsByUserUID } from '../../api/collection';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../loaders/LoadingSpinner';

function Landing() {
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
        } else {
            router.push('/login')
        }
    }, [user, router, loading]);

    const [collections, setCollections] = useState<ICollection[]>([]);

    const handleNewProgramClick = () => {
        router.push('/collections/new')
    }

    return (
        <section>
            <div className="py-8 px-8">
                <h1 className="text-2xl font-bold mb-4">Your Collections</h1>
            </div>
            <div className="px-6">
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
                            title={`${collection.name} - INR ${collection.nft_base_price}`} 
                            description={collection.description} 
                            onClick={() => router.push(`/collections/${collection.id}`)}
                        />
                    ))
                )}
                </div>
            </div> 
        </section>
    )
}

export default Landing
