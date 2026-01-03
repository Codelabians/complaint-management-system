import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';


const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;