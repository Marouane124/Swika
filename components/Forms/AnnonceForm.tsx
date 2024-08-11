'use client';

import React, { useState } from 'react';
import MeublesForm from '@/components/Forms/MeublesForm';
import VehiculesForm from '@/components/Forms/VehiculesForm';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';

interface AnnonceFormProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  images: File[];
  message: string;
}

const MAX_DESCRIPTION_LENGTH = 280; 

const AnnonceForm: React.FC<AnnonceFormProps> = ({
  category,
  setCategory,
  formData,
  handleInputChange,
  handleImageChange,
  handleRemoveImage,
  handleSubmit,
  images,
  message,
}) => {
  const router = useRouter();
  const [descriptionLength, setDescriptionLength] = useState(formData.description.length);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    setDescriptionLength(e.target.value.length);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 relative">
        <button className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 pt-1 pl-2">
          <ArrowBackIcon onClick={handleGoHome} />
        </button>

        <div className="flex justify-center mb-6">
          <h1 className="text-black text-2xl font-bold">Créer une annonce</h1>
        </div>

        {message && (
          <div className={`mb-4 text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Titre :
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Titre de l'annonce"
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <TitleIcon style={{ color: 'gray' }} />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description :
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleDescriptionChange}
                maxLength={MAX_DESCRIPTION_LENGTH}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-24 resize-none"
                placeholder="Description de l'annonce"
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <DescriptionIcon style={{ color: 'gray' }} />
              </div>
              <div className="absolute bottom-0 left-2 text-xs text-gray-500">
                {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Prix (MAD) :
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Prix"
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <AttachMoneyIcon style={{ color: 'gray' }} />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Localisation :
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Localisation"
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <LocationOnIcon style={{ color: 'gray' }} />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Catégorie :
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Sélectionnez une catégorie
                </option>
                <option value="Meubles">Meubles</option>
                <option value="Vehicules">Véhicules</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <CategoryIcon style={{ color: 'gray' }} />
              </div>
            </div>
          </div>

          {category === 'Meubles' && (
            <MeublesForm formData={formData} handleInputChange={handleInputChange} />
          )}
          {category === 'Vehicules' && (
            <VehiculesForm formData={formData} handleInputChange={handleInputChange} />
          )}

          <div className="mb-4">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Images :
            </label>
            <label
              htmlFor="images"
              className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
            >
              Sélectionner des images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="mt-2 flex flex-wrap">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 m-2">
                  <Image
                    src={URL.createObjectURL(img)}
                    alt={`Image ${idx + 1}`}
                    width={100}
                    height={100}
                    className="object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnonceForm;