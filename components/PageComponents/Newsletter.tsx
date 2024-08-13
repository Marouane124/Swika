import React from 'react';
import Image from 'next/image';
import Logo from '@/public/Logo.png';  

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center py-14 bg-white">
      <Image src={Logo} alt="Swika" width={100} height={50} />
      <h2 className="text-2xl font-bold mt-6">Stay Up to Date</h2>
      <p className="text-gray-600 mt-2 mb-6">
        Abonnez-vous à notre newsletter pour recevoir notre flux hebdomadaire.
      </p>
      <div className="flex w-full max-w-md">
        <input
          type="email"
          placeholder="Votre e-mail"
          className="w-full p-4 border border-gray-300 rounded-l-full focus:outline-none text-black"
        />
        <button className="bg-[#FF471C] text-white px-6 py-4 rounded-r-full hover:bg-orange-600 transition duration-300">
          Abonnez
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
