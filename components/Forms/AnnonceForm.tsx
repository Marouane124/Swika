'use client';

import React, { useState, useRef, useEffect } from 'react';
import ImmobilierForm from '@/components/Forms/ImmobilierForm';
import VehiculesForm from '@/components/Forms/VehiculesForm';
import ObjetForm from '@/components/Forms/ObjetForm';
import MaterielForm from '@/components/Forms/MaterielForm';
import FourreToutForm from '@/components/Forms/FourreToutForm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import { createAnnonce, updateAnnonce } from '@/actions/annonce-actions';
import ScrollToTopButton from '../ScrollToTopButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface AnnonceFormProps {
  vehicleOptions: any;
  immobilierOptions: any;
  objetOptions: any; 
  materielOptions: any; 
  fourreToutOptions: any;
  secteurOptions: any; 
  initialData?: any; 
  isEditMode?: boolean; 
}


const MAX_IMAGES = 6;
const MAX_DESCRIPTION_LENGTH = 280;

const AnnonceForm: React.FC<AnnonceFormProps> = ({
  vehicleOptions,
  immobilierOptions,
  secteurOptions,
  objetOptions,
  materielOptions,
  fourreToutOptions,
  initialData,
  isEditMode = false,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [category, setCategory] = useState<string>(initialData?.attributes?.category || '');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    ville: '',
    transaction: '',
    etat: '',
    adresse: '',
    type: '',
    chambre: 0,
    salon: 0,
    toilette: 0,
    surface: 0,
    modele: '',
    marque: '',
    annee: '', 
    kilometrage: '', 
    carburant: '',
    boite_Vitesses: '',
    taille: '',  // For Objet
    categorieObjet: '',  // For Objet
    disponibilite: false,  // For Materiel
    categorieFourreTout: '',  // For Fourre-Tout
  });
  
  const [secteurOptionsForVille, setSecteurOptionsForVille] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditMode && initialData) {
      const attributes = initialData.attributes;
  
      // Fetch category-specific attributes
      const vehiculeAttributes = attributes.vehicule?.data?.attributes || {};
      const immobilierAttributes = attributes.immobilier?.data?.attributes || {};
      const objetAttributes = attributes.objet?.data?.attributes || {};
      const materielAttributes = attributes.materiel?.data?.attributes || {};
      const fourreToutAttributes = attributes.fourre_tout?.data?.attributes || {};
  
      // Set the form data
      setFormData({
        title: attributes.title || '',
        description: attributes.description || '',
        price: attributes.price || 0,
        ville: attributes.ville || '',
        transaction: attributes.transaction || '',
        etat: attributes.etat || '',
        adresse: immobilierAttributes.adresse || '',
        type: immobilierAttributes.type || vehiculeAttributes.type || materielAttributes.type || '',
        chambre: immobilierAttributes.chambre || 0,
        salon: immobilierAttributes.salon || 0,
        toilette: immobilierAttributes.toilette || 0,
        surface: immobilierAttributes.surface || 0,
        modele: vehiculeAttributes.modele || '',
        marque: vehiculeAttributes.marque || objetAttributes.marque || materielAttributes.marque || '',
        annee: vehiculeAttributes.annee || 0,
        kilometrage: vehiculeAttributes.kilometrage || 0,
        carburant: vehiculeAttributes.carburant || '',
        boite_Vitesses: vehiculeAttributes.boite_Vitesses || '',
        taille: objetAttributes.taille || '',
        categorieObjet: objetAttributes.categorie || '',
        disponibilite: materielAttributes.disponibilite || false,
        categorieFourreTout: fourreToutAttributes.categorie || '',
      });
  
      setCategory(attributes.category || '');
  
      // Set secteur options based on selected ville
      const selectedVille = attributes.ville || '';
      const secteurOptionsForSelectedVille = secteurOptions.ville[selectedVille]?.secteur || [];
      setSecteurOptionsForVille(secteurOptionsForSelectedVille);
  
      // Handle images for all categories
      let photoUrls = [];
      if (vehiculeAttributes.photo?.data) {
        photoUrls = vehiculeAttributes.photo.data.map((img: any) => img.attributes.url);
      } else if (immobilierAttributes.photo?.data) {
        photoUrls = immobilierAttributes.photo.data.map((img: any) => img.attributes.url);
      } else if (objetAttributes.photo?.data) {
        photoUrls = objetAttributes.photo.data.map((img: any) => img.attributes.url);
      } else if (materielAttributes.photo?.data) {
        photoUrls = materielAttributes.photo.data.map((img: any) => img.attributes.url);
      } else if (fourreToutAttributes.photo?.data) {
        photoUrls = fourreToutAttributes.photo.data.map((img: any) => img.attributes.url);
      }
  
      // Set the existing images
      setExistingImages(photoUrls);
      setDescriptionLength(attributes.description?.length || 0);
      setImages([]);
    }
  }, [initialData, isEditMode, secteurOptions.ville]);
  
  
  

  useEffect(() => {
    if (formData.ville) {
      const selectedVilleSecteurs = secteurOptions.ville[formData.ville]?.secteur || [];
      setSecteurOptionsForVille(selectedVilleSecteurs);
    } else {
      setSecteurOptionsForVille([]);
    }
  }, [formData.ville, secteurOptions]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    // Update the form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: ['price', 'chambre', 'salon', 'toilette', 'surface', 'annee', 'kilometrage'].includes(name)
        ? parseInt(value, 10)
        : value,
    }));
  
    // Update the secteur options when the ville changes
    if (name === 'ville') {
      const selectedVilleSecteurs = secteurOptions.ville[value]?.secteur || [];
      setSecteurOptionsForVille(selectedVilleSecteurs);
    }
  
    if (name === 'description') {
      setDescriptionLength(value.length);
    }
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (index: number, isExisting: boolean = false) => {
    if (isExisting) {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = session?.user?.id;
  
    let response;
    if (isEditMode && initialData) {
      response = await updateAnnonce(initialData.id, formData, userId, category, images, existingImages);
    } else {
      response = await createAnnonce({ category, formData, userId, images });
    }
  
    if (response.success) {
      toast.success(response.message, {
        duration: 1000,
      });

      if (isEditMode) {
        await new Promise<void>((resolve) => {
          window.location.assign(`/compte/mes-annonces/modifier-annonce/${initialData.id}`);
          resolve(); 
          window.location.assign(`/compte/mes-annonces`);
          resolve();
        });
      } else { router.push('/compte/mes-annonces'); }

    } else {
      toast.error(response.message);
    }
  };
  
  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleGoBack} 
            className="relative left-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <ArrowBackIcon />
          </button>
          <h1 className="text-3xl font-bold text-gray-800 text-center w-full">
            {isEditMode ? 'Modifier Annonce' : 'Créer une annonce'}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
          {/* Title Field */}
          <div className="mb-6">
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

          {/* Category Field */}
          <div className="mb-6">
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
                {/* Keep the display values the same, but send internal category names */}
                <option value="Immobilier">Immobilier</option>
                <option value="Automobile">Automobile</option>
                <option value="Vêtement-Objet">Vêtements et objets de la maison</option>
                <option value="Matériel">Location de matériels</option>
                <option value="Fourre-tout">Fourre-tout</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <CategoryIcon style={{ color: 'gray' }} />
              </div>
            </div>
          </div>

          {/* Etat Field - Only show if category is not 'Immobilier' */}
          {category !== 'Immobilier' && (
            <div className="mb-6">
              <label htmlFor="etat" className="block text-sm font-medium text-gray-700">
                État :
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  id="etat"
                  name="etat"
                  value={formData.etat}
                  onChange={handleInputChange}
                  required
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Sélectionnez un état
                  </option>
                  {secteurOptions.etat.map((etat: string) => (
                    <option key={etat} value={etat}>
                      {etat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description :
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                maxLength={MAX_DESCRIPTION_LENGTH}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-28 resize-none"
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

          {/* Price Field */}
          <div className="mb-6">
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
                <PaymentsIcon style={{ color: 'gray' }} />
              </div>
            </div>
          </div>

          {/* Ville Field */}
          <div className="mb-6">
            <label htmlFor="ville" className="block text-sm font-medium text-gray-700">
              Ville :
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <select
                id="ville"
                name="ville"
                value={formData.ville}
                onChange={handleInputChange}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Sélectionnez une ville
                </option>
                {Object.keys(secteurOptions.ville || {}).map((ville) => (
                  <option key={ville} value={ville}>
                    {ville}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <LocationOnIcon style={{ color: 'gray' }} />
              </div>
            </div>
          </div>

          {/* Render the appropriate form based on category */}
          {category === 'Immobilier' && (
            <ImmobilierForm 
              formData={formData} 
              handleInputChange={handleInputChange} 
              secteurOptions={secteurOptionsForVille}
              immobilierOptions={immobilierOptions}
            />
          )}
          {category === 'Automobile' && (
            <VehiculesForm 
              formData={formData} 
              handleInputChange={handleInputChange} 
              vehicleOptions={vehicleOptions} 
            />
          )}
          {category === 'Vêtement-Objet' && (
            <ObjetForm 
              formData={formData} 
              handleInputChange={handleInputChange} 
              objetOptions={objetOptions} 
            />
          )}
          {category === 'Matériel' && (
            <MaterielForm 
              formData={formData} 
              handleInputChange={handleInputChange} 
              materielOptions={materielOptions} 
            />
          )}
          {category === 'Fourre-tout' && (
            <FourreToutForm 
              formData={formData} 
              handleInputChange={handleInputChange} 
              fourreToutOptions={fourreToutOptions} 
            />
          )}

          {/* Images Section */}
          <div className="mt-4 mb-6">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Images :
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {/* Display existing images */}
              {existingImages.map((imageUrl, idx) => (
                <div key={idx} className="relative w-full h-24">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
                    alt={`Image ${idx + 1}`}
                    layout="fill"
                    className="object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx, true)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center pb-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
              {/* Display newly selected images */}
              {images.map((img, idx) => (
                <div key={idx} className="relative w-full h-24">
                  <Image
                    src={URL.createObjectURL(img)}
                    alt={`New Image ${idx + 1}`}
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
            <p className="mt-1 text-sm text-gray-500">
              {existingImages.length + images.length}/{MAX_IMAGES} images sélectionnées
            </p>
          </div>


          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF471C] hover:bg-[#FF6F3C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F3C] transition duration-150 ease-in-out"
            >
              {isEditMode ? 'Mettre à jour' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default AnnonceForm;
