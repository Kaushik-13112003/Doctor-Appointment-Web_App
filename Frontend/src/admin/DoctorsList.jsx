import React from "react";
import AdminHome from "./admin-layout/AdminHome";
import DoctorsLayout from "../components/DoctorsLayout";
import Speciality from "../components/Speciality";
import Doctors from "../pages/Doctors";
import { doctors } from "../assets/data";
import { NavLink } from "react-router-dom";

const DoctorsList = () => {
  return (
    <>
      <AdminHome>
        <div className=" flex justify-center flex-col gap-5 items-center">
          <div className="grid sm:grid-cols-2 md:grid-cols-2 gird-cols-2 gap-6">
            {doctors.map((ele) => {
              return (
                <>
                  <NavLink
                    to={`/doctor/${ele._id}`}
                    className="flex flex-col rounded-lg border border-black hover:shadow-[2px_2px_blue] hover:cursor-pointer duration-500"
                  >
                    <div className="h-[250px] ">
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
        </div>{" "}
      </AdminHome>
    </>
  );
};

export default DoctorsList;
