'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { AuthWrapper } from '@/components/AuthWrapper';
import AnnonceForm from '@/components/Forms/AnnonceForm';

const FormulaireAnnonce = () => {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: '',
    adresse: '',  
    chambre: 0,
    salon: 0,
    toilette: 0, 
    surface: 0,
    modele: '',
    marque: '',
    annee: 0,
    kilometrage: 0,
  });

  const [images, setImages] = useState<File[]>([]); 
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['price', 'chambre', 'salon', 'toilette', 'surface', 'annee', 'kilometrage'].includes(name)
        ? parseInt(value, 10)
        : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const annonceData = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      location: formData.location,
      category: category,
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/annonces`, { data: annonceData });
      const annonceId = response.data.data.id;
      console.log('Annonce created with ID:', annonceId);

      let relatedData = null;
      let relatedId = null;

      if (category === 'Immobilier') {
        relatedData = {
          type: formData.type,
          adresse: formData.adresse, 
          chambre: formData.chambre,
          salon: formData.salon,
          toilette: formData.toilette, 
          surface: formData.surface,
          annonce: annonceId,
        };

        const immobilierResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/immobiliers`, {
          data: relatedData,
        });
        relatedId = immobilierResponse.data.data.id;
        console.log('Immobilier saved:', immobilierResponse.data);

      } else if (category === 'Automobile') {
        relatedData = {
          type: formData.type,
          modele: formData.modele,
          marque: formData.marque,
          annee: formData.annee,
          kilometrage: formData.kilometrage,
          annonce: annonceId,
        };

        const vehiculeResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/vehicules`, {
          data: relatedData,
        });
        relatedId = vehiculeResponse.data.data.id;
        console.log('Vehicule saved:', vehiculeResponse.data);
      }

      if (images.length > 0) {
        const formDataObj = new FormData();
        images.forEach((image) => {
          formDataObj.append('files', image);
        });
        formDataObj.append('refId', relatedId);
        formDataObj.append('ref', category === 'Immobilier' ? 'api::immobilier.immobilier' : 'api::vehicule.vehicule');
        formDataObj.append('field', 'photo');

        await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, formDataObj);
        console.log('Images uploaded');
      }

      setMessage('Annonce saved successfully!');
      toast.success('Annonce saved successfully!', {
        duration: 1000,
      });
      router.push('/');

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error saving annonce:', error.response);
        setMessage(`Error saving annonce: ${error.response?.statusText}`);
      } else {
        console.error('Unknown error:', error);
        setMessage('Unknown error occurred.');
      }
    }
  };

  return (
    <AuthWrapper>
      <AnnonceForm
        category={category}
        setCategory={setCategory}
        formData={formData}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
        handleSubmit={handleSubmit}
        images={images}
        message={message}
      />
    </AuthWrapper>
  );
};

export default FormulaireAnnonce;
