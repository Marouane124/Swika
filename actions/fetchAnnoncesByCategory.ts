import axios from "axios";
import { Annonce } from "@/types/types";

export const fetchAnnoncesByCategory = async (category: string): Promise<Annonce[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`, {
      params: {
        filters: {
          category: {
            $eq: category,
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

    console.log("Response data:", response.data.data);
    return response.data.data.map((annonce: any) => ({
      id: annonce.id,  // Include the ID
      attributes: annonce.attributes
    }));
  } catch (error) {
    console.error("Error fetching filtered annonces:", error);
    return [];
  }
};
