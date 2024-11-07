import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to the home page
  };


  const handleGoMyAppointment = () => {
    navigate("/my-appointments"); // Redirect to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg text-gray-700">
        Thank you for your payment. Your appointment has been confirmed.
      </p>
      <div className="flex sm:flex-row gap-3 flex-col items-center">
        <button
          onClick={handleGoHome}
          className="mt-6 bg-cyan-800 text-white p-2 rounded-lg hover:bg-cyan-600 duration-300"
        >
          Go to Home
        </button>
        <button
          onClick={handleGoMyAppointment}
          className="mt-6 bg-cyan-800 text-white p-2 rounded-lg hover:bg-cyan-600 duration-300"
        >
          Go to My Appointment
        </button>
      </div>
    </div>
  );
};

export default Success;
