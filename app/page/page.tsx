"use client";

import Nav from '../../components/Nav';
import MultiStepForm from '../../components/MultiStepForm';

const Home = () => {
  return (
    <div>
      <Nav />
      <div className="mt-24"> {/* Ajustez la valeur de marge supérieure selon les besoins */}
        <h1 className="text-center my-8">Formulaire Multi-Étapes</h1>
        <MultiStepForm />
      </div>
    </div>
  );
};

export default Home;
