import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import useLogout from "./useLogout";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // State for profile dropdown
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });
  const { handleLogout } = useLogout();

  return (
    <>
      <div className="flex justify-between items-center pt-6 pb-6 bg-white">
        <NavLink to="/">
          <div className="text-xl font-bold hover:text-cyan-800 duration-500">
            CureConnect
          </div>
        </NavLink>

        <div className="hidden md:flex gap-4 items-center">
          <NavLink
            to="/"
            className={`hover:text-cyan-500 hover:border-cyan-500 duration-500 ${
              pathname === "/" ? "text-cyan-800 border-b-2 border-cyan-800" : ""
            }`}
          >
            Home
          </NavLink>
          <NavLink
            to="/all-doctors"
            className={`hover:text-cyan-500 hover:border-cyan-500 duration-500 ${
              pathname === "/all-doctors"
                ? "text-cyan-800 border-b-2 border-cyan-800"
                : ""
            }`}
          >
            Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={`hover:text-cyan-500 hover:border-cyan-500 duration-500 ${
              pathname === "/about"
                ? "text-cyan-800 border-b-2 border-cyan-800"
                : ""
            }`}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={`hover:text-cyan-500 hover:border-cyan-500 duration-500 ${
              pathname === "/contact"
                ? "text-cyan-800 border-b-2 border-cyan-800"
                : ""
            }`}
          >
            Contact
          </NavLink>
        </div>

        {authenticatedUser ? (
          <div className="flex gap-3 items-center cursor-pointer relative">
            <div
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <img
                src={authenticatedUser?.image || "/banner.png"}
                alt={authenticatedUser?.name}
                className="w-[40px] h-[40px] rounded-full"
              />
            </div>
            {isProfileDropdownOpen && (
              <div className="absolute text-white bg-cyan-800 top-full right-0 mt-2 w-40  shadow-lg rounded-lg z-10">
                <NavLink
                  to="/my-appointments"
                  className="block px-4 py-2  hover:bg-cyan-500"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  My Appointments
                </NavLink>
                <NavLink
                  to="/user-profile"
                  className="block px-4 py-2  hover:bg-cyan-500"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="ml-auto md:ml-0">
            <NavLink
              to="/register"
              className="bg-cyan-800 p-2 rounded-lg text-white hover:bg-cyan-500 duration-500"
            >
              Create Account
            </NavLink>
          </div>
        )}

        <div className="md:hidden ml-3 mt-2">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-cyan-800 flex flex-col items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 mr-3 text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <AiOutlineClose size={24} />
          </button>
          <NavLink
            to="/"
            className={`text-white text-2xl mb-4 ${
              pathname === "/" ? "font-bold underline" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/all-doctors"
            className={`text-white text-2xl mb-4 ${
              pathname === "/all-doctors" ? "font-bold underline" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={`text-white text-2xl mb-4 ${
              pathname === "/about" ? "font-bold underline" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={`text-white text-2xl mb-4 ${
              pathname === "/contact" ? "font-bold underline" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </NavLink>
          {authenticatedUser ? (
            <button
              onClick={handleLogout}
              className="w-[100px] bg-cyan-400 text-white p-2 rounded-md hover:bg-cyan-700 duration-500"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/register"
              className="text-xl bg-white text-cyan-800 p-2 rounded-lg mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Account
            </NavLink>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
