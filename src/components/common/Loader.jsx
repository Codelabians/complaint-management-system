import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-t-transparent rounded-full border-greenDarkest animate-spin"></div>
          <div
            className="absolute inset-2 border-4 border-b-transparent rounded-full border-greenDark animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1s" }}
          ></div>
        </div>
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;