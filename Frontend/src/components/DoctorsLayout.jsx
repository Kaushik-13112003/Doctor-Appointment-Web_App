import React from "react";
import { doctors } from "../assets/data";
import { NavLink } from "react-router-dom";

const DoctorsLayout = () => {
  return (
    <>
      <div className=" flex justify-center flex-col gap-5 items-center mt-[50px]">
        <h1 className="text-2xl font-bold mb-5">Top Doctors for Appointment</h1>
        <div className="grid sm:grid-cols-3 md:grid-cols-4 gird-cols-2 gap-6">
          {doctors.map((ele) => {
            return (
              <>
                <NavLink
                  to={`/doctor/${ele._id}`}
                  className="flex flex-col rounded-lg border border-black hover:shadow-[2px_2px_blue] hover:cursor-pointer duration-500"
                >
                  <div className="h-[200px]">
                    <img
                      src={ele.image ? "./banner.png" : ""}
                      alt={ele.name}
                      className="h-[100%] rounded-lg "
                    />
                  </div>

                  <div className="p-3">
                    <p>Avaliable</p>
                    <h1 className=" font-bold  ">{ele.name}</h1>
                    <p>{ele.specialty}</p>
                  </div>
                </NavLink>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DoctorsLayout;
