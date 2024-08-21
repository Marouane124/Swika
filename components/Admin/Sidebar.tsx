"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-55 bg-gray-700 text-white fixed top-16 left-0 bottom-0 h-full p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Console admin</h2>
        <ul className="space-y-4">
          <li>
            <button 
              className={`w-full text-left py-2 px-4 rounded ${pathname === '/admin/annonces' ? 'bg-gray-600' : 'hover:bg-gray-600'}`}
              onClick={() => router.push('/admin/annonces')}
            >
              Gérer Annonces
            </button>
          </li>
          <li>
            <button 
              className={`w-full text-left py-2 px-4 rounded ${pathname === '/admin/gestion-utilisateurs' ? 'bg-gray-600' : 'hover:bg-gray-600'}`}
              onClick={() => router.push('/admin/gestion-utilisateurs')}
            >
              Gérer Utilisateurs
            </button>
          </li>
          <li>
            <button 
              className={`w-full text-left py-2 px-4 rounded ${pathname === '/admin/compte' ? 'bg-gray-600' : 'hover:bg-gray-600'}`}
              onClick={() => router.push('/admin/compte')}
            >
              Mon Compte
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-900 mb-8 pb-8 ">
        <div className="flex items-center">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
          )}
          <span className="text-sm pt-2 pl-2">{session?.user?.name}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
