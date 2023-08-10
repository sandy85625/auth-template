import { CollectionFormData, NFTMetadata } from "../interfaces/nft-forms";
import { generateQRCode } from './qr-generator';
import { storage } from "../firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { BASE_URL } from '../constants';
import { DocumentReference } from "@firebase/firestore";
import { User } from 'firebase/auth';
import { readProfileData } from '../api/profile';
import { ProfileData } from '../interfaces';

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

    for (let i = 0; i < form.CollectionTotalNumberOfNFTs; i++) {
        const attributes = form.CollectionAttributesList.map(attr => ({
            trait_type: attr.trait_type,
            value: attr.value
        }));

        const qrUrl = `${BASE_URL}/collections/${collectionId}/${docRefs[i].id}`;
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
            currentPrice: form.CollectionBasePrice,
            isOnSale: true
        };

        nfts.set(docRefs[i], nft);
    }

    return nfts;
}

export default generateNFTs;
