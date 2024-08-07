import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import KeyIcon from '@mui/icons-material/Key';
import MenuIcon from '@mui/icons-material/Menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '@/lib/useAuth';
import Logoutbutton from './LogoutButton';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, session } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { 
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 py-1 px-4 w-full">
      <div className="container mx-auto flex flex-col items-center">
        {/* Desktop View */}
        <div className="hidden lg:flex items-center justify-between w-full mb-0">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image src="/Logo.png" alt="Logo" width={60} height={60} className="cursor-pointer" />
            </Link>
            <select className="p-1.5 border rounded text-gray-700 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="en">en</option>
              <option value="fr">fr</option>
              {/* Add more languages as needed */}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/mes-annonces" className="text-gray-700 hover:text-purple-500 text-sm">
                  Mes annonces
                </Link>
                <Link href="/formulaireAnnonce" className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm">
                  Nouvelle annonce
                </Link>
                <div className="relative">
                  <button onClick={toggleMenu} className="focus:outline-none">
                    <Image
                      src={session?.user?.image || '/Default_avatar_profile.jpg'}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                      <div className="block px-4 py-2 text-gray-800 text-sm">{session?.user?.name}</div>
                      <Logoutbutton />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/signin" className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm">
                  Se connecter
                </Link>
                <Link href="/signup" className="border border-purple-500 text-purple-500 px-3 py-1 rounded hover:bg-purple-500 hover:text-white text-sm">
                  Créer un compte
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex items-center justify-between w-full mb-0">
          <Link href="/">
            <Image src="/Logo.png" alt="Logo" width={60} height={60} className="cursor-pointer" />
          </Link>
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            <MenuIcon />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white shadow-lg z-50">
            <div className="flex flex-col items-center p-4 space-y-4">
              <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-700">
                <CloseIcon />
              </button>
              <Link href="/" className="text-gray-700 hover:text-purple-500 text-sm" onClick={closeMenu}>
                Acceuil
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/mes-annonces" className="text-gray-700 hover:text-purple-500 text-sm" onClick={closeMenu}>
                    Mes annonces
                  </Link>
                  <Link href="/formulaireAnnonce" className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm" onClick={closeMenu}>
                    Nouvelle annonce
                  </Link>
                  <Logoutbutton />
                </>
              ) : (
                <>
                  <Link href="/signin" className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm" onClick={closeMenu}>
                    Se connecter
                  </Link>
                  <Link href="/signup" className="border border-purple-500 text-purple-500 px-3 py-1 rounded hover:bg-purple-500 hover:text-white text-sm" onClick={closeMenu}>
                    Créer un compte
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-center w-full mb-4">
          <div className="relative w-1/2">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-base" />
            <input
              type="text"
              placeholder="Search ..."
              className="w-full pl-10 p-1.5 border rounded text-gray-700 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="hidden lg:flex space-x-8 mb-4">
          <Link href="/immobilier" className="text-gray-700 hover:text-purple-500 flex items-center space-x-1 text-sm">
            <HomeIcon className="w-6 h-6" />
            <span>Immobilier</span>
          </Link>
          <Link href="/automobile" className="text-gray-700 hover:text-purple-500 flex items-center space-x-1 text-sm">
            <DirectionsCarIcon className="w-6 h-6" />
            <span>Automobile</span>
          </Link>
          <Link href="/vente-occasion" className="text-gray-700 hover:text-purple-500 flex items-center space-x-1 text-sm">
            <ShoppingCartIcon className="w-6 h-6" />
            <span>Vente d&apos;occasion</span>
          </Link>
          <Link href="/location-objets" className="text-gray-700 hover:text-purple-500 flex items-center space-x-1 text-sm">
            <KeyIcon className="w-6 h-6" />
            <span>Location d&apos;objets</span>
          </Link>
          <Link href="/rubrique-fourre-tout" className="text-gray-700 hover:text-purple-500 flex items-center space-x-1 text-sm">
            <ListAltIcon className="w-6 h-6" />
            <span>Rubrique fourre-tout</span>
          </Link>
          <Link href="/autre" className="text-gray-700 hover:text-purple-500 flex items-center space-x-1 text-sm">
            <MoreHorizIcon className="w-6 h-6" />
            <span>Autre</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
