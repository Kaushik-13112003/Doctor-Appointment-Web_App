import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { specialtyData } from "../assets/data";

const LeftSide = () => {
  return (
    <div className="bg-gray-100 sm:w-64 sm:h-screen p-4 shadow-lg">
      <h2 className="text-2xl font-semibold text-cyan-800 mb-6">Specialties</h2>
      <ul className="flex flex-col gap-4">
        <NavLink
          to={`/all-doctors`}
          className={({ isActive }) =>
            `block p-2 rounded-lg ${
              isActive
                ? "bg-cyan-800 text-white"
                : "text-cyan-800 hover:bg-cyan-100"
            }`
          }
        >
          All
        </NavLink>
        {specialtyData.map((specialty) => (
          <li key={specialty.id}>
            <NavLink
              to={`/${specialty?.specialty}`}
              className={({ isActive }) =>
                `block p-2 rounded-lg ${
                  isActive
                    ? "bg-cyan-800 text-white"
                    : "text-cyan-800 hover:bg-cyan-100"
                }`
              }
            >
              {specialty.specialty}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSide;
