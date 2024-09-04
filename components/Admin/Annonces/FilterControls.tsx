import React, { useState } from 'react';
import { TextField, Select, MenuItem, IconButton, FormControl, InputLabel } from '@mui/material';
import { Close, Search } from '@mui/icons-material';

interface FilterControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedStatut: string | null;
  setSelectedStatut: (statut: string | null) => void;
  handleSearchSubmit: () => void; // Callback to trigger search
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatut,
  setSelectedStatut,
  handleSearchSubmit,
}) => {
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchQuery(event.target.value);
  };

  const triggerSearch = () => {
    setSearchQuery(tempSearchQuery);
    handleSearchSubmit();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <div className="flex justify-between mb-5 text-sm">
      {/* Search by Title */}
      <TextField
        variant="outlined"
        placeholder="Rechercher par titre..."
        value={tempSearchQuery}
        onChange={handleSearchInputChange}
        onKeyDown={handleKeyDown}
        sx={{ width: '20%', backgroundColor: '#fff' }}
        InputProps={{
          endAdornment: (
            <>
              {tempSearchQuery && (
                <IconButton onClick={() => setTempSearchQuery('')}>
                  <Close />
                </IconButton>
              )}
              <IconButton onClick={triggerSearch}>
                <Search />
              </IconButton>
            </>
          ),
        }}
      />

      <div className="flex space-x-2">
        {/* Filter by Category */}
        <FormControl variant="outlined" sx={{ minWidth: 150, backgroundColor: '#fff' }}>
          <InputLabel>Catégorie</InputLabel>
          <Select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            label="Catégorie"
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem value="">Toutes les catégories</MenuItem>
            <MenuItem value="Automobile">Automobile</MenuItem>
            <MenuItem value="Immobilier">Immobilier</MenuItem>
            <MenuItem value="Vêtement-Objet">Vêtements et objets de la maison</MenuItem>
            <MenuItem value="Matériel">Location de matériels</MenuItem>
            <MenuItem value="Fourre-tout">Fourre-tout</MenuItem>
          </Select>
        </FormControl>

        {/* Filter by Statut */}
        <FormControl variant="outlined" sx={{ minWidth: 150, backgroundColor: '#fff' }}>
          <InputLabel>Statut</InputLabel>
          <Select
            value={selectedStatut || ''}
            onChange={(e) => setSelectedStatut(e.target.value || null)}
            label="Statut"
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem value="">Tous les statuts</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Dans la modération">Dans la modération</MenuItem>
            <MenuItem value="Rejetée">Rejetée</MenuItem>
            <MenuItem value="Désactivée">Désactivée</MenuItem>
            <MenuItem value="Supprimées">Supprimées</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterControls;
