'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import { Annonce } from '@/types/types';

interface AnnonceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAnnonce: Annonce;
  selectedImage: string | null;
  setSelectedImage: (image: string) => void;
}

const AnnonceModal: React.FC<AnnonceModalProps> = ({
  isOpen,
  onClose,
  selectedAnnonce,
  selectedImage,
  setSelectedImage,
}) => {
  if (!isOpen) return null;

  const getRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const differenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const timeUnits = [
      { unit: 'année', seconds: 60 * 60 * 24 * 365 },
      { unit: 'mois', seconds: 60 * 60 * 24 * 30 },
      { unit: 'jour', seconds: 60 * 60 * 24 },
      { unit: 'heure', seconds: 60 * 60 },
      { unit: 'minute', seconds: 60 },
      { unit: 'seconde', seconds: 1 },
    ];

    for (let { unit, seconds } of timeUnits) {
      const interval = Math.floor(differenceInSeconds / seconds);
      if (interval >= 1) {
        return interval === 1 ? `il y a ${interval} ${unit}` : `il y a ${interval} ${unit}${interval > 1 && unit !== 'mois' ? 's' : ''}`;
      }
    }

    return 'à l’instant';
  };

  const immobilierPhotos = selectedAnnonce.attributes.immobilier?.data?.attributes?.photo?.data || [];
  const vehiculePhotos = selectedAnnonce.attributes.vehicule?.data?.attributes?.photo?.data || [];
  
  const imageUrls = immobilierPhotos.length > 0 
    ? immobilierPhotos.map(photo => photo.attributes.url)
    : vehiculePhotos.map(photo => photo.attributes.url);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-4xl mx-auto p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        <div className="container mx-auto pt-4 pb-4">
          <Grid container spacing={2} className="flex-1 bg-white">
            <Grid item xs={12} md={4} className="pr-4 bg-white">
              <Box className="flex flex-col items-center p-2 bg-white">
                <Avatar
                  alt="Large Product Image"
                  src={selectedImage ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${selectedImage}` : 'https://via.placeholder.com/300?text=No+Image'}
                  className="w-80 h-80 mb-2"
                  variant="square"
                  sx={{ width: 400, height: 320, marginLeft: '50px' }}
                />
                <Box className="flex flex-row overflow-x-auto bg-white">
                  {imageUrls.map((image, index) => (
                    <IconButton
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className="p-1 mx-1 bg-white"
                    >
                      <Avatar
                        alt={`Thumbnail ${index + 1}`}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image}`}
                        className={`w-16 h-16 ${selectedImage === image ? 'ring-2 ring-purple-600' : ''}`}
                        sx={{ width: 64, height: 64, border: selectedImage === image ? '2px solid #6b46c1' : 'none' }}
                      />
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={8} className="pl-8 bg-white">
              <div className="bg-white p-6 rounded-lg shadow-2xl mb-6">
                <h1 className="text-4xl font-extrabold text-[#6b46c1] mb-2">{selectedAnnonce.attributes.title}</h1>

                <p className="text-gray-600 mb-3 flex items-center text-sm bg-white">
                  <LocationOnIcon className="mr-1" />
                  {selectedAnnonce.attributes.ville || 'N/A'}
                  <span className="ml-4 flex items-center text-gray-500 bg-white">
                    <AccessTimeIcon className="mr-1" />
                    {getRelativeTime(selectedAnnonce.attributes.updatedAt)}
                  </span>
                </p>

                <p className="text-gray-900 font-bold text-2xl mb-2 bg-white">{selectedAnnonce.attributes.price} DH</p>

                <p className="text-gray-700 mb-4 bg-white">{selectedAnnonce.attributes.description}</p>

                {selectedAnnonce.attributes.immobilier?.data && (
                  <div className="mb-4 text-black bg-white">
                    <div className="flex flex-wrap mb-2">
                      <p className="w-1/2 sm:w-1/3"><strong>Type: </strong>{selectedAnnonce.attributes.immobilier.data.attributes.type || 'N/A'}</p>
                      <p className="w-1/2 sm:w-1/3"><strong>Salons: </strong>{selectedAnnonce.attributes.immobilier.data.attributes.salon || 'N/A'}</p>
                    </div>
                    <div className="flex flex-wrap mb-2">
                      <p className="w-1/2 sm:w-1/3"><strong>Address: </strong>{selectedAnnonce.attributes.immobilier.data.attributes.adresse || 'N/A'}</p>
                      <p className="w-1/2 sm:w-1/3"><strong>Toilettes: </strong>{selectedAnnonce.attributes.immobilier.data.attributes.toilette || 'N/A'}</p>
                    </div>
                    <div className="flex flex-wrap mb-2">
                      <p className="w-1/2 sm:w-1/3"><strong>Surface: </strong>{selectedAnnonce.attributes.immobilier.data.attributes.surface || 'N/A'} m²</p>
                      <p className="w-1/2 sm:w-1/3"><strong>Chambres: </strong>{selectedAnnonce.attributes.immobilier.data.attributes.chambre || 'N/A'}</p>
                    </div>
                  </div>
                )}

                {selectedAnnonce.attributes.vehicule?.data && (
                  <div className="text-black bg-white">
                    <p><strong>Model: </strong>{selectedAnnonce.attributes.vehicule.data.attributes.modele || 'N/A'}</p>
                    <p><strong>Year: </strong>{selectedAnnonce.attributes.vehicule.data.attributes.annee || 'N/A'}</p>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AnnonceModal;
