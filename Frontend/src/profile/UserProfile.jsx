import React from "react";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
  const navigate = useNavigate();
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <>
      <Back />

      <div className="flex gap-6">
        <div>
          <img
            src={`${
              authenticatedUser?.image
                ? authenticatedUser?.image
                : "./profile.jpg"
            }`}
            alt=""
            className=" h-[150px] w-[150px] rounded-md"
          />
        </div>

        <div className=" flex flex-col gap-3 -mt-[3px]">
          <p>
            Name :{" "}
            <span className=" text-cyan-800 font-bold">
              {authenticatedUser?.name}
            </span>
          </p>
          <p>
            E-Mail Id :{" "}
            <span className=" text-cyan-800 font-bold">
              {" "}
              {authenticatedUser?.email}
            </span>
          </p>

          {authenticatedUser?.phone && (
            <p>
              Phone :{" "}
              <span className=" text-cyan-800 font-bold">
                {" "}
                {authenticatedUser?.phone}
              </span>
            </p>
          )}

          {authenticatedUser?.address && (
            <p>
              Address :{" "}
              <span className=" text-cyan-800 font-bold">
                {" "}
                {authenticatedUser?.address}
              </span>
            </p>
          )}

          {authenticatedUser?.gender && (
            <p>
              Gender :{" "}
              <span className=" text-cyan-800 font-bold">
                {" "}
                {authenticatedUser?.gender}
              </span>
            </p>
          )}

          <button
            onClick={() => navigate("/update-user-profile")}
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
