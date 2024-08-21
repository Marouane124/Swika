"use client";

import React, { useState, useEffect } from 'react';
import Loading from '@/components/Loading';
import AnnonceTable from '@/components/Admin/Annonces/AnnonceTable';
import AnnonceModal from '@/components/Admin/Annonces/AnnonceModal';
import FilterControls from '@/components/Admin/Annonces/FilterControls';
import Pagination from '@/components/Admin/Annonces/Pagination';
import { Annonce } from '@/types/types';
import { fetchAnnonces, updateAnnonceStatus } from '@/actions/annonce-actions';

const AnnoncePage: React.FC = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatut, setSelectedStatut] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAnnonce, setSelectedAnnonce] = useState<Annonce | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 9;

  const loadAnnonces = async (page: number, searchQuery: string) => {
    setLoading(true);
    try {
      const response = await fetchAnnonces(page, pageSize, searchQuery);
      setAnnonces(response.data);
      setTotalPages(response.meta.pagination.pageCount);
    } catch (error) {
      console.error('Error fetching annonces:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnonces(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleApprove = async (id: number) => {
    try {
      await updateAnnonceStatus(id, 'Active');
      setAnnonces(annonces.map((annonce) => (annonce.id === id ? { ...annonce, attributes: { ...annonce.attributes, Statut: 'Active' } } : annonce)));
    } catch (error) {
      console.error('Error approving annonce:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await updateAnnonceStatus(id, 'Rejetée');
      setAnnonces(annonces.map((annonce) => (annonce.id === id ? { ...annonce, attributes: { ...annonce.attributes, Statut: 'Rejetée' } } : annonce)));
    } catch (error) {
      console.error('Error rejecting annonce:', error);
    }
  };

  const handleAnnonceClick = (annonce: Annonce) => {
    setSelectedAnnonce(annonce);

    const immobilierPhotos = annonce.attributes.immobilier?.data?.attributes?.photo?.data;
    const vehiculePhotos = annonce.attributes.vehicule?.data?.attributes?.photo?.data;
    
    const initialImage = immobilierPhotos?.[0]?.attributes?.url || vehiculePhotos?.[0]?.attributes?.url || null;
  
    setSelectedImage(initialImage);
    setIsModalOpen(true);
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
        />

        {loading ? (
          <Loading />
        ) : (
          <>
            <AnnonceTable 
              annonces={annonces} 
              handleAnnonceClick={handleAnnonceClick}
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

      {selectedAnnonce && isModalOpen && (
        <AnnonceModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          selectedAnnonce={selectedAnnonce}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
    </>
  );
};

export default AnnoncePage;
