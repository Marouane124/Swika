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
import Logo from "@/public/Logo.png";

const AnnonceCard = ({ annonce, id }: { annonce: AnnonceAttributes, id: number }) => {
  const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const immobilierPhotos = annonce.immobilier?.data?.attributes?.photo?.data || [];
  const vehiculePhotos = annonce.vehicule?.data?.attributes?.photo?.data || [];

  const immobilierPhotoUrl = immobilierPhotos.length > 0 ? `${strapiURL}${immobilierPhotos[0].attributes.url}` : null;
  const vehiculePhotoUrl = vehiculePhotos.length > 0 ? `${strapiURL}${vehiculePhotos[0].attributes.url}` : null;

  const imageUrl = immobilierPhotoUrl || vehiculePhotoUrl || Logo;
  const photoCount = immobilierPhotos.length > 0 ? immobilierPhotos.length : vehiculePhotos.length;

  const renderCategorySpecificInfo = () => {
    if (annonce.category === "Automobile" && annonce.vehicule?.data) {
      const { modele, marque, annee, kilometrage } = annonce.vehicule.data.attributes || {};
      return (
        <>
          <div className="flex items-center mb-2">
            <p className="text-gray-600 text-sm flex items-center">
              <DirectionsCarIcon className="mr-2" />
              {marque || "Marque inconnue"} - {modele || "Modèle inconnu"} 
            </p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-gray-600 text-sm flex items-center">
              <EventIcon className="mr-2" />
              {annee || "Année inconnue"}
            </p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-gray-600 text-sm flex items-center">
              <AvTimerIcon className="mr-2" />
              {kilometrage || "Kilométrage inconnu"} km
            </p>
          </div>
        </>
      );
    } else if (annonce.category === "Immobilier" && annonce.immobilier?.data) {
      const { type, adresse, chambre, salon, toilette, surface } = annonce.immobilier.data.attributes || {};
      return (
        <>
          <div className="flex items-center mb-2">
            <p className="text-gray-600 text-sm flex items-center">
              <HomeIcon className="mr-2" />
              {type || "Type inconnu"}
            </p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-gray-600 text-sm flex items-center">
              <LocationOnIcon className="mr-2" />
              {adresse || "Adresse inconnue"}
            </p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-gray-600 text-sm flex items-center">
              <KingBedIcon className="mr-2" />
              {chambre || 0} Chambres - {salon || 0} Salons - {toilette || 0} Toilettes
            </p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-gray-600 text-sm flex items-center">
              <SquareFootIcon className="mr-2" />
              {surface || 0} m²
            </p>
          </div>
        </>
      );
    } else {
      return <p className="text-gray-600 text-sm">Il n&apos;y a pas de détails pour cette annonce.</p>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-xs flex flex-col relative hover:shadow-gray-400 cursor-pointer h-120 border border-gray-400">
      <div className="relative flex-shrink-0 rounded-md overflow-hidden">
        <Image
          width={300}
          height={200}
          src={imageUrl}
          alt={annonce.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between mt-4">
        {photoCount > 0 && (
          <div className="absolute top-47 right-3 bg-gray-800 text-white text-xs px-2 py-1 rounded flex items-center z-10">
            <CameraAltIcon fontSize="small" className="mr-1" />
            {photoCount}
          </div>
        )}
        <h3 className="text-gray-900 text-xl font-bold mb-2">{annonce.title}</h3>
        {renderCategorySpecificInfo()}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600 text-sm flex items-center">
            <LocationOnIcon className="mr-2" />
            {annonce.location}
          </p>
          <Link href={`/detailAnnonce/${id}`}>
            <button className="py-2 px-4 bg-orange-500 text-white rounded-full text-sm">
              Voir les détails
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnonceCard;
