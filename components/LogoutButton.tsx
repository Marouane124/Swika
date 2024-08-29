'use client';

import { signOut } from 'next-auth/react';

export default function Logoutbutton() {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full border-t border-gray-200 text-gray-800 px-4 py-2 text-center bg-red-500 hover:bg-red-700"
    >
      Se déconnecter
    </button>
  );
}