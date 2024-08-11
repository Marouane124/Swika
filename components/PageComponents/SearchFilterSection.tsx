import React from "react";

const SearchFilterSection: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Rechercher une annonce..."
          className="w-full md:w-1/2 h-12 px-4 mb-4 md:mb-0 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        />
        <select className="w-full md:w-1/4 h-12 px-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
          <option>Toutes les catégories</option>
          <option>Véhicules</option>
          <option>Immobilier</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilterSection;
