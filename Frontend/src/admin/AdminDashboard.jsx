import React from "react";
import AdminHome from "./admin-layout/AdminHome";
import AppointmentLayout from "./admin-layout/AppointmentLayout";
import { adminAllAppointmentData } from "../assets/data";

const AdminDashboard = () => {
  return (
    <>
      <AdminHome>
        {/* overview */}
        <div className="flex items-center gap-3 justify-between sm:flex-row flex-col">
          <div className="w-[100%] bg-cyan-800 text-white p-2 rounded-md flex flex-col items-center">
            <p className="font-bold text-2xl ">21</p>
            <h1>Doctors</h1>
          </div>

          <div className="w-[100%] bg-cyan-800 text-white p-2 rounded-md flex flex-col items-center">
            <p className="font-bold text-2xl ">21</p>
            <h1>Patients</h1>
          </div>

          <div className="w-[100%] bg-cyan-800 text-white p-2 rounded-md flex flex-col items-center">
            <p className="font-bold text-2xl ">21</p>
            <h1>Appointments</h1>
          </div>
        </div>

        {/* latest appointment */}
        <div className="mt-8">
          <AppointmentLayout
            appointmentData={adminAllAppointmentData}
            type="Latest"
          ></AppointmentLayout>
        </div>
      </AdminHome>
    </>
  );
};

export default AdminDashboard;
