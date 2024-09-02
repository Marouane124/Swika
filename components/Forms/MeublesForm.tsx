'use client';

import React, { ChangeEvent } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import WeekendIcon from '@mui/icons-material/Weekend';
import BathtubIcon from '@mui/icons-material/Bathtub';
import StraightenIcon from '@mui/icons-material/Straighten';

interface FormData {
  type: string;
  address: string;
  chambre: number;
  salon: number;
  toillette: number;
  surface: number;
}

interface MeublesFormProps {
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MeublesForm: React.FC<MeublesFormProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="relative">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Type :
        </label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Type de propriété"
        />
        <HomeIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Adresse :
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Adresse"
        />
        <LocationOnIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <label htmlFor="chambre" className="block text-sm font-medium text-gray-700 mb-1">
          Chambre :
        </label>
        <input
          type="number"
          id="chambre"
          name="chambre"
          value={formData.chambre}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Nombre de chambres"
        />
        <HotelIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <label htmlFor="salon" className="block text-sm font-medium text-gray-700 mb-1">
          Salon :
        </label>
        <input
          type="number"
          id="salon"
          name="salon"
          value={formData.salon}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Nombre de salons"
        />
        <WeekendIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <label htmlFor="toillette" className="block text-sm font-medium text-gray-700 mb-1">
          Toilette :
        </label>
        <input
          type="number"
          id="toillette"
          name="toillette"
          value={formData.toillette}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Nombre de toilettes"
        />
        <BathtubIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <label htmlFor="surface" className="block text-sm font-medium text-gray-700 mb-1">
          Surface (m²) :
        </label>
        <input
          type="number"
          id="surface"
          name="surface"
          value={formData.surface}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Surface en m²"
        />
        <StraightenIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default MeublesForm;
