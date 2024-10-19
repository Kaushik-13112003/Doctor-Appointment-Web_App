import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const registerController = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(404).json({ msg: "complete the fields" });
    }

    let regExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;

    if (!regExp.test(email)) {
      return res.status(400).json({ msg: "invalid email" });
    }

    //isUserExist
    const isUserExist = await userModel.findOne({ email: email });

    if (isUserExist) {
      return res.status(500).json({ msg: "user already exists " });
    }

    if (password.length < 6) {
      return res.status(500).json({ msg: "password must be of length 6 " });
    }

    password = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      password,
      email,
      role,
    });

    await newUser.save();
    if (newUser) {
      generateTokenAndSetCookie(newUser?._id, res);
      return res.status(200).json({ msg: "user created ", newUser });
    } else {
    }
    return res.status(500).json({ msg: "something went wrong " });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "user not created " });
  }
};

export const loginController = async (req, res) => {
  try {
    let { password, email } = await req.body;

    if (!password || !email) {
      return res.status(400).json({ msg: "complete the fields " });
    }

    //isUserExist
    let isUserExist = await userModel.findOne({ email: email });

    if (!isUserExist) {
      return res.status(400).json({ msg: "wrong credentials" });
    }

    let compareParePassword = await bcrypt.compare(
      password,
      isUserExist?.password
    );

    if (compareParePassword) {
      generateTokenAndSetCookie(isUserExist?._id, res);

      // isUserExist.lastLogin = new Date();
      // await isUserExist.save();
      return res
        .status(200)
        .json({ msg: "login successfully ", role: isUserExist.role });
    } else {
      return res.status(400).json({ msg: "wrong credentials " });
    }
  } catch (err) {
    console.log(err);
  }
};

export const logoutController = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({ msg: "logout successfully " });
  } catch (err) {
    console.log(err);
  }
};

export const getAuthenticatedUserController = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const currentUser = await userModel.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ msg: "user not found " });
    }

    return res.status(200).json(currentUser);
  } catch (err) {
    console.log(err);
  }
};

export const findSingleUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const currentUser = await userModel.findById(id);

    if (!currentUser) {
      return res.status(404).json({ msg: "user not found " });
    }

    return res.status(200).json(currentUser);
  } catch (err) {
    console.log(err);
  }
};
