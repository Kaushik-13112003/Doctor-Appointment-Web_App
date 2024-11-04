import { doctorModel } from "../models/doctorModel.js";
import { userModel } from "../models/userModel.js";
import { appointmentsModel } from "../models/appointmentsModel.js";
import { v2 } from "cloudinary";

export const getSingleDoctorController = async (req, res) => {
  const currentUser = req.userId;
  try {
    const { id } = req.params;
    if (!id) return;
    //find Admin first
    let isUserExist = await userModel.findById(currentUser);

    if (!isUserExist) {
      return res.status(404).json({ msg: "user not found" });
    }

    //find doctor
    const singleDoctor = await doctorModel.findById(id);
    // .populate("user", "-password");

    if (singleDoctor) {
      return res.status(200).json({ singleDoctor: singleDoctor });
    } else {
      return res.status(404).json({ msg: "doctor not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const findDoctorBySpecialityController = async (req, res) => {
  const currentUser = req.userId;
  try {
    const { speciality } = req.params;

    //find Admin first
    let isUserExist = await userModel.findById(currentUser);

    if (!isUserExist) {
      return res.status(404).json({ msg: "user not found" });
    }

    let allDoctors;

    if (speciality === "all-doctors") {
      allDoctors = await doctorModel.find();
    } else {
      //find doctor
      allDoctors = await doctorModel.find({
        speciality: speciality,
      });
    }

    if (allDoctors) {
      return res.status(200).json({ allDoctors: allDoctors });
    } else {
      return res.status(404).json({ msg: "doctor not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const findAllDoctorController = async (req, res) => {
  const currentUser = req.userId;
  try {
    const isUserExist = await userModel.findById(currentUser);

    if (!isUserExist) {
      return res.status(404).json({ msg: "user not found" });
    }

    //find doctor
    const allDoctors = await doctorModel.find();

    if (allDoctors) {
      return res.status(200).json({ allDoctors: allDoctors });
    } else {
      return res.status(404).json({ msg: "doctors not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getDoctorAppointmentController = async (req, res) => {
  const currentUser = req.userId;
  const { id } = req.query;
  console.log(id);
  try {
    //find doctor first
    if (!id) return;

    let isUserExist = await userModel.findById(currentUser);

    if (!isUserExist) {
      return res.status(404).json({ msg: "doctor not found" });
    }

    //get appointment
    const allAppointment = await appointmentsModel
      .find({
        doctor: id,
      })
      .populate("patient", "name image")
      .populate("doctor", "name image fees speciality")
      .sort({ createdAt: -1 });

    if (allAppointment) {
      return res.status(200).json({ allAppointment: allAppointment });
    } else {
      return res.status(404).json({ msg: "appointments not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getDoctorProfileController = async (req, res) => {
  const currentUser = req.email;
  try {
    //find doctor first
    let isUserExist = await userModel.findOne({ email: currentUser });

    if (!isUserExist) {
      return res.status(404).json({ msg: "doctor not found" });
    }

    //get appointment
    if (isUserExist) {
      const doctorProfile = await doctorModel.findOne({
        email: isUserExist.email,
      });

      if (doctorProfile) {
        return res.status(200).json({ doctorProfile: doctorProfile });
      } else {
        return res.status(404).json({ msg: "doctor not found" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateDoctorProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, phone, fees, address } = req.body;

    // Validate phone length
    if (phone.length < 10 || phone.length > 10) {
      return res.status(400).json({ msg: "Invalid phone number" });
    }

    // Find the doctor in the database
    const existingDoctor = await doctorModel.findById(id);
    if (!existingDoctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    let updatedImageUrl = existingDoctor.image;

    // Check if a new image is provided and differs from the existing one
    if (image && image !== existingDoctor.image) {
      // Delete the old image from Cloudinary if it exists
      if (existingDoctor.image) {
        const publicId = existingDoctor.image.split("/").pop().split(".")[0];
        try {
          await v2.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          if (cloudinaryError.http_code !== 404) {
            console.error("Cloudinary error:", cloudinaryError);
            return res
              .status(500)
              .json({ msg: "Error deleting image from Cloudinary" });
          }
        }
      }

      // Upload the new image to Cloudinary
      const imgResponse = await v2.uploader.upload(image);
      updatedImageUrl = imgResponse.secure_url;
    }

    // Update doctor details in the database
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      id,
      { name, image: updatedImageUrl, phone, fees, address },
      { new: true }
    );

    if (updatedDoctor) {
      return res
        .status(200)
        .json({ msg: "Profile updated", doctor: updatedDoctor });
    } else {
      return res.status(404).json({ msg: "Doctor not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

export const getSuggestedDoctorController = async (req, res) => {
  const currentUser = req.userId;
  try {
    const { speciality } = req.query;
    console.log(speciality, typeof speciality);

    //find user first
    let isUserExist = await userModel.findById(currentUser);

    if (!isUserExist) {
      return res.status(404).json({ msg: "user not found" });
    }

    const allDoctors = await doctorModel.find({
      speciality: speciality,
      // $not: { email: req.email },
    });

    if (allDoctors) {
      return res.status(200).json({ allDoctors: allDoctors });
    } else {
      return res.status(404).json({ msg: "doctor not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const markAppointmentsAsConfirmedController = async (req, res) => {
  try {
    const { doctorId, appointmentId, patientId } = req.body;

    const isDoctorrExist = await doctorModel
      .findById(doctorId)
      .select("-password");

    if (!isDoctorrExist) {
      return res.status(404).json({ msg: "doctor not found " });
    }

    //find appointment
    const findAppointment = await appointmentsModel.findById(appointmentId);

    if (!findAppointment) {
      return res.status(404).json({ msg: "appointment not found " });
    }

    //check doctor for founded appointment
    if (findAppointment.doctor != doctorId) {
      return res.status(401).json({ msg: "unauthorized access !!" });
    }

    //update status of appointment
    await appointmentsModel.findByIdAndUpdate(appointmentId, {
      status: "Confirmed",
    });

    console.log(patientId);

    //update status for appointment in my appoitments
    const findPatient = await userModel.findById(patientId);

    if (!findPatient) {
      return res.status(404).json({ msg: "patient not found " });
    }

    // console.log(findPatient);
    await userModel.updateOne(
      { _id: patientId, "my_appointments.appointmentId": findAppointment?._id },
      { $set: { "my_appointments.$.status": "Confirmed" } }
    );

    // await findPatient.save();
    return res.status(200).json({ msg: "appointment confirmed" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Something went wrong! Please try again." });
  }
};

export const cancelAppointmentByDoctorController = async (req, res) => {
  const { currentDoctor, doctorId, patientId, appointmentId } = req.body;
  try {
    const isDoctorrExist = await doctorModel
      .findById(currentDoctor)
      .select("-password");

    if (!isDoctorrExist) {
      return res.status(404).json({ msg: "doctor not found " });
    }

    //find appointment
    const findAppointment = await appointmentsModel.findById(appointmentId);

    if (!findAppointment) {
      return res.status(404).json({ msg: "appointment not found " });
    }

    //check patient for founded appointment
    if (findAppointment.doctor != currentDoctor) {
      return res.status(401).json({ msg: "unauthorized access !!" });
    }

    //update status of appointment
    await appointmentsModel.findByIdAndUpdate(appointmentId, {
      status: "Cancelled",
    });

    //releasing doctor slots from doctorModel

    let slots_booked = isDoctorrExist.slots_booked;

    slots_booked[findAppointment.slotDate] = slots_booked[
      findAppointment.slotDate
    ].filter((e) => {
      return e !== findAppointment.slotTime;
    });

    await doctorModel.findByIdAndUpdate(doctorId, {
      slots_booked: slots_booked,
    });

    //removing appointment from my appoitments

    //first find user
    // console.l
    const isUserExist = await userModel.findById(patientId);

    if (!isUserExist) {
      return res.status(404).json({ msg: "patient not found " });
    }

    // console.log(findPatient);
    await userModel.updateOne(
      { _id: patientId, "my_appointments.appointmentId": findAppointment?._id },
      { $set: { "my_appointments.$.status": "Cancelled" } }
    );

    return res.status(200).json({ msg: "appointment cancelled" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Something went wrong! Please try again." });
  }
};

export const completeAppointmentByDoctorController = async (req, res) => {
  try {
    const { doctorId, appointmentId, patientId } = req.body;

    const isDoctorrExist = await doctorModel
      .findById(doctorId)
      .select("-password");

    if (!isDoctorrExist) {
      return res.status(404).json({ msg: "doctor not found " });
    }

    //find appointment
    const findAppointment = await appointmentsModel.findById(appointmentId);

    if (!findAppointment) {
      return res.status(404).json({ msg: "appointment not found " });
    }

    //check doctor for founded appointment
    if (findAppointment.doctor != doctorId) {
      return res.status(401).json({ msg: "unauthorized access !!" });
    }

    //update status of appointment
    await appointmentsModel.findByIdAndUpdate(appointmentId, {
      status: "Completed",
    });

    // console.log(patientId);

    //update status for appointment in my appoitments
    const findPatient = await userModel.findById(patientId);

    if (!findPatient) {
      return res.status(404).json({ msg: "patient not found " });
    }

    // console.log(findPatient);
    await userModel.updateOne(
      { _id: patientId, "my_appointments.appointmentId": findAppointment?._id },
      { $set: { "my_appointments.$.status": "Completed" } }
    );

    // await findPatient.save();
    return res.status(200).json({ msg: "appointment completed" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Something went wrong! Please try again." });
  }
};
