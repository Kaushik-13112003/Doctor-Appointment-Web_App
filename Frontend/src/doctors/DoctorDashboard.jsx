import React from "react";
import DoctorHome from "./doctor-layout/DoctorHome";
import DoctorAppointmentLayout from "./doctor-layout/DoctorAppointmentLayout";
import { useQuery } from "@tanstack/react-query";
import useDoctorAppointments from "./useDoctorAppointements";

const DoctorDashboard = () => {
  const { data: authenticatedUser } = useQuery({
    queryKey: ["authUser"],
  });

  const doctorId = authenticatedUser?.doctorProfile?._id;
  const { data: doctorAppointments, isLoading } =
    useDoctorAppointments(doctorId);

  if (isLoading) {
    return <div className="text-center mt-7">Loading...</div>;
  }

  return (
    <DoctorHome>
      {/* Overview */}
      <div className="flex items-center gap-3 justify-between sm:flex-row flex-col">
        <div className="w-[100%] bg-cyan-800 text-white p-2 rounded-md flex flex-col items-center">
          <p className="font-bold text-2xl ">
            {authenticatedUser?.doctorProfile?.name}
          </p>
          <h1>Doctor</h1>
        </div>

        <div className="w-[100%] bg-cyan-800 text-white p-2 rounded-md flex flex-col items-center">
          <p className="font-bold text-2xl ">{doctorAppointments?.length}</p>
          <h1>Appointments</h1>
        </div>

        <div className="w-[100%] bg-cyan-800 text-white p-2 rounded-md flex flex-col items-center">
          <p className="font-bold text-2xl ">
            ₹
            {doctorAppointments &&
              doctorAppointments.reduce((acc, ele) => {
                return ele?.status === "Completed"
                  ? acc + ele?.doctor?.fees
                  : acc;
              }, 0)}
          </p>
          <h1>Total Amount</h1>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="mt-8">
        <DoctorAppointmentLayout
          appointmentData={
            doctorAppointments ? doctorAppointments.slice(0, 6) : []
          }
          type="Latest"
        />
      </div>
    </DoctorHome>
  );
};

export default DoctorDashboard;
