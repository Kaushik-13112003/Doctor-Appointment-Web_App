import React from "react";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <Back />

      <div className="flex gap-6">
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
            <span className=" text-cyan-800 font-bold">Kaushik Prajapati</span>
          </p>
          <p>
            EMail Id :{" "}
            <span className=" text-cyan-800 font-bold">kp@gmail.com</span>
          </p>

          <p>
            Phone : <span className=" text-cyan-800 font-bold">9087623122</span>
          </p>

          <p>
            Address :{" "}
            <span className=" text-cyan-800 font-bold">123, local plaza</span>
          </p>

          <p>
            Gender : <span className=" text-cyan-800 font-bold">Male</span>
          </p>

          <p>
            Birthday :{" "}
            <span className=" text-cyan-800 font-bold">12/02/2003</span>
          </p>

          <button
            onClick={() => navigate("/update-profile")}
            className="w-[100px] mb-8 bg-cyan-800 text-white p-2 rounded-md hover:bg-cyan-500 duration-500"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
