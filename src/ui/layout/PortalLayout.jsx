import Navbar from "@/widgets/layout/Navbar"
import PortalSidebar from "@/widgets/layout/PortalSidebar"
import { Outlet } from "react-router-dom"


function PortalLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Responsive */}
      <PortalSidebar />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {/* Navbar - Responsive */}
        <div className="w-full">
          <Navbar />
        </div>
        
        {/* Main Content - Responsive */}
        <main className="flex-1 bg-gray-50 p-4 sm:p-6 overflow-auto min-h-0">
          <div className="max-w-full">
            <Outlet />

          </div>
        </main>
      
      </div>
    </div>
  )
}

export default PortalLayout