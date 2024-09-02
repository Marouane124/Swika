'use client';

import React, { useState, useRef } from 'react';
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

const MAX_IMAGES = 6;

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [descriptionLength, setDescriptionLength] = useState(formData.description.length);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    setDescriptionLength(e.target.value.length);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = Array.from(e.target.files);
      if (images.length + selectedImages.length <= MAX_IMAGES) {
        handleImageChange(e);
      } else {
        alert(`You can only add up to ${MAX_IMAGES} images.`);
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side: AnnonceForm */}
      <div className="flex flex-col w-1/2 bg-white p-8 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleGoHome} className="text-gray-500 hover:text-gray-700">
            <ArrowBackIcon />
          </button>
          <h1 className="text-3xl font-bold text-gray-800 text-center w-full">Créer une annonce</h1>
        </div>
        {message && (
          <div className={`mb-4 text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
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
                maxLength={280}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-24 resize-none"
                placeholder="Description de l'annonce"
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <DescriptionIcon style={{ color: 'gray' }} />
              </div>
              <div className="absolute bottom-0 left-2 text-xs text-gray-500">
                {descriptionLength}/280
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
                value={formData.ville}
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
                <option value="Immobilier">Immobilier</option>
                <option value="Automobile">Automobile</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <CategoryIcon style={{ color: 'gray' }} />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Images :
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={onImageChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {images.slice(0, MAX_IMAGES).map((img, idx) => (
                <div key={idx} className="relative w-full h-24">
                  <Image
                    src={URL.createObjectURL(img)}
                    alt={`Image ${idx + 1}`}
                    layout="fill"
                    className="object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center pb-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
              {images.length < MAX_IMAGES && (
                <div
                  className="relative w-full h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md text-gray-400 cursor-pointer hover:text-black hover:border-black"
                  onClick={triggerFileInput}
                >
                  <span>+ Ajouter Image</span>
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">{images.length}/{MAX_IMAGES} images séléctionnées</p>
          </div>

          <div className="flex justify-center mt-auto">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>

      {/* Vertical Line */}
      <div className="w-px bg-gray-300"></div>

      {/* Right Side: Category-Specific Form or Placeholder */}
      <div className="w-1/2 flex flex-col justify-start bg-gray-50 p-8">
        {category ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
              Saisir les détails
            </h2>
            <div className="flex-grow">
              {category === 'Immobilier' && (
                <MeublesForm formData={formData} handleInputChange={handleInputChange} />
              )}
              {category === 'Automobile' && (
                <VehiculesForm formData={formData} handleInputChange={handleInputChange} />
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-semibold text-gray-700">
              Choisissez une catégorie
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnonceForm;
