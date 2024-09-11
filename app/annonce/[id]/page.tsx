'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Annonce } from '@/types/types';
import Grid from '@mui/material/Grid';
import Footer from '@/components/Footer';
import Nav from '@/components/Navbar';
import Loading from '@/components/Loading'; 
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { fetchAnnonceById, fetchSimilarAnnonces } from '@/actions/annonce-actions';
import AnnonceCard from '@/components/AnnonceCard';
import { Avatar } from '@mui/material';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HomeIcon from '@mui/icons-material/Home';
import RoomIcon from '@mui/icons-material/Room';
import HotelIcon from '@mui/icons-material/Hotel';
import WeekendIcon from '@mui/icons-material/Weekend';
import BathtubIcon from '@mui/icons-material/Bathtub';
import StraightenIcon from '@mui/icons-material/Straighten';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BuildIcon from '@mui/icons-material/Build';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckroomIcon from '@mui/icons-material/Checkroom';


const DetailAnnonce: React.FC = () => {
  const [annonce, setAnnonce] = useState<Annonce | null>(null);
  const [similarAnnonces, setSimilarAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAnnonceDetails = async () => {
      if (id) {
        try {
          setLoading(true);
          const fetchedAnnonce = await fetchAnnonceById(parseInt(id as string));
          if (fetchedAnnonce) {
            setAnnonce(fetchedAnnonce);
            const similarAnnonces = await fetchSimilarAnnonces(
              fetchedAnnonce.attributes.category, 
              fetchedAnnonce.attributes.title
            );
            setSimilarAnnonces(similarAnnonces);
          } else {
            setError('Failed to fetch annonce details.');
          }
        } catch (error) {
          setError('Failed to fetch annonce details.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAnnonceDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen bg-white flex items-center justify-center">{error}</div>;
  }

  if (!annonce) {
    return <div className="min-h-screen bg-white flex items-center justify-center">No annonce found</div>;
  }

  const { title, description, price, ville, updatedAt, immobilier, vehicule, etat, objet, materiel, fourre_tout } = annonce.attributes;
  const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL as string;

  // Determine which images to load based on the category
  const imageUrls: string[] = [];
  if (immobilier?.data) {
    imageUrls.push(...immobilier.data.attributes.photo.data.map((photo) => photo.attributes.url));
  } else if (vehicule?.data) {
    imageUrls.push(...vehicule.data.attributes.photo.data.map((photo) => photo.attributes.url));
  } else if (objet?.data) {
    imageUrls.push(...objet.data.attributes.photo.data.map((photo) => photo.attributes.url));
  } else if (materiel?.data) {
    imageUrls.push(...materiel.data.attributes.photo.data.map((photo) => photo.attributes.url));
  } else if (fourre_tout?.data) {
    imageUrls.push(...fourre_tout.data.attributes.photo.data.map((photo) => photo.attributes.url));
  }

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
    <div className="min-h-screen bg-gray-100 pt-8">
      <Nav />
      <div className="container mx-auto pt-20 pb-12">
        <Grid container spacing={2} className="flex-1 mt-10 bg-white">
          <Grid item xs={12} md={6} className="pr-4">
            {imageUrls.length > 0 ? (
              <Carousel 
                showArrows={true} 
                infiniteLoop={true} 
                showThumbs={false}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-75 hover:opacity-100"
                    >
                      ❮
                    </button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      className="absolute z-10 right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-75 hover:opacity-100"
                    >
                      ❯
                    </button>
                  )
                }
              >
                {imageUrls.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={`${strapiURL}${image}`}
                      alt={`Image ${index + 1}`}
                      width={800} 
                      height={600} 
                      className="object-scale-down w-full h-80 rounded-lg"
                      priority
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <Avatar
                alt="No Image Available"
                src="https://via.placeholder.com/300?text=No+Image"
                className="w-full h-80 rounded-lg"
                variant="square"
              />
            )}
          </Grid>

          <Grid item xs={12} md={6} className="pl-8">
            <div className="bg-white p-6 rounded-lg shadow-2xl mb-6">
              <h1 className="text-4xl font-extrabold text-[#FF471C] mb-2">{title}</h1>

              <p className="text-gray-600 mb-3 flex items-center text-sm">
                <LocationOnIcon className="mr-1" />
                {ville || 'N/A'}
                <span className="ml-4 flex items-center text-gray-500">
                  <AccessTimeIcon className="mr-1" />
                  {formattedUpdatedAt}
                </span>
              </p>

              <p className="text-gray-900 font-bold text-2xl mb-2">{price} DH</p>

              <p className="text-gray-700 mb-4">{description}</p>

              <p className="text-gray-700 mb-4 flex items-center">
                <SettingsIcon className="mr-1" />
                <strong>État: </strong> {etat || 'N/A'}
              </p>

              {/* Uniform structure for all categories */}
              {immobilier?.data && (
                <div className="mb-4">
                  <p className="w-full text-gray-700 mb-4 flex items-center">
                    <RoomIcon className="mr-1" />
                    <strong>Secteur: </strong> {immobilier.data.attributes.adresse || 'N/A'}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <HomeIcon className="mr-1 text-gray-700" />
                      <p className="text-gray-700"><strong>Type: </strong>{immobilier.data.attributes.type || 'N/A'}</p>
                    </div>
                    <div className="flex items-center">
                      <WeekendIcon className="mr-1 text-gray-700" />
                      <p className="text-gray-700"><strong>Salons: </strong>{immobilier.data.attributes.salon || 'N/A'}</p>
                    </div>
                    <div className="flex items-center">
                      <BathtubIcon className="mr-1 text-gray-700" />
                      <p className="text-gray-700"><strong>Toilettes: </strong>{immobilier.data.attributes.toilette || 'N/A'}</p>
                    </div>
                    <div className="flex items-center">
                      <StraightenIcon className="mr-1 text-gray-700" />
                      <p className="text-gray-700"><strong>Surface: </strong>{immobilier.data.attributes.surface || 'N/A'} m²</p>
                    </div>
                    <div className="flex items-center">
                      <HotelIcon className="mr-1 text-gray-700" />
                      <p className="text-gray-700"><strong>Chambres: </strong>{immobilier.data.attributes.chambre || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Handle Automobile, Vêtement-Objet, Matériel, Fourre-tout with uniform spacing */}
              {vehicule?.data && (
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <DirectionsCarIcon className="mr-1 text-gray-700" />
                    <p className="text-gray-700"><strong>Modèle: </strong>{vehicule.data.attributes.modele || 'N/A'}</p>
                  </div>
                  <div className="flex items-center">
                    <CalendarTodayIcon className="mr-1 text-gray-700" />
                    <p className="text-gray-700"><strong>Année: </strong>{vehicule.data.attributes.annee || 'N/A'}</p>
                  </div>
                  <div className="flex items-center">
                    <LocalGasStationIcon className="mr-1 text-gray-700" />
                    <p className="text-gray-700"><strong>Carburant: </strong>{vehicule.data.attributes.carburant || 'N/A'}</p>
                  </div>
                  <div className="flex items-center">
                    <SettingsIcon className="mr-1 text-gray-700" />
                    <p className="text-gray-700"><strong>Boîte de vitesses: </strong>{vehicule.data.attributes.boite_Vitesses || 'N/A'}</p>
                  </div>
                  <div className="flex items-center">
                    <SpeedIcon className="mr-1 text-gray-700" />
                    <p className="text-gray-700"><strong>Kilométrage: </strong>{vehicule.data.attributes.kilometrage || 'N/A'}</p>
                  </div>
                </div>
              )}

              {objet?.data && (
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <LocalMallIcon className="mr-1 text-gray-700" />
                    <p className="text-gray-700"><strong>Catégorie: </strong>{objet.data.attributes.categorie || 'N/A'}</p>
                  </div>
                  <div className="flex items-center">
                    <StraightenIcon className="mr-1 text-gray-700" />
                    <p className="text-gray-700"><strong>Taille: </strong>{objet.data.attributes.taille || 'N/A'}</p>
                  </div>
                  <div className="flex items-center">
                    <CheckroomIcon className="mr-1 text-gray-700" />
                    <p className="text-gray-700"><strong>Marque: </strong>{objet.data.attributes.marque || 'N/A'}</p>
                  </div>
                </div>
              )}

              {materiel?.data && (
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <BuildIcon className="mr-1 text-gray-700" />
                    <p className="text-gray-700"><strong>Type: </strong>{materiel.data.attributes.type || 'N/A'}</p>
                  </div>
                  <div className="flex items-center">
                    <EngineeringIcon className="mr-1 text-gray-700" />
                    <p className="text-gray-700"><strong>Marque: </strong>{materiel.data.attributes.marque || 'N/A'}</p>
                  </div>
                </div>
              )}

              {fourre_tout?.data && (
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <ListAltIcon className="mr-1 text-gray-700" />
                    <p className="text-gray-700"><strong>Catégorie: </strong>{fourre_tout.data.attributes.categorie || 'N/A'}</p>
                  </div>
                </div>
              )}

            </div>

            <div className="flex justify-end">
              <button className="bg-[#FF471C] text-white px-4 py-2 rounded-lg hover:bg-[#FF6F3C]">
                Contacter le vendeur
              </button>
            </div>
          </Grid>
        </Grid>

        {/* Similar Products Section */}
        {similarAnnonces.length > 0 && (
        <div className="mt-6 ">
          <h2 className="text-3xl font-bold text-[#FF471C] mb-4">Produits similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarAnnonces.map((similarAnnonce) => (
              <AnnonceCard 
                key={similarAnnonce.id} 
                annonce={similarAnnonce} 
                strapiURL={strapiURL} 
              />
            ))}
          </div>
        </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DetailAnnonce;
