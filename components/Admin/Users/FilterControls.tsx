import React from 'react';

interface FilterControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex justify-between mb-5 text-sm">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher par nom..."
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
    </div>
  );
};

export default FilterControls;
