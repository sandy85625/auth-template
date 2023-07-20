import { Control } from 'react-hook-form';

interface INFTImplementation {
  id?: string,
  name: string;
  description?: string;
  basePrice: number;
  imageUrl: string;
  externalUrl: string;
  shortURL: string;
  attributes: {
    traitName: string,
    traitValue: string,
    traitType: string

  }
  // More properties based on your NFT structure
}
interface INFTMetadataImplementation {
  trait_class: string;
  trait_name: string;
  trait_value: string;
  trait_count: number;
}

 interface INFTFormInputImplementation {
  name: string;
  description: string;
  nft_external_url: string;
  nft_base_price: string;
  nft_metadatas: INFTMetadataImplementation[];
}

interface INFTClassFieldPropsImplementation {
  control: Control<INFTFormInputImplementation>;
  register: any;
}
  export type {
    INFTImplementation,
    INFTMetadataImplementation,
    INFTFormInputImplementation,
    INFTClassFieldPropsImplementation
  }
  