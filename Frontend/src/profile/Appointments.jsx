import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Appointments = () => {
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { data: myAppointments, isLoading } = useQuery({
    queryKey: ["my-appointment"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/user/my-appointment", {
          method: "GET",
        });

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          return dataFromResponse?.allAppointment;
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  // Cancel Appointment
  const { mutate: cancelAppointmentFunction } = useMutation({
    mutationFn: async ({
      patientId,
      appointmentId,
      doctorId,
      slotDate,
      slotTime,
    }) => {
      try {
        const res = await fetch(`/api/user/cancel-appointment`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId,
            appointmentId,
            doctorId,
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
          toast.error("Something went wrong!!");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong!!");
      }
    },
  });

  // Handle appointment cancellation
  const handleCancel = (appointmentId, doctorId, slotDate, slotTime) => {
    if (authenticatedUser) {
      const patientId = authenticatedUser?._id;
      cancelAppointmentFunction({
        patientId,
        appointmentId,
        doctorId,
        slotDate,
        slotTime,
      });
    }
  };

  // Handle online payment
  const handlePayOnline = async (appointment) => {
    const stripe = await loadStripe(
      "pk_test_51NfpAFSGhdFCFw6vvmZkEzFLp6nFwcAhnvPeveuG5nD93sJpYhV8s5r2QtZswvtUN0SZ85RP0EX54jCZkzz9AXV000IL6ypDEP"
    );

    try {
      const res = await fetch("/api/user/pay-fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointment }),
      });

      const session = await res.json();
      if (session) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        queryClient.invalidateQueries({ queryKey: ["my-appointment"] });
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        queryClient.invalidateQueries({ queryKey: ["doctor-appointment"] });
        queryClient.invalidateQueries({ queryKey: ["admin-appointment"] });

        if (result.error) {
          console.log(result.error);
          toast.error(result.error.message);
        }
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-7">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-cyan-800">Appointments</h2>
      {myAppointments?.length > 0 ? (
        <div className="flex flex-col gap-5">
          {myAppointments?.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-gray-100 p-6 rounded-lg shadow-md flex sm:items-center justify-between sm:flex-row flex-col gap-3"
            >
              {/* Doctor's Image */}
              <NavLink to={`/doctor/${appointment.doctorId}`}>
                <img
                  src={appointment.doctor?.image || "./profile.jpg"}
                  alt={appointment.doctor.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </NavLink>

              {/* Appointment Details */}
              <div className="flex flex-col">
                <h3 className="text-xl uppercase font-semibold text-cyan-800">
                  {appointment.doctor.name}
                </h3>
                <p className="text-gray-700">
                  Specialty : {appointment.doctor.speciality}
                </p>
                <p className="text-gray-700">
                  Fees : ₹{appointment.doctor.fees}
                </p>

                <p className="text-gray-700">Date : {appointment.slotDate}</p>
                <p className="text-gray-700">Day : {appointment.slotDay}</p>
                <p className="text-gray-700">Time : {appointment.slotTime}</p>
                {appointment?.payment === true && (
                  <p className="text-gray-700 flex gap-2 items-center">
                    Amount :
                    {appointment?.payment ? (
                      <p className=" rounded-sm text-green-600">PAID</p>
                    ) : (
                      "NOT PAID"
                    )}
                  </p>
                )}

                <p
                  className={`font-semibold ${
                    appointment.status === "Confirmed"
                      ? "text-green-600"
                      : appointment.status === "Pending"
                      ? "text-yellow-600"
                      : appointment.status === "Completed"
                      ? "text-blue-600" // New style for completed
                      : "text-red-600"
                  }`}
                >
                  Status: {appointment.status}
                </p>
              </div>

              {/* Buttons for actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handlePayOnline(appointment)}
                  className={`bg-cyan-800 text-white cursor-pointer p-2 rounded-lg hover:bg-cyan-500 duration-300 ${
                    (appointment.status !== "Confirmed" ||
                      appointment.payment === true) &&
                    "bg-gray-400 hover:bg-gray-400"
                  }`}
                  disabled={
                    appointment.status !== "Confirmed" ||
                    appointment.payment === true
                  }
                >
                  Pay Online
                </button>

                <button
                  onClick={() =>
                    handleCancel(
                      appointment?._id,
                      appointment?.doctor,
                      appointment?.slotDate,
                      appointment?.slotTime
                    )
                  }
                  className={` cursor-pointer text-white p-2 rounded-lg duration-300 ${
                    appointment.status === "Completed" ||
                    appointment.status === "Cancelled"
                      ? "bg-gray-400 hover:bg-gray-400"
                      : "hover:bg-red-400 bg-red-600"
                  }`}
                  disabled={
                    appointment.status === "Completed" ||
                    appointment.status === "Cancelled"
                  }
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments scheduled.</p>
      )}
    </div>
  );
};

export default Appointments;
