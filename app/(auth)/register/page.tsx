'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import GoogleSignInButton from '@/components/GoogleButton';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { registerUserAction } from '@/actions/auth-actions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { z } from 'zod';
import { signIn } from 'next-auth/react';

const signUpSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(1, 'Téléphone requis'),
  password: z.string().min(6, 'Mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string().min(6, 'Confirmation du mot de passe doit contenir au moins 6 caractères'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formValues = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    const result = signUpSchema.safeParse(formValues);

    if (!result.success) {
      const newErrors = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      };

      result.error.issues.forEach(issue => {
        if (issue.path.includes('name')) newErrors.name = issue.message;
        if (issue.path.includes('email')) newErrors.email = issue.message;
        if (issue.path.includes('phone')) newErrors.phone = issue.message;
        if (issue.path.includes('password')) newErrors.password = issue.message;
        if (issue.path.includes('confirmPassword')) newErrors.confirmPassword = issue.message;
      });

      setErrors(newErrors);
      return;
    }

    // Clear errors if validation is successful
    setErrors({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    });

    try {
      const apiResult = await registerUserAction(formData);
      if (apiResult.success) {
        // Automatically log in the user after successful registration
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: formValues.email,
          password: formValues.password,
        });

        if (signInResult?.error) {
          toast.error('Inscription réussie mais échec de la connexion. Veuillez réessayer.', { duration: 1500 });
        } else {
          toast.success('Inscription et connexion réussies !', { duration: 1000 });
          router.push("/"); // Redirect to home page or dashboard
        }
      } else {
        toast.error(apiResult.error || 'Erreur lors de l\'inscription. Veuillez réessayer.', { duration: 1500 });
      }
    } catch (error) {
      toast.error('Erreur lors de l\'inscription. Veuillez réessayer.', { duration: 1500 });
      console.error(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="bg-gray-100 min-h-screen py-5 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 relative">
        <button className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 pt-1 pl-2">
          <ArrowBackIcon onClick={handleBackClick} />
        </button>
        <div className="flex justify-center mb-6">
          <h1 className="text-black text-2xl font-bold">S&apos;inscrire</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-[#333333]">
              Nom
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#FF6F3C] focus:border-[#FF6F3C] sm:text-sm"
                placeholder="Votre nom"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PersonIcon style={{ color: '#333333' }} />
              </div>
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-[#333333]">
              E-mail
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#FF6F3C] focus:border-[#FF6F3C] sm:text-sm"
                placeholder="Votre email"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailOutlineIcon style={{ color: '#333333' }} />
              </div>
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors?.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-[#333333]">
              Téléphone
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#FF6F3C] focus:border-[#FF6F3C] sm:text-sm"
                placeholder="Votre numéro de téléphone"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon style={{ color: '#333333' }} />
              </div>
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-[#333333]">
              Mot de passe
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#FF6F3C] focus:border-[#FF6F3C] sm:text-sm"
                placeholder="Votre mot de passe"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon style={{ color: '#333333' }} />
              </div>
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <VisibilityOffIcon style={{ color: '#333333' }} />
                ) : (
                  <VisibilityIcon style={{ color: '#333333' }} />
                )}
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#333333]">
              Confirmer le mot de passe
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#FF6F3C] focus:border-[#FF6F3C] sm:text-sm"
                placeholder="Confirmer votre mot de passe"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon style={{ color: '#333333' }} />
              </div>
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? (
                  <VisibilityOffIcon style={{ color: '#333333' }} />
                ) : (
                  <VisibilityIcon style={{ color: '#333333' }} />
                )}
              </div>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF471C] hover:bg-[#FF6F3C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F3C]"
            >
              S&apos;inscrire
            </button>
          </div>
        </form>
        <div className="mt-6 flex justify-around">
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
