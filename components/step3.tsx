"use client";

import React from 'react';

const Step3 = ({ formData, setFormData }) => {
  return (
    <div>
      <h2>Étape 3: Numéro de téléphone</h2>
      <input
        type="tel"
        placeholder="Numéro de téléphone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
    </div>
  );
};

export default Step3;
