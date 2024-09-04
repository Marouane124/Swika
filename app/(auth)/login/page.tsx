import React from 'react';
import Login from './Login';
import SuspenseBoundary from '@/components/SuspenseBoundary';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SuspenseBoundary>
        <Login />
      </SuspenseBoundary>
    </div>
  );
}
