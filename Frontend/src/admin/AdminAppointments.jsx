import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { adminAllAppointmentData } from "../assets/data";
import AdminHome from "./admin-layout/AdminHome";
import AppointmentLayout from "./admin-layout/AppointmentLayout";

const AdminAppointments = () => {
  return (
    <AdminHome>
      <AppointmentLayout
        appointmentData={adminAllAppointmentData}
        type="All"
      ></AppointmentLayout>
    </AdminHome>
  );
};

export default AdminAppointments;
