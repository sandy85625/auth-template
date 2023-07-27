import { Control } from 'react-hook-form';

interface CollectionAttribute {
  trait_type: string;
  value: string | number;
  percentage: number;
}

interface CollectionFormData {
  CollectionPublished: boolean;
  CollectionName: string;
  CollectionDescription: string;
  CollectionBasePrice: number;
  NFTClass: string;
  CollectionTotalNumberOfNFTs: number;
  CollectionAttributesList: Array<CollectionAttribute>;
}

interface NFTMetadataAttribute {
  trait_type: string;
  value: string | number;
}

interface NFTMetadata {
  id?:string;
  ownerId: string;
  collectionId: string;
  name: string;
  description: string;
  basePrice: number;
  currentPrice: number;
  image: string;
  attributes: Array<NFTMetadataAttribute>;
}

interface CollectionFormInput extends CollectionFormData {}

interface CollectionFieldProps {
  control: Control<CollectionFormInput>;
  register: any;
}

export type {
  CollectionAttribute,
  CollectionFormData,
  NFTMetadataAttribute,
  NFTMetadata,
  CollectionFormInput,
  CollectionFieldProps
}
