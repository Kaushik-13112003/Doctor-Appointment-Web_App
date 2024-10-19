import React, { useState } from "react";
import { FaBars, FaCross, FaHamburger } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import DoctorLeftSide from "./DoctorLeftSide";

const DoctorHome = ({ children }) => {
  const [openLinks, setOpenLinks] = useState(false);

  return (
    <div className="flex gap-5 sm:flex-row flex-col">
      {/* Left Side: Sidebar */}

      <div>
        <div className="sm:block hidden">
          <DoctorLeftSide />
        </div>

        <div className="sm:hidden block">
          {openLinks ? (
            <div className=" relative">
              <AiOutlineClose
                className="absolute right-4 top-4"
                onClick={() => setOpenLinks(false)}
              />
              <DoctorLeftSide />
            </div>
          ) : (
            <FaBars onClick={() => setOpenLinks(!openLinks)} />
          )}
        </div>
      </div>

      {/* Right Side: Dynamic Content */}
      <div className="w-[100%] bg-white shadow-lg">
        {children} {/* Render children inside the right side */}
      </div>
    </div>
  );
};

export default DoctorHome;
