import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-blue-500 mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Oops! Page not found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Go Back Home</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
