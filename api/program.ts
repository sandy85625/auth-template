import { addDoc, collection,updateDoc, getDoc, doc, getDocs, where, query, setDoc, collectionGroup } from "firebase/firestore";
import { database } from "../firebase/firebase.config"
import { User } from "firebase/auth";
import { ProgramFormData } from "../interfaces/nft-forms";

export interface IProgram extends ProgramFormData {
  id: string;
}

const createProgram = async (data: ProgramFormData, user: User) => {
  if (user) {
    try {
      const userCollectionRef = doc(database, "programs", user.uid);
      
      // Check if the document exists
      const userCollectionSnapshot = await getDoc(userCollectionRef);
      
      // If the document doesn't exist, create it first
      if (!userCollectionSnapshot.exists()) {
        await setDoc(userCollectionRef, {}); // You can set any initial data for the document if needed
      }

      // Now create the subcollection "userCollections" under the user document
      await addDoc(collection(userCollectionRef, "userPrograms"), data);
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`)
    }
  }
};

const fetchAllProgramsByUserUID = async (userId: string): Promise<IProgram[]> => {
    try {
      const programsRef = collection(database, "programs", userId, "userPrograms");
      const querySnapshot = await getDocs(programsRef);
      const programs: IProgram[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        programs.push({ id: doc.id, ...doc.data() as ProgramFormData });
      });
      return programs;
    } catch (error) {
      return [];
    }
  };

  const fetchAllPrograms = async (): Promise<IProgram[]> => {
    try {
      // Query all documents in "userPrograms" subcollections across all users
      const querySnapshot = await getDocs(collectionGroup(database, "userPrograms"));
      
      // Initialize an array to hold the results
      const programs: IProgram[] = [];
  
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        programs.push({ id: doc.id, ...doc.data() as ProgramFormData });
      });
  
      return programs;
    } catch (error) {
      return [];
    }
  };

  const fetchCollectionsByProgramId = async (programId: string): Promise<string[]> => {
    try {
        // Create a reference to the documents to fetch
        const userCollectionsGroup = collectionGroup(database, "userPrograms");
        const q = query(userCollectionsGroup);
        const querySnapshot = await getDocs(q);
    
        // Find the document with the matching ID
        const matchingDoc = querySnapshot.docs.find(doc => doc.id === programId);
    
        if (matchingDoc) {
          // If a matching document is found, return it
          const newC = { id: matchingDoc.id, ...matchingDoc.data() as ProgramFormData };
          return newC.ProgramCollections
        } else {
          // If no matching document is found, log a message and return null
          return [];
        }
      } catch (error) {
        return [];
      }
    };
  

//   const fetchCollectionsIfPublished = async (): Promise<IProgram[]> => {
//     try {
//       const collections: IProgram[] = [];
//       // Perform the Collection Group query
//       const userCollectionsGroup = collectionGroup(database, "userPrograms");
//       const q = query(userCollectionsGroup, where("CollectionPublished", "==", true));
  
//       // Execute the query and get the result
//       const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
  
//       // Extract the documents' data from the query snapshot
//       querySnapshot.forEach((doc) => {
//         const collectionData = doc.data() as CollectionFormData;
//         collections.push({ ...collectionData, id: doc.id });
//       });
  
//       return collections;
//     } catch (error: any) {
//       throw new Error(`Error: ${error.message}`);
//     }
//   };

  const fetchProgramById = async (
    collectionId: string
  ): Promise<IProgram | null> => {
    try {
      // Create a reference to the documents to fetch
      const userCollectionsGroup = collectionGroup(database, "userPrograms");
      const q = query(userCollectionsGroup);
      const querySnapshot = await getDocs(q);
  
      // Find the document with the matching ID
      const matchingDoc = querySnapshot.docs.find(doc => doc.id === collectionId);
  
      if (matchingDoc) {
        // If a matching document is found, return it
        return { id: matchingDoc.id, ...matchingDoc.data() as ProgramFormData };
      } else {
        // If no matching document is found, log a message and return null
        return null;
      }
    } catch (error) {
      return null;
    }
  };

//   const markCollectionAsPublished = async (
//     collectionId: string
//   ): Promise<void> => {
//     try {
//       // Create a reference to the document to update
//       const userCollectionsGroup = collectionGroup(database, "userCollections");
//       const q = query(userCollectionsGroup);
//       const querySnapshot = await getDocs(q);
  
//       // Find the document with the matching ID
//       const matchingDoc = querySnapshot.docs.find(doc => doc.id === collectionId);
  
//       if (matchingDoc) {
//         // If a matching document is found, update it
//         await updateDoc(matchingDoc.ref, {
//           CollectionPublished: true,
//         })
//         .catch((err) => {
//           throw new Error(`Error: ${err.message}`)
//         });
//       } 
//     } catch (error: any) {
//       throw new Error(`Error: ${error.message}`)
//     }
//   };

const addInterestedUsers = async (
    programId: string,
    userId: string
  ): Promise<void> => {
    try {
      // Create a reference to the documents to fetch
      const userCollectionsGroup = collectionGroup(database, "userPrograms");
      const q = query(userCollectionsGroup);
      const querySnapshot = await getDocs(q);
  
      // Find the document with the matching ID
      const matchingDoc = querySnapshot.docs.find(doc => doc.id === programId);
      
      if (matchingDoc) {
        // Retrieve the existing list of interested users or default to an empty array
        const existingInterestedUsers = matchingDoc.data().ProgramIntrestedUsers || [];
        
        // Add the new user to the list if not already present
        if (!existingInterestedUsers.includes(userId)) {
          existingInterestedUsers.push(userId);
  
          // Update the document with the new list of interested users
          await updateDoc(matchingDoc.ref, {
            ProgramIntrestedUsers: existingInterestedUsers,
          })
          .catch((err) => {
            throw new Error(`Error: ${err.message}`);
          });
        }
      } 
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  };
  
  

export {
    createProgram,
    fetchAllProgramsByUserUID,
    fetchAllPrograms,
    addInterestedUsers,
    fetchProgramById,
    fetchCollectionsByProgramId
}