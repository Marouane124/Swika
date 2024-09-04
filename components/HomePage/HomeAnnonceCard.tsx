'use client';

import React from "react";
import { AnnonceAttributes } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventIcon from "@mui/icons-material/Event";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KingBedIcon from "@mui/icons-material/KingBed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import BuildIcon from "@mui/icons-material/Build";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Logo from "@/public/Logo.png";
import Tooltip from "@mui/material/Tooltip";
import CheckroomIcon from '@mui/icons-material/Checkroom';

const AnnonceCard = ({ annonce, id }: { annonce: AnnonceAttributes, id: number }) => {
  const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const immobilierPhotos = annonce.immobilier?.data?.attributes?.photo?.data || [];
  const vehiculePhotos = annonce.vehicule?.data?.attributes?.photo?.data || [];
  const objetPhotos = annonce.objet?.data?.attributes?.photo?.data || [];
  const materielPhotos = annonce.materiel?.data?.attributes?.photo?.data || [];
  const fourreToutPhotos = annonce.fourre_tout?.data?.attributes?.photo?.data || [];

  const immobilierPhotoUrl = immobilierPhotos.length > 0 ? `${strapiURL}${immobilierPhotos[0].attributes.url}` : null;
  const vehiculePhotoUrl = vehiculePhotos.length > 0 ? `${strapiURL}${vehiculePhotos[0].attributes.url}` : null;
  const objetPhotoUrl = objetPhotos.length > 0 ? `${strapiURL}${objetPhotos[0].attributes.url}` : null;
  const materielPhotoUrl = materielPhotos.length > 0 ? `${strapiURL}${materielPhotos[0].attributes.url}` : null;
  const fourreToutPhotoUrl = fourreToutPhotos.length > 0 ? `${strapiURL}${fourreToutPhotos[0].attributes.url}` : null;

  const imageUrl = immobilierPhotoUrl || vehiculePhotoUrl || objetPhotoUrl || materielPhotoUrl || fourreToutPhotoUrl || Logo;
  const photoCount = immobilierPhotos.length + vehiculePhotos.length + objetPhotos.length + materielPhotos.length + fourreToutPhotos.length;

  // Date logic
  const createdAt = new Date(annonce.createdAt);
  const now = new Date();

  const isToday = createdAt.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = createdAt.toDateString() === yesterday.toDateString();

  const getTimeDifference = (date1: Date, date2: Date) => {
    const diffInMs = Math.abs(date2.getTime() - date1.getTime());
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInMinutes < 60) {
      return `il y a ${diffInMinutes} minutes`;
    } else {
      return `il y a ${diffInHours} heures`;
    }
  };

  const formattedDate = isToday
    ? getTimeDifference(createdAt, now)
    : isYesterday
    ? `Hier à ${createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
    : createdAt.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

  const renderCategorySpecificInfo = () => {
    if (annonce.category === "Automobile" && annonce.vehicule?.data) {
      const { modele, marque, annee, kilometrage } = annonce.vehicule.data.attributes || {};
      return (
        <>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm flex items-center">
              <DirectionsCarIcon className="mr-1" />
              {marque || "Marque inconnue"} - {modele || "Modèle inconnu"}
            </p>
          </div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm flex items-center">
              <EventIcon className="mr-1" />
              {annee || "Année inconnue"}
            </p>
          </div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm flex items-center">
              <AvTimerIcon className="mr-1" />
              {kilometrage || "Kilométrage inconnu"} km
            </p>
          </div>
        </>
      );
    } else if (annonce.category === "Immobilier" && annonce.immobilier?.data) {
      const { type, adresse, chambre, salon, toilette, surface } = annonce.immobilier.data.attributes || {};
      return (
        <>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm flex items-center">
              <HomeIcon className="mr-1" />
              {type || "Type inconnu"}
            </p>
          </div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm flex items-center">
              <LocationOnIcon className="mr-1" />
              {adresse || "Adresse inconnue"}
            </p>
          </div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm flex items-center">
              <KingBedIcon className="mr-1" />
              {chambre || 0} Chambres - {salon || 0} Salons - {toilette || 0} Toilettes
            </p>
          </div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm flex items-center">
              <SquareFootIcon className="mr-1" />
              {surface || 0} m²
            </p>
          </div>
        </>
      );
    } else if (annonce.category === "Vêtement-Objet" && annonce.objet?.data) {
      const { marque, taille, categorie } = annonce.objet.data.attributes || {};
      return (
        <>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm flex items-center">
              <LocalMallIcon className="mr-1" />
              {categorie || "Catégorie inconnue"}
            </p>
          </div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm flex items-center">
              <CheckroomIcon className="mr-1" />
              {taille ? `Taille: ${taille}` : "Taille inconnue"} - {marque || "Marque inconnue"}
            </p>
          </div>
        </>
      );
    } else if (annonce.category === "Matériel" && annonce.materiel?.data) {
      const { type, marque } = annonce.materiel.data.attributes || {};
      return (
        <>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm flex items-center">
              <BuildIcon className="mr-1" />
              {type || "Type inconnu"}
            </p>
          </div>
          <div className="flex items-center mb-1">
            <p className="text-gray-600 text-sm flex items-center">
              {marque || "Marque inconnue"}
            </p>
          </div>
        </>
      );
    } else if (annonce.category === "Fourre-tout" && annonce.fourre_tout?.data) {  
      const { categorie } = annonce.fourre_tout.data.attributes || {};  
      return (
        <div className="flex items-center mb-1">
          <p className="text-gray-600 text-sm flex items-center">
            <ListAltIcon className="mr-1" />
            {categorie || "Catégorie inconnue"}
          </p>
        </div>
      );
    } else {
      return <p className="text-gray-600 text-sm">Il n&apos;y a pas de détails pour cette annonce.</p>;
    }
  };

  return (
    <Link href={`/annonce/${id}`} passHref>
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col relative hover:shadow-gray-400 cursor-pointer border border-gray-300 h-full"> 
        <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
          {formattedDate}
        </div>
        <div className="relative flex-shrink-0 rounded-md overflow-hidden">
          <Image
            width={300}
            height={200}
            src={imageUrl}
            alt={annonce.title}
            priority={true}
            className="w-full h-48 object-scale-down"
          />
          {photoCount > 0 && (
            <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded flex items-center z-10">
              <CameraAltIcon fontSize="small" className="mr-1" />
              {photoCount}
            </div>
          )}
        </div>
        <div className="flex-grow flex flex-col justify-between mt-2">
          <Tooltip title={annonce.title} arrow>
            <h3 className="text-gray-900 text-lg font-bold mb-1 line-clamp-1">
              {annonce.title}
            </h3>
          </Tooltip>
          {renderCategorySpecificInfo()}
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-500 text-sm flex items-center">
              <LocationOnIcon className="mr-1" />
              {annonce.ville}
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              {annonce.price.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnnonceCard;
