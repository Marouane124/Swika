import axios from 'axios';
import { Annonce } from '@/types/types';

// Fetch a paginated list of annonces
export const fetchAnnonces = async (page: number, pageSize: number, searchQuery: string = '', userId?: number) => {
  try {
    const filters: any = {
      title: {
        $containsi: searchQuery,
      },
    };

    if (userId) {
      filters.users_permissions_user = {
        id: {
          $eq: userId,
        },
      };
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`, {
      params: {
        sort: ['updatedAt:desc'],
        filters,
        populate: {
          users_permissions_user: true,
          vehicule: {
            populate: ['photo'],
          },
          immobilier: {
            populate: ['photo'],
          },
        },
        pagination: {
          page,
          pageSize,
        },
      },
    });
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching annonces:', error);
    throw error;
  }
};

// Update the status of an annonce
export const updateAnnonceStatus = async (id: number, status: string) => {
  await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces/${id}`, {
    data: { Statut: status },
  });
};

// Create a new annonce
interface FormData {
  title: string;
  description: string;
  price: number;
  ville: string;
  type: string;
  adresse?: string;
  chambre?: number;
  salon?: number;
  toilette?: number;
  surface?: number;
  modele?: string;
  marque?: string;
  annee?: number;
  kilometrage?: number;
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
    category: category,
    users_permissions_user: userId,
    Statut: "Dans la modération",
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
        annee: formData.annee,
        kilometrage: formData.kilometrage,
        annonce: annonceId,
      };

      const vehiculeResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/vehicules`, {
        data: relatedData,
      });
      relatedId = vehiculeResponse.data.data.id;
    }

    if (images.length > 0) {
      const formDataObj = new FormData();
      images.forEach((image) => {
        formDataObj.append('files', image);
      });
      formDataObj.append('refId', relatedId);
      formDataObj.append('ref', category === 'Immobilier' ? 'api::immobilier.immobilier' : 'api::vehicule.vehicule');
      formDataObj.append('field', 'photo');

      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, formDataObj);
    }

    return { success: true, message: 'Annonce saved successfully!' };

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error saving annonce:', error.response);
      return { success: false, message: `Error saving annonce: ${error.response?.statusText}` };
    } else {
      console.error('Unknown error:', error);
      return { success: false, message: 'Unknown error occurred.' };
    }
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
        sort: ["updatedAt:desc"],
        populate: {
          vehicule: {
            populate: ["photo"],
          },
          immobilier: {
            populate: ["photo"],
          },
        },
        pagination: {
          start: 0,
          limit: 6,
        },
      },
    });

    //console.log(response.data.data);
    return response.data.data.map((annonce: any) => ({
      id: annonce.id,
      attributes: annonce.attributes,
    }));
  } catch (error) {
    console.error("Error fetching filtered annonces:", error);
    return [];
  }
};
