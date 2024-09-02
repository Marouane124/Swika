import React, { Suspense } from 'react';
import Loading from '@/components/Loading';

const SuspenseBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<Loading />}>
    {children}
  </Suspense>
);

export default SuspenseBoundary;
