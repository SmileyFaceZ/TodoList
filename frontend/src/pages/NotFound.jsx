import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-1000 ease-in-out text-white px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold mb-4 drop-shadow-lg">404</div>
        <h1 className="text-3xl font-semibold mb-2">Oops! Page not found</h1>
        <p className="mb-6 text-lg">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 bg-white text-pink-600 hover:text-pink-700 font-semibold px-4 py-2 rounded-md shadow-md transition"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Go Back Home</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
