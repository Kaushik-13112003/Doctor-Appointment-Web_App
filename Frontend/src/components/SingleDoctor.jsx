import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doctors, weekDays } from "../assets/data";
import Back from "./Back";
import SuggestedDoctors from "./SuggestedDoctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SingleDoctor = () => {
  const { id } = useParams(null);
  const navigate = useNavigate();

  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  //getting logged in authenticated user
  const { data: singleDoctor, isLoading } = useQuery({
    queryKey: ["singleDoctor", id],

    queryFn: async () => {
      if (!id) {
        return;
      }
      try {
        const res = await fetch(`/api/doctor/single-doctor/${id}`, {
          method: "GET",
        });

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          return dataFromResponse.singleDoctor;
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  //get slots
  const getAvaliableSlots = async () => {
    setDocSlots([]);

    //getting current date
    let today = new Date();
    // console.log(today);

    //next 7-day
    for (let i = 0; i < 7; i++) {
      //getting date with index

      let currentDate = new Date(today);

      currentDate.setDate(today.getDate() + i);
      // console.log(currentDate);

      //setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        //removed booked time slots
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "-" + month + "-" + year;

        const slotTime = formattedTime;

        const isSlotBooked =
          singleDoctor?.slots_booked[slotDate] &&
          singleDoctor?.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotBooked) {
          //add slot to arr
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        //increment time by 30 minute
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => {
        return [...prev, timeSlots];
      });
    }
  };

  //new-appointment
  const { mutate } = useMutation({
    mutationFn: async ({ patient, doctor, slotDate, slotDay, slotTime }) => {
      if (!slotTime || !slotDate) {
        toast.error("select day & time slot");
        return;
      }

      try {
        const res = await fetch("/api/appointment/new-appointment", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            patient,
            doctor,
            slotDate,
            slotDay,
            slotTime,
          }),
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(
            dataFromResponse?.msg || "Appointment Booked Successfully"
          );

          queryClient.invalidateQueries({ queryKey: ["singleDoctor"] });

          navigate("/my-appointments");
        } else {
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleAppointment = (e) => {
    e.preventDefault();
    if (authenticatedUser && singleDoctor) {
      const date = docSlots[slotIndex][0]?.datetime;
      console.log(slotIndex);

      let day = date?.getDate();
      let month = date?.getMonth() + 1;
      let year = date?.getFullYear();

      const slotDate = day + "-" + month + "-" + year;
      // console.log(slotDate);
      // console.log(slotTime);
      // console.log();

      mutate({
        patient: authenticatedUser?._id,
        doctor: singleDoctor?._id,
        slotDate: slotDate,
        slotDay: weekDays[date.getDay()],
        slotTime: slotTime,
      });
    }
  };

  useEffect(() => {
    getAvaliableSlots();
  }, [singleDoctor]);

  if (isLoading) {
    return <div className="text-center mt-7">Loading...</div>;
  }

  return (
    <>
      <Back />

      <div className="flex gap-6 mb-6 sm:flex-row flex-col sm:items-start  items-start">
        <div className="sm:h-[300px] sm:w-[30%] flex flex-col   ">
          <img
            src={singleDoctor?.image ? singleDoctor?.image : "/profile.jpg"}
            alt={singleDoctor?.name}
            className="h-[100%] w-[100%] border border-gray-200 "
          />
          <p
            className={` ${
              singleDoctor?.available ? "bg-green-500" : "bg-red-500"
            }  text-white p-2  text-center`}
          >
            {singleDoctor?.available ? "Avaliable" : "Not Avaliable"}
          </p>
        </div>

        <div className="flex  gap-5 flex-col sm:w-[70%]">
          <h1 className=" -mt-[8px] uppercase font-bold text-2xl ">
            {singleDoctor?.name}
          </h1>
          <p>{singleDoctor?.about}</p>
          <p>
            Degree :{" "}
            <span className=" text-cyan-800 font-bold">
              {singleDoctor?.degree}
            </span>
          </p>
          <p>
            Specialty :{" "}
            <span className=" text-cyan-800 font-bold">
              {singleDoctor?.speciality}
            </span>
          </p>
          <p>
            Experience :{" "}
            <span className=" text-cyan-800 font-bold">
              {singleDoctor?.experience}
            </span>
          </p>
          <p>
            Fees :{" "}
            <span className=" text-cyan-800 font-bold">
              ₹{singleDoctor?.fees}
            </span>
          </p>{" "}
          {/* address */}
          <div className="flex gap-2">
            <p className="  text-1xl ">Address</p>
            <p>: {singleDoctor?.address}</p>
          </div>
          {/* booking slots */}
          {authenticatedUser?.role === "patient" &&
            singleDoctor?.available !== false && (
              <div className="flex flex-col  gap-3 sm:justify-start justify-center">
                <div className="flex flex-wrap items-center w-[100%]  gap-4 ">
                  {docSlots.length &&
                    docSlots.map((ele, idx) => {
                      return (
                        <div
                          key={idx}
                          onClick={() => setSlotIndex(idx)}
                          className={`flex gap-2 w-[130px] items-center flex-col  text-white p-2 rounded-md cursor-pointer hover:bg-cyan-800 duration-500 ${
                            slotIndex === idx ? "bg-cyan-800" : "bg-cyan-500"
                          }`}
                        >
                          <p>{ele[0] && weekDays[ele[0].datetime.getDay()]}</p>
                          <p>{ele[0] && ele[0].datetime.getDate()}</p>
                        </div>
                      );
                    })}
                </div>

                {/* time */}
                <div
                  className={`flex flex-wrap mt-6 items-center w-[100%]  gap-4`}
                >
                  {docSlots.length &&
                    docSlots[slotIndex].map((ele, idx) => {
                      return (
                        <div
                          key={idx}
                          onClick={() => setSlotTime(ele.time)}
                          className={`${
                            ele.time === slotTime
                              ? "bg-cyan-800"
                              : "bg-cyan-500"
                          }  text-white p-2 rounded-md cursor-pointer hover:bg-cyan-800  hover:duration-500`}
                        >
                          {ele.time}
                        </div>
                      );
                    })}
                </div>

                <button
                  onClick={handleAppointment}
                  className="w-[160px] mt-6 bg-cyan-800 text-white p-2 rounded-md hover:bg-cyan-500 duration-500"
                >
                  Book Appointment
                </button>
              </div>
            )}
        </div>
      </div>

      {/* SuggestedDoctors */}
      <SuggestedDoctors
        singleDoctor={singleDoctor ? singleDoctor : ""}
      ></SuggestedDoctors>
    </>
  );
};

export default SingleDoctor;
