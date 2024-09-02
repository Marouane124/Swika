"use client";

import React from 'react';

const Step2 = ({ formData, setFormData }) => {
  return (
    <div>
      <h2>Étape 2: Mot de passe</h2>
      <input
        type="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
    </div>
  );
};

export default Step2;
