import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { bookAppointmentController } from "../controllers/appointmentControllers.js";

const router = express.Router();

//new appointment
router.post("/new-appointment", protectedRoute, bookAppointmentController);
export default router;
