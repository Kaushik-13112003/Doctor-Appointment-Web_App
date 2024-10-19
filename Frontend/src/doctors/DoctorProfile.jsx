import React from "react";
import { useNavigate } from "react-router-dom";
import Back from "../components/Back";
import DoctorHome from "./doctor-layout/DoctorHome";

const DoctorProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <Back />

      <DoctorHome>
        <div className="flex flex-col p-7 gap-6 -mt-6">
          <div>
            <img
              src="./banner.png"
              alt=""
              className=" h-[150px] w-[150px] rounded-md"
            />
          </div>

          <div className=" flex flex-col gap-3 -mt-[3px]">
            <p>
              Name :{" "}
              <span className=" text-cyan-800 font-bold">
                Kaushik Prajapati
              </span>
            </p>
            <p>
              EMail Id :{" "}
              <span className=" text-cyan-800 font-bold">kp@gmail.com</span>
            </p>

            <p>
              Phone :{" "}
              <span className=" text-cyan-800 font-bold">9087623122</span>
            </p>

            <p>
              Degree :{" "}
              <span className=" text-cyan-800 font-bold">Gynakologist</span>
            </p>

            <p>
              About :{" "}
              <p className=" text-cyan-800 font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis possimus dolorum eum doloremque, sit itaque!
              </p>
            </p>

            <p>
              Speciality :{" "}
              <span className=" text-cyan-800 font-bold">Cardiologist</span>
            </p>

            <p>
              Experience :{" "}
              <span className=" text-cyan-800 font-bold">5 Years</span>
            </p>

            <p>
              Gender : <span className=" text-cyan-800 font-bold">Male</span>
            </p>

            <p>
              Fees : <span className=" text-cyan-800 font-bold">$ 15</span>
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
    </>
  );
};

export default DoctorProfile;
