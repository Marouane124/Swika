import React, { useState, useEffect } from "react";
import { fetchAnnoncesByCategory } from "@/actions/annonce-actions";
import { Annonce } from "@/types/types";
import AnnonceCard from "@/components/HomePage/HomeAnnonceCard";
import Loading from "@/components/Loading";
import Link from "next/link";

interface CategoriesTabsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoriesTabs: React.FC<CategoriesTabsProps> = ({ selectedCategory, onSelectCategory }) => (
  <div className="flex space-x-4 justify-center mb-8">
    {["Automobile", "Immobilier", "Vente d'occasion", "Fourre-tout"].map((category) => (
      <button
        key={category}
        className={`py-2 px-4 border rounded-full ${
          selectedCategory === category ? "text-white bg-orange-500" : "text-black bg-white"
        } ${selectedCategory === category ? "border-none" : "border-gray-400"}`}
        onClick={() => onSelectCategory(category)}
        style={{
          borderColor: selectedCategory === category ? "transparent" : "#e0e0e0",
          backgroundColor: selectedCategory === category ? "#FFDAD4" : "white",
          color: selectedCategory === category ? "#000" : "black",
          padding: "6px 16px",
          fontSize: "14px",
        }}
      >
        {category}
      </button>
    ))}
  </div>
);

const AnnonceRecentes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Automobile");
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnnonces = async () => {
      setLoading(true);
      const data = await fetchAnnoncesByCategory(selectedCategory);
      setAnnonces(data);
      setLoading(false);
    };

    loadAnnonces();
  }, [selectedCategory]);

  return (
    <div className="px-8 py-10 bg-white">
      <div className="flex justify-center mb-8">
        <div className="relative inline-block">
          <h2 className="text-3xl font-bold text-black relative z-10">
            Annonces récentes
          </h2>
          <span className="absolute left-0 right-0 mx-auto bottom-0 w-full h-3 bg-[#FFDAD4] z-0"></span>
        </div>
      </div>
      <CategoriesTabs selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-3 gap-8 mx-10 px-10">
          {annonces.map((annonce) => (
            <AnnonceCard key={annonce.id} id={annonce.id} annonce={annonce.attributes} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <Link
          href={`/annonces?category=${selectedCategory}`}
          className="py-2 px-6 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition-transform transform hover:scale-105"
        >
          Voir tout
        </Link>
      </div>
    </div>
  );
};

export default AnnonceRecentes;
  