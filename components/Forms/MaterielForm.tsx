'use client';

import React, { ChangeEvent } from 'react';
import CategoryIcon from '@mui/icons-material/Category';
import BrandIcon from '@mui/icons-material/BrandingWatermark'; 
import TypeIcon from '@mui/icons-material/Build'; 

interface FormData {
  type: string;
  marque: string;
  disponibilite: boolean;
}

interface MaterielFormProps {
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  materielOptions: any;
}

const MaterielForm: React.FC<MaterielFormProps> = ({ formData, handleInputChange, materielOptions }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="relative">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Type :
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Sélectionnez un type</option>
          {materielOptions.type.map((type: string) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <TypeIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
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
          {materielOptions.marque.map((marque: string) => (
            <option key={marque} value={marque}>
              {marque}
            </option>
          ))}
        </select>
        <BrandIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <label htmlFor="disponibilite" className="block text-sm font-medium text-gray-700 mb-1">
          Disponibilité :
        </label>
        <input
          type="checkbox"
          id="disponibilite"
          name="disponibilite"
          checked={formData.disponibilite}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <CategoryIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default MaterielForm;
