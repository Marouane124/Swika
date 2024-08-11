import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CategoriesSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = 240;
      if (direction === "left") {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="bg-gray-200 py-10 relative">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Explorez les Catégories</h2>
        <div className="relative flex items-center">
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 z-10 p-2 bg-white shadow-lg rounded-full"
          >
            <ArrowBackIosIcon sx={{ color: 'black' }} />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden py-4 px-2 scroll-smooth"
          >
            <Link href="/category/immobilier">
              <div className="relative bg-white shadow-lg rounded-lg text-center w-64 flex-shrink-0 overflow-hidden">
                <Image
                  src="/immobilier.jpg"
                  alt="Immobilier"
                  width={256}
                  height={160}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">Ventes immobilier</h3>
                </div>
              </div>
            </Link>

            <Link href="/category/vehicles">
              <div className="relative bg-white shadow-lg rounded-lg text-center w-64 flex-shrink-0 overflow-hidden">
                <Image
                  src="/Vehicule.jpg"
                  alt="Véhicules"
                  width={256}
                  height={160}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">Voitures</h3>
                </div>
              </div>
            </Link>

            <Link href="/category/vehicles">
              <div className="relative bg-white shadow-lg rounded-lg text-center w-64 flex-shrink-0 overflow-hidden">
                <Image
                  src="/Vehicule.jpg"
                  alt="Véhicules"
                  width={256}
                  height={160}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">Voitures</h3>
                </div>
              </div>
            </Link>
            <Link href="/category/vehicles">
              <div className="relative bg-white shadow-lg rounded-lg text-center w-64 flex-shrink-0 overflow-hidden">
                <Image
                  src="/Vehicule.jpg"
                  alt="Véhicules"
                  width={256}
                  height={160}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">Voitures</h3>
                </div>
              </div>
            </Link>
            <Link href="/category/vehicles">
              <div className="relative bg-white shadow-lg rounded-lg text-center w-64 flex-shrink-0 overflow-hidden">
                <Image
                  src="/Vehicule.jpg"
                  alt="Véhicules"
                  width={256}
                  height={160}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">Voitures</h3>
                </div>
              </div>
            </Link>
            <Link href="/category/vehicles">
              <div className="relative bg-white shadow-lg rounded-lg text-center w-64 flex-shrink-0 overflow-hidden">
                <Image
                  src="/Vehicule.jpg"
                  alt="Véhicules"
                  width={256}
                  height={160}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">Voitures</h3>
                </div>
              </div>
            </Link>
            <Link href="/category/vehicles">
              <div className="relative bg-white shadow-lg rounded-lg text-center w-64 flex-shrink-0 overflow-hidden">
                <Image
                  src="/Vehicule.jpg"
                  alt="Véhicules"
                  width={256}
                  height={160}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">Voitures</h3>
                </div>
              </div>
            </Link>
            <Link href="/category/vehicles">
              <div className="relative bg-white shadow-lg rounded-lg text-center w-64 flex-shrink-0 overflow-hidden">
                <Image
                  src="/Vehicule.jpg"
                  alt="Véhicules"
                  width={256}
                  height={160}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">Voitures</h3>
                </div>
              </div>
            </Link>
            
          </div>
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 z-10 p-2 bg-white shadow-lg rounded-full"
          >
            <ArrowForwardIosIcon sx={{ color: 'black' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
