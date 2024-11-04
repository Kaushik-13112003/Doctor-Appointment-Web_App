import { appointmentsModel } from "../models/appointmentsModel.js";
import { doctorModel } from "../models/doctorModel.js";
import { userModel } from "../models/userModel.js";
import stripe, { Stripe } from "stripe";
import { v2 } from "cloudinary";

export const updateProfileController = async (req, res) => {
  try {
    const isUserExist = await userModel
      .findById(req.userId)
      .select("-password");

    if (!isUserExist) {
      return res.status(400).json({ msg: "user not found " });
    }

    if (isUserExist.role === "patient") {
      let { name, image, phone, birthday, gender, address } = await req.body;

      if (phone.length < 10 || phone.length > 10) {
        return res.status(400).json({ msg: "invalid phone number" });
      }

      //image upload
      if (image && isUserExist.image !== image) {
        if (isUserExist.image) {
          //extract public ID
          const publicId = isUserExist.image.split("/").pop().split(".")[0];

          try {
            await v2.uploader.destroy(publicId);
          } catch (cloudinaryError) {
            if (cloudinaryError.http_code === 404) {
              console.log("Image not found in Cloudinary, skipping deletion.");
            } else {
              console.error("Cloudinary error:", cloudinaryError);
              return res
                .status(500)
                .json({ msg: "Error deleting image from Cloudinary" });
            }
          }
        }

        const imgResponse = await v2.uploader.upload(image);
        image = imgResponse.secure_url;
      }

      await userModel.findByIdAndUpdate(
        req.userId,
        { name, image, phone, birthday, gender, address },
        { new: true }
      );
    }

    return res.status(200).json({ msg: "profile updated " });
  } catch (err) {
    console.log(err);
  }
};

export const myAppointmentsController = async (req, res) => {
  try {
    const isUserExist = await userModel
      .findById(req.userId)
      .select("-password");

    if (!isUserExist) {
      return res.status(400).json({ msg: "user not found " });
    }

    // Add new appointment
    const myAppointments = await appointmentsModel
      .find({
        patient: req.userId,
      })
      .populate("doctor", " image name speciality fees")
      .sort({ createdAt: -1 });

    if (myAppointments) {
      return res.status(200).json({ allAppointment: myAppointments });
    } else {
      return res.status(404).json({ msg: "no appointment found" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Something went wrong! Please try again." });
  }
};

export const cancelAppointmentsController = async (req, res) => {
  try {
    const isUserExist = await userModel
      .findById(req.userId)
      .select("-password");

    if (!isUserExist) {
      return res.status(404).json({ msg: "user not found " });
    }

    const { doctorId, patientId, appointmentId } = req.body;

    //find appointment
    const findAppointment = await appointmentsModel.findById(appointmentId);

    if (!findAppointment) {
      return res.status(404).json({ msg: "appointment not found " });
    }

    //check patient for founded appointment
    if (findAppointment.patient != patientId) {
      return res.status(401).json({ msg: "unauthorized access !!" });
    }

    //update status of appointment
    await appointmentsModel.findByIdAndUpdate(appointmentId, {
      status: "Cancelled",
    });

    //releasing doctor slots from doctorModel

    const findDoctor = await doctorModel.findById(doctorId);

    if (!findDoctor) {
      return res.status(404).json({ msg: "doctor not found " });
    }

    let slots_booked = findDoctor.slots_booked;

    slots_booked[findAppointment.slotDate] = slots_booked[
      findAppointment.slotDate
    ].filter((e) => {
      return e !== findAppointment.slotTime;
    });

    await doctorModel.findByIdAndUpdate(doctorId, {
      slots_booked: slots_booked,
    });

    //removing appointment from my appoitments

    let my_appointments = isUserExist.my_appointments;
    console.log(findAppointment?._id);

    // console.log(my_appointments);
    const filterAppointment = my_appointments.filter((e) => {
      return e.appointmentId.toString() !== findAppointment._id.toString(); // Convert both to strings
    });

    // console.log(my_appointments);

    await userModel.findByIdAndUpdate(req.userId, {
      my_appointments: filterAppointment,
    });

    return res.status(200).json({ msg: "appointment cancelled" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Something went wrong! Please try again." });
  }
};

//stripe
const stripeKey = new Stripe(
  "sk_test_51NfpAFSGhdFCFw6vFAVqpo5Gl9Ua9ETxXyCgXvxLDmNsOu5hNjn2Ajac0b9TX6FihjWtR8H50xr39r27WFJPaWXt00qZDdb2dP"
);

export const payOnlineController = async (req, res) => {
  try {
    const { appointment } = req.body;
    console.log(appointment);

    const session = await stripeKey.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Appointment with Dr. ${appointment.doctor.name}`,
              description: `Speciality: ${appointment.doctor.speciality} | Date: ${appointment.slotDate} | Time: ${appointment.slotTime}`,
            },
            unit_amount: appointment.doctor.fees * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    if (session) {
      //update payment status

      //find appointment
      const findAppointment = await appointmentsModel.findById(
        appointment?._id
      );

      if (!findAppointment) {
        return res.status(404).json({ msg: "appointment not found " });
      }

      await appointmentsModel.findByIdAndUpdate(appointment?._id, {
        $set: { payment: true },
      });

      return res.status(200).json({ id: session.id });
    } else {
      return res.status(500).json({ msg: "something went wrong !!" });
    }
  } catch (err) {
    console.log(err);
  }
};
