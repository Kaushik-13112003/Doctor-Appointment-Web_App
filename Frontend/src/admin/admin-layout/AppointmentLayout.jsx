import React from "react";

const AppointmentLayout = ({ appointmentData, type }) => {
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
                    src={
                      appointment?.patient?.image
                        ? appointment?.patient?.image
                        : "./profile.jpg"
                    }
                    alt={appointment?.patient?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h3 className="text-xl uppercase mt-2 font-semibold text-cyan-800">
                    {appointment?.patient?.name}
                  </h3>
                </div>

                <div className="border  border-black h-[1px] w-[100%]"></div>

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
                  <h3 className="text-xl uppercase  mt-2 font-semibold text-cyan-800">
                    {appointment?.doctor?.name}
                  </h3>
                  <p className="text-gray-700">
                    Speciality : {""}
                    {appointment?.doctor?.speciality}
                  </p>
                  <p className="text-gray-700">
                    Date : {appointment?.slotDate} - {appointment?.slotDay}
                  </p>
                  <p className="text-gray-700">
                    Time : {appointment?.slotTime}
                  </p>
                  <p className="text-gray-700">
                    Fees : ₹{appointment?.doctor?.fees}
                  </p>
                  {appointment?.payment && (
                    <p className="text-gray-700">
                      Payment : {appointment?.payment ? "PAID" : "NOT PAID"}
                    </p>
                  )}

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
                {/* <div className="flex flex-col gap-2">
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
                </div> */}
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
