import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaListAlt,
} from "react-icons/fa"; // Import icons from react-icons

const AdminLeftSide = () => {
  const { pathname } = useLocation(); // Get the current route

  return (
    <div className="bg-gray-100 sm:w-64 sm:h-screen p-4 shadow-lg">
      {" "}
      {/* Adjust sidebar style */}
      <h2 className="text-2xl font-bold mb-4 text-cyan-800">Admin Panel</h2>
      {/* Dashboard Link */}
      <div className="mb-4">
        <NavLink
          to="/admin-dashboard"
          className={`flex items-center p-2 rounded-lg hover:bg-slate-200 duration-300 ${
            pathname === "/admin-dashboard"
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
          to="/admin-appointments"
          className={`flex items-center p-2 rounded-lg hover:bg-slate-200 duration-300 ${
            pathname === "/admin-appointments"
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
          to="/admin-add-doctor"
          className={`flex items-center p-2 rounded-lg hover:bg-slate-200 duration-300 ${
            pathname === "/admin-add-doctor"
              ? "bg-slate-200 border-r-4 border-cyan-800"
              : ""
          }`}
        >
          <FaUserMd className="mr-3 text-cyan-800" />
          Add Doctor
        </NavLink>
      </div>
      {/* Doctor List Link */}
      <div className="mb-4">
        <NavLink
          to="/admin-doctor-list"
          className={`flex items-center p-2 rounded-lg hover:bg-slate-200 duration-300 ${
            pathname === "/admin-doctor-list"
              ? "bg-slate-200 border-r-4 border-cyan-800"
              : ""
          }`}
        >
          <FaListAlt className="mr-3 text-cyan-800" />
          Doctor List
        </NavLink>
      </div>
    </div>
  );
};

export default AdminLeftSide;
