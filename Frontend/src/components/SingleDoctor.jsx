import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../assets/data";
import Back from "./Back";
import SuggestedDoctors from "./SuggestedDoctors";
import { useQuery } from "@tanstack/react-query";

const SingleDoctor = () => {
  const { id } = useParams(null);
  const [singleDoctorData, setSingleDoctorData] = useState("");
  const [selectTime, setSelectTime] = useState("");
  const [selectDay, setSelectDay] = useState("");
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  //   const [selectTime, setSelectTime] = useState("");

  useEffect(() => {
    const filterDoctor = doctors.filter((ele) => {
      return ele._id == id;
    });
    setSingleDoctorData(filterDoctor[0]);
    setSelectDay(filterDoctor[0]?.availability[0]?.day);
  }, [id]);

  return (
    <>
      <Back />

      <div className="flex gap-6 mb-6 sm:flex-row flex-col sm:items-start  items-center">
        <div className="h-[300px] sm:w-[300px] flex flex-col border border-cyan-800 shadow-[1px_2px_cyan] ">
          <img
            src={singleDoctorData.image ? "/banner.png" : ""}
            alt={singleDoctorData.name}
            className="h-[100%] w-[100%]  "
          />
          <p className="bg-green-500  text-white p-2  text-center">Avaliable</p>
        </div>

        <div className="flex  gap-5 flex-col">
          <h1 className=" -mt-[8px] font-bold text-2xl ">
            {singleDoctorData.name}
          </h1>
          <p>{singleDoctorData.about}</p>
          <p>
            Degree :{" "}
            <span className=" text-cyan-800 font-bold">
              {singleDoctorData.degree}
            </span>
          </p>
          <p>
            Specialty :{" "}
            <span className=" text-cyan-800 font-bold">
              {singleDoctorData.specialty}
            </span>
          </p>
          <p>
            Experience :{" "}
            <span className=" text-cyan-800 font-bold">
              {singleDoctorData.experience}
            </span>
          </p>
          <p>
            Fees :{" "}
            <span className=" text-cyan-800 font-bold">
              {singleDoctorData.fees}
            </span>
          </p>{" "}
          {/* address */}
          <div className="flex gap-2">
            <p className=" font-bold text-1xl ">Address</p>
            <p>: {singleDoctorData?.address}</p>
          </div>
          {/* booking slots */}
          {authenticatedUser?.role === "Patient" && (
            <>
              <div>
                <h1 className=" font-bold text-2xl mt-7 ">Booking Slots</h1>
                <p className="text-yellow-700">
                  choose slots comfortable to you
                </p>
                <div className="flex items-center gap-2">
                  <p className="bg-slate-400 p-2 rounded-md w-[2px]"></p>Not
                  Avaliable
                </div>
                {/* days */}
                <div className="flex items-center gap-3 mt-8 mb-5">
                  <div className=" grid md:grid-cols-4 grid-cols-3 gap-3">
                    {singleDoctorData?.availability?.map((ele) => {
                      return (
                        <button
                          className={`btn text-center gap-5  w-[100px]    text-white p-2 rounded-md hover:bg-cyan-400 duration-500 cursor-pointer  ${
                            ele.day === selectDay
                              ? "bg-cyan-400"
                              : "bg-cyan-800"
                          }`}
                          onClick={(e) => {
                            setSelectDay(ele.day);
                            setSelectTime("");
                          }}
                        >
                          {ele.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* time */}
                <div className=" flex">
                  <div className=" grid md:grid-cols-3 sm:grid-col-2 grid-cols-2 gap-3">
                    {singleDoctorData?.availability
                      ?.filter((ele) => {
                        return ele.day === selectDay;
                      })
                      .map((slotTime) => {
                        return slotTime.slots.map((time) => {
                          return (
                            <button
                              onClick={(e) => setSelectTime(time.time)}
                              className={`text-center gap-5 hover:bg-cyan-400 hover:duration-500  text-white p-2 rounded-md  ${
                                time.time === selectTime
                                  ? "bg-cyan-400  duration-500 cursor-pointer"
                                  : "bg-cyan-800 "
                              }  ${!time.available ? "bg-slate-400" : ""}`}
                              disabled={!time.available}
                            >
                              {time.time}
                            </button>
                          );
                        });
                      })}
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(-1)}
                className=" mb-8 w-[170px] mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-cyan-500 duration-500"
              >
                Book Appointment
              </button>
            </>
          )}
        </div>
      </div>

      {/* SuggestedDoctors */}
      <SuggestedDoctors singleDoctorData={singleDoctorData}></SuggestedDoctors>
    </>
  );
};

export default SingleDoctor;
