import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const DoctorAppointmentLayout = ({ appointmentData, type }) => {
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  // Cancel Appointment
  const { mutate: cancelAppointmentFunction } = useMutation({
    mutationFn: async ({
      currentDoctor,
      appointmentId,
      doctorId,
      patientId,
      slotDate,
      slotTime,
    }) => {
      try {
        const res = await fetch(`/api/doctor/cancel-appointment`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            currentDoctor,
            appointmentId,
            doctorId,
            patientId,
            slotDate,
            slotTime,
          }),
        });

        const dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(dataFromResponse?.msg);
          queryClient.invalidateQueries({ queryKey: ["my-appointment"] });
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          queryClient.invalidateQueries({ queryKey: ["doctor-appointment"] });
          queryClient.invalidateQueries({ queryKey: ["admin-appointment"] });
        } else {
          toast.error("Something went wrong !!");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong !!");
      }
    },
  });

  // Handle appointment cancellation
  const handleCancel = (
    appointmentId,
    doctorId,
    patientId,
    slotDate,
    slotTime
  ) => {
    if (authenticatedUser) {
      const currentDoctor = authenticatedUser?.doctorProfile?._id;
      cancelAppointmentFunction({
        currentDoctor,
        appointmentId,
        doctorId,
        patientId,
        slotDate,
        slotTime,
      });
    }
  };

  // Confirm Appointment
  const { mutate: confirmAppointmentFunction } = useMutation({
    mutationFn: async ({ appointmentId, doctorId, patientId }) => {
      try {
        const res = await fetch(`/api/doctor/confirm-appointment`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            appointmentId,
            doctorId,
            patientId,
          }),
        });

        const dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(dataFromResponse?.msg);
          queryClient.invalidateQueries({ queryKey: ["my-appointment"] });
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          queryClient.invalidateQueries({ queryKey: ["doctor-appointment"] });
          queryClient.invalidateQueries({ queryKey: ["admin-appointment"] });
        } else {
          toast.error("Something went wrong !!");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong !!");
      }
    },
  });

  // Handle appointment confirmation
  const handleConfirm = (appointmentId, doctorId, patientId) => {
    if (authenticatedUser) {
      confirmAppointmentFunction({
        appointmentId,
        doctorId,
        patientId,
      });
    }
  };

  // Complete Appointment
  const { mutate: completeAppointmentFunction } = useMutation({
    mutationFn: async ({ appointmentId, doctorId, patientId }) => {
      try {
        const res = await fetch(`/api/doctor/complete-appointment`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            appointmentId,
            doctorId,
            patientId,
          }),
        });

        const dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(dataFromResponse?.msg);
          queryClient.invalidateQueries({ queryKey: ["my-appointment"] });
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          queryClient.invalidateQueries({ queryKey: ["doctor-appointment"] });
          queryClient.invalidateQueries({ queryKey: ["admin-appointment"] });
        } else {
          toast.error("Something went wrong !!");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong !!");
      }
    },
  });

  // Handle appointment completetion
  const handleComplete = (appointmentId, doctorId, patientId) => {
    if (authenticatedUser) {
      completeAppointmentFunction({
        appointmentId,
        doctorId,
        patientId,
      });
    }
  };

  return (
    <>
      <div className="p-6 -mt-7">
        <h2 className="text-2xl text-center font-bold mb-6 text-cyan-800">
          {type} Appointments
        </h2>
        {appointmentData?.length ? (
          <div className="flex flex-col gap-5 ">
            {appointmentData?.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-gray-100 p-6 rounded-lg shadow-md flex justify-between flex-col gap-3"
              >
                {/* Doctor's Image */}
                <div className="flex flex-col gap-2 items-center justify-center">
                  <p>Patient</p>
                  <img
                    src={
                      appointment?.patient?.image
                        ? appointment?.patient?.image
                        : "./profile.jpg"
                    }
                    alt={appointment?.patient?.image}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h3 className="text-xl uppercase mt-2 font-semibold text-cyan-800">
                    {appointment?.patient?.name}
                  </h3>
                </div>

                <div className="border border-black h-[1px] w-[100%]"></div>

                {/* Appointment Details */}
                <div className="flex flex-col">
                  <img
                    src={
                      appointment?.doctor?.image
                        ? appointment?.doctor?.image
                        : "./profile.jpg"
                    }
                    alt={appointment?.doctor?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h3 className="text-xl uppercase mt-2 font-semibold text-cyan-800">
                    {appointment?.doctor?.name}
                  </h3>

                  <p className="text-gray-700">
                    Date: {appointment?.slotDate} - {appointment?.slotDay}
                  </p>
                  <p className="text-gray-700">Time: {appointment?.slotTime}</p>
                  <p className="text-gray-700">
                    Fees: ₹{appointment?.doctor?.fees}
                  </p>

                  <p
                    className={`font-semibold ${
                      appointment?.status === "Confirmed"
                        ? "text-green-600"
                        : appointment?.status === "Pending"
                        ? "text-yellow-600"
                        : appointment?.status === "Completed"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {appointment?.status}
                  </p>
                </div>

                {/* Buttons for actions */}
                <div className="flex flex-col gap-2">
                  {/* Only show Mark as Confirm and Cancel buttons if not completed */}
                  {appointment?.status !== "Completed" && (
                    <>
                      <button
                        onClick={() =>
                          handleConfirm(
                            appointment?._id,
                            appointment?.doctor?._id,
                            appointment?.patient?._id
                          )
                        }
                        className={`bg-cyan-800 text-white p-2 rounded-lg duration-300 cursor-pointer ${
                          (appointment.status === "Cancelled") |
                          (appointment.status === "Confirmed")
                            ? "bg-gray-400 hover:bg-gray-400 "
                            : "hover:bg-cyan-500"
                        } `}
                        disabled={
                          appointment.status === "Confirmed" ||
                          appointment.status === "Cancelled"
                        }
                      >
                        Confirm
                      </button>
                      {appointment.status === "Confirmed" && (
                        <button
                          onClick={() =>
                            handleComplete(
                              appointment?._id,
                              appointment?.doctor?._id,
                              appointment?.patient?._id
                            )
                          }
                          className={`bg-green-600 text-white p-2 rounded-lg duration-300 ${
                            appointment.status === "Completed"
                              ? "bg-gray-400 hover:bg-gray-400 "
                              : "hover:bg-green-500"
                          }`}
                          disabled={appointment.status === "Completed"} // Disable if already cancelled
                        >
                          Mark as Done
                        </button>
                      )}

                      {appointment.status !== "Completed" && (
                        <button
                          onClick={() =>
                            handleCancel(
                              appointment?._id,
                              appointment?.doctor,
                              appointment?.patient?._id,
                              appointment?.slotDate,
                              appointment?.slotTime
                            )
                          }
                          className={` text-white p-2 rounded-lg duration-300 ${
                            appointment.status === "Cancelled"
                              ? "bg-gray-400 hover:bg-gray-400 "
                              : "hover:bg-red-400 bg-red-600"
                          }`}
                          disabled={appointment.status === "Cancelled"} // Disable if already cancelled
                        >
                          Cancel
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No appointments scheduled.</p>
        )}
      </div>
    </>
  );
};

export default DoctorAppointmentLayout;
