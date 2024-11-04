import React from "react";
import { adminAllAppointmentData } from "../assets/data";
import DoctorAppointmentLayout from "./doctor-layout/DoctorAppointmentLayout";
import DoctorHome from "./doctor-layout/DoctorHome";
import { useQuery } from "@tanstack/react-query";
import useDoctorAppointments from "./useDoctorAppointements";

const DoctorAppointments = () => {
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
      <DoctorAppointmentLayout
        appointmentData={doctorAppointments ? doctorAppointments : []}
        type="All"
      ></DoctorAppointmentLayout>
    </DoctorHome>
  );
};

export default DoctorAppointments;
