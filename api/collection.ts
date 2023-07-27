import { addDoc, collection,updateDoc, getDoc, doc, getDocs, where, query, setDoc, collectionGroup, QuerySnapshot, DocumentData } from "firebase/firestore";
import { database } from "../firebase/firebase.config"
import { ProfileData } from "../interfaces";
import { readProfileData } from "./profile";
import { createNft } from "./nft";
import { User } from "firebase/auth";
import { CollectionFormData } from "../interfaces/nft-forms";

export interface ICollection extends CollectionFormData {
  id: string;
}

const createCollection = async (data: CollectionFormData, user: User) => {
  if (user) {
    try {
      const profileData: ProfileData = await readProfileData(user);
      const userCollectionRef = doc(database, "collections", user.uid);
      
      // Check if the document exists
      const userCollectionSnapshot = await getDoc(userCollectionRef);
      
      // If the document doesn't exist, create it first
      if (!userCollectionSnapshot.exists()) {
        await setDoc(userCollectionRef, {}); // You can set any initial data for the document if needed
      }

      // Now create the subcollection "userCollections" under the user document
      const docRef = await addDoc(collection(userCollectionRef, "userCollections"), data);
      
      await createNft(data, profileData.photoURL, user, docRef.id);
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`)
    }
  }
};

const fetchAllCollections = async (): Promise<ICollection[]> => {
  try {
      const querySnapshot = await getDocs(collection(database, "collections"));
      const collections: ICollection[] = [];
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          collections.push({ id: doc.id, ...doc.data() as CollectionFormData });
      });
      return collections;
  } catch (error) {
      return [];
  }
}

const fetchCollectionsIfPublished = async (): Promise<ICollection[]> => {
  try {
    const collections: ICollection[] = [];
    // Perform the Collection Group query
    const userCollectionsGroup = collectionGroup(database, "userCollections");
    const q = query(userCollectionsGroup, where("CollectionPublished", "==", true));

    // Execute the query and get the result
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    // Extract the documents' data from the query snapshot
    querySnapshot.forEach((doc) => {
      const collectionData = doc.data() as CollectionFormData;
      collections.push({ ...collectionData, id: doc.id });
    });

    return collections;
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`);
  }
};

const fetchAllCollectionsByUserUID = async (userId: string): Promise<ICollection[]> => {
    try {
      const collectionsRef = collection(database, "collections", userId, "userCollections");
      const querySnapshot = await getDocs(collectionsRef);
      const collections: ICollection[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        collections.push({ id: doc.id, ...doc.data() as CollectionFormData });
      });
      return collections;
    } catch (error) {
      return [];
    }
  };

  /**
 * Fetch a single collection from Firestore by its ID
 *
 * @param {string} userId - The ID of the user who owns the collection
 * @param {string} collectionId - The ID of the collection to fetch
 * 
 * @returns {Promise<ICollection | null>} The fetched collection or null if not found
 */
  const fetchCollectionById = async (
    collectionId: string
  ): Promise<ICollection | null> => {
    try {
      // Create a reference to the documents to fetch
      const userCollectionsGroup = collectionGroup(database, "userCollections");
      const q = query(userCollectionsGroup);
      const querySnapshot = await getDocs(q);
  
      // Find the document with the matching ID
      const matchingDoc = querySnapshot.docs.find(doc => doc.id === collectionId);
  
      if (matchingDoc) {
        // If a matching document is found, return it
        return { id: matchingDoc.id, ...matchingDoc.data() as CollectionFormData };
      } else {
        // If no matching document is found, log a message and return null
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const markCollectionAsPublished = async (
    collectionId: string
  ): Promise<void> => {
    try {
      // Create a reference to the document to update
      const userCollectionsGroup = collectionGroup(database, "userCollections");
      const q = query(userCollectionsGroup);
      const querySnapshot = await getDocs(q);
  
      // Find the document with the matching ID
      const matchingDoc = querySnapshot.docs.find(doc => doc.id === collectionId);
  
      if (matchingDoc) {
        console.log(matchingDoc.id);
        
        // If a matching document is found, update it
        await updateDoc(matchingDoc.ref, {
          CollectionPublished: true,
        })
        .catch((err) => {
          throw new Error(`Error: ${err.message}`)
        });
      } 
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`)
    }
  };
  

export {
    createCollection,
    fetchAllCollections,
    fetchAllCollectionsByUserUID,
    fetchCollectionById,
    fetchCollectionsIfPublished,
    markCollectionAsPublished
}
