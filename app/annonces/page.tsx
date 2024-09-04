import React from 'react';
import Annonces from './Annonces';
import SuspenseBoundary from '@/components/SuspenseBoundary';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <SuspenseBoundary>
        <Annonces />
      </SuspenseBoundary>
    </div>
  );
}
