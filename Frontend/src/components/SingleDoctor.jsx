import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { weekDays } from "../assets/data";
import Back from "./Back";
import SuggestedDoctors from "./SuggestedDoctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SingleDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const { data: singleDoctor, isLoading } = useQuery({
    queryKey: ["singleDoctor", id],
    queryFn: async () => {
      if (!id) return;
      const res = await fetch(`/api/doctor/single-doctor/${id}`, { method: "GET" });
      return res.ok ? (await res.json()).singleDoctor : null;
    },
  });

  const getAvaliableSlots = async () => {
    setDocSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(10, currentDate.getHours() + 1));
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const slotDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        const isSlotBooked =
          singleDoctor?.slots_booked[slotDate]?.includes(formattedTime) === undefined;

        if (isSlotBooked && (i > 0 || currentDate > new Date())) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      
      // Add only days that have available time slots
      if (timeSlots.length > 0) {
        setDocSlots((prev) => [...prev, timeSlots]);
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: async ({ patient, doctor, slotDate, slotDay, slotTime }) => {
      if (!slotTime || !slotDate) {
        toast.error("Select day & time slot");
        return;
      }

      const res = await fetch("/api/appointment/new-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient, doctor, slotDate, slotDay, slotTime }),
      });

      const dataFromResponse = await res.json();
      if (res.ok) {
        toast.success(dataFromResponse?.msg || "Appointment Booked Successfully");
        queryClient.invalidateQueries({ queryKey: ["singleDoctor"] });
        navigate("/my-appointments");
      } else {
        toast.error(dataFromResponse.msg || "Something went wrong");
      }
    },
  });

  const handleAppointment = (e) => {
    e.preventDefault();
    if (authenticatedUser && singleDoctor) {
      const date = docSlots[slotIndex][0]?.datetime;
      const slotDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      mutate({
        patient: authenticatedUser?._id,
        doctor: singleDoctor?._id,
        slotDate,
        slotDay: weekDays[date.getDay()],
        slotTime,
      });
    }
  };

  useEffect(() => {
    getAvaliableSlots();
  }, [singleDoctor]);

  if (isLoading) return <div className="text-center mt-7">Loading...</div>;

  return (
    <>
      <Back />

      <div className="flex gap-6 mb-6 sm:flex-row flex-col sm:items-start items-start">
        <div className="sm:h-[300px] sm:w-[30%] flex flex-col">
          <img
            src={singleDoctor?.image || "/profile.jpg"}
            alt={singleDoctor?.name}
            className="h-[100%] w-[100%] border border-gray-200"
          />
          <p className={`${singleDoctor?.available ? "bg-green-500" : "bg-red-500"} text-white p-2 text-center`}>
            {singleDoctor?.available ? "Available" : "Not Available"}
          </p>
        </div>

        <div className="flex gap-5 flex-col sm:w-[70%]">
          <h1 className="uppercase font-bold text-2xl">{singleDoctor?.name}</h1>
          <p>{singleDoctor?.about}</p>
          <p>Degree: <span className="text-cyan-800 font-bold">{singleDoctor?.degree}</span></p>
          <p>Specialty: <span className="text-cyan-800 font-bold">{singleDoctor?.speciality}</span></p>
          <p>Experience: <span className="text-cyan-800 font-bold">{singleDoctor?.experience}</span></p>
          <p>Fees: <span className="text-cyan-800 font-bold">₹{singleDoctor?.fees}</span></p>
          <p>Address: {singleDoctor?.address}</p>

          {authenticatedUser?.role === "patient" && singleDoctor?.available && (
            <div className="flex flex-col gap-3 sm:justify-start justify-center">
              <div className="flex flex-wrap items-center gap-4">
                {docSlots.map((daySlots, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSlotIndex(idx)}
                    className={`flex gap-2 w-[130px] items-center flex-col text-white p-2 rounded-md cursor-pointer ${
                      slotIndex === idx ? "bg-cyan-800" : "bg-cyan-500"
                    }`}
                  >
                    <p>{daySlots[0] && weekDays[daySlots[0].datetime.getDay()]}</p>
                    <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap mt-6 items-center gap-4">
                {docSlots[slotIndex]?.map((ele, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSlotTime(ele.time)}
                    className={`${ele.time === slotTime ? "bg-cyan-800" : "bg-cyan-500"} text-white p-2 rounded-md cursor-pointer`}
                  >
                    {ele.time}
                  </div>
                ))}
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

      <SuggestedDoctors singleDoctor={singleDoctor || ""} />
    </>
  );
};

export default SingleDoctor;
