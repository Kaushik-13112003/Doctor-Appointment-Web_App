import React from "react";
import Banner from "./Banner";
import { specialtyData } from "../assets/data";
import { NavLink, useNavigate } from "react-router-dom";
import FindBySpeciality from "./FindBySpeciality";
import DoctorsLayout from "../components/DoctorsLayout";
import { AiOutlineArrowRight } from "react-icons/ai";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Banner />

      <FindBySpeciality />

      <DoctorsLayout />

      <div className=" flex items-center justify-center mt-5">
        <NavLink
          to={`/all-doctors`}
          className={
            "hover:text-cyan-500 flex gap-2 items-center duration-500  text-cyan-800"
          }
        >
          more doctors
          <AiOutlineArrowRight className="mt-2" />
        </NavLink>
      </div>
    </>
  );
};

export default Home;
