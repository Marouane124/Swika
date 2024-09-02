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
          <option value="Voiture">Voiture</option>
          <option value="Vélo">Vélo</option>
          <option value="Moto">Moto</option>
        </select>
        <DriveEtaIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <label htmlFor="modele" className="block text-sm font-medium text-gray-700 mb-1">
          Modèle :
        </label>
        <input
          type="text"
          id="modele"
          name="modele"
          value={formData.modele}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Modèle du véhicule"
        />
        <DirectionsBikeIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <label htmlFor="marque" className="block text-sm font-medium text-gray-700 mb-1">
          Marque :
        </label>
        <input
          type="text"
          id="marque"
          name="marque"
          value={formData.marque}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Marque du véhicule"
        />
        <MopedIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <label htmlFor="annee" className="block text-sm font-medium text-gray-700 mb-1">
          Année :
        </label>
        <input
          type="number"
          id="annee"
          name="annee"
          value={formData.annee}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Année de fabrication"
        />
        <CalendarTodayIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      {formData.type !== 'Vélo' && (
        <div className="relative">
          <label htmlFor="kilometrage" className="block text-sm font-medium text-gray-700 mb-1">
            Kilométrage :
          </label>
          <input
            type="number"
            id="kilometrage"
            name="kilometrage"
            value={formData.kilometrage}
            onChange={handleInputChange}
            className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Kilométrage"
          />
          <SpeedIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default VehiculesForm;
