'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the router
import Loading from '@/components/Loading';
import AnnonceTable from '@/components/Admin/Annonces/AnnonceTable';
import FilterControls from '@/components/Admin/Annonces/FilterControls';
import Pagination from '@/components/Admin/Annonces/Pagination';
import { Annonce } from '@/types/types';
import { fetchAnnonces, updateAnnonceStatut } from '@/actions/annonce-actions'; // Use the new function for updating status

const AnnoncePage: React.FC = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatut, setSelectedStatut] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 8;
  const router = useRouter(); // Use Next.js router

  // Function to load annonces with filters applied
  const loadAnnonces = async (page: number, searchQuery: string, category: string | null, statut: string | null) => {
    setLoading(true);
    try {
      const filters: any = {
        page,
        pageSize,
        searchQuery,
      };

      if (category) {
        filters.category = category;
      }

      if (statut) {
        filters.statut = statut; // Ensure 'statut' is passed correctly to the API
      }

      console.log("Filters being sent to the API:", filters); // Debugging statement

      const response = await fetchAnnonces(filters);
      setAnnonces(response.data);
      setTotalPages(response.meta.pagination.pageCount);
    } catch (error) {
      console.error('Error fetching annonces:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reload annonces when search query, category, or statut changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedStatut]);

  // Load annonces when the page or filters change
  useEffect(() => {
    loadAnnonces(currentPage, searchQuery, selectedCategory, selectedStatut);
  }, [currentPage, searchQuery, selectedCategory, selectedStatut]); // Ensure this hook updates correctly when statut changes

  // Handle approve and reload the table
  const handleApprove = async (id: number) => {
    try {
      await updateAnnonceStatut(id, 'Active');
      loadAnnonces(currentPage, searchQuery, selectedCategory, selectedStatut); // Reload after status update
    } catch (error) {
      console.error('Error approving annonce:', error);
    }
  };

  // Handle reject and reload the table
  const handleReject = async (id: number) => {
    try {
      await updateAnnonceStatut(id, 'Rejetée');
      loadAnnonces(currentPage, searchQuery, selectedCategory, selectedStatut); 
    } catch (error) {
      console.error('Error rejecting annonce:', error);
    }
  };

  const handleAnnonceClick = (annonce: Annonce) => {
    router.push(`/annonce/${annonce.id}`); 
  };

  return (
    <>
      <div className="flex-grow container mx-auto pt-1 px-4">
        <FilterControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatut={selectedStatut}
          setSelectedStatut={setSelectedStatut}
          handleSearchSubmit={() => loadAnnonces(1, searchQuery, selectedCategory, selectedStatut)} 
        />

        {loading ? (
          <Loading />
        ) : (
          <>
            <AnnonceTable
              annonces={annonces}
              handleAnnonceClick={handleAnnonceClick} // Pass the function to handle the click
              handleApprove={handleApprove}
              handleReject={handleReject}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handleNextPage={() => setCurrentPage(currentPage + 1)}
              handlePreviousPage={() => setCurrentPage(currentPage - 1)}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AnnoncePage;
