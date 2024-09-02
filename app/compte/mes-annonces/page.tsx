"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { fetchAnnonces } from "@/actions/annonce-actions";
import { Annonce } from "@/types/types";
import UserFilterControls from "@/components/User/UserFilterControls";
import Pagination from "@/components/Admin/Annonces/Pagination";
import UserCard from "@/components/User/UserCard";
import Link from "next/link";

const MesAnnonces: React.FC = () => {
  const { data: session } = useSession();
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatut, setSelectedStatut] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number | "">("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | "">("");
  const [selectedRooms, setSelectedRooms] = useState<number | "">("");
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | "">("");
  const [selectedSurface, setSelectedSurface] = useState<number | "">("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedKilometrage, setSelectedKilometrage] = useState<number | "">("");

  const pageSize = 9;

  useEffect(() => {
    const loadAnnonces = async (page: number) => {
      setLoading(true);
      try {
        const minPrice = typeof selectedMinPrice === "number" ? selectedMinPrice : 0;
        const maxPrice = typeof selectedMaxPrice === "number" ? selectedMaxPrice : 9999999999;

        const response = await fetchAnnonces(
          page,
          pageSize,
          searchQuery,
          session?.user?.id,
          undefined,
          { min: minPrice, max: maxPrice },
          selectedCategory || undefined,
          selectedCategory === "Immobilier"
            ? {
                chambre: selectedRooms !== "" ? selectedRooms : undefined,
                salon: selectedBathrooms !== "" ? selectedBathrooms : undefined,
                surface: selectedSurface !== "" ? selectedSurface : undefined,
              }
            : undefined,
          selectedCategory === "Automobile"
            ? {
                modele: selectedModel || undefined,
                marque: selectedBrand || undefined,
                annee: selectedYear !== "" ? selectedYear : undefined,
                kilometrage: selectedKilometrage !== "" ? selectedKilometrage : undefined,
              }
            : undefined
        );

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

    if (session?.user?.id) {
      loadAnnonces(currentPage);
    }
  }, [
    currentPage,
    searchQuery,
    selectedCategory,
    selectedStatut,
    selectedMinPrice,
    selectedMaxPrice,
    selectedRooms,
    selectedBathrooms,
    selectedSurface,
    selectedModel,
    selectedBrand,
    selectedYear,
    selectedKilometrage,
    session,
  ]);

  const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL as string;

  const handleDelete = async (id: number) => {
    try {
      // Add logic to delete the annonce here, for example using a DELETE request to your API
      console.log(`Deleting annonce with id: ${id}`);
      
      // Optionally, remove the annonce from the state after deletion
      setAnnonces((prevAnnonces) => prevAnnonces.filter((annonce) => annonce.id !== id));
    } catch (error) {
      console.error("Error deleting annonce:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Mes Annonces</h1>
          <Link href="/creer-annonce">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer">
              Créer une nouvelle annonce
            </div>
          </Link>
        </div>

        <UserFilterControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatut={selectedStatut}
          setSelectedStatut={setSelectedStatut}
          selectedMinPrice={selectedMinPrice}
          setSelectedMinPrice={setSelectedMinPrice}
          selectedMaxPrice={selectedMaxPrice}
          setSelectedMaxPrice={setSelectedMaxPrice}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
          selectedBathrooms={selectedBathrooms}
          setSelectedBathrooms={setSelectedBathrooms}
          selectedSurface={selectedSurface}
          setSelectedSurface={setSelectedSurface}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedKilometrage={selectedKilometrage}
          setSelectedKilometrage={setSelectedKilometrage}
          handleSearchSubmit={() => setCurrentPage(1)}
        />

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-96">
            {annonces.map((annonce) => (
              <UserCard
                key={annonce.id}
                annonce={annonce}
                strapiURL={strapiURL}
                onDelete={handleDelete}
              />
            ))}
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
