import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import React from 'react';
import AnnonceForm from '@/components/Forms/AnnonceForm';

export default async function CreerAnnoncePage() {
  // Load options from YAML files
  const vehicleFilePath = path.join(process.cwd(), 'config', 'vehicleOptions.yaml');
  const vehicleFileContents = fs.readFileSync(vehicleFilePath, 'utf8');
  const vehicleOptions = yaml.load(vehicleFileContents);

  const immobilierFilePath = path.join(process.cwd(), 'config', 'immobilierOptions.yaml');
  const immobilierFileContents = fs.readFileSync(immobilierFilePath, 'utf8');
  const immobilierOptions = yaml.load(immobilierFileContents);

  const objetFilePath = path.join(process.cwd(), 'config', 'objetOptions.yaml');
  const objetFileContents = fs.readFileSync(objetFilePath, 'utf8');
  const objetOptions = yaml.load(objetFileContents);

  const materielFilePath = path.join(process.cwd(), 'config', 'materielOptions.yaml');
  const materielFileContents = fs.readFileSync(materielFilePath, 'utf8');
  const materielOptions = yaml.load(materielFileContents);

  const fourreToutFilePath = path.join(process.cwd(), 'config', 'fourreToutOptions.yaml');
  const fourreToutFileContents = fs.readFileSync(fourreToutFilePath, 'utf8');
  const fourreToutOptions = yaml.load(fourreToutFileContents);

  const secteurFilePath = path.join(process.cwd(), 'config', 'annonceOptions.yaml');
  const secteurFileContents = fs.readFileSync(secteurFilePath, 'utf8');
  const secteurOptions = yaml.load(secteurFileContents);

  return (
    <div >
      <AnnonceForm 
        vehicleOptions={vehicleOptions} 
        immobilierOptions={immobilierOptions} 
        objetOptions={objetOptions} 
        materielOptions={materielOptions} 
        fourreToutOptions={fourreToutOptions} 
        secteurOptions={secteurOptions} 
      />
    </div>
  );
}
