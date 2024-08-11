'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import GoogleSignInButton from '@/components/GoogleButton';
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ForgotPassword from '@/components/ForgotPassword';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs !', {
        duration: 1500,
      });
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error('Email ou mot de passe incorrect !', {
        duration: 1500,
      });
      console.log(result.error);
    } else {
      toast.success('Connecté avec succès !', {
        duration: 1000,
      });

      const redirectUrl = searchParams.get('redirect') || '/';
      router.push(redirectUrl);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <h1 className="text-black text-2xl font-bold">Bonjour ! <span role="img" aria-label="wave">👋</span></h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Votre email"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailOutlineIcon style={{ color: 'black' }} />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Votre mot de passe"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon style={{ color: 'black' }} />
              </div>
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <VisibilityOffIcon style={{ color: 'black' }} />
                ) : (
                  <VisibilityIcon style={{ color: 'black' }} />
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Se connecter
            </button>
          </div>
        </form>
        <div className="mt-4 flex items-center justify-end">
          <button
            type="button"
            onClick={() => setIsForgotPasswordOpen(true)}
            className="text-sm text-indigo-600 hover:underline"
          >
            Mot de passe oublié?
          </button>
        </div>
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>
        <div className="mt-6">
          <GoogleSignInButton />
        </div>
        <div className="mt-6 flex items-center justify-center">
          <span className="px-2 text-black text-sm">Envie de nous rejoindre?</span>
          <button
            type="button"
            onClick={() => router.push('/signup')}
            className="text-sm text-indigo-600 hover:underline"
          >
            Créer un compte
          </button>
        </div>
      </div>
      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
}
