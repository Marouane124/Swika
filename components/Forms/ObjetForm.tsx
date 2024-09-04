'use client';

import React, { ChangeEvent } from 'react';
import CategoryIcon from '@mui/icons-material/Category';
import StraightenIcon from '@mui/icons-material/Straighten';
import BrandIcon from '@mui/icons-material/BrandingWatermark'; 

interface FormData {
  taille: string;
  categorieObjet: string;
  marque: string;
}

interface ObjetFormProps {
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  objetOptions: any;
}

const ObjetForm: React.FC<ObjetFormProps> = ({ formData, handleInputChange, objetOptions }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="relative">
        <label htmlFor="taille" className="block text-sm font-medium text-gray-700 mb-1">
          Taille :
        </label>
        <input
          type="text"
          id="taille"
          name="taille"
          value={formData.taille}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Taille de l'objet"
        />
        <StraightenIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <label htmlFor="categorieObjet" className="block text-sm font-medium text-gray-700 mb-1">
          Catégorie :
        </label>
        <select
          id="categorieObjet"
          name="categorieObjet"
          value={formData.categorieObjet}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Sélectionnez une catégorie</option>
          {objetOptions.categorie.map((categorie: string) => (
            <option key={categorie} value={categorie}>
              {categorie}
            </option>
          ))}
        </select>
        <CategoryIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <label htmlFor="marque" className="block text-sm font-medium text-gray-700 mb-1">
          Marque :
        </label>
        <select
          id="marque"
          name="marque"
          value={formData.marque}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Sélectionnez une marque</option>
          {objetOptions.marque.map((marque: string) => (
            <option key={marque} value={marque}>
              {marque}
            </option>
          ))}
        </select>
        <BrandIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default ObjetForm;
