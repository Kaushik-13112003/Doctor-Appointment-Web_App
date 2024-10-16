import React from "react";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="w-[100px] mb-8 bg-cyan-800 text-white p-2 rounded-md hover:bg-cyan-500 duration-500"
    >
      Go Back
    </button>
  );
};

export default Back;
