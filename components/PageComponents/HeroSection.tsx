import React from "react";
import CyclicText from "@/components/CyclicText";
import EditNoteIcon from "@mui/icons-material/EditNote";

const HeroSection: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
  return (
    <div 
      className="py-1 mt-20 relative bg-cover bg-center h-[300px]"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center h-full text-center px-4 text-white">
        <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
          Vendez vos <CyclicText texts={['véhicules', 'propriétés', 'appartements', 'maisons']} />
        </h1>
        <p className="mt-4 text-lg lg:text-xl">Publiez votre annonce en quelques minutes</p>
        <button
          onClick={handleClick}
          className="mt-6 flex items-center justify-center h-10 lg:h-12 px-4 lg:px-6 text-sm lg:text-lg font-medium transition-colors duration-300 bg-teal-600 text-white rounded-lg focus:shadow-outline hover:bg-teal-700"
        >
          <EditNoteIcon className="mr-2" />
          Publier maintenant
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
