"use client";

import React, { useState } from 'react';
import axios from 'axios';

const FormulaireAnnonce = () => {
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: '',
    address: '',
    chambre: '',
    salon: '',
    toillette: '',
    surface: '',
    modele: '',
    marque: '',
    annee: '',
    kilometrage: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      location: formData.location,
      category: category,
      ...(category === 'Meubles' && {
        type: formData.type,
        address: formData.address,
        chambre: parseInt(formData.chambre),
        salon: parseInt(formData.salon),
        toillette: parseInt(formData.toillette),
        surface: parseFloat(formData.surface),
      }),
      ...(category === 'Vehicules' && {
        type: formData.type,
        modele: formData.modele,
        marque: formData.marque,
        annee: parseInt(formData.annee),
        kilometrage: parseInt(formData.kilometrage),
      }),
    };

    const formDataObj = new FormData();
    formDataObj.append('data', JSON.stringify(data));
    if (image) {
      formDataObj.append('files.image', image);
    }

    try {
      const response = await axios.post('http://163.172.170.136:1337/api/annonces', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Annonce saved successfully!');
      console.log('Annonce saved:', response.data);
    } catch (error: unknown) {
      let errorMessage: string;

      if (axios.isAxiosError(error)) {
        errorMessage = error.response ?
          `Error saving annonce: ${error.response.status} ${error.response.statusText}` :
          `Error saving annonce: ${error.message}`;
      } else {
        errorMessage = `Error saving annonce: ${String(error)}`;
      }

      setMessage(errorMessage);
      console.error('Error saving annonce:', error);

      if (axios.isAxiosError(error) && error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <h1 className="text-black text-2xl font-bold">Créer une annonce</h1>
        </div>
        {message && (
          <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Titre :
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description :
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Prix (MAD) :
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Localisation :
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Catégorie :
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>Sélectionnez une catégorie</option>
              <option value="Meubles">Meubles</option>
              <option value="Vehicules">Véhicules</option>
            </select>
          </div>
          {category === 'Meubles' && (
            <>
              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type :
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Adresse :
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="chambre" className="block text-sm font-medium text-gray-700">
                  Chambre :
                </label>
                <input
                  type="number"
                  id="chambre"
                  name="chambre"
                  value={formData.chambre}
                  onChange={handleInputChange}
                  className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="salon" className="block text-sm font-medium text-gray-700">
                  Salon :
                </label>
                <input
                  type="number"
                  id="salon"
                  name="salon"
                  value={formData.salon}
                  onChange={handleInputChange}
                  className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="toillette" className="block text-sm font-medium text-gray-700">
                  Toillette :
                </label>
                <input
                  type="number"
                  id="toillette"
                  name="toillette"
                  value={formData.toillette}
                  onChange={handleInputChange}
                  className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="surface" className="block text-sm font-medium text-gray-700">
                  Surface (m²) :
                </label>
                <input
                  type="number"
                  id="surface"
                  name="surface"
                  value={formData.surface}
                  onChange={handleInputChange}
                  className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </>
          )}
          {category === 'Vehicules' && (
            <>
              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type :
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="modele" className="block text-sm font-medium text-gray-700">
                  Modèle :
                </label>
                <input
                  type="text"
                  id="modele"
                  name="modele"
                  value={formData.modele}
                  onChange={handleInputChange}
                  className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="marque" className="block text-sm font-medium text-gray-700">
                  Marque :
                </label>
                <input
                  type="text"
                  id="marque"
                  name="marque"
                  value={formData.marque}
                  onChange={handleInputChange}
                  className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="annee" className="block text-sm font-medium text-gray-700">
                  Année :
                </label>
                <input
                  type="number"
                  id="annee"
                  name="annee"
                  value={formData.annee}
                  onChange={handleInputChange}
                  className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="kilometrage" className="block text-sm font-medium text-gray-700">
                  Kilométrage :
                </label>
                <input
                  type="number"
                  id="kilometrage"
                  name="kilometrage"
                  value={formData.kilometrage}
                  onChange={handleInputChange}
                  className="block w-full pl-2 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </>
          )}
          {category && (
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image :
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormulaireAnnonce;