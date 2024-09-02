import axios from 'axios';
import { Annonce } from '@/types/types';

// Fetch the details of a single annonce by ID
export const fetchAnnonceById = async (id: number): Promise<Annonce | null> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces/${id}`, {
      params: {
        populate: {
          users_permissions_user: true,
          vehicule: {
            populate: ['photo'],
          },
          immobilier: {
            populate: ['photo'],
          },
        },
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching annonce by ID:', error);
    return null;
  }
};

// Fetch a paginated list of annonces
export const fetchAnnonces = async (
  page: number,
  pageSize: number,
  searchQuery: string = '',
  userId?: number,
  ville?: string,
  priceRange?: { min: number; max: number },
  category?: string,
  immobilierFilters?: { chambre?: number; salon?: number; toilette?: number; surface?: number },
  vehiculeFilters?: { modele?: string; marque?: string; annee?: number; kilometrage?: number },
  status?: string 
) => {
  try {
    const filters: any = {
      title: {
        $containsi: searchQuery,
      },
    };

    if (status) {
      filters.Statut = {
        $eq: status, // Apply the status filter if provided
      };
    }

    if (userId) {
      filters.users_permissions_user = {
        id: {
          $eq: userId,
        },
      };
    }

    if (ville) {
      filters.ville = {
        $eq: ville,
      };
    }

    if (priceRange && priceRange.min != null && priceRange.max != null) {
      filters.price = {
        $between: [priceRange.min, priceRange.max],
      };
    }

    if (category) {
      filters.category = {
        $eq: category,
      };

      if (category === 'Immobilier' && immobilierFilters) {
        if (immobilierFilters.chambre != null) {
          filters['immobilier.chambre'] = { $eq: immobilierFilters.chambre };
        }
        if (immobilierFilters.salon != null) {
          filters['immobilier.salon'] = { $eq: immobilierFilters.salon };
        }
        if (immobilierFilters.toilette != null) {
          filters['immobilier.toilette'] = { $eq: immobilierFilters.toilette };
        }
        if (immobilierFilters.surface != null) {
          filters['immobilier.surface'] = { $gte: immobilierFilters.surface }; // Example: filter by minimum surface
        }
      }

      if (category === 'Automobile' && vehiculeFilters) {
        if (vehiculeFilters.modele) {
          filters['vehicule.modele'] = { $containsi: vehiculeFilters.modele };
        }
        if (vehiculeFilters.marque) {
          filters['vehicule.marque'] = { $containsi: vehiculeFilters.marque };
        }
        if (vehiculeFilters.annee != null) {
          filters['vehicule.annee'] = { $eq: vehiculeFilters.annee };
        }
        if (vehiculeFilters.kilometrage != null) {
          filters['vehicule.kilometrage'] = { $lte: vehiculeFilters.kilometrage }; // Example: filter by maximum kilometrage
        }
      }
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`, {
      params: {
        sort: ['createdAt:desc'],
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
        sort: ["createdAt:desc"],
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
    return response.data.data.map((annonce: any) => ({
      id: annonce.id,
      attributes: annonce.attributes,
    }));
  } catch (error) {
    console.error("Error fetching filtered annonces:", error);
    return [];
  }
};

// Fetch similar annonces based on the category
export const fetchSimilarAnnonces = async (category: string, title: string): Promise<Annonce[]> => {
  try {
    const keywords = title.split(' ').filter((word) => word.length > 3); // Filter out short words

    const titleFilters = keywords.map((keyword) => ({
      title: {
        $containsi: keyword, 
      },
    }));

    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`, {
      params: {
        filters: {
          category: {
            $eq: category,
          },
          $or: titleFilters, 
          Statut: {
            $eq: "Active",
          },
        },
        sort: ["createdAt:desc"],
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
          limit: 8,
        },
      },
    });

    return response.data.data
      .filter((annonce: any) => annonce.attributes.title !== title) 
      .map((annonce: any) => ({
        id: annonce.id,
        attributes: annonce.attributes,
      }));
  } catch (error) {
    console.error("Error fetching similar annonces:", error);
    return [];
  }
};