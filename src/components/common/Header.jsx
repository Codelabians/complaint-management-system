import React from "react";
import { useSelector } from "react-redux";


const Header = ({ title, icon: Icon, count, actionButton }) => {
  const user = useSelector((state) => state.auth.user)
  const role = user?.role || ''
  return (
    <div className="w-full px-6 py-2 shadow-lg bg-greenDarkest rounded">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-greenPrimary/20">
            <Icon size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-semibold text-white">{title}</h1>
        </div>
        {role === "DC" &&
       <div className="flex items-center gap-4">
        {/* {count !== undefined && (
          <div
            className="px-3 py-1 rounded-full font-semibold bg-greenDarkest text-white border-2 border-greenDark"
         
          >
            Total: {count}
          </div>
        )} */}
        {actionButton}
        </div>
        }
      </div>
    </div>
  );
};

export default Header;
