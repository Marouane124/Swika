export interface ImageAttributes {
  url: string;
}

export interface ImageData {
  data: {
    attributes: ImageAttributes;
  };
}

export interface UserAttributes {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  phone: string;
}

export interface User {
  data: {
    id: number;
    attributes: UserAttributes;
  };
}

export interface AnnonceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: string;
  location: string;
  image?: ImageData;
  users_permissions_user: User;
}

export interface Annonce {
  id: number;
  attributes: AnnonceAttributes;
}
