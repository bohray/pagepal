import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-200 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
