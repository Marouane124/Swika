import React from 'react';
import { TextField } from '@mui/material';

interface ImmobilierFiltersProps {
  selectedRooms: number | '';
  setSelectedRooms: (rooms: number | '') => void;
  selectedBathrooms: number | '';
  setSelectedBathrooms: (bathrooms: number | '') => void;
  selectedSurface: number | '';
  setSelectedSurface: (surface: number | '') => void;
}

const ImmobilierFilters: React.FC<ImmobilierFiltersProps> = ({
  selectedRooms,
  setSelectedRooms,
  selectedBathrooms,
  setSelectedBathrooms,
  selectedSurface,
  setSelectedSurface,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TextField
        variant="outlined"
        label="Nombre de chambres"
        type="number"
        value={selectedRooms}
        onChange={(e) => setSelectedRooms(e.target.value ? parseInt(e.target.value, 10) : '')}
        fullWidth
        sx={{ backgroundColor: '#fff' }}
      />
      <TextField
        variant="outlined"
        label="Nombre de salles de bain"
        type="number"
        value={selectedBathrooms}
        onChange={(e) => setSelectedBathrooms(e.target.value ? parseInt(e.target.value, 10) : '')}
        fullWidth
        sx={{ backgroundColor: '#fff' }}
      />
      <TextField
        variant="outlined"
        label="Surface (m²)"
        type="number"
        value={selectedSurface}
        onChange={(e) => setSelectedSurface(e.target.value ? parseInt(e.target.value, 10) : '')}
        fullWidth
        sx={{ backgroundColor: '#fff' }}
      />
    </div>
  );
};

export default ImmobilierFilters;