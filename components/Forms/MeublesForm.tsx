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
    <>
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type :
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Type de propriété"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <HomeIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Adresse :
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Adresse"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <LocationOnIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="chambre" className="block text-sm font-medium text-gray-700">
          Chambre :
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            id="chambre"
            name="chambre"
            value={formData.chambre}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Nombre de chambres"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <HotelIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="salon" className="block text-sm font-medium text-gray-700">
          Salon :
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            id="salon"
            name="salon"
            value={formData.salon}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Nombre de salons"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <WeekendIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="toillette" className="block text-sm font-medium text-gray-700">
          Toilette :
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            id="toillette"
            name="toillette"
            value={formData.toillette}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Nombre de toilettes"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <BathtubIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="surface" className="block text-sm font-medium text-gray-700">
          Surface (m²) :
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            id="surface"
            name="surface"
            value={formData.surface}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Surface en m²"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <StraightenIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MeublesForm;