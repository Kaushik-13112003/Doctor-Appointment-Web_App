import { appointmentsModel } from "../models/appointmentsModel.js";
import { doctorModel } from "../models/doctorModel.js";
import { userModel } from "../models/userModel.js";

export const bookAppointmentController = async (req, res) => {
  try {
    const { patient, doctor, slotDate, slotDay, slotTime } = req.body;

    // Find the specific patient
    const findPatient = await userModel.findById(req.userId);
    if (!findPatient) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Find the specific doctor
    const findDoctor = await doctorModel.findById(doctor);
    if (!findDoctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    // Ensure `slots_booked` exists and check if the slot is already booked
    const slotsBooked = findDoctor.slots_booked || {};

    if (slotsBooked[slotDate] && slotsBooked[slotDate].includes(slotTime)) {
      return res.status(404).json({ msg: "Slot not available" });
    }

    // Add the new time slot for the specified date
    if (!slotsBooked[slotDate]) {
      slotsBooked[slotDate] = []; // Initialize date if it doesn't exist
    }
    slotsBooked[slotDate].push(slotTime);

    // Update the doctor’s `slots_booked` with the modified object
    await doctorModel.findByIdAndUpdate(
      doctor,
      { slots_booked: slotsBooked },
      { new: true } // Return the updated document
    );

    // Add new appointment to the appointments collection
    const newAppointment = await appointmentsModel.create({
      patient,
      doctor,
      slotDate,
      slotDay,
      slotTime,
    });

    // Update patient's my_appointments with new appointment details
    const appointmentDetails = {
      appointmentId: newAppointment._id,
      doctor: findDoctor._id,
      slotDate,
      slotDay,
      slotTime,
      status: "Pending",
    };

    await userModel.findByIdAndUpdate(req.userId, {
      $push: { my_appointments: appointmentDetails },
    });

    return res.status(200).json({ msg: "Appointment booked successfully" });
  } catch (err) {
    console.error("Error in bookAppointmentController:", err);
    return res
      .status(500)
      .json({ msg: "Something went wrong! Please try again." });
  }
};
