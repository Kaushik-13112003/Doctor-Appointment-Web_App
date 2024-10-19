import { useQuery } from "@tanstack/react-query";
import React from "react";
import AdminHome from "../admin-layout/AdminHome";
import { useNavigate } from "react-router-dom";

const WelcomeAdmin = () => {
  const navigate = useNavigate("");
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <>
      <AdminHome>
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl">Welcome Admin</h1>
          <h1 className="font-bold text-3xl text-cyan-800">
            {authenticatedUser.name}
          </h1>

          <p className="mt-6">Your Hospital Community is Here !!</p>
          <button
            onClick={() => navigate("/admin-dashboard")}
            className=" mb-8 bg-cyan-800 text-white p-2 rounded-md hover:bg-cyan-500 duration-500"
          >
            Go to Dashboard
          </button>
        </div>
      </AdminHome>
    </>
  );
};

export default WelcomeAdmin;
