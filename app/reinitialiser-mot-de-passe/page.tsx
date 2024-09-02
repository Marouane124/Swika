import React from 'react';
import ResetPassword from './ResetPassword';
import SuspenseBoundary from '@/components/SuspenseBoundary';

const Page = () => (
  <SuspenseBoundary>
    <ResetPassword />
  </SuspenseBoundary>
);

export default Page;
