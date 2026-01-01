import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isPortalRoute = pathname.startsWith("/portal");
  const navbarBg = isPortalRoute ? "bg-white text-black" : "bg-grey text-white";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoaDropdownOpen, setHoaDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHoaDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    {
      label: "HOA Essentials",
      path: "/hoa-essentials",
      submenu: [
        { label: "HOA Association", path: "/hoa-essentials/association" },
        { label: "Protective Covenant", path: "/hoa-essentials/covenant" },
        {
          label: "Recreational Facilities",
          path: "/hoa-essentials/facilities",
        },
        { label: "Directory", path: "/hoa-essentials/directory" },
        { label: "Newsletter", path: "/hoa-essentials/newsletter" },
        { label: "Utilities", path: "/hoa-essentials/utilities" },
      ],
    },
    { label: "Legal DOCs", path: "/legal-docs" },
    { label: "Web Links", path: "/web-links" },
    { label: "Map", path: "/map" },
    { label: "Events", path: "/events" },
    { label: "Portal", path: "/portal/user-details" }, // takes to portal layout
  ];

  useEffect(() => {
    const user = localStorage.getItem("adminUser");
    setIsLoggedIn(!!user); // convert to boolean
  }, []);
  return (
    <nav className={`${navbarBg} shadow-sm sticky top-0 z-30`}>
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          {!isPortalRoute && (
            <div className="flex-shrink-0" onClick={() => navigate("/")}>
              <img
                src="/img/community connect white.png"
                alt="Community Connect Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center space-x-6 xl:space-x-8">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setHoaDropdownOpen(!hoaDropdownOpen)}
                className="flex items-center gap-1 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-50 rounded-md whitespace-nowrap"
              >
                HOA Essentials
                <ChevronDownIcon className="w-4 h-4" />
              </button>

              {hoaDropdownOpen && (
                <div className="absolute top-full left-0 w-56 mt-2 bg-[#1f2920] text-white border border-gray-700 rounded-md shadow-lg z-40">
                  {navItems[0].submenu.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.path}
                      className="block px-4 py-2 text-sm hover:bg-orange hover:text-white transition-all"
                      onClick={() => {
                        setHoaDropdownOpen(false);
                      }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.slice(1).map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-50 rounded-md whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Login & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {!isLoggedIn && (
              <button
                className="bg-orange hover:bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
            )}

            {/* Hamburger Button */}
            <div className="lg:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block px-3 py-3 text-base font-medium rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
