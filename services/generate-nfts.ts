import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { INFTFormInput, INFTMetadata } from "../interfaces";
import { storage } from "../firebase/firebase.config";
import { generateQRCode } from "./qr-generator";
import generateShortIds from "./generate-shortid";
import { User } from "firebase/auth";

const generateNfts = async (
  externalUrl: string,
  logoImage: string,
  metadata: INFTMetadata,
  user: User,
  index: number
): Promise<object> => {
  try {
    const blob = await generateQRCode(externalUrl, metadata.trait_class, logoImage);
    const storageRef = ref(storage, `${user.uid}/image-${index}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);

    const nft = {
      name: `${metadata.trait_class} #${index}`,
      imageUrl: downloadURL,
      externalUrl: externalUrl,
      attributes: {
        traitName: metadata.trait_name,
        traitValue: metadata.trait_value,
        traitType: metadata.trait_class
      },
    };

    return nft;
  } catch (error: any) {
    throw new Error(`Error occured at NFT Generation: ${error.message}`);
  }
};

const generateNftDataForDb = async (nftData: INFTFormInput, logoImage: string, user: User, collectionId: string) => {
  let index = 0; // Initialize index

  const totalNfts = await Promise.all(
    nftData.nft_metadatas.flatMap(async (metadata) => {
      // Generate short URLs for each NFT
      const urls = generateShortIds(metadata.trait_count);

      // Generate NFTs and get an array of NFT objects
      const nftObjects = await Promise.all(
        urls.map(async (url) => {
          // Increment the index and then pass to generateNfts
          index++;
          return generateNfts(url, logoImage, metadata, user, index);
        })
      );

      // Add the collection ID and short URL to each NFT object
      const nftDataForDb = nftObjects.map((nft, urlIndex) => ({
        ...nft,
        description: nftData.description,
        basePrice: nftData.nft_base_price,
        shortUrl: urls[urlIndex],
        collectionId: collectionId, // Assuming nftData has the collectionId
      }));

      // Return the array of NFT objects to be flat mapped
      return nftDataForDb;
    })
  );

  return totalNfts.flat();
};

export default generateNftDataForDb;
