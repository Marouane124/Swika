"use client";

import React from 'react';

const Step1 = ({ formData, setFormData }) => {
  return (
    <div>
      <h2>Étape 1: Informations de base</h2>
      <div>
        <label>
          Titre:
          <input
            type="text"
            placeholder="Titre"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Catégorie:
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="immobilier">Immobilier</option>
            <option value="automobile">Automobile</option>
            <option value="electronique">Électronique</option>
            <option value="mobilier">Mobilier</option>
            <option value="vêtements">Vêtements</option>
            <option value="location">Location d'objets</option>
            <option value="divers">Divers</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Prix:
          <input
            type="number"
            placeholder="Prix"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
};

export default Step1;
