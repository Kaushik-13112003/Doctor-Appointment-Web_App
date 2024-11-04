import React from "react";
import AdminHome from "./admin-layout/AdminHome";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineArrowRight } from "react-icons/ai";

const DoctorsList = () => {
  //getting all doctors
  const { data: allDoctors, isLoading } = useQuery({
    queryKey: ["allDoctors"],

    queryFn: async () => {
      try {
        const res = await fetch("/api/admin/admin-all-doctors", {
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
    <>
      <AdminHome>
        <div className=" flex justify-center flex-col gap-5 items-center">
          {allDoctors?.length <= 0 && (
            <p className="text-center">no doctors found</p>
          )}

          {allDoctors?.length > 0 ? (
            allDoctors?.map((ele, index) => (
              <div
                key={index}
                className={`p-6 w-[100%]  border border-gray-200 flex sm:flex-row flex-col gap-4   mb-7`}
              >
                <NavLink
                  to={`/doctor/${ele?._id}`}
                  className="sm:h-[180px] sm:w-[180px] flex flex-col border border-cyan-800  mb-4 "
                >
                  <img
                    src={ele?.image ? ele?.image : "./profile.jpg"}
                    alt={ele?.name}
                    className="h-[100%] w-[100%]  "
                  />
                  <p
                    className={`sm:w-[180px]  ${
                      ele?.available ? "bg-green-500 " : "bg-red-500 "
                    } text-white   text-center`}
                  >
                    {ele?.available ? "Avaliable" : "Not Avaliable"}
                  </p>
                </NavLink>

                <div className="flex  gap-5 flex-col">
                  <h1 className=" -mt-[8px] font-bold text-2xl ">{ele.name}</h1>
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
        </div>{" "}
      </AdminHome>
    </>
  );
};

export default DoctorsList;
