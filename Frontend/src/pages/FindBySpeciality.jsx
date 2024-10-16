import React from "react";
import { specialtyData } from "../assets/data";
import { NavLink } from "react-router-dom";

const FindBySpeciality = () => {
  return (
    <>
      {/* Find by speciality */}
      <div className="flex flex-col gap-6 mt-8 items-center">
        <h1 className="text-black font-bold text-2xl">Find By Speciality</h1>
        <div className="flex justify-center items-center flex-wrap gap-8 w-[100%]">
          {specialtyData.map((ele) => (
            <NavLink
              to={`/${
                ele.specialty ? ele.specialty.toLowerCase() : "all-doctors"
              }`}
              key={ele.id}
              className="flex  flex-col gap-3 items-center"
            >
              <img
                src="./banner.png"
                alt={ele.specialty}
                className="w-[100px] border-black hover:shadow-[2px_2px_blue] hover:cursor-pointer duration-500 h-[100px] rounded-full"
              />
              <h1>{ele.specialty}</h1>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default FindBySpeciality;
