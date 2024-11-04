import React from "react";
import { useNavigate } from "react-router-dom";
import Back from "../components/Back";
import DoctorHome from "./doctor-layout/DoctorHome";
import { useQuery } from "@tanstack/react-query";

const DoctorProfile = () => {
  const navigate = useNavigate();

  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });
  // console.log(authenticatedUser);
  return (
    <>
      {/* <Back /> */}

      {authenticatedUser?.doctorProfile && (
        <DoctorHome>
          <div className="flex flex-col p-7 gap-6 -mt-6">
            <div>
              <img
                src={`${
                  authenticatedUser?.doctorProfile?.image
                    ? authenticatedUser?.doctorProfile?.image
                    : "./banner.png"
                }`}
                alt=""
                className=" h-[150px] w-[150px] rounded-md"
              />
            </div>

            <div className=" flex flex-col gap-3 -mt-[3px]">
              <p>
                Name :{" "}
                <span className=" text-cyan-800 font-bold">
                  {authenticatedUser?.doctorProfile.name}
                </span>
              </p>
              <p>
                EMail Id :{" "}
                <span className=" text-cyan-800 font-bold">
                  {" "}
                  {authenticatedUser?.doctorProfile.email}
                </span>
              </p>

              <p>
                Phone :{" "}
                <span className=" text-cyan-800 font-bold">
                  {" "}
                  {authenticatedUser?.doctorProfile.phone}
                </span>
              </p>

              <p>
                Degree :{" "}
                <span className=" text-cyan-800 font-bold">
                  {" "}
                  {authenticatedUser?.doctorProfile.degree}
                </span>
              </p>

              <p>
                About :{" "}
                <span className=" text-cyan-800 font-bold">
                  {authenticatedUser?.doctorProfile.about}
                </span>
              </p>

              <p>
                Speciality :{" "}
                <span className=" text-cyan-800 font-bold">
                  {" "}
                  {authenticatedUser?.doctorProfile.speciality}
                </span>
              </p>

              <p>
                Experience :{" "}
                <span className=" text-cyan-800 font-bold">
                  {" "}
                  {authenticatedUser?.doctorProfile.experience} - Years
                </span>
              </p>

              <p>
                Gender :{" "}
                <span className=" text-cyan-800 font-bold">
                  {" "}
                  {authenticatedUser?.doctorProfile.gender}
                </span>
              </p>

              <p>
                Fees :{" "}
                <span className=" text-cyan-800 font-bold">
                  ₹{authenticatedUser?.doctorProfile.fees}
                </span>
              </p>

              <button
                onClick={() => navigate("/update-doctor-profile")}
                className="w-[100px] mb-8 bg-cyan-800 text-white p-2 rounded-md hover:bg-cyan-500 duration-500"
              >
                Update
              </button>
            </div>
          </div>
        </DoctorHome>
      )}
    </>
  );
};

export default DoctorProfile;
