import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import useLogout from "../../components/useLogout";

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  const { handleLogout } = useLogout();

  const handleLogoClick = () => {
    if (authenticatedUser?.role === "admin") {
      navigate("/admin-dashboard"); // Redirect to admin dashboard
    } else if (authenticatedUser?.role === "doctor") {
      navigate("/doctor-dashboard"); // Redirect to doctor dashboard
    } else {
      navigate("/access-denied"); // Redirect to access denied for other roles
    }
  };

  return (
    <>
      <div className="flex justify-between items-center pt-6 pb-6 bg-white">
        <div onClick={handleLogoClick} className="cursor-pointer">
          <div className="text-xl font-bold hover:text-cyan-800 duration-500">
            CureConnect
          </div>
        </div>

        {/* Create Account Button - Always Visible */}
        {authenticatedUser ? (
          <button
            onClick={handleLogout}
            className="w-[100px] bg-cyan-800 text-white p-2 rounded-md hover:bg-cyan-500 duration-500"
          >
            Logout
          </button>
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
      </div>
    </>
  );
};

export default Header;
