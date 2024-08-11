"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Loading from "@/components/Loading";
import { Annonce } from "@/types/types";
import { useRouter } from "next/navigation";
import axios from "axios";
import HeroSection from "@/components/PageComponents/HeroSection";
import CategoriesSection from "@/components/PageComponents/CategoriesSection";
import SearchFilterSection from "@/components/PageComponents/SearchFilterSection";
import AnnonceCard from "@/components/AnnonceCard";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Page: React.FC = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [visibleAnnonces, setVisibleAnnonces] = useState<Annonce[]>([]);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`,
          {
            params: {
              sort: ["updatedAt:desc"],
              populate: {
                immobilier: {
                  populate: ["photo"],
                },
                vehicule: {
                  populate: ["photo"],
                },
              },
            },
          }
        );
        setAnnonces(response.data.data);
        setVisibleAnnonces(response.data.data.slice(0, itemsToShow));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching annonces:", error);
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, [itemsToShow]);

  const handleClick = () => {
    router.push("/formulaireAnnonce");
  };

  const loadMore = () => {
    const nextItemsToShow = itemsToShow + 4;
    setItemsToShow(nextItemsToShow);
    setVisibleAnnonces(annonces.slice(0, nextItemsToShow));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="bg-gray-100 mb-10">Swika</div>

      <HeroSection handleClick={handleClick} />

      <CategoriesSection />

      <SearchFilterSection />

      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleAnnonces.map((annonce) => (
              <AnnonceCard key={annonce.id} annonce={annonce.attributes} />
            ))}
          </div>

          {itemsToShow < annonces.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="flex items-center px-6 py-3 text-lg font-medium transition-colors duration-300 bg-purple-600 text-white rounded-lg focus:shadow-outline hover:bg-purple-700"
              >
                Plus d&apos;annonces
                <ArrowDownwardIcon className="ml-2" />
              </button>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Page;
