"use client";

import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const Step4 = ({ formData, setFormData }) => {
  const handleGenderChange = (event, newGender) => {
    setFormData({ ...formData, gender: newGender });
  };

  return (
    <div>
      <h2>Étape 4: Genre</h2>
      <ToggleButtonGroup
        value={formData.gender}
        exclusive
        onChange={handleGenderChange}
        aria-label="gender"
      >
        <ToggleButton value="male" aria-label="male">
          <MaleIcon /> Homme
        </ToggleButton>
        <ToggleButton value="female" aria-label="female">
          <FemaleIcon /> Femme
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default Step4;
