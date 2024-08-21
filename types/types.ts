export interface ImageAttributes {
  url: string;
}

export interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

export interface ImmobilierAttributes {
  type: string;
  adresse: string;
  chambre: number;
  salon: number;
  toilette: number;
  surface: number;
  photo: {
    data: ImageData[];
  };
}

export interface Immobilier {
  data: {
    id: number;
    attributes: ImmobilierAttributes;
  };
}

export interface VehiculeAttributes {
  type: string;
  modele: string;
  marque: string;
  annee: number;
  kilometrage: string;
  photo: {
    data: ImageData[];
  };
}

export interface Vehicule {
  data: {
    id: number;
    attributes: VehiculeAttributes;
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
  image?: ImageData; 
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  phone: string | null;
  image?: ImageData;
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
  ville: string;
  immobilier?: Immobilier;
  vehicule?: Vehicule;
  users_permissions_user: User;
  Statut: string | null;
}

export interface Annonce {
  id: number;
  attributes: AnnonceAttributes;
}
