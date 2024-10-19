import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaListAlt,
} from "react-icons/fa"; // Import icons from react-icons

const DoctorLeftSide = () => {
  const { pathname } = useLocation(); // Get the current route

  return (
    <div className="bg-gray-100 sm:w-64 sm:h-screen p-4 shadow-lg">
      {" "}
      {/* Adjust sidebar style */}
      <h2 className="text-2xl font-bold mb-4 text-cyan-800">Doctor Panel</h2>
      {/* Dashboard Link */}
      <div className="mb-4">
        <NavLink
          to="/doctor-dashboard"
          className={`flex items-center p-2 rounded-lg hover:bg-slate-200 duration-300 ${
            pathname === "/doctor-dashboard"
              ? "bg-slate-200 border-r-4 border-cyan-800"
              : ""
          }`}
        >
          <FaTachometerAlt className="mr-3 text-cyan-800" />
          Dashboard
        </NavLink>
      </div>
      {/* Appointments Link */}
      <div className="mb-4">
        <NavLink
          to="/doctor-appointments"
          className={`flex items-center p-2 rounded-lg hover:bg-slate-200 duration-300 ${
            pathname === "/doctor-appointments"
              ? "bg-slate-200 border-r-4 border-cyan-800"
              : ""
          }`}
        >
          <FaCalendarAlt className="mr-3 text-cyan-800" />
          Appointments
        </NavLink>
      </div>
      {/* Add Doctor Link */}
      <div className="mb-4">
        <NavLink
          to="/doctor-profile"
          className={`flex items-center p-2 rounded-lg hover:bg-slate-200 duration-300 ${
            pathname === "/doctor-profile"
              ? "bg-slate-200 border-r-4 border-cyan-800"
              : ""
          }`}
        >
          <FaUserMd className="mr-3 text-cyan-800" />
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default DoctorLeftSide;
