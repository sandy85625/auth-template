import { addDoc, getDocs, collection, query, where, doc, getDoc } from "firebase/firestore";
import { database } from "../firebase/firebase.config"
import { INFT, INFTFormInput } from "../interfaces";
import generateNftDataForDb from "../services/generate-nfts";
import { User } from "firebase/auth";

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
  nftData: INFTFormInput,
  logoImage: string,
  user: User,
  collectionId: string
) => {
  try {
    // Generate the NFT data to be added to the database
    const nftDataForDb = await generateNftDataForDb(nftData, logoImage, user, collectionId);

    // Add each NFT to the database
    const docRefs = await Promise.all(
      nftDataForDb.map((nft) => addDoc(collection(database, "nfts", user.uid, collectionId), nft))
    );
    // Log the IDs of the written documents
    docRefs.forEach((docRef) => console.log("Document written with ID: ", docRef.id));

  } catch (error: any) {
    console.error("Error adding document: ", error.message);
  }
};

 const fetchNFTsByCollectionId = async (userId: string, collectionId: string): Promise<INFT[]> => {
  try {
    // Create a query against the collection of NFTs, filtering by collection ID
    const q = query(
      collection(database, 'nfts', userId, collectionId),
      where('collectionId', '==', collectionId)
    );

    const querySnapshot = await getDocs(q);
    const nfts: INFT[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      nfts.push({ id: doc.id, ...doc.data() as INFT });
    });

    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs: ', error);
    return [];
  }
};

const fetchNFTById = async (userId: string, collectionId: string, nftId: string): Promise<INFT | null> => {
  try {
    const nftDoc = doc(database, 'nfts', userId, collectionId, nftId);
    const nftSnap = await getDoc(nftDoc);

    if (nftSnap.exists()) {
      return { id: nftSnap.id, ...nftSnap.data() as INFT };
    } else {
      console.error('No NFT found with ID: ', nftId);
      return null;
    }
  } catch (error) {
    console.error('Error fetching NFT: ', error);
    return null;
  }
};

export { 
  createNft,
  fetchNFTsByCollectionId,
  fetchNFTById
}
