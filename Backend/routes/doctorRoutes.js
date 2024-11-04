import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import {
  cancelAppointmentByDoctorController,
  completeAppointmentByDoctorController,
  findAllDoctorController,
  findDoctorBySpecialityController,
  getDoctorAppointmentController,
  getDoctorProfileController,
  getSingleDoctorController,
  getSuggestedDoctorController,
  markAppointmentsAsConfirmedController,
  updateDoctorProfileController,
} from "../controllers/doctorControllers.js";

const router = express.Router();

//get single doctor
router.get("/single-doctor/:id", protectedRoute, getSingleDoctorController);

//get doctors by speciality
router.get(
  "/speciality/:speciality",
  protectedRoute,
  findDoctorBySpecialityController
);

//all-doctors
router.get("/all", protectedRoute, findAllDoctorController);

//doctors-all_appointment
router.get(
  "/doctor-appointments",
  protectedRoute,
  getDoctorAppointmentController
);

//doctor profile
router.get("/doctor-profile", protectedRoute, getDoctorProfileController);

//suggested doctor
router.get("/suggested-doctor", protectedRoute, getSuggestedDoctorController);

//update profile
router.put(
  "/update-doctor-profile/:id",
  protectedRoute,
  updateDoctorProfileController
);

//confirm-appointment
router.put(
  "/confirm-appointment",
  protectedRoute,
  markAppointmentsAsConfirmedController
);

//cancel-appointment
router.put(
  "/cancel-appointment",
  protectedRoute,
  cancelAppointmentByDoctorController
);

//complete-appointment
router.put(
  "/complete-appointment",
  protectedRoute,
  completeAppointmentByDoctorController
);

export default router;
