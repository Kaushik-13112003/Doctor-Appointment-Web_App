import express from "express";
import {
  findSingleUserController,
  getAuthenticatedUserController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/authControllers.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

//register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//logout
router.post("/logout", logoutController);

//get-auth-user
router.get("/get-auth-user", protectedRoute, getAuthenticatedUserController);

//logout
router.get("/user/:id", protectedRoute, findSingleUserController);

export default router;
