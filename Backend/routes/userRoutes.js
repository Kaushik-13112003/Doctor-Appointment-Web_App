import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import {
  cancelAppointmentsController,
  myAppointmentsController,
  payOnlineController,
  updateProfileController,
} from "../controllers/userControllers.js";

const router = express.Router();

//my-appointment
router.get("/my-appointment", protectedRoute, myAppointmentsController);

//update-profile
router.put("/update-profile", protectedRoute, updateProfileController);

//cancel-appointment
router.put("/cancel-appointment", protectedRoute, cancelAppointmentsController);

//pay-for-appointment
router.post("/pay-fees", protectedRoute, payOnlineController);
export default router;
