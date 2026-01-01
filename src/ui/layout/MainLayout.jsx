import HeroSection from "@/pages/homepage/components/HeroSection";
import Footer from "@/widgets/layout/Footer";
import Navbar from "@/widgets/layout/Navbar";
import React from "react";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar stays on top */}
      <Navbar />
      <HeroSection/>

      {/* Page content fills available space */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
};

export default MainLayout;
