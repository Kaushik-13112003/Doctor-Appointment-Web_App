import React, { useEffect, useState } from "react";
import { doctors } from "../assets/data";
import DoctorsLayout from "./DoctorsLayout";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

const SuggestedDoctors = ({ singleDoctor }) => {
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  const { data: suggestedDoctors, isLoading } = useQuery({
    queryKey: ["suggestedDoctors", singleDoctor],

    queryFn: async () => {
      try {
        const res = await fetch(
          `/api/doctor/suggested-doctor?speciality=${singleDoctor?.speciality}`,
          {
            method: "GET",
          }
        );

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          const filterDoctors = dataFromResponse?.allDoctors?.filter((ele) => {
            return ele?.email !== singleDoctor?.email;
          });
          return filterDoctors;
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
    <>
      {suggestedDoctors?.length > 0 && (
        <>
          <h1 className="font-bold text-center text-2xl mt-[100px]">
            Suggested Doctors
          </h1>
          <div className=" flex  flex-col gap-5 mb-10  items-center mt-[25px]">
            <div className="grid sm:grid-cols-3 md:grid-cols-3 gird-cols-2 gap-6">
              {suggestedDoctors &&
                suggestedDoctors?.map((ele) => {
                  return (
                    <>
                      <NavLink
                        to={`/doctor/${ele._id}`}
                        className="flex flex-col rounded-t border border-black hover:shadow-[2px_2px_blue] hover:cursor-pointer duration-500"
                      >
                        <div className="sm:h-[220px] sm:w-[220px]">
                          <img
                            src={ele.image ? ele.image : "/profile.jpg"}
                            // src="/banner.png"
                            alt={ele?.name}
                            className="h-[100%] w-[100%]  rounded-t  border-b border-gray-400"
                          />
                        </div>

                        <div className="p-3">
                          <h1 className=" font-bold text-2xl ">{ele?.name}</h1>
                          <p>speciality : {ele?.speciality}</p>
                          <p>Fees : ₹{ele?.fees}</p>
                        </div>
                      </NavLink>
                    </>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SuggestedDoctors;
