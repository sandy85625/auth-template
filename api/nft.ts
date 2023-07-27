import { addDoc, getDocs, collection, query, where, doc, getDoc, setDoc, collectionGroup, QuerySnapshot, DocumentData } from "firebase/firestore";
import { database } from "../firebase/firebase.config"
import { User } from "firebase/auth";
import { CollectionFormData, NFTMetadata } from "../interfaces/nft-forms";
import generateNFTs from "../services/generate-nfts";

/**
 * Function to generate NFTs and add them to the database
 *
 * @param {INFTFormInput} nftData - Data to be included in the NFT
 * @param {string} logoImage - Logo image to be used in the NFT
 * @param {string} collectionId - The ID of the collection where the NFTs will be added
 * 
 * @returns {Promise<void>} - No return value
 */
const createNft = async (
  form: CollectionFormData,
  logoImage: string,
  user: User,
  collectionId: string
) => {
  try {
    if (!user || !user.uid) {
      throw new Error("User not present or missing user ID!");
    }

    // Get a reference to the user's collection document
    const userCollectionRef = doc(database, "nfts", user.uid);

    // Check if the user's collection document exists
    const userCollectionSnapshot = await getDoc(userCollectionRef);

    // If the user's collection document doesn't exist, create it first
    if (!userCollectionSnapshot.exists()) {
      await setDoc(userCollectionRef, {}); // You can set any initial data for the document if needed
    }

    // Create empty documents in the "nfts" subcollection and store their references
    const docRefs = [];
    for (let i = 0; i < form.CollectionTotalNumberOfNFTs; i++) {
      const docRef = await addDoc(collection(userCollectionRef, collectionId), {});
      docRefs.push(docRef);
    }

    // Generate NFT data and update the previously created documents
    const nftDataForDb = await generateNFTs(form, docRefs, collectionId, logoImage, user);

    nftDataForDb.forEach(async (nftMetadata, docRef) => {
      await setDoc(docRef, nftMetadata);
    });
  } catch (error: any) {
    console.error("Error adding document: ", error.message);
  }
};


const fetchUserNFTsByCollectionId = async (userId: string, collectionId: string): Promise<NFTMetadata[]> => {
  try {
    const nftsRef = collection(database, 'nfts', userId, collectionId);
    const querySnapshot = await getDocs(nftsRef);
    const nfts: NFTMetadata[] = [];
    querySnapshot.forEach((doc) => {
      nfts.push({ id: doc.id, ...doc.data() as NFTMetadata });
    });
    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs: ', error);
    return [];
  }
};

const fetchNFTsByCollectionId = async (collectionId: string): Promise<NFTMetadata[]> => {
  try {
    const nfts: NFTMetadata[] = [];
    // Perform the Collection Group query
    const nftCollectionsGroup = collectionGroup(database, collectionId);
    const q = query(nftCollectionsGroup);

    // Execute the query and get the result
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    // Extract the documents' data from the query snapshot
    querySnapshot.forEach((doc) => {
      const nftData = doc.data() as NFTMetadata;
      nfts.push({ ...nftData, id: doc.id });
    });

    return nfts;
  } catch (error) {
    console.error("Error fetching nfts: ", error);
    throw error;
  }
};


const fetchNFTByNFTId = async (collectionId: string, nftId: string): Promise<NFTMetadata | null> => {
  try {
    console.log(collectionId, nftId);
    
    // Perform the Collection Group query
    const nftCollectionsGroup = collectionGroup(database, collectionId);
    const q = query(nftCollectionsGroup);

    // Fetch the documents
    const querySnapshot = await getDocs(q);

    // Find the document with the matching ID
    const matchingDoc = querySnapshot.docs.find(doc => doc.id === nftId);    

    if (matchingDoc) {
      console.log(matchingDoc.id);

      // If a matching document is found, return it
      return { id: matchingDoc.id, ...matchingDoc.data() as NFTMetadata };
    } else {
      // If no matching document is found, log a message and return null
      return null;
    }
  } catch (error) {
    console.error('Error fetching NFT: ', error);
    return null;
  }
};


export { 
  createNft,
  fetchUserNFTsByCollectionId,
  fetchNFTsByCollectionId,
  fetchNFTByNFTId
}
