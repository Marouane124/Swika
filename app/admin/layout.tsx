import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Admin/Sidebar';

interface AdminLayoutProps {
  children: ReactNode; 
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-y-hidden">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-1 ml-[185px] mt-16 p-5 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;