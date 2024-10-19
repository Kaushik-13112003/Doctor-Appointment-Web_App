import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Appointments = () => {
  // State to store appointment data
  const [appointments, setAppointments] = useState([]);

  // Simulate fetching appointment data (You would fetch from an API in a real app)
  useEffect(() => {
    const fetchedAppointments = [
      {
        id: 1,
        doctorName: "Dr. John Doe",
        specialty: "Cardiologist",
        date: "2024-10-15",
        time: "10:00 AM",
        address: "123 Heart Clinic, New York",
        imageUrl: "https://via.placeholder.com/100", // Placeholder for doctor image
        doctorId: 3,
        status: "Confirmed",
      },
      {
        id: 2,
        doctorName: "Dr. Jane Smith",
        specialty: "Dermatologist",
        doctorId: 1,
        date: "2024-10-16",
        time: "11:30 AM",
        address: "456 Skin Center, Los Angeles",
        imageUrl: "https://via.placeholder.com/100",
        status: "Pending",
      },
      {
        id: 3,
        doctorName: "Dr. Michael Johnson",
        doctorId: 2,
        specialty: "Pediatrician",
        date: "2024-10-17",
        time: "09:00 AM",
        address: "789 Children's Hospital, Chicago",
        imageUrl: "https://via.placeholder.com/100",
        status: "Cancelled",
      },
    ];

    setAppointments(fetchedAppointments);
  }, []);

  // Handle appointment cancellation
  const handleCancel = (id) => {
    console.log(`Cancelled appointment with id: ${id}`);
    // Logic for canceling the appointment
  };

  // Handle online payment
  const handlePayOnline = (id) => {
    console.log(`Paid for appointment with id: ${id}`);
    // Logic for paying online
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-cyan-800">Appointments</h2>
      {appointments.length > 0 ? (
        <div className="flex flex-col gap-5">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-gray-100 p-6 rounded-lg shadow-md flex sm:items-center justify-between sm:flex-row flex-col gap-3"
            >
              {/* Doctor's Image */}
              <NavLink to={`/doctor/${appointment.doctorId}`}>
                <img
                  src={
                    appointment.imageUrl ? appointment.imageUrl : "./banner.png"
                  }
                  alt={appointment.doctorName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </NavLink>

              {/* Appointment Details */}
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-cyan-800">
                  {appointment.doctorName}
                </h3>
                <p className="text-gray-700">
                  Specialty: {appointment.specialty}
                </p>
                <p className="text-gray-700">Date: {appointment.date}</p>
                <p className="text-gray-700">Time: {appointment.time}</p>
                <p className="text-gray-700">Address: {appointment.address}</p>
                <p
                  className={`font-semibold ${
                    appointment.status === "Confirmed"
                      ? "text-green-600"
                      : appointment.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {appointment.status}
                </p>
              </div>

              {/* Buttons for actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handlePayOnline(appointment.id)}
                  className="bg-cyan-800 text-white p-2 rounded-lg hover:bg-cyan-500 duration-300"
                  disabled={appointment.status !== "Confirmed"} // Only enable if appointment is confirmed
                >
                  Pay Online
                </button>
                <button
                  onClick={() => handleCancel(appointment.id)}
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-400 duration-300"
                  disabled={appointment.status === "Cancelled"} // Disable if already cancelled
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
