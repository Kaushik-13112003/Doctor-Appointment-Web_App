import React from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-3xl font-bold text-red-600">Payment Canceled</h1>
      <p className="mt-4 text-lg text-gray-700">
        Your payment has been canceled. If you have questions, please contact
        support.
      </p>
      <button
        onClick={handleGoHome}
        className="mt-6 bg-cyan-800 text-white p-2 rounded-lg hover:bg-cyan-600 duration-300"
      >
        Go to Home
        </button>
    </div>
  );
};

export default Cancel;
