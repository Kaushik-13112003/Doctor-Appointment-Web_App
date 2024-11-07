import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { doctors } from "../assets/data";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";

const RightSide = ({ setFilterDoctors }) => {
  const { speciality } = useParams(); // Capture the dynamic route parameter

  //getting logged in authenticated user
  const { data: allDoctors, isLoading } = useQuery({
    queryKey: ["findBySpeciality", speciality],

    queryFn: async () => {
      if (!speciality) {
        return;
      }
      try {
        const res = await fetch(`/api/doctor/speciality/${speciality}`, {
          method: "GET",
        });

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          return dataFromResponse?.allDoctors;
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isLoading) {
    return <div className="text-center mt-7">Loading...</div>;
  }

  return (
    <div>
      {allDoctors?.length > 0 ? (
        allDoctors?.map((ele, index) => (
          <div
            key={index}
            className={`p-6  border border-gray-200 flex sm:flex-row flex-col gap-4   mb-7`}
          >
            <NavLink
              to={`/doctor/${ele?._id}`}
              className="h-[180px] w-[180px] flex flex-col border border-cyan-800  mb-4 "
            >
              <img
                src={ele?.image ? ele?.image : "./profile.jpg"}
                alt={ele?.name}
                className="h-[100%] w-[100%]  "
              />
              <p
                className={`w-[180px]  ${
                  ele?.available ? "bg-green-500 " : "bg-red-500 "
                } text-white   text-center`}
              >
                {ele?.available ? "Avaliable" : "Not Avaliable"}
              </p>
            </NavLink>

            <div className="flex  gap-5 flex-col">
              <h1 className=" sm:-mt-[8px] mt-3 font-bold text-2xl ">
                {ele.name}
              </h1>
              <p>
                Specialty :{" "}
                <span className=" text-cyan-800 font-bold">
                  {ele?.speciality}
                </span>
              </p>
              <p>
                Fees : ₹
                <span className=" text-cyan-800 font-bold">{ele.fees}</span>
              </p>{" "}
              <NavLink
                to={`/doctor/${ele?._id}`}
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
