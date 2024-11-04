import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import cookieParser from "cookie-parser";
import { v2 } from "cloudinary";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({limit:"3mb"}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/appointment", appointmentRoutes);

//cloudinary
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

app.listen(PORT, () => {
  connectDB();
  console.log(colors.green("Server is Running on PORT :", PORT));
});
