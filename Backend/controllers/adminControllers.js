import { appointmentsModel } from "../models/appointmentsModel.js";
import { doctorModel } from "../models/doctorModel.js";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { v2 } from "cloudinary";

export const addNewDoctorController = async (req, res) => {
  const currentAdmin = req.userId;
  try {
    let {
      name,
      about,
      gender,
      email,
      password,
      degree,
      phone,
      address,
      speciality,
      fees,
      experience,
      image,
    } = await req.body;

    if (
      !password ||
      !name ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !gender ||
      !fees ||
      !speciality ||
      !experience ||
      !about ||
      !degree 
      // !image
    ) {
      return res.status(400).json({ msg: "complete the fields " });
    }

    //isUserExist
    let isDoctorExist = await doctorModel.findOne({ email: email });

    if (isDoctorExist) {
      return res.status(400).json({ msg: "doctor already exist" });
    }

    if (phone.length < 10 || phone.length > 10) {
      return res.status(400).json({ msg: "invalid phone number" });
    }

    //image upload
    if (image) {
      if (typeof image !== "string") {
        return res.status(400).json({ msg: "Invalid image format" });
      }

      // Upload image to Cloudinary
      const imgResponse = await v2.uploader.upload(image);
      image = imgResponse.secure_url;
    }

    //create new doctor
    await doctorModel.create({
      ...req.body,
      admin: currentAdmin,
    });

    //add to userModel
    await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: "doctor",
    });

    return res.status(200).json({ msg: "doctor created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "something went wrong" });
  }
};

export const getAdminallDoctorsController = async (req, res) => {
  const currentAdmin = req.userId;
  try {
    //find Admin first
    let isAdminExist = await userModel.findById(currentAdmin);

    if (!isAdminExist) {
      return res.status(404).json({ msg: "admin not found" });
    }

    if (isAdminExist.role !== "admin") {
      return res.status(401).json({ msg: "unauthorized access" });
    }

    //get all doctor by admin
    const allDoctors = await doctorModel
      .find({ admin: currentAdmin })
      .sort({ createdAt: -1 });

    if (allDoctors) {
      return res.status(200).json({ allDoctors: allDoctors });
    } else {
      return res.status(404).json({ msg: "no doctors found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllAdminAppointmentsController = async (req, res) => {
  const currentUser = req.userId;
  try {
    let isUserExist = await userModel.findById(currentUser);

    if (!isUserExist || isUserExist?.role !== "admin") {
      return res.status(404).json({ msg: "admin not found" });
    }

    //get appointment
    const allAppointment = await appointmentsModel
      .find({})
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

export const getSingleAdminDoctorController = async (req, res) => {
  const currentAdmin = req.userId;
  try {
    const { id } = req.params;

    //findAdmin first
    let isAdminExist = await doctorModel.findById(currentAdmin);

    if (!isAdminExist) {
      return res.status(404).json({ msg: "admin not found" });
    }

    if (isAdminExist.role !== "admin") {
      return res.status(404).json({ msg: "unauthorized access" });
    }

    //find doctor
    let findDoctor = await doctorModel.findOne({
      _id: id,
      admin: currentAdmin,
    });

    if (findDoctor) {
      return res.status(404).json({ findDoctor: findDoctor });
    } else {
      return res.status(404).json({ msg: "no doctor found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateAdminDoctorController = async (req, res) => {
  const currentAdmin = req.userId;
  try {
    const { id } = req.params;
    const {
      password,
      newPassword,
      image,
      degree,
      speciality,
      fees,
      experience,
    } = req.body;

    //findAdmin first
    let isAdminExist = await userModel.findById(currentAdmin);

    if (!isAdminExist) {
      return res.status(404).json({ msg: "admin not found" });
    }

    if (isAdminExist.role !== "admin") {
      return res.status(404).json({ msg: "unauthorized access" });
    }

    //find doctor
    let findDoctor = await doctorModel.findOne({
      _id: id,
      admin: currentAdmin,
    });

    if (findDoctor) {
      if (password && newPassword) {
        if (newPassword.length < 6) {
          return res
            .status(400)
            .json({ msg: "new password should not be less than 6 characters" });
        }

        //compare password
        let hashPassword = await bcrypt.compare(password, findDoctor?.password);

        if (hashPassword) {
          newPassword = await bcrypt.hash(newPassword, 10);

          await findDoctor.updateOne({ password: newPassword });
          return res.status(200).json({ msg: "password updated " });
        } else {
          return res.status(400).json({ msg: "wrong current password" });
        }
      }

      await doctorModel.findByIdAndUpdate(id, { ...req.body }, { new: true });

      return res.status(200).json({ msg: "profile updated " });
    } else {
      return res.status(404).json({ msg: "no doctor found" });
    }
  } catch (err) {
    console.log(err);
  }
};
