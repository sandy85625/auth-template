import { addDoc, getDocs, collection, query, where, doc, getDoc, setDoc,updateDoc, collectionGroup, QuerySnapshot, DocumentData } from "firebase/firestore";
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
      const docRef = await addDoc(collection(userCollectionRef, "nftCollection", collectionId, "nftCollections"), {});
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


const fetchUserNFTsByCollectionId = async (collectionId: string): Promise<NFTMetadata[]> => {
  try {
    const nftCollectionsGroup = collectionGroup(database, "nftCollection");
    const q = query(nftCollectionsGroup, where('collectionId', '==', collectionId));

    // Execute the query and get the result
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

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
    const nftCollectionsGroup = collectionGroup(database, "nftCollection");
    const q = query(nftCollectionsGroup, where('collectionId', '==', collectionId));

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
    // Perform the Collection Group query
    const nftCollectionsGroup = collectionGroup(database, "nftCollection");
    const q = query(nftCollectionsGroup, where('collectionId', '==', collectionId));

    // Execute the query and get the result
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);


    // Find the document with the matching ID
    const matchingDoc = querySnapshot.docs.find(doc => doc.id === nftId);    

    if (matchingDoc) {

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

const fetchNFTByWalletId = async (walletId: string): Promise<NFTMetadata[] | null> => {
  try {
    // Perform the Collection Group query on the 'nfts' collection
    const nftCollectionsGroup = collectionGroup(database, 'nftCollection');

    // Add a where clause to find documents where walletId matches
    const q = query(nftCollectionsGroup, where('ownerId', '==', walletId));

    // Fetch the documents
    const querySnapshot = await getDocs(q);

    // If no matching documents are found, log a message and return null
    if (querySnapshot.empty) {
      return null;
    }

    // Map the documents into an array of NFTMetadata
    const matchingDocs: NFTMetadata[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as NFTMetadata }));

    // Return the array of matching NFTMetadata
    return matchingDocs;
  } catch (error) {
    console.error('Error fetching NFT: ', error);
    return null;
  }
};

const updateNFTWalletId = async (collectionId: string, nftId: string, newWalletId: string): Promise<void> => {
  try {
    // Perform the Collection Group query
    const nftCollectionsGroup = collectionGroup(database, "nftCollection");
    const q = query(nftCollectionsGroup, where('collectionId', '==', collectionId));

    // Execute the query and get the result
    const querySnapshot = await getDocs(q);

    // Find the document with the matching ID
    const matchingDoc = querySnapshot.docs.find(doc => doc.id === nftId);

    if (matchingDoc) {
      // If a matching document is found, update it
      const nftDocRef = doc(database, matchingDoc.ref.path);
      await updateDoc(nftDocRef, { ownerId: newWalletId, isOnSale: false });
    } else {
      // If no matching document is found, log a message
      console.log('No matching NFT found.');
    }
  } catch (error) {
    console.error('Error updating NFT: ', error);
  }
};

const reupdateIsOnSale = async (collectionId: string, nftId: string, publishState: boolean): Promise<void> => {
  try {
    // Perform the Collection Group query
    const nftCollectionsGroup = collectionGroup(database, "nftCollection");
    const q = query(nftCollectionsGroup, where('collectionId', '==', collectionId));

    // Execute the query and get the result
    const querySnapshot = await getDocs(q);

    // Find the document with the matching ID
    const matchingDoc = querySnapshot.docs.find(doc => doc.id === nftId);

    if (matchingDoc) {
      // If a matching document is found, update it
      const nftDocRef = doc(database, matchingDoc.ref.path);
      await updateDoc(nftDocRef, { isOnSale: publishState });
    } else {
      // If no matching document is found, log a message
      console.log('No matching NFT found.');
    }
  } catch (error) {
    console.error('Error updating NFT: ', error);
  }
};

export { 
  createNft,
  fetchUserNFTsByCollectionId,
  fetchNFTsByCollectionId,
  fetchNFTByNFTId,
  fetchNFTByWalletId,
  updateNFTWalletId,
  reupdateIsOnSale
}
