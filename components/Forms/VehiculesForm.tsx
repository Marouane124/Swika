'use client';

import React, { ChangeEvent } from 'react';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import MopedIcon from '@mui/icons-material/Moped';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SpeedIcon from '@mui/icons-material/Speed';

interface FormData {
  type: string;
  modele: string;
  marque: string;
  annee: number;
  kilometrage: number;
}

interface VehiculesFormProps {
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const VehiculesForm: React.FC<VehiculesFormProps> = ({ formData, handleInputChange }) => {
  return (
    <>
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type :
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Sélectionnez un type</option>
            <option value="Voiture">Voiture</option>
            <option value="Vélo">Vélo</option>
            <option value="Moto">Moto</option>
          </select>
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <DriveEtaIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="modele" className="block text-sm font-medium text-gray-700">
          Modèle :
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            id="modele"
            name="modele"
            value={formData.modele}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Modèle du véhicule"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <DirectionsBikeIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="marque" className="block text-sm font-medium text-gray-700">
          Marque :
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            id="marque"
            name="marque"
            value={formData.marque}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Marque du véhicule"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <MopedIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="annee" className="block text-sm font-medium text-gray-700">
          Année :
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            id="annee"
            name="annee"
            value={formData.annee}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Année de fabrication"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <CalendarTodayIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="kilometrage" className="block text-sm font-medium text-gray-700">
          Kilométrage :
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            id="kilometrage"
            name="kilometrage"
            value={formData.kilometrage}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Kilométrage"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <SpeedIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VehiculesForm;
