import React from "react";
import AdminHome from "./admin-layout/AdminHome";
import AppointmentLayout from "./admin-layout/AppointmentLayout";
import { adminAllAppointmentData } from "../assets/data";
import { useQuery } from "@tanstack/react-query";
import useAdminAppointments from "./useAdminAppointment";

const AdminDashboard = () => {
  const { data: allDoctors } = useQuery({ queryKey: ["allDoctors"] });

  const { data: adminAppointments, isLoading } = useAdminAppointments();
  // console.log(adminAppointments);

  if (isLoading) {
    return <div className="text-center mt-7">Loading...</div>;
  }

  return (
    <>
      <AdminHome>
        {/* overview */}
        <div className="flex items-center gap-3 justify-between sm:flex-row flex-col">
          <div className="w-[100%] bg-cyan-800 text-white p-2 rounded-md flex flex-col items-center">
            <p className="font-bold text-2xl ">
              {allDoctors?.length > 0 ? allDoctors?.length : 0}
            </p>
            <h1>Doctors</h1>
          </div>

          <div className="w-[100%] bg-cyan-800 text-white p-2 rounded-md flex flex-col items-center">
            <p className="font-bold text-2xl ">
              {adminAppointments && adminAppointments?.length}
            </p>
            <h1>Appointments</h1>
          </div>

          <div className="w-[100%] bg-cyan-800 text-white p-2 rounded-md flex flex-col items-center">
            <p className="font-bold text-2xl ">
              {" "}
              ₹
              {adminAppointments &&
                adminAppointments?.reduce((acc, ele) => {
                  return ele?.status === "Completed"
                    ? (acc += ele?.doctor?.fees)
                    : 0;
                }, 0)}
            </p>
            <h1>Total Amount</h1>
          </div>
        </div>

        {/* latest appointment */}
        <div className="mt-8">
          <AppointmentLayout
            appointmentData={adminAppointments ? adminAppointments : []}
            type="Latest"
          ></AppointmentLayout>
        </div>
      </AdminHome>
    </>
  );
};

export default AdminDashboard;
