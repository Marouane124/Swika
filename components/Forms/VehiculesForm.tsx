'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';
import { z } from 'zod';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import MopedIcon from '@mui/icons-material/Moped';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';

// Zod schema with error messages in French
const formSchema = z.object({
  type: z.string().nonempty("Le type est requis"),
  modele: z.string().nonempty("Le modèle est requis"),
  marque: z.string().nonempty("La marque est requise"),
  annee: z.string().regex(/^\d{4}$/, "L'année doit être un nombre à 4 chiffres"),
  kilometrage: z.string().optional(),
  carburant: z.string().optional(),
  boite_Vitesses: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface VehiculesFormProps {
  formData: {
    type: string;
    modele: string;
    marque: string;
    annee: string;
    kilometrage?: string;
    carburant?: string;
    boite_Vitesses?: string;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  vehicleOptions: any;
}


const VehiculesForm: React.FC<VehiculesFormProps> = ({ formData, handleInputChange, vehicleOptions }) => {
  const [availableModeles, setAvailableModeles] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (formData.marque && vehicleOptions.marque) {
      const selectedMarqueModels = vehicleOptions.marque[formData.marque]?.modele || [];
      setAvailableModeles(selectedMarqueModels);
    } else {
      setAvailableModeles([]);
    }
  }, [formData.marque, vehicleOptions.marque]);

  const isCarOrTruck = formData.type !== 'Vélos' && formData.type !== 'Motos';
  const isNotBike = formData.type !== 'Vélos';

  const validateField = (name: keyof FormData, value: any) => {
    try {
      (formSchema.shape[name] as z.ZodType<any>).parse(value);
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setValidationErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
      }
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleInputChange(e);
    validateField(name as keyof FormData, value);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Type Dropdown */}
      <div className="relative">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Type :
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleFieldChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Sélectionnez un type</option>
          {Array.isArray(vehicleOptions.type) &&
            vehicleOptions.type.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
        <DriveEtaIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
        {validationErrors.type && <p className="text-red-500 text-xs mt-1 absolute">{validationErrors.type}</p>}
      </div>

      {/* Marque Dropdown */}
      <div className="relative">
        <label htmlFor="marque" className="block text-sm font-medium text-gray-700 mb-1">
          Marque :
        </label>
        <select
          id="marque"
          name="marque"
          value={formData.marque}
          onChange={handleFieldChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Sélectionnez une marque</option>
          {vehicleOptions.marque &&
            Object.keys(vehicleOptions.marque).map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
        <MopedIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
        {validationErrors.marque && <p className="text-red-500 text-xs mt-1 absolute">{validationErrors.marque}</p>}
      </div>

      {/* Modèle Dropdown */}
      <div className="relative">
        <label htmlFor="modele" className="block text-sm font-medium text-gray-700 mb-1">
          Modèle :
        </label>
        <select
          id="modele"
          name="modele"
          value={formData.modele}
          onChange={handleFieldChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Sélectionnez un modèle</option>
          {availableModeles.map((modele: string) => (
            <option key={modele} value={modele}>
              {modele}
            </option>
          ))}
        </select>
        <DirectionsBikeIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
        {validationErrors.modele && <p className="text-red-500 text-xs mt-1 absolute">{validationErrors.modele}</p>}
      </div>

      {/* Carburant (Only for non-bikes) */}
      {isNotBike && (
        <div className="relative">
          <label htmlFor="carburant" className="block text-sm font-medium text-gray-700 mb-1">
            Carburant :
          </label>
          <select
            id="carburant"
            name="carburant"
            value={formData.carburant || ''}
            onChange={handleFieldChange}
            className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Sélectionnez un type de carburant</option>
            {Array.isArray(vehicleOptions.carburant) &&
              vehicleOptions.carburant.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <LocalGasStationIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
        </div>
      )}

      {/* Boite de Vitesses (Only for cars and trucks) */}
      {isCarOrTruck && (
        <div className="relative">
          <label htmlFor="boite_Vitesses" className="block text-sm font-medium text-gray-700 mb-1">
            Boite de vitesses :
          </label>
          <select
            id="boite_Vitesses"
            name="boite_Vitesses"
            value={formData.boite_Vitesses || ''}
            onChange={handleFieldChange}
            className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Sélectionnez un type de boite de vitesses</option>
            {Array.isArray(vehicleOptions.carburant) &&
              vehicleOptions.boite_Vitesses.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <SettingsIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
        </div>
      )}


      {/* Année */}
      <div className="relative">
        <label htmlFor="annee" className="block text-sm font-medium text-gray-700 mb-1">
          Année :
        </label>
        <input
          type="text"
          id="annee"
          name="annee"
          value={formData.annee}
          onChange={handleFieldChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Année de fabrication"
        />
        <CalendarTodayIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
        {validationErrors.annee && (
          <p className="text-red-500 text-xs mt-1 absolute left-0 top-full transform translate-y-1">{validationErrors.annee}</p>
        )}
      </div>

      {/* Kilométrage (Only for non-bikes) */}
      {isNotBike && (
        <div className="relative">
          <label htmlFor="kilometrage" className="block text-sm font-medium text-gray-700 mb-1">
            Kilométrage :
          </label>
          <input
            type="number"
            id="kilometrage"
            name="kilometrage"
            value={formData.kilometrage}
            onChange={handleFieldChange}
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
