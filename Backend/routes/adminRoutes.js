import express from "express";
import {
  addNewDoctorController,
  getAdminallDoctorsController,
  getAllAdminAppointmentsController,
  getSingleAdminDoctorController,
  updateAdminDoctorController,
} from "../controllers/adminControllers.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

//add doctor
router.post("/add-doctor", protectedRoute, addNewDoctorController);

//get doctors
router.get("/admin-all-doctors", protectedRoute, getAdminallDoctorsController);

//get apoointments
router.get("/add-doctor", protectedRoute, getAllAdminAppointmentsController);

//get single doctor
router.get("/doctor/:id", protectedRoute, getSingleAdminDoctorController);

//update doctor
router.get("/update-doctor/:id", protectedRoute, updateAdminDoctorController);

//get all appointments
router.get(
  "/all-appointments",
  protectedRoute,
  getAllAdminAppointmentsController
);

export default router;
