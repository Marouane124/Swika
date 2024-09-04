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
  kilometrage: number;
  carburant: string;
  boite_Vitesses: string;
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

export interface ObjetAttributes {
  marque: string;
  taille: string;
  categorie: string;
  photo: {
    data: ImageData[];
  };
}

export interface Objet {
  data: {
    id: number;
    attributes: ObjetAttributes;
  };
}

export interface MaterielAttributes {
  marque: string;
  type: string;
  disponibilite: boolean;
  photo: {
    data: ImageData[];
  };
}

export interface Materiel {
  data: {
    id: number;
    attributes: MaterielAttributes;
  };
}

export interface FourreToutAttributes {
  categorie: string;
  photo: {
    data: ImageData[];
  };
}

export interface FourreTout {
  data: {
    id: number;
    attributes: FourreToutAttributes;
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
  transaction: string;
  etat: string;
  immobilier?: Immobilier;
  vehicule?: Vehicule;
  objet?: Objet;
  materiel?: Materiel;
  fourre_tout?: FourreTout; // Updated to match the API
  users_permissions_user: User;
  Statut: string | null;
}

export interface Annonce {
  id: number;
  attributes: AnnonceAttributes;
}
