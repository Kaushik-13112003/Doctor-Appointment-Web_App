import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { adminAllAppointmentData } from "../assets/data";
import AdminHome from "./admin-layout/AdminHome";
import AppointmentLayout from "./admin-layout/AppointmentLayout";
import { useQuery } from "@tanstack/react-query";
import useAdminAppointments from "./useAdminAppointment";

const AdminAppointments = () => {
  const { data: adminAllAppointmentData } = useAdminAppointments();

  return (
    <AdminHome>
      <AppointmentLayout
        appointmentData={adminAllAppointmentData ? adminAllAppointmentData : []}
        type="All"
      ></AppointmentLayout>
    </AdminHome>
  );
};

export default AdminAppointments;
