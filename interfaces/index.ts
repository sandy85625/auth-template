// All Interfaces for database

// ProfileData Schema
export type { ProfileDataImplementation as ProfileData } from './profile';

// ProfileField Data Properties
export type { ProfileFieldPropsImplementation as ProfileFieldProps } from './profile';

// Cards
export type { CreateNewCardPropsImplementation as CreateNewCardProps } from './cards';

// Errors
export type { ErrorPagePropsImplementation as ErrorPageProps } from './errors';

// NftForms
export type {
    INFTImplementation as INFT,
    INFTMetadataImplementation as INFTMetadata,
    INFTFormInputImplementation as INFTFormInput,
    INFTClassFieldPropsImplementation as INFTClassFieldProps
} from './nft-forms'