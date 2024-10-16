import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient", // default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the registration form submission here
    console.log("Register Form Data:", formData);
  };

  return (
    <div className="flex justify-center items-center mt-[50px]">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-cyan-800">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
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
          {/* Role Selection */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-cyan-800 text-white p-2 rounded-lg hover:bg-cyan-500 duration-300"
          >
            Create Account
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already registered?{" "}
            <NavLink to="/login" className="text-cyan-800 underline">
              Log in here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
