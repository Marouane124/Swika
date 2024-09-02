import { useState, useEffect } from "react";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { fetchAnnonces } from "@/actions/annonce-actions";
import { Annonce } from "@/types/types";

const CityProperties = () => {
  const [showAllCities, setShowAllCities] = useState(false);
  const [cityData, setCityData] = useState<{ name: string; properties: number }[]>([]);

  useEffect(() => {
    const loadAnnonces = async () => {
      const annoncesData = await fetchAnnonces(1, 100); 
      const annonces: Annonce[] = annoncesData.data;

      const cityCount: { [key: string]: number } = {};

      annonces.forEach((annonce) => {
        const ville = annonce.attributes.ville;
        if (ville in cityCount) {
          cityCount[ville] += 1;
        } else {
          cityCount[ville] = 1;
        }
      });

      const cities = Object.keys(cityCount).map((name) => ({
        name,
        properties: cityCount[name],
      }));

      setCityData(cities);
    };

    loadAnnonces();
  }, []);

  const initialCities = cityData.slice(0, 5);
  const extraCities = cityData.slice(5);

  return (
    <div className="relative my-8 p-6">
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto px-10">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Trouvez les 100 dernières propriétés dans ces villes
          </h2>
        </div>
        <button
          onClick={() => setShowAllCities(!showAllCities)}
          className="text-xs font-semibold text-gray-700 hover:text-gray-900 flex items-center group"
        >
          <span className="leading-none">{showAllCities ? "Voir moins" : "Voir toutes"}</span>
          <ArrowForwardIosIcon
            className="text-xs ml-1 group-hover:translate-x-1 transition-transform duration-300"
            style={{ fontSize: "12px", marginTop: "1px" }}
          />
        </button>
      </div>
      <div className="relative pt-5 max-w-7xl mx-auto flex flex-wrap justify-center">
        {/* Grille en pointillés */}
        <div className="absolute top-3 left-20 w-16 h-16 grid grid-cols-8 grid-rows-7 gap-1 z-0">
          {[...Array(56)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-[#FF471C] rounded-full"></div>
          ))}
        </div>
        <div className="flex space-x-2 z-10">
          {initialCities.map((city, index) => (
            <div
              key={index}
              className="flex items-center border border-gray-200 rounded-lg p-2 bg-white shadow-sm w-48"
            >
              <Image
                src={`/Villes/${city.name}.jpg`} 
                alt={city.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div className="ml-2">
                <h3 className="text-md font-semibold text-gray-900">
                  {city.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {city.properties} Propriétés
                </p>
              </div>
            </div>
          ))}
        </div>
        {showAllCities && (
          <div className="flex space-x-2 z-10 mt-4">
            {extraCities.map((city, index) => (
              <div
                key={index}
                className="flex items-center border border-gray-200 rounded-lg p-2 bg-white shadow-sm w-48"
              >
                <Image
                  src={`/Villes/${city.name}.jpg`} 
                  alt={city.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div className="ml-2">
                  <h3 className="text-md font-semibold text-gray-900">
                    {city.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {city.properties} Propriétés
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityProperties;
