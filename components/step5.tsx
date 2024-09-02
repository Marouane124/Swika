"use client";

import React from 'react';

const Step5 = ({ formData, setFormData }) => {
  return (
    <div>
      <h2>Étape 5: Pays</h2>
      <select
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
      >
        <option value="">Sélectionner un pays</option>
        <option value="france">France</option>
        <option value="maroc">Maroc</option>
        <option value="canada">Canada</option>
        {/* Ajoute d'autres options selon les besoins */}
      </select>
    </div>
  );
};

export default Step5;
