import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, MapPin, Users, FileText, 
  BarChart3, Settings, LogOut, ChevronDown, 
  Menu, X, User, ShieldCheck 
} from 'lucide-react';
import { clearCredentials } from '@/features/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';



const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    route: '/dashboard'
  },
  {
    id: 'dc',
    label: 'DC Management',
    icon: MapPin,
    submenu: [
      { id: 'dc-list', label: 'All District Councils', route: '/portal/dcs' },
    ]
  },
    {
    id: 'tehsil',
    label: 'Tehsil Management',
    icon: MapPin,
    submenu: [
      { id: 'tehsil-list', label: 'All Tehsils', route: '/portal/tehsils' },
      { id: 'ac-list', label: 'AC', route: '/portal/acs' },
    ]
  },
    {
    id: 'mc',
    label: 'MC Management',
    icon: MapPin,
    submenu: [
      { id: 'dc-list', label: 'All Municipal Committies', route: '/portal/mcs' },
    ]
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
    submenu: [
      { id: 'ac-list', label: 'Assistant Commissioners', route: '/users/ac' },
      { id: 'mc-list', label: 'Magistrates', route: '/users/mc' },
      { id: 'co-list', label: 'Complaint Officers', route: '/users/co' },
      { id: 'user-create', label: 'Create User', route: '/portal/users/create' },
      { id: 'roles', label: 'Roles', route: '/portal/roles' }
    ]
  },
  {
    id: 'complaints',
    label: 'Complaints',
    icon: FileText,
    submenu: [
      { id: 'complaint-list', label: 'All Complaints', route: '/portal/complaints' },
      { id: 'complaint-category', label: 'Complaint Category', route: '/portal/complaint-category' },
      { id: 'complaint-assigned', label: 'Assigned to Me', route: '/complaints/assigned' },
      { id: 'complaint-pending', label: 'Pending', route: '/complaints/pending' },
      { id: 'complaint-resolved', label: 'Resolved', route: '/complaints/resolved' }
    ]
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: BarChart3,
    submenu: [
      { id: 'report-tehsil', label: 'Tehsil-wise Report', route: '/reports/tehsil' },
      { id: 'report-user', label: 'User Performance', route: '/reports/users' },
      { id: 'report-complaint', label: 'Complaint Analytics', route: '/reports/complaints' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    submenu: [
      { id: 'profile', label: 'My Profile', route: '/settings/profile' },
      { id: 'change-password', label: 'Change Password', route: '/settings/password' },
      { id: 'system-settings', label: 'System Settings', route: '/settings/system' }
    ]
  }
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId] ?? true
    }));
  };

  const isActiveRoute = (route) => location.pathname === route;

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      dispatch(clearCredentials());

      localStorage.removeItem('persist:root'); 

      toast.success('Logged out successfully', {
        position: 'top-right',
        autoClose: 3000,
      });

      navigate('/login', { replace: true });

    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside 
      className={`
        ${isSidebarOpen ? 'w-80' : 'w-20'} 
        bg-greenDarkest text-greenLight
        border-r border-greenDark
        transition-all duration-300 ease-in-out
        flex flex-col h-screen
        shadow-2xl shadow-black/20
        relative z-30
      `}
    >
      {/* Header / Logo */}
      <div className="
        h-16 
        flex items-center justify-between 
        px-5 
        border-b border-greenDarkest
        bg-gradient-to-r from-greenDarkest to-greenDark
      ">
        {isSidebarOpen ? (
          <div className="flex items-center gap-3">
            <div className="bg-greenPrimary/25 p-2 rounded-lg">
              <ShieldCheck className="text-greenLight" size={26} strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="font-semibold text-greenLight text-lg tracking-tight">
                Complaint Cell
              </h1>
              <p className="text-xs text-greenLight/60 -mt-1">Admin Panel</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <ShieldCheck className="text-greenLight" size={26} strokeWidth={2.2} />
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="
            p-2 rounded-full 
            hover:bg-greenPrimary/30 
            text-greenLight/80 
            hover:text-greenLight 
            transition-all duration-200
          "
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-8 px-2 scrollbar-thin scrollbar-thumb-greenPrimary scrollbar-track-greenDarkest">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasRoute = !!item.route;
          const isActive = hasRoute && isActiveRoute(item.route);
          const isExpanded = expandedMenus[item.id];

          const baseItemClasses = `
            group flex items-center gap-3.5
            px-4 py-3 rounded-xl mx-2
            transition-all duration-200
            font-medium
          `;

          const interactiveClasses = isActive
            ? 'bg-greenPrimary text-white shadow-md'
            : 'hover:bg-greenPrimary/40 hover:text-white text-greenLight/95';

          return (
            <div key={item.id} className="mb-1">
              {hasRoute ? (
                <Link
                  to={item.route}
                  className={`${baseItemClasses} ${interactiveClasses}`}
                >
                  <Icon 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2} 
                    className={isActive ? 'text-white' : 'text-inherit'}
                  />
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              ) : (
                <button
                  onClick={() => toggleSubmenu(item.id)}
                  className={`
                    ${baseItemClasses} w-full justify-between
                    text-white hover:text-white
                    hover:bg-greenPrimary/40
                  `}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon size={20} strokeWidth={2} className="text-inherit" />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </div>
                  {isSidebarOpen && item.submenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 text-inherit ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
              )}

              {/* Submenu */}
              {item.submenu && isExpanded && isSidebarOpen && (
                <div className="
                  mt-1 mb-2 
                  bg-greenDark/60 backdrop-blur-sm 
                  rounded-xl mx-3 py-1.5 
                  border border-greenDark/40
                  shadow-inner
                ">
                  {item.submenu.map((sub) => {
                    const isSubActive = isActiveRoute(sub.route);
                    
                    return (
                      <Link
                        key={sub.id}
                        to={sub.route}
                        className={`
                          flex items-center px-6 py-2.5 text-sm
                          transition-all duration-150
                          ${isSubActive 
                            ? 'bg-greenPrimary/60 text-white font-medium' 
                            : 'text-white hover:text-white hover:bg-greenPrimary/30'
                          }
                        `}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-greenDark/50 p-4 bg-greenDarkest/90">
        {isSidebarOpen ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="
                w-10 h-10 rounded-full 
                bg-greenPrimary 
                flex items-center justify-center 
                ring-2 ring-greenPrimary/50
                shadow-sm
              ">
                <User size={20} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-greenLight text-sm truncate">
                  Admin User
                </p>
            
              </div>
            </div>

         <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="
                w-full flex items-center justify-center gap-2
                py-2.5 px-4 rounded-xl
                text-red-300 hover:text-red-200
                bg-red-900/30 hover:bg-red-900/45
                transition-all duration-200
                font-medium
                shadow-sm
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isLoggingOut ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-red-300 border-t-transparent rounded-full"></span>
                  Logging out...
                </span>
              ) : (
                <>
                  <LogOut size={18} />
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="
              w-full py-3 flex justify-center
              text-red-300 hover:text-red-200
              hover:bg-red-900/35 rounded-xl
              transition-all duration-200
              disabled:opacity-50
            "
            aria-label="Logout"
          >
            {isLoggingOut ? (
              <span className="animate-spin h-5 w-5 border-2 border-red-300 border-t-transparent rounded-full"></span>
            ) : (
              <LogOut size={22} />
            )}
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;