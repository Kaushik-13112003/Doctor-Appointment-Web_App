import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(400)
        .json({ msg: "unauthorized access with no token " });
    }

    const verifyToken = await jwt.verify(token, process.env.TOKEN);

    let findUser = await userModel
      .findById({ _id: verifyToken?.userId })
      .select("-password");

    if (!findUser) {
      return res.status(400).json({ msg: "user not found " });
    }

    req.userId = findUser?._id;
    req.email = findUser?.email;
    next();
  } catch (err) {
    console.log(err);
  }
};
