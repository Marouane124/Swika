"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { fetchAnnonces } from "@/actions/annonce-actions";
import { Annonce } from "@/types/types";
import FilterControls from "@/components/User/FilterControls";
import AnnonceCard from "@/components/AnnonceCard";
import Pagination from "@/components/Admin/Annonces/Pagination";
import SuspenseBoundary from "@/components/SuspenseBoundary";

const Annonces: React.FC = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const searchQueryParam = searchParams.get("search");

  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );
  const [searchQueryState, setSearchQuery] = useState<string>(
    searchQueryParam || ""
  );
  const [selectedMinPrice, setSelectedMinPrice] = useState<number | "">("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | "">("");
  const [selectedRooms, setSelectedRooms] = useState<number | "">("");
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | "">("");
  const [selectedSurface, setSelectedSurface] = useState<number | "">("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedKilometrage, setSelectedKilometrage] = useState<number | "">(
    ""
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 12;

  const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

  const loadAnnonces = useCallback(
    async (page: number) => {
      setLoading(true);

      try {
        const minPrice =
          typeof selectedMinPrice === "number" ? selectedMinPrice : 0;
        const maxPrice =
          typeof selectedMaxPrice === "number" ? selectedMaxPrice : 9999999999;

        const response = await fetchAnnonces(
          page,
          pageSize,
          searchQueryState,
          undefined,
          undefined,
          { min: minPrice, max: maxPrice },
          selectedCategory || undefined,
          selectedCategory === "Immobilier"
            ? {
                chambre: selectedRooms !== "" ? selectedRooms : undefined,
                salon: selectedBathrooms !== ""
                  ? selectedBathrooms
                  : undefined,
                surface: selectedSurface !== "" ? selectedSurface : undefined,
              }
            : undefined,
          selectedCategory === "Automobile"
            ? {
                modele: selectedModel || undefined,
                marque: selectedBrand || undefined,
                annee: selectedYear !== "" ? selectedYear : undefined,
                kilometrage:
                  selectedKilometrage !== "" ? selectedKilometrage : undefined,
              }
            : undefined,
          "Active"
        );

        setAnnonces(response.data);
        setTotalPages(response.meta.pagination.pageCount);
      } catch (error) {
        console.error("Error fetching annonces:", error);
      } finally {
        setLoading(false);
      }
    },
    [
      searchQueryState,
      selectedCategory,
      selectedMinPrice,
      selectedMaxPrice,
      selectedRooms,
      selectedBathrooms,
      selectedSurface,
      selectedModel,
      selectedBrand,
      selectedYear,
      selectedKilometrage,
    ]
  );

  // Fetch data whenever any filter-related state variable changes
  useEffect(() => {
    loadAnnonces(currentPage);
  }, [
    loadAnnonces,
    currentPage,
    searchQueryState,
    selectedCategory,
    selectedMinPrice,
    selectedMaxPrice,
    selectedRooms,
    selectedBathrooms,
    selectedSurface,
    selectedModel,
    selectedBrand,
    selectedYear,
    selectedKilometrage,
  ]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFiltersChange = () => {
    setCurrentPage(1); // Reset to first page
  };

  const handleSearchSubmit = () => {
    handleFiltersChange();
  };

  return (
    <SuspenseBoundary>
      <div className="bg-gray-100 flex flex-col min-h-screen">
        <Navbar />

        <div className="container mx-auto p-4 flex-grow mt-12 pt-12">
          <FilterControls
            searchQuery={searchQueryState}
            setSearchQuery={(query) => setSearchQuery(query)}
            handleSearchSubmit={handleSearchSubmit}
            selectedCategory={selectedCategory}
            setSelectedCategory={(category) => {
              setSelectedCategory(category);
              handleFiltersChange();
            }}
            selectedMinPrice={selectedMinPrice}
            setSelectedMinPrice={(price) => {
              setSelectedMinPrice(price);
              handleFiltersChange();
            }}
            selectedMaxPrice={selectedMaxPrice}
            setSelectedMaxPrice={(price) => {
              setSelectedMaxPrice(price);
              handleFiltersChange();
            }}
            selectedRooms={selectedRooms}
            setSelectedRooms={(rooms) => {
              setSelectedRooms(rooms);
              handleFiltersChange();
            }}
            selectedBathrooms={selectedBathrooms}
            setSelectedBathrooms={(bathrooms) => {
              setSelectedBathrooms(bathrooms);
              handleFiltersChange();
            }}
            selectedSurface={selectedSurface}
            setSelectedSurface={(surface) => {
              setSelectedSurface(surface);
              handleFiltersChange();
            }}
            selectedModel={selectedModel}
            setSelectedModel={(model) => {
              setSelectedModel(model);
              handleFiltersChange();
            }}
            selectedBrand={selectedBrand}
            setSelectedBrand={(brand) => {
              setSelectedBrand(brand);
              handleFiltersChange();
            }}
            selectedYear={selectedYear}
            setSelectedYear={(year) => {
              setSelectedYear(year);
              handleFiltersChange();
            }}
            selectedKilometrage={selectedKilometrage}
            setSelectedKilometrage={(kilometrage) => {
              setSelectedKilometrage(kilometrage);
              handleFiltersChange();
            }}
            handleClearFilters={() => {
              setSearchQuery("");
              setSelectedCategory(null);
              setSelectedMinPrice("");
              setSelectedMaxPrice("");
              setSelectedRooms("");
              setSelectedBathrooms("");
              setSelectedSurface("");
              setSelectedModel("");
              setSelectedBrand("");
              setSelectedYear("");
              setSelectedKilometrage("");
              handleFiltersChange();
            }}
          />

          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {annonces.map((annonce, index) => (
                  <AnnonceCard
                    key={index}
                    annonce={annonce}
                    strapiURL={strapiURL}
                  />
                ))}
              </div>

              {!loading && annonces.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  Aucune annonce trouvée.
                </div>
              )}

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handleNextPage={handleNextPage}
                  handlePreviousPage={handlePreviousPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
        <Footer />
      </div>
    </SuspenseBoundary>
  );
};

export default Annonces;
