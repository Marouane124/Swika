import axios from 'axios';
import { Annonce } from '@/types/types';

// Fetch the details of a single annonce by ID
export const fetchAnnonceById = async (id: number): Promise<Annonce | null> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces/${id}`, {
      params: {
        populate: {
          users_permissions_user: true,
          vehicule: { populate: ['photo'] },
          immobilier: { populate: ['photo'] },
          objet: { populate: ['photo'] },
          materiel: { populate: ['photo'] },
          fourre_tout: { populate: ['photo'] },
        },
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching annonce by ID:', error);
    return null;
  }
};


// Fetch annonces by category
export const fetchAnnoncesByCategory = async (category: string): Promise<Annonce[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`, {
      params: {
        filters: {
          category: {
            $eq: category,
          },
          Statut: {
            $eq: "Active",
          },
        },
        sort: ["createdAt:desc"],
        populate: {
          vehicule: { populate: ["photo"] },
          immobilier: { populate: ["photo"] },
          fourre_tout: { populate: ["photo"] },
          materiel: { populate: ["photo"] },
          objet: { populate: ["photo"] },
          users_permissions_user: true, 
        },
        pagination: {
          start: 0,
          limit: 6, 
        },
      },
    });

    return response.data.data.map((annonce: any) => ({
      id: annonce.id,
      attributes: annonce.attributes,
    }));
  } catch (error) {
    console.error("Error fetching annonces by category:", error);
    return [];
  }
};

// Fetch a paginated list of annonces
export const fetchAnnonces = async (filters: {
  page: number;
  pageSize: number;
  searchQuery: string;
  userId?: number;
  ville?: string;
  priceRange?: { min: number; max: number };
  category?: string;
  immobilierFilters?: { chambre?: number; salon?: number; surface?: number };
  vehiculeFilters?: { modele?: string; marque?: string; annee?: number; kilometrage?: number };
  objetFilters?: { taille?: string; marque?: string };
  materielFilters?: { type?: string; marque?: string };
  fourreToutFilters?: { categorie?: string };
  statut?: string;
}) => {
  try {
    const queryFilters: any = {
      title: { $containsi: filters.searchQuery },
    };

    if (filters.statut) {
      queryFilters.Statut = { $eq: filters.statut };
    }

    if (filters.userId) {
      queryFilters.users_permissions_user = { id: { $eq: filters.userId } };
    }

    if (filters.ville) {
      queryFilters.ville = { $eq: filters.ville };
    }

    if (filters.priceRange) {
      queryFilters.price = { $between: [filters.priceRange.min, filters.priceRange.max] };
    }

    if (filters.category) {
      queryFilters.category = { $eq: filters.category };

      if (filters.category === 'Immobilier' && filters.immobilierFilters) {
        if (filters.immobilierFilters.chambre) queryFilters['immobilier.chambre'] = { $eq: filters.immobilierFilters.chambre };
        if (filters.immobilierFilters.salon) queryFilters['immobilier.salon'] = { $eq: filters.immobilierFilters.salon };
        if (filters.immobilierFilters.surface) queryFilters['immobilier.surface'] = { $gte: filters.immobilierFilters.surface };
      }

      if (filters.category === 'Automobile' && filters.vehiculeFilters) {
        if (filters.vehiculeFilters.modele) queryFilters['vehicule.modele'] = { $containsi: filters.vehiculeFilters.modele };
        if (filters.vehiculeFilters.marque) queryFilters['vehicule.marque'] = { $containsi: filters.vehiculeFilters.marque };
        if (filters.vehiculeFilters.annee) queryFilters['vehicule.annee'] = { $eq: filters.vehiculeFilters.annee };
        if (filters.vehiculeFilters.kilometrage) queryFilters['vehicule.kilometrage'] = { $lte: filters.vehiculeFilters.kilometrage };
      }

      if (filters.category === 'Vêtement-Objet' && filters.objetFilters) {
        if (filters.objetFilters.taille) queryFilters['objet.taille'] = { $containsi: filters.objetFilters.taille };
        if (filters.objetFilters.marque) queryFilters['objet.marque'] = { $containsi: filters.objetFilters.marque };
      }

      if (filters.category === 'Matériel' && filters.materielFilters) {
        if (filters.materielFilters.type) queryFilters['materiel.type'] = { $containsi: filters.materielFilters.type };
        if (filters.materielFilters.marque) queryFilters['materiel.marque'] = { $containsi: filters.materielFilters.marque };
      }

      if (filters.category === 'Fourre-tout' && filters.fourreToutFilters) {
        if (filters.fourreToutFilters.categorie) queryFilters['fourre_tout.categorie'] = { $containsi: filters.fourreToutFilters.categorie };
      }
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`, {
      params: {
        sort: ['createdAt:desc'],
        filters: queryFilters,
        populate: {
          users_permissions_user: true,
          vehicule: { populate: ['photo'] },
          immobilier: { populate: ['photo'] },
          objet: { populate: ['photo'] },
          materiel: { populate: ['photo'] },
          fourre_tout: { populate: ['photo'] },
        },
        pagination: { page: filters.page, pageSize: filters.pageSize },
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching annonces:', error);
    throw error;
  }
};

// Create a new annonce
interface FormData {
  title: string;
  description: string;
  price: number;
  ville: string;
  transaction: string;
  etat?: string;
  type: string;
  adresse?: string;
  chambre?: number;
  salon?: number;
  toilette?: number;
  surface?: number;
  modele?: string;
  marque?: string;
  annee?: string;
  kilometrage?: string;
  carburant?: string;
  boite_Vitesses?: string;
  taille?: string;
  categorieObjet?: string;
  disponibilite?: boolean;
  categorieFourreTout?: string;
}

interface AnnonceData {
  category: string;
  formData: FormData;
  userId: string;
  images: File[];
}

export const createAnnonce = async ({ category, formData, userId, images }: AnnonceData) => {
  const annonceData = {
    title: formData.title,
    description: formData.description,
    price: parseFloat(formData.price.toString()),
    ville: formData.ville,
    transaction: formData.transaction,
    etat: formData.etat || '',
    category,
    users_permissions_user: userId,
    Statut: 'Dans la modération',
  };

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`, { data: annonceData });
    const annonceId = response.data.data.id;

    let relatedData = null;
    let relatedId = null;

    if (category === 'Immobilier') {
      relatedData = {
        type: formData.type,
        adresse: formData.adresse,
        chambre: formData.chambre,
        salon: formData.salon,
        toilette: formData.toilette,
        surface: formData.surface,
        annonce: annonceId,
      };
      const immobilierResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/immobiliers`, {
        data: relatedData,
      });
      relatedId = immobilierResponse.data.data.id;
    } else if (category === 'Automobile') {
      relatedData = {
        type: formData.type,
        modele: formData.modele,
        marque: formData.marque,
        annee: formData.annee ? parseInt(formData.annee) : null,
        kilometrage: formData.kilometrage ? parseInt(formData.kilometrage) : null,
        carburant: formData.carburant,
        boite_Vitesses: formData.boite_Vitesses,
        annonce: annonceId,
      };
      const vehiculeResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/vehicules`, {
        data: relatedData,
      });
      relatedId = vehiculeResponse.data.data.id;
    } else if (category === 'Vêtements et objets de la maison') {
      relatedData = {
        marque: formData.marque,
        taille: formData.taille,
        categorie: formData.categorieObjet,
        annonce: annonceId,
      };
      const objetResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/objets`, {
        data: relatedData,
      });
      relatedId = objetResponse.data.data.id;
    } else if (category === 'Location de matériels') {
      relatedData = {
        type: formData.type,
        marque: formData.marque,
        disponibilite: formData.disponibilite,
        annonce: annonceId,
      };
      const materielResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/materiels`, {
        data: relatedData,
      });
      relatedId = materielResponse.data.data.id;
    } else if (category === 'Fourre-tout') {
      relatedData = {
        categorie: formData.categorieFourreTout,
        annonce: annonceId,
      };
      const fourreToutResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/fourre-touts`, {
        data: relatedData,
      });
    }

    if (images.length > 0) {
      const formDataObj = new FormData();
      images.forEach((image) => formDataObj.append('files', image));
      formDataObj.append('refId', relatedId);
      formDataObj.append(
        'ref',
        category === 'Immobilier'
          ? 'api::immobilier.immobilier'
          : category === 'Automobile'
          ? 'api::vehicule.vehicule'
          : category === 'Vêtements et objets de la maison'
          ? 'api::objet.objet'
          : category === 'Location de matériels'
          ? 'api::materiel.materiel'
          : 'api::fourre-tout.fourre-tout'
      );
      formDataObj.append('field', 'photo');

      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, formDataObj);
    }

    return { success: true, message: 'Annonce saved successfully!' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error saving annonce:', error.response);
      return { success: false, message: `Error saving annonce: ${error.response?.statusText}` };
    }
    return { success: false, message: 'An unexpected error occurred' };
  }
};

// Fetch similar annonces
export const fetchSimilarAnnonces = async (category: string, title: string): Promise<Annonce[]> => {
  try {
    const keywords = title.split(' ').filter((word) => word.length > 3);
    const titleFilters = keywords.map((keyword) => ({
      title: { $containsi: keyword },
    }));

    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`, {
      params: {
        filters: {
          category: { $eq: category },
          $or: titleFilters,
          Statut: { $eq: "Active" },
        },
        sort: ["createdAt:desc"],
        populate: {
          vehicule: { populate: ["photo"] },
          immobilier: { populate: ["photo"] },
          objet: { populate: ["photo"] },
          materiel: { populate: ["photo"] },
          fourre_tout: { populate: ["photo"] },
        },
        pagination: { start: 0, limit: 8 },
      },
    });

    return response.data.data
      .filter((annonce: any) => annonce.attributes.title !== title)
      .map((annonce: any) => ({ id: annonce.id, attributes: annonce.attributes }));
  } catch (error) {
    console.error("Error fetching similar annonces:", error);
    return [];
  }
};

// Update an existing annonce
export const updateAnnonce = async (
  id: number,
  formData: {
    title: string;
    description: string;
    price: number;
    ville: string;
    transaction: string;
    etat?: string;
    adresse?: string;
    type?: string;
    chambre?: number;
    salon?: number;
    toilette?: number;
    surface?: number;
    modele?: string;
    marque?: string;
    annee?: string;
    kilometrage?: string;
    carburant?: string;
    boite_Vitesses?: string;
    taille?: string;
    categorieObjet?: string;
    disponibilite?: boolean;
    categorieFourreTout?: string;
  },
  userId: string,
  category: string,
  newImages: File[],
  existingImages: string[]
): Promise<{ success: boolean; message: string }> => {
  const annonceData = {
    title: formData.title,
    description: formData.description,
    price: parseFloat(formData.price.toString()),
    ville: formData.ville,
    transaction: formData.transaction,
    etat: formData.etat,
    users_permissions_user: userId,
    Statut: 'Dans la modération',
  };

  try {
    // Update the main annonce
    await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces/${id}`, {
      data: annonceData,
    });

    // Fetch the current annonce to get the related entity IDs
    const annonceResponse = await fetchAnnonceById(id);
    const relatedEntityId =
      annonceResponse?.attributes?.immobilier?.data?.id ||
      annonceResponse?.attributes?.vehicule?.data?.id ||
      annonceResponse?.attributes?.objet?.data?.id ||
      annonceResponse?.attributes?.materiel?.data?.id ||
      annonceResponse?.attributes?.fourre_tout?.data?.id;

    if (!relatedEntityId) {
      throw new Error('Related entity ID is undefined, cannot proceed with the update.');
    }

    // Update the related data depending on the category
    if (category === 'Immobilier') {
      const immobilierData = {
        type: formData.type,
        adresse: formData.adresse,
        chambre: formData.chambre,
        salon: formData.salon,
        toilette: formData.toilette,
        surface: formData.surface,
      };
      await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/immobiliers/${relatedEntityId}`, {
        data: immobilierData,
      });
    } else if (category === 'Automobile') {
      const vehiculeData = {
        type: formData.type,
        modele: formData.modele,
        marque: formData.marque,
        annee: formData.annee,
        kilometrage: formData.kilometrage,
        carburant: formData.carburant,
        boite_Vitesses: formData.boite_Vitesses,
      };
      await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/vehicules/${relatedEntityId}`, {
        data: vehiculeData,
      });
    } else if (category === 'Vêtement-Objet') {
      const objetData = {
        taille: formData.taille,
        marque: formData.marque,
        categorie: formData.categorieObjet,
      };
      await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/objets/${relatedEntityId}`, {
        data: objetData,
      });
    } else if (category === 'Matériel') {
      const materielData = {
        type: formData.type,
        marque: formData.marque,
        disponibilite: formData.disponibilite,
      };
      await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/materiels/${relatedEntityId}`, {
        data: materielData,
      });
    } else if (category === 'Fourre-tout') {
      const fourreToutData = {
        categorie: formData.categorieFourreTout,
      };
      await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/fourre-touts/${relatedEntityId}`, {
        data: fourreToutData,
      });
    }

    // Handle image upload for related entity
    const currentImages =
      annonceResponse?.attributes?.immobilier?.data?.attributes?.photo?.data ||
      annonceResponse?.attributes?.vehicule?.data?.attributes?.photo?.data ||
      annonceResponse?.attributes?.objet?.data?.attributes?.photo?.data ||
      annonceResponse?.attributes?.materiel?.data?.attributes?.photo?.data ||
      annonceResponse?.attributes?.fourre_tout?.data?.attributes?.photo?.data;

    if (newImages.length > 0 || existingImages.length !== currentImages?.length) {
      // Remove deleted images
      const imagesToRemove = currentImages?.filter((img: any) => !existingImages.includes(img.attributes.url));
      if (imagesToRemove?.length) {
        await Promise.all(
          imagesToRemove.map(async (img: any) => {
            await axios.delete(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files/${img.id}`);
          })
        );
      }

      // Upload new images
      if (newImages.length > 0) {
        const formDataObj = new FormData();
        newImages.forEach((image) => {
          formDataObj.append('files', image);
        });
        formDataObj.append('refId', relatedEntityId.toString());
        formDataObj.append(
          'ref',
          category === 'Immobilier'
            ? 'api::immobilier.immobilier'
            : category === 'Automobile'
            ? 'api::vehicule.vehicule'
            : category === 'Vêtement-Objet'
            ? 'api::objet.objet'
            : category === 'Matériel'
            ? 'api::materiel.materiel'
            : 'api::fourre-tout.fourre-tout'
        );
        formDataObj.append('field', 'photo');

        await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, formDataObj);
      }
    }

    return { success: true, message: 'Annonce updated successfully!' };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error updating annonce:', error.response);
      return { success: false, message: `Error updating annonce: ${error.response?.statusText}` };
    }
    console.error('Unexpected error:', error);
    return { success: false, message: 'An unexpected error occurred' };
  }
};

export const updateAnnonceStatut = async (id: number, statut: string): Promise<any> => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces/${id}`, {
      data: {
        Statut: statut,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating statut:', error);
    throw error;
  }
};

export const fetchLatestAnnonces = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`, {
      params: {
        sort: ['createdAt:desc'],  
        pagination: { page: 1, pageSize: 100 },  
        fields: ['title', 'ville', 'createdAt'], 
        populate: { users_permissions_user: { fields: ['username'] } },  
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching latest annonces:', error);
    throw error;
  }
};