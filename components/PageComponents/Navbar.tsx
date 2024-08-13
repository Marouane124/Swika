import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '@/lib/useAuth';
import Logoutbutton from '@/components/LogoutButton';
import Logo from '@/public/Logo.png';

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
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 py-2 px-4">
      <div className="mx-auto flex justify-between items-center" style={{ maxWidth: '1200px', width: '100%' }}>
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src={Logo} alt="Swika Logo" height={90} width={90} />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/formulaireAnnonce" className="bg-[#FF471C] text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center">
            <AddIcon className="mr-2" />
            Déposer une annonce
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/mes-annonces" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                Mes annonces
              </Link>
              <div className="relative">
                <button onClick={toggleMenu} className="text-orange-500 focus:outline-none flex items-center">
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
            <Link href="/signin" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
