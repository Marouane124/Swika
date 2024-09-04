'use client';

import React, { ChangeEvent } from 'react';
import CategoryIcon from '@mui/icons-material/Category';

interface FormData {
  categorieFourreTout: string;
}

interface FourreToutFormProps {
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  fourreToutOptions: any;
}

const FourreToutForm: React.FC<FourreToutFormProps> = ({ formData, handleInputChange, fourreToutOptions }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="relative">
        <label htmlFor="categorieFourreTout" className="block text-sm font-medium text-gray-700 mb-1">
          Catégorie Fourre-tout:
        </label>
        <select
          id="categorieFourreTout"
          name="categorieFourreTout"
          value={formData.categorieFourreTout}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Sélectionnez une catégorie</option>
          {fourreToutOptions.categorie.map((categorie: string) => (
            <option key={categorie} value={categorie}>
              {categorie}
            </option>
          ))}
        </select>
        <CategoryIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default FourreToutForm;
