interface CreateNewCardPropsImplementation {
    title: string;
    description: string;
    price?: number;
    isPublished?: boolean;
    onShowInterestClick?: () => void;
    onClick?: () => void;
  }

  export type {
    CreateNewCardPropsImplementation
  }