import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import { Annonce } from "@/types/types";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

interface UserCardProps {
  annonce: Annonce;
  strapiURL: string;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ annonce, strapiURL, onDelete }) => {
  const immobilierPhotos = annonce.attributes.immobilier?.data?.attributes?.photo?.data || [];
  const vehiculePhotos = annonce.attributes.vehicule?.data?.attributes?.photo?.data || [];

  const immobilierPhotoUrl = immobilierPhotos.length > 0 ? `${strapiURL}${immobilierPhotos[0].attributes.url}` : null;
  const vehiculePhotoUrl = vehiculePhotos.length > 0 ? `${strapiURL}${vehiculePhotos[0].attributes.url}` : null;

  const imageUrl = immobilierPhotoUrl || vehiculePhotoUrl || Logo;
  const photoCount = immobilierPhotos.length > 0 ? immobilierPhotos.length : vehiculePhotos.length;

  // Date logic
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
    if (annonce.attributes.category === "Automobile" && annonce.attributes.vehicule?.data) {
      const { marque, modele } = annonce.attributes.vehicule.data.attributes || {};
      return (
        <p className="text-gray-600 text-sm flex items-center">
          <DirectionsCarIcon className="mr-1" />
          {`${marque || "Marque inconnue"} - ${modele || "Modèle inconnu"}`}
        </p>
      );
    } else if (annonce.attributes.category === "Immobilier" && annonce.attributes.immobilier?.data) {
      const { type, surface } = annonce.attributes.immobilier.data.attributes || {};
      return (
        <p className="text-gray-600 text-sm flex items-center">
          <HomeIcon className="mr-1" />
          {`${type || "Type inconnu"}, ${surface || 0} m²`}
        </p>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-shadow hover:shadow-slate-500 relative">
      <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
        {formattedDate}
      </div>
      <div className="relative">
        <Image
          src={imageUrl}
          alt={annonce.attributes.title}
          width={400}
          height={250}
          className="object-cover w-full h-56"
        />
        {photoCount > 0 && (
          <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded flex items-center z-10">
            <CameraAltIcon fontSize="small" className="mr-1" />
            {photoCount}
          </div>
        )}
      </div>
      <div className="p-4">
        <Tooltip title={annonce.attributes.title} arrow>
          <h2 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-1">
            {annonce.attributes.title}
          </h2>
        </Tooltip>
        {renderCategorySpecificInfo()}
        <p className="text-sm text-gray-500 mt-2">Statut: {annonce.attributes.Statut}</p>
        <p className="text-sm text-gray-500">Ville: {annonce.attributes.ville}</p>
        <div className="flex items-center justify-between mt-4">
          <Link href={`/annonce/${annonce.id}`}>
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer">Voir les détails</div>
          </Link>
          <div className="flex space-x-2">
            <Link href={`/modifier-annonce/${annonce.id}`}>
              <Tooltip title="Modifier" arrow>
                <EditIcon className="text-yellow-600 hover:text-yellow-800 cursor-pointer" />
              </Tooltip>
            </Link>
            <Tooltip title="Supprimer" arrow>
              <DeleteIcon
                className="text-red-600 hover:text-red-800 cursor-pointer"
                onClick={() => onDelete(annonce.id)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
