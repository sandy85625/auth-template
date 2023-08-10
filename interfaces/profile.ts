// All Profile Related Database Model Interfaces

// User Profile Schema
interface ProfileDataImplementation {
    name: string;
    email: string;
    phone: string;
    photoURL: string;
    role: string;
    walletID: string;
    walletPrivateKey: string;
    walletMnemonicPhrase: string;
}

// ProfileField Properties Interface

interface ProfileFieldPropsImplementation {
    label: string;
    value: string;
    isSensitive?: boolean;
    toBeCopied?: boolean;
  }

export type {
    ProfileDataImplementation,
    ProfileFieldPropsImplementation
}