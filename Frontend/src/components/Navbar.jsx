import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Importing hamburger and close icons

const Navbar = () => {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  return (
    <>
      <div className="flex justify-between items-center pt-6 pb-6 bg-white">
        <NavLink to="/">
          <div className="text-xl font-bold hover:text-cyan-800 duration-500">
            CureConnect
          </div>
        </NavLink>

        {/* NavLinks - Shown in larger screens and hidden in mobile */}
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

        {/* Create Account Button - Always Visible */}
        <div className="ml-auto md:ml-0">
          <NavLink
            to="/register"
            className="bg-cyan-800 p-2 rounded-lg text-white hover:bg-cyan-500 duration-500"
          >
            Create Account
          </NavLink>
        </div>

        {/* Hamburger Menu for Mobile */}
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

      {/* Mobile Menu - Full screen with cyan background and nav links */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-cyan-800 flex flex-col items-center justify-center z-50">
          {/* Close Button */}
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
          <button
            className=" text-xl bg-white text-cyan-800 p-2 rounded-lg mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Create Account
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
