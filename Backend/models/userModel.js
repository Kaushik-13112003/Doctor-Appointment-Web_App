import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
      minLength: 4,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    role: {
      type: String,
      require: true,
    },

    image: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
    },

    bio: {
      type: String,
    },

    fees: {
      type: Number,
    },

    degree: {
      type: String,
    },

    speciality: {
      type: String,
    },

    address: {
      type: String,
    },

    phone: {
      type: Number,
      minLength: 10,
      maxLength: 10,
    },

    experience: {
      type: Number,
    },

    speciality: {
      type: String,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
