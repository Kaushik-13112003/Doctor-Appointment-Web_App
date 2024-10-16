import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { doctors } from "../assets/data";
import { AiOutlineArrowRight } from "react-icons/ai";

const RightSide = () => {
  const { specialty } = useParams(); // Capture the dynamic route parameter
  const [doctorsData, setDoctorsData] = useState([]);

  useEffect(() => {
    if (!specialty || specialty === "all-doctors") {
      // Default to showing all doctors if no specific specialty is selected
      setDoctorsData(doctors);
    } else {
      const filterData = doctors.filter((ele) => {
        return ele.specialty.toLowerCase() === specialty.toLowerCase();
      });
      setDoctorsData(filterData);
    }
  }, [specialty]);

  return (
    <div>
      {doctorsData.length > 0 ? (
        doctorsData.map((ele, index) => (
          <div
            key={index}
            className="p-4 border-b  flex sm:flex-row flex-col gap-4 border-gray-300"
          >
            <NavLink
              to={`/doctor/${ele._id}`}
              className="h-[200px] sm:w-[200px] flex flex-col border border-cyan-800 shadow-[1px_2px_cyan] "
            >
              <img
                src={ele.image ? "/banner.png" : ""}
                alt={ele.name}
                className="h-[100%] w-[100%]  "
              />
              <p className="bg-green-500  text-white p-2  text-center">
                Avaliable
              </p>
            </NavLink>

            <div className="flex  gap-5 flex-col">
              <h1 className=" -mt-[8px] font-bold text-2xl ">{ele.name}</h1>
              <p>
                Specialty :{" "}
                <span className=" text-cyan-800 font-bold">
                  {ele.specialty}
                </span>
              </p>
              <p>
                Fees :{" "}
                <span className=" text-cyan-800 font-bold">{ele.fees}</span>
              </p>{" "}
              <NavLink
                to={`/doctor/${ele._id}`}
                className={
                  "hover:text-cyan-500 flex gap-2 items-center duration-500  text-cyan-800"
                }
              >
                more about doctor
                <AiOutlineArrowRight className="mt-2" />
              </NavLink>
            </div>
          </div>
        ))
      ) : (
        <p>No doctors available for this specialty.</p>
      )}
    </div>
  );
};

export default RightSide;
