import React from 'react';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import BuildIcon from '@mui/icons-material/Build';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const categories = [
  {
    title: "Immobilier",
    description: "Découvrez des propriétés exclusives et trouvez la maison de vos rêves.",
    icon: <HomeIcon style={{ color: 'white' }} />,
    iconBackground: 'bg-[#FF6F61]',
    arrowColor: "text-[#FF6F61]",
    link: "/annonces?category=Immobilier"
  },
  {
    title: "Automobile",
    description: "Explorez une large gamme de véhicules, des voitures aux motos, pour tous les budgets.",
    icon: <DirectionsCarIcon style={{ color: 'white' }} />,
    iconBackground: 'bg-[#4FC3F7]',
    arrowColor: "text-[#4FC3F7]",
    link: "/annonces?category=Automobile"
  },
  {
    title: "Vêtements et objets de la maison",
    description: "Déstockage et articles pour la maison à prix cassés, profitez de bonnes affaires.",
    icon: <LocalMallIcon style={{ color: 'white' }} />,
    iconBackground: 'bg-[#BA68C8]',
    arrowColor: "text-[#BA68C8]",
    link: "/annonces?category=Vêtements%20et%20objets%20de%20la%20maison"
  },
  {
    title: "Location de matériels",
    description: "Louez des équipements professionnels et outils spécialisés pour vos projets.",
    icon: <BuildIcon style={{ color: 'white' }} />,
    iconBackground: 'bg-[#FF6F61]',
    arrowColor: "text-[#FF6F61]",
    link: "/annonces?category=Location%20de%20matériels"
  },
  {
    title: "Fourre-tout",
    description: "Un mélange unique d'articles divers, à explorer pour dénicher des trésors cachés.",
    icon: <ListAltIcon style={{ color: 'white' }} />,
    iconBackground: 'bg-[#9E9E9E]',
    arrowColor: "text-[#9E9E9E]",
    link: "/annonces?category=Fourre-tout" 
  }
];

const CategoriesSection = () => {
  return (
    <div className="px-8 py-16 bg-gray-100 flex flex-col items-center">
      <div className="relative inline-block mb-8">
        <h2 className="text-3xl font-bold text-black relative z-10">
          Nos Catégories
        </h2>
        <span className="absolute left-0 bottom-0 w-full h-3 bg-blue-200 z-0"></span>
      </div>
      <div className="flex flex-wrap justify-center space-x-4">
        {categories.map((category, index) => (
          <Link key={index} href={category.link}>
            <div 
              className="flex flex-col justify-between p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white w-52 relative group flex-grow-0 min-h-full"
              style={{ cursor: 'pointer' }}
            >
              <div className="flex flex-col flex-grow">
                <div className={`w-12 h-12 flex items-center justify-center rounded ${category.iconBackground} mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{category.title}</h3>
                <p className="text-sm text-gray-600 flex-grow">{category.description}</p>
              </div>
              <div className={`mt-4 flex justify-end transition-transform duration-200 group-hover:translate-x-2 ${category.arrowColor}`}>
                <ArrowForwardIosIcon />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
