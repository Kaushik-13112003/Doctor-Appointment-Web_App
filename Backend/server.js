import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/match", matchRoutes);
// app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(colors.green("Server is Running on PORT :", PORT));
});
