import { addDoc, getDocs, collection, query, where, doc, getDoc, setDoc } from "firebase/firestore";
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

    if(user == null) {
        throw new Error(`User not present!`);
    }

    // Create empty documents in the collection and store their references
    const docRefs = [];
    for(let i = 0; i < form.CollectionTotalNumberOfNFTs; i++) {
        const docRef = await addDoc(collection(database, "nfts", user.uid, collectionId), {});
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

const fetchNFTsByCollectionId = async (userId: string, collectionId: string): Promise<NFTMetadata[]> => {
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


const fetchNFTByNFTId = async (userId: string, collectionId: string, nftId: string): Promise<NFTMetadata | null> => {
  try {
    const nftDoc = doc(database, 'nfts', userId, collectionId, nftId);
    const nftSnap = await getDoc(nftDoc);

    if (nftSnap.exists()) {
      return { id: nftSnap.id, ...nftSnap.data() as NFTMetadata };
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
  fetchNFTByNFTId
}
