import React from 'react';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { AnnonceAttributes } from '@/types/types';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const AnnonceCard = ({ annonce }: { annonce: AnnonceAttributes }) => {
  console.log('Annonce:', annonce);

  const immobilierPhotos = annonce.immobilier?.data?.attributes?.photo?.data || [];
  const vehiculePhotos = annonce.vehicule?.data?.attributes?.photo?.data || [];

  const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const immobilierPhotoUrl = immobilierPhotos.length > 0 ? `${strapiURL}${immobilierPhotos[0].attributes.url}` : null;
  const vehiculePhotoUrl = vehiculePhotos.length > 0 ? `${strapiURL}${vehiculePhotos[0].attributes.url}` : null;

  console.log('Immobilier Photo URL:', immobilierPhotoUrl);
  console.log('Vehicule Photo URL:', vehiculePhotoUrl);

  const imageUrl = immobilierPhotoUrl || vehiculePhotoUrl || Logo.src;
  const photoCount = immobilierPhotos.length > 0 ? immobilierPhotos.length : vehiculePhotos.length;

  console.log('Image URL:', imageUrl);

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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-xs h-180 flex flex-col relative hover:shadow-gray-400 cursor-pointer">
      <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
        {formattedDate}
      </div>
      <div className="relative flex-shrink-0 z-0">
        <Image
          width={300}
          height={300}
          src={imageUrl}
          alt={annonce.title}
          className="w-full h-40 object-cover mb-4"
        />
        {photoCount > 0 && (
          <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded flex items-center z-10">
            <CameraAltIcon fontSize="small" className="mr-1" />
            {photoCount}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h2 className="text-gray-900 text-xl font-bold mb-2">{annonce.title}</h2>
        <p className="text-gray-700 mb-2 line-clamp-3">{annonce.description}</p>
        <p className="text-gray-500 mb-4">Location: {annonce.location}</p>
      </div>
      <div className="flex-shrink-0">
        <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          Voir les détails
        </button>
      </div>
    </div>
  );
};

export default AnnonceCard;
