import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the login form submission here
    console.log("Login Form Data:", formData);
    // After login, the backend should return the user role, and you handle it in the frontend
  };

  return (
    <div className="flex justify-center items-center mt-[50px]">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-cyan-800">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-cyan-800 text-white p-2 rounded-lg hover:bg-cyan-500 duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-cyan-800 underline">
              Register here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
