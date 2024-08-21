"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/PageComponents/Navbar";
import Footer from "@/components/PageComponents/Footer";
import Loading from "@/components/Loading";
import { fetchAnnonces } from "@/actions/annonce-actions";
import { Annonce } from "@/types/types";
import FilterControls from "@/components/Admin/Annonces/FilterControls";
import Pagination from "@/components/Admin/Annonces/Pagination";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import Image from "next/image";

const MesAnnonces: React.FC = () => {
  const { data: session } = useSession();
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatut, setSelectedStatut] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 9;

  const loadAnnonces = async (page: number, searchQuery: string, userId: number) => {
    setLoading(true);
    try {
      const response = await fetchAnnonces(page, pageSize, searchQuery, userId);
      const filteredAnnonces = response.data.filter((annonce: Annonce) => {
        const matchesCategory = !selectedCategory || annonce.attributes.category === selectedCategory;
        const matchesStatut = !selectedStatut || annonce.attributes.Statut === selectedStatut;
        return matchesCategory && matchesStatut;
      });
      setAnnonces(filteredAnnonces);
      setTotalPages(response.meta.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching annonces:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      loadAnnonces(currentPage, searchQuery, session.user.id);
    }
  }, [currentPage, searchQuery, selectedCategory, selectedStatut, session]);

  const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 flex-grow">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Mes Annonces</h1>
          <Link href="/creer-annonce">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer">
              Créer une nouvelle annonce
            </div>
          </Link>
        </div>

        <FilterControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatut={selectedStatut}
          setSelectedStatut={setSelectedStatut}
        />

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {annonces.map((annonce) => {
              const immobilierPhotos = annonce.attributes.immobilier?.data?.attributes?.photo?.data || [];
              const vehiculePhotos = annonce.attributes.vehicule?.data?.attributes?.photo?.data || [];

              const immobilierPhotoUrl = immobilierPhotos.length > 0 ? `${strapiURL}${immobilierPhotos[0].attributes.url}` : null;
              const vehiculePhotoUrl = vehiculePhotos.length > 0 ? `${strapiURL}${vehiculePhotos[0].attributes.url}` : null;

              const imageUrl = immobilierPhotoUrl || vehiculePhotoUrl || Logo;

              return (
                <div key={annonce.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                  <Image
                    src={imageUrl}
                    alt={annonce.attributes.title}
                    width={400}
                    height={250}
                    className="object-cover w-full h-56"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{annonce.attributes.title}</h2>
                    <p className="text-gray-600 mt-2">{annonce.attributes.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Statut: {annonce.attributes.Statut}</p>
                    <p className="text-sm text-gray-500">Créé le: {new Date(annonce.attributes.createdAt).toLocaleDateString()}</p>
                    <div className="flex justify-between mt-4">
                      <Link href={`/annonce/${annonce.id}`}>
                        <div className="text-blue-600 hover:text-blue-800 cursor-pointer">Voir les détails</div>
                      </Link>
                      <div className="space-x-2">
                        <Link href={`/modifier-annonce/${annonce.id}`}>
                          <div className="text-yellow-600 hover:text-yellow-800 cursor-pointer">Modifier</div>
                        </Link>
                        <button className="text-red-600 hover:text-red-800">Supprimer</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={() => setCurrentPage(currentPage + 1)}
          handlePreviousPage={() => setCurrentPage(currentPage - 1)}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Footer />
    </div>
  );
};

export default MesAnnonces;
