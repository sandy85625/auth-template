import { groupBy } from 'lodash';
import { CollectionFormData, NFTMetadata } from "../interfaces/nft-forms";
import { generateQRCode } from './qr-generator';
import { storage } from "../firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { BASE_URL } from '../constants';
import { DocumentReference } from "@firebase/firestore";
import { User } from 'firebase/auth';
import { readProfileData } from '../api/profile';
import { ProfileData } from '../interfaces';

type Trait = { trait_type: string; value: string | number; };

async function generateNFTs(
    form: CollectionFormData, 
    docRefs: DocumentReference[], 
    collectionId:string, 
    logoImage: string, 
    user: User
    ): Promise<Map<DocumentReference, NFTMetadata>> {
    const nfts: Map<DocumentReference, NFTMetadata> = new Map();

    if (user == null) {
        throw new Error(`User not present!`)
    }

    const profile: ProfileData = await readProfileData(user);

    // Group attributes by trait type
    const groupedAttributes = groupBy(form.CollectionAttributesList, 'trait_type');
    let allCombinations: Trait[][] = [];

    for (const traitType in groupedAttributes) {
        const group = groupedAttributes[traitType];

        // Convert 'percentage' fields to numbers
        const groupWithNumbers = group.map(attr => ({...attr, percentage: Number(attr.percentage)}));
        
        if (allCombinations.length === 0) {
            for (const attr of groupWithNumbers) {
                allCombinations.push([{
                    trait_type: attr.trait_type,
                    value: attr.value
                }]);
            }
        } else {
            const newCombinations = [];
            for (const attr of groupWithNumbers) {
                for (const combination of allCombinations) {
                    newCombinations.push([
                        ...combination,
                        {
                            trait_type: attr.trait_type,
                            value: attr.value
                        }
                    ]);
                }
            }
            allCombinations = newCombinations;
        }
    }

    // Check we have enough unique combinations to meet the total number of NFTs
    if (allCombinations.length < form.CollectionTotalNumberOfNFTs) {
        throw new Error(`Not enough unique combinations of attributes to generate ${form.CollectionTotalNumberOfNFTs} NFTs.`);
    }

    for (let i = 0; i < form.CollectionTotalNumberOfNFTs; i++) {
        const index = Math.floor(Math.random() * allCombinations.length);
        const attributes = allCombinations.splice(index, 1)[0];

        const qrUrl = `${BASE_URL}/collections/${collectionId}/${docRefs[i].id}`
        const blob = await generateQRCode(qrUrl, form.NFTClass, logoImage);
        const storageRef = ref(storage, `${collectionId}/image-${i}`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);

        const nft: NFTMetadata = {
            name: `${form.NFTClass.toUpperCase()} CLASS NFT #${i+1}`,
            description: `Part of the ${form.CollectionName} collection`,
            ownerId: profile.walletID,
            collectionId: collectionId,
            image: downloadURL,
            attributes: attributes,
            basePrice: form.CollectionBasePrice,
            currentPrice: form.CollectionBasePrice
        };

        nfts.set(docRefs[i], nft);
    }

    return nfts;
}

export default generateNFTs;
