import React from 'react';
import { TextField } from '@mui/material';

interface VehiculeFiltersProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedYear: number | '';
  setSelectedYear: (year: number | '') => void;
  selectedKilometrage: number | '';
  setSelectedKilometrage: (kilometrage: number | '') => void;
}

const VehiculeFilters: React.FC<VehiculeFiltersProps> = ({
  selectedModel,
  setSelectedModel,
  selectedBrand,
  setSelectedBrand,
  selectedYear,
  setSelectedYear,
  selectedKilometrage,
  setSelectedKilometrage,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TextField
        variant="outlined"
        label="Modèle"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        fullWidth
        sx={{ backgroundColor: '#fff' }}
      />
      <TextField
        variant="outlined"
        label="Marque"
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        fullWidth
        sx={{ backgroundColor: '#fff' }}
      />
      <TextField
        variant="outlined"
        label="Année"
        type="number"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value, 10) : '')}
        fullWidth
        sx={{ backgroundColor: '#fff' }}
      />
      <TextField
        variant="outlined"
        label="Kilométrage"
        type="number"
        value={selectedKilometrage}
        onChange={(e) => setSelectedKilometrage(e.target.value ? parseInt(e.target.value, 10) : '')}
        fullWidth
        sx={{ backgroundColor: '#fff' }}
      />
    </div>
  );
};

export default VehiculeFilters;