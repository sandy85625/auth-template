import { addDoc, collection, getDoc, doc, getDocs } from "firebase/firestore";
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
    if(user){
        const profileData: ProfileData = await readProfileData(user)
        const docRef = await addDoc(collection(database, "collections", user.uid, "userCollections"), data);
        await createNft(data, profileData.photoURL, user, docRef.id)
    }
}

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
      console.error("Error fetching documents: ", error);
      return [];
  }
}

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
      console.error("Error fetching documents: ", error);
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
  userId: string,
  collectionId: string
): Promise<ICollection | null> => {
  try {
    // Create a reference to the document to fetch
    const docRef = doc(collection(database, "collections", userId, "userCollections"), collectionId);

    // Fetch the document
    const docSnapshot = await getDoc(docRef);

    // If the document exists, return it
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() as CollectionFormData };
    } else {
      // Document does not exist
      console.log(`No such document with ID ${collectionId} found!`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
    return null;
  }
};
  

export {
    createCollection,
    fetchAllCollections,
    fetchAllCollectionsByUserUID,
    fetchCollectionById
}
