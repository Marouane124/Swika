'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Annonce } from '@/types/types';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Footer from '../../../components/footer';
import Nav from '../../../components/Navbar';

const DetailAnnonce: React.FC = () => {
  const [annonce, setAnnonce] = useState<Annonce | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchAnnonce = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces/${id}`, {
            params: {
              populate: {
                immobilier: {
                  populate: ['photo']
                },
                vehicule: {
                  populate: ['photo']
                }
              }
            }
          });
          const fetchedAnnonce = response.data.data;
          setAnnonce(fetchedAnnonce);

          // Set the initial selected image
          const initialImage = fetchedAnnonce.attributes.immobilier?.data?.attributes?.photo?.data[0]?.attributes?.url ||
            fetchedAnnonce.attributes.vehicule?.data?.attributes?.photo?.data[0]?.attributes?.url ||
            null;
          setSelectedImage(initialImage);
        } catch (error) {
          setError('Failed to fetch annonce details.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAnnonce();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-white flex items-center justify-center">{error}</div>;
  }

  if (!annonce) {
    return <div className="min-h-screen bg-white flex items-center justify-center">No annonce found</div>;
  }

  const { title, description, price, location, updatedAt, immobilier, vehicule } = annonce.attributes;

  // Access photos based on whether immobilier or vehicule data exists
  const immobilierPhotos = immobilier?.data?.attributes?.photo?.data || [];
  const vehiculePhotos = vehicule?.data?.attributes?.photo?.data || [];

  const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  const imageUrls = immobilierPhotos.length > 0 
    ? immobilierPhotos.map(photo => photo.attributes.url)
    : vehiculePhotos.map(photo => photo.attributes.url);

  // Function to calculate relative time
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

  const formattedUpdatedAt = getRelativeTime(updatedAt);

  return (
    <div className="min-h-screen bg-gray-200 pt-16">
      <Nav />
      <div className="container mx-auto pt-20 pb-12 ">
        <Grid container spacing={2} className="flex-1 mt-10 bg-white">
          <Grid item xs={12} md={4} className="pr-4 bg-white">
            <Box className="flex flex-col items-center p-2 bg-white">
              <Avatar
                alt="Large Product Image"
                src={selectedImage ? `${strapiURL}${selectedImage}` : "https://via.placeholder.com/300?text=No+Image"}
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
                      src={`${strapiURL}${image}`}
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
              <h1 className="text-4xl font-extrabold text-[#6b46c1] mb-2">{title}</h1>

              <p className="text-gray-600 mb-3 flex items-center text-sm bg-white">
                <LocationOnIcon className="mr-1" />
                {location || 'N/A'}
                <span className="ml-4 flex items-center text-gray-500 bg-white">
                  <AccessTimeIcon className="mr-1" />
                  {formattedUpdatedAt}
                </span>
              </p>

              <p className="text-gray-900 font-bold text-2xl mb-2 bg-white">{price} DH</p>

              <p className="text-gray-700 mb-4 bg-white">{description}</p>

              {immobilier?.data && (
                <div className="mb-4 text-black bg-white">
                  <div className="flex flex-wrap mb-2">
                    <p className="w-1/2 sm:w-1/3"><strong>Type: </strong>{immobilier.data.attributes.type || 'N/A'}</p>
                    <p className="w-1/2 sm:w-1/3"><strong>Salons: </strong>{immobilier.data.attributes.salon || 'N/A'}</p>
                  </div>
                  <div className="flex flex-wrap mb-2">
                    <p className="w-1/2 sm:w-1/3"><strong>Address: </strong>{immobilier.data.attributes.adresse || 'N/A'}</p>
                    <p className="w-1/2 sm:w-1/3"><strong>Toilettes: </strong>{immobilier.data.attributes.toilette || 'N/A'}</p>
                  </div>
                  <div className="flex flex-wrap mb-2">
                  <p className="w-1/2 sm:w-1/3"><strong>Surface: </strong>{immobilier.data.attributes.surface || 'N/A'} m²</p>
                    <p className="w-1/2 sm:w-1/3"><strong>Chambres: </strong>{immobilier.data.attributes.chambre || 'N/A'}</p>
                  </div>
                </div>
              )}

              {vehicule?.data && (
                <div className="text-black bg-white">
                  <p><strong>Model: </strong>{vehicule.data.attributes.model || 'N/A'}</p>
                  <p><strong>Year: </strong>{vehicule.data.attributes.year || 'N/A'}</p>
                </div>
              )}
            </div>

            {/* Align the button to the right with right margin */}
            <div className="flex justify-end">
              <button
                className="bg-[#6b46c1] text-white px-4 py-2 rounded-lg hover:bg-[#553c9a] mr-8"
              >
                Contacter le vendeur
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default DetailAnnonce;
