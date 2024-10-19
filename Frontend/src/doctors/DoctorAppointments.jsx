import React from "react";
import { adminAllAppointmentData } from "../assets/data";
import DoctorAppointmentLayout from "./doctor-layout/DoctorAppointmentLayout";
import DoctorHome from "./doctor-layout/DoctorHome";

const DoctorAppointments = () => {
  return (
    <DoctorHome>
      <DoctorAppointmentLayout
        appointmentData={adminAllAppointmentData}
        type="All"
      ></DoctorAppointmentLayout>
    </DoctorHome>
  );
};

export default DoctorAppointments;
