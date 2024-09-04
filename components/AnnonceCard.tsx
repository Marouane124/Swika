'use client';

import React from "react";
import { Annonce } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Logo from "@/public/Logo.png";
import Tooltip from "@mui/material/Tooltip";

interface AnnonceCardProps {
  annonce: Annonce;
  strapiURL: string;
}

const AnnonceCard: React.FC<AnnonceCardProps> = ({ annonce, strapiURL }) => {
  // Load images based on the category
  const immobilierPhotos = annonce.attributes.immobilier?.data?.attributes?.photo?.data || [];
  const vehiculePhotos = annonce.attributes.vehicule?.data?.attributes?.photo?.data || [];
  const objetPhotos = annonce.attributes.objet?.data?.attributes?.photo?.data || [];
  const materielPhotos = annonce.attributes.materiel?.data?.attributes?.photo?.data || [];
  const fourreToutPhotos = annonce.attributes.fourre_tout?.data?.attributes?.photo?.data || [];

  const immobilierPhotoUrl = immobilierPhotos.length > 0 ? `${strapiURL}${immobilierPhotos[0].attributes.url}` : null;
  const vehiculePhotoUrl = vehiculePhotos.length > 0 ? `${strapiURL}${vehiculePhotos[0].attributes.url}` : null;
  const objetPhotoUrl = objetPhotos.length > 0 ? `${strapiURL}${objetPhotos[0].attributes.url}` : null;
  const materielPhotoUrl = materielPhotos.length > 0 ? `${strapiURL}${materielPhotos[0].attributes.url}` : null;
  const fourreToutPhotoUrl = fourreToutPhotos.length > 0 ? `${strapiURL}${fourreToutPhotos[0].attributes.url}` : null;

  const imageUrl =
    immobilierPhotoUrl || vehiculePhotoUrl || objetPhotoUrl || materielPhotoUrl || fourreToutPhotoUrl || Logo;

  const photoCount =
    immobilierPhotos.length + vehiculePhotos.length + objetPhotos.length + materielPhotos.length + fourreToutPhotos.length;

  const createdAt = new Date(annonce.attributes.createdAt);
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
    switch (annonce.attributes.category) {
      case "Automobile":
        if (annonce.attributes.vehicule?.data) {
          const { marque, modele } = annonce.attributes.vehicule.data.attributes || {};
          return (
            <p className="text-gray-600 text-sm flex items-center">
              <DirectionsCarIcon className="mr-1" />
              {`${marque || "Marque inconnue"} - ${modele || "Modèle inconnu"}`}
            </p>
          );
        }
        break;
      case "Immobilier":
        if (annonce.attributes.immobilier?.data) {
          const { type, surface } = annonce.attributes.immobilier.data.attributes || {};
          return (
            <p className="text-gray-600 text-sm flex items-center">
              <HomeIcon className="mr-1" />
              {`${type || "Type inconnu"}, ${surface || 0} m²`}
            </p>
          );
        }
        break;
      case "Vêtement-Objet":
        if (annonce.attributes.objet?.data) {
          const { categorie, taille, marque } = annonce.attributes.objet.data.attributes || {};
          return (
            <p className="text-gray-600 text-sm flex items-center">
              <LocalMallIcon className="mr-1" />
              {`${categorie || "Catégorie inconnue"}, Taille: ${taille || "Inconnue"}, Marque: ${marque || "Inconnue"}`}
            </p>
          );
        }
        break;
      case "Matériel":
        if (annonce.attributes.materiel?.data) {
          const { type, marque } = annonce.attributes.materiel.data.attributes || {};
          return (
            <p className="text-gray-600 text-sm flex items-center">
              <BuildIcon className="mr-1" />
              {`${type || "Type inconnu"}, Marque: ${marque || "Inconnue"}`}
            </p>
          );
        }
        break;
      case "Fourre-tout":
        if (annonce.attributes.fourre_tout?.data) {
          const { categorie } = annonce.attributes.fourre_tout.data.attributes || {};
          return (
            <p className="text-gray-600 text-sm flex items-center">
              <ListAltIcon className="mr-1" />
              {`${categorie || "Catégorie inconnue"}`}
            </p>
          );
        }
        break;
      default:
        return <p className="text-gray-600 text-sm">Il n&apos;y a pas de détails pour cette annonce.</p>;
    }
  };

  return (
    <Link href={`/annonce/${annonce.id}`} passHref>
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col relative hover:shadow-gray-400 cursor-pointer border border-gray-300">
        <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
          {formattedDate}
        </div>
        <div className="relative flex-shrink-0 rounded-md overflow-hidden">
          <Image
            width={300}
            height={200}
            src={imageUrl}
            alt={annonce.attributes.title}
            priority={true}
            className="w-full h-48 object-cover"
          />
          {photoCount > 0 && (
            <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded flex items-center z-10">
              <CameraAltIcon fontSize="small" className="mr-1" />
              {photoCount}
            </div>
          )}
        </div>
        <div className="flex-grow flex flex-col justify-between mt-2">
          <Tooltip title={annonce.attributes.title} arrow>
            <h3 className="text-gray-900 text-lg font-bold mb-1 line-clamp-1">
              {annonce.attributes.title}
            </h3>
          </Tooltip>
          {renderCategorySpecificInfo()}
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-500 text-sm flex items-center">
              <LocationOnIcon className="mr-1" />
              {annonce.attributes.ville}
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              {annonce.attributes.price.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnnonceCard;
