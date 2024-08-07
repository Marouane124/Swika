import React, { Suspense } from 'react';

const SuspenseBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);

export default SuspenseBoundary;
