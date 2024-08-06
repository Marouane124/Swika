"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Nav from '../components/nav';
import Footer from '../components/footer'; 
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Annonce } from '@/types/types';
import AnnonceCard from '../components/AnnonceCard';

const Page: React.FC = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [visibleAnnonces, setVisibleAnnonces] = useState<Annonce[]>([]);
  const [itemsToShow, setItemsToShow] = useState(4);
  const router = useRouter();

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`, {
          params: {
            sort: ['updatedAt:desc'],
            populate: '*'
          }
        });
        setAnnonces(response.data.data);
        setVisibleAnnonces(response.data.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching annonces:', error);
      }
    };

    fetchAnnonces();
  }, []);

  const handleClick = () => {
    router.push("/formulaireAnnonce");
  };

  const loadMore = () => {
    const nextItemsToShow = itemsToShow + 4;
    setItemsToShow(nextItemsToShow);
    setVisibleAnnonces(annonces.slice(0, nextItemsToShow));
  };

  return (
    <div className="min-h-screen bg-gray-200 pt-32">
      <Nav />

      <div className="text-center my-20">
        <h1 className="text-4xl font-extrabold text-gray-800">Déposer votre annonce</h1>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleClick}
            className="max-w-sm flex items-center justify-center h-12 px-4 text-lg font-medium transition-colors duration-300 bg-teal-600 text-white rounded-lg focus:shadow-outline hover:bg-teal-700"
          >
            <EditNoteIcon style={{ marginRight: "5" }}/>
            <span>Publier maintenant</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-4 mb-12">
        {visibleAnnonces.map(annonce => (
          <AnnonceCard key={annonce.id} annonce={annonce.attributes} />
        ))}
      </div>

      {itemsToShow < annonces.length && (
        <div className="flex justify-center mb-12">
          <button
            onClick={loadMore}
            className="px-3 py-2 text-lg font-medium transition-colors duration-300 bg-purple-600 text-white rounded-lg focus:shadow-outline hover:bg-purple-700"
          >
            Plus d&apos;annonces
            <ArrowDownwardIcon style={{ marginLeft: "3", marginRight: "-4" }}/>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Page;
