import React, { ChangeEvent } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import WeekendIcon from '@mui/icons-material/Weekend';
import BathtubIcon from '@mui/icons-material/Bathtub';
import StraightenIcon from '@mui/icons-material/Straighten';

interface FormData {
  type: string;
  adresse: string;
  chambre: number;
  salon: number;
  toilette: number;
  surface: number;
}

interface ImmobilierFormProps {
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  secteurOptions: string[] | undefined; // secteurOptions should be an array or undefined
  immobilierOptions: any;
}

const ImmobilierForm: React.FC<ImmobilierFormProps> = ({ formData, handleInputChange, secteurOptions = [], immobilierOptions }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Adresse (Secteur) Field */}
      <div className="relative">
        <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">
          Adresse (Secteur) :
        </label>
        <select
          id="adresse"
          name="adresse"
          value={formData.adresse}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Sélectionnez un secteur</option>
          {secteurOptions?.map((secteur) => (
            <option key={secteur} value={secteur}>
              {secteur}
            </option>
          ))}
        </select>
        <LocationOnIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Type Field */}
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
          {Array.isArray(immobilierOptions.type) &&
            immobilierOptions.type.map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
        <HomeIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Chambre Field */}
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

      {/* Salon Field */}
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

      {/* Toilette Field */}
      <div className="relative">
        <label htmlFor="toilette" className="block text-sm font-medium text-gray-700 mb-1">
          Toilette :
        </label>
        <input
          type="number"
          id="toilette"
          name="toilette"
          value={formData.toilette}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Nombre de toilettes"
        />
        <BathtubIcon className="absolute left-3 top-[67%] transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Surface Field */}
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

export default ImmobilierForm;
