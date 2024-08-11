'use client';

import { useAuth } from '@/lib/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';
import Loading from './Loading';
import toast from 'react-hot-toast';

export function AuthWrapper({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const hasShownToast = useRef(false); 

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      if (!hasShownToast.current) {
        toast.error('Vous devez vous connecter pour accéder à cette page', {
          duration: 1000,
        });
        hasShownToast.current = true; 
      }
      router.push(`/signin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
