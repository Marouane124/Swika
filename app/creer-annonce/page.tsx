"use client";

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { AuthWrapper } from '@/components/AuthWrapper';
import AnnonceForm from '@/components/Forms/AnnonceForm';
import { createAnnonce } from '@/actions/annonce-actions';

const FormulaireAnnonce = () => {
  const { data: session } = useSession(); 
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    ville: '',
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

    const userId = session?.user?.id;

    const response = await createAnnonce({ category, formData, userId, images });

    if (response.success) {
      toast.success(response.message, {
        duration: 1000,
      });
      router.push('/');
    } else {
      setMessage(response.message);
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
