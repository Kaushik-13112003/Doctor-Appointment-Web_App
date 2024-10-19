import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = ({ authenticatedUser }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // Conditionally navigate based on user role
    if (authenticatedUser?.role === "admin") {
      navigate("/admin-dashboard");
    } else if (authenticatedUser?.role === "doctor") {
      navigate("/doctor-dashboard");
    } else if (authenticatedUser?.role === "patient") {
      navigate("/"); // Patient home page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-3xl font-semibold text-gray-600 mt-4">
        Page Not Found
      </h2>
      <p className="mt-2 text-lg text-center text-gray-500">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={handleGoHome}
        className="mt-3 mb-8 bg-cyan-800 text-white p-2 rounded-md hover:bg-cyan-500 duration-500"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
