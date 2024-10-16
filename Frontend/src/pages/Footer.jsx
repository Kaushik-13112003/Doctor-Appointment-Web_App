import React from "react";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa"; // Import icons
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cyan-800 w-[100%] mt-7 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <div className=" mb-6">
          <h2 className="text-2xl font-bold">CureConnect</h2>
          <p className="mt-2">Connecting Patients with the Best Doctors</p>
        </div>

        {/* Quick Links */}

        <div className="flex gap-10 mb-6  sm:flex-row  flex-col">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <NavLink to="/" className="hover:underline">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:underline">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:underline">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-doctors" className="hover:underline">
                  All Doctors
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col mb-8">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <NavLink
                  to="mailto:support@yourapp.com"
                  className="hover:underline"
                  target="_blank"
                >
                  Email: support@yourapp.com
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="tel:+1234567890"
                  target="_blank"
                  className="hover:underline"
                >
                  Phone: +1 234 567 890
                </NavLink>
              </li>
              <li>Address: 123 Health Plaza, City, Country</li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex  space-x-6 mb-6">
          <NavLink
            to="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaInstagram size={24} />
          </NavLink>
          <NavLink
            to="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaTwitter size={24} />
          </NavLink>
          <NavLink
            to="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaFacebookF size={24} />
          </NavLink>
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-t border-gray-400 pt-7">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CureConnect. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
