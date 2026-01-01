import React from "react";

const Footer = () => {
  return (
    <footer className="bg-grey text-white py-12 px-8">
      <div className="w-[85%] mx-auto">
        {/* Top Section with Border */}
        <div className="border-b border-gray-600 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo Section */}
            <div>
              <img
                src="/img/community connect white.png"
                alt=""
                className="h-36 w-auto object-contain"
              />
            </div>

            {/* Managed By Section */}
            <div className="flex flex-col space-y-4 font-manrope font-medium">
              <h3 className="text-orange font-semibold text-lg">
                Managed By
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Charleston Management</div>
                <div>P.O. Box 55688</div>
                <div>812 Salem Woods Dr.</div>
                <div>Raleigh, NC 27604</div>
              </div>
            </div>

            {/* General Information Section */}
            <div className="flex flex-col space-y-4 font-manrope">
              <h3 className="text-orange font-semibold text-lg">
                GENERAL INFORMATION
              </h3>
              <div className="space-y-2 text-sm font-medium text-gray-300">
                <div>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    HOA Essentials
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Legal Docs
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Web Links
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-xs text-gray-400 mt-4 font-manrope">
          © 2024 Community Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
