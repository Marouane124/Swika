import React from 'react';

interface FilterControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedStatut: string | null;
  setSelectedStatut: (statut: string | null) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatut,
  setSelectedStatut,
}) => {
  return (
    <div className="flex justify-between mb-5 text-sm">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher par titre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="py-1.5 px-3 border rounded-lg bg-white text-black pr-8"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            ✕
          </button>
        )}
      </div>
      <div className="flex space-x-2">
        <select
          className="py-1.5 px-3 border rounded-lg bg-white text-black"
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          <option value="">Toutes les catégories</option>
          <option value="Automobile">Automobile</option>
          <option value="Immobilier">Immobilier</option>
          <option value="Vente d'occasion">Vente d&apos;occasion</option>
          <option value="Fourre-tout">Fourre-tout</option>
        </select>

        <select
          className="py-1.5 px-3 border rounded-lg bg-white text-black"
          value={selectedStatut || ''}
          onChange={(e) => setSelectedStatut(e.target.value || null)}
        >
          <option value="">Tous les statuts</option>
          <option value="Active">Active</option>
          <option value="Dans la modération">Dans la modération</option>
          <option value="Rejetée">Rejetée</option>
          <option value="Désactivée">Désactivée</option>
          <option value="Supprimées">Supprimées</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
