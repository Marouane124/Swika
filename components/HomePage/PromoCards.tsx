import Link from "next/link";
import Image from "next/image";
import CarIcon from "@/public/car-icon.png";
import HouseIcon from "@/public/house-icon.png";

const PromoCards = () => {
  return (
    <div className="flex justify-center space-x-8 py-10 my-10">
      {/* Car Search Card */}
      <div className="relative flex flex-col justify-between p-12 bg-[#F9F9F9] border border-green-400 rounded-lg w-120 shadow-sm">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            À la recherche d&apos;une nouvelle voiture?
          </h3>
          <p className="text-gray-700 mt-2">
            Trouvez votre prochaine voiture parmi notre large sélection.
          </p>
        </div>
        <Link href="/list">
          <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg">
            Voir la liste
          </button>
        </Link>
        <div className="absolute bottom-8 right-8">
          <Image src={CarIcon} alt="Car Keys" width={60} height={60} />
        </div>
      </div>

      {/* House Selling Card */}
      <div className="relative flex flex-col justify-between p-12 bg-[#FFF8F6] border border-red-400 rounded-lg w-120 shadow-sm">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Vous souhaitez vendre votre maison?
          </h3>
          <p className="text-gray-700 mt-2">
            Publiez votre annonce et trouvez un acheteur rapidement.
          </p>
        </div>
        <Link href="/creer-annonce">
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
            Publier une annonce
          </button>
        </Link>
        <div className="absolute bottom-8 right-8">
          <Image src={HouseIcon} alt="House" width={60} height={60} />
        </div>
      </div>
    </div>
  );
};

export default PromoCards;
