import React from "react";

const AppointmentLayout = ({ appointmentData, type }) => {
  // State to store appointment data

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
    <>
      <div className="p-6 -mt-7">
        <h2 className="text-2xl text-center font-bold mb-6 text-cyan-800">
          {type} Appointments
        </h2>
        {appointmentData.length > 0 ? (
          <div className="flex flex-col gap-5 ">
            {appointmentData.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-gray-100 p-6 rounded-lg shadow-md flex  justify-between  flex-col gap-3"
              >
                {/* Doctor's Image */}
                <div className="flex flex-col gap-2 items-center justify-center">
                  <p>Patient</p>
                  <img
                    // src={
                    //   appointment.patinetImage
                    //     ? appointment.patinetImage
                    //     : "./banner.png"
                    // }
                    src={"./banner.png"}
                    alt={appointment.doctorName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h3 className="text-xl  mt-2 font-semibold text-cyan-800">
                    {appointment.patientName}
                  </h3>
                </div>

                <div className="border  border-black h-[1px] w-[100%]"></div>

                {/* Appointment Details */}
                <div className="flex flex-col">
                  <img
                    // src={
                    //   appointment.doctorImage
                    //     ? appointment.doctorImage
                    //     : "./banner.png"
                    // }
                    src={"./banner.png"}
                    alt={appointment.doctorName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h3 className="text-xl  mt-2 font-semibold text-cyan-800">
                    {appointment.doctorName}
                  </h3>

                  <p className="text-gray-700">Date: {appointment.dateTime}</p>
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
                    Mark as Done
                  </button>
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-400 duration-300"
                    disabled={appointment.status === "Cancelled"} // Disable if already cancelled
                  >
                    Cancel
                  </button>
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

export default AppointmentLayout;
