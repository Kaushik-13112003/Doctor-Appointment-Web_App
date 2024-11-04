import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    degree: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 4,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
    },

    fees: {
      type: Number,
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

    available: {
      type: Boolean,
      default: true,
    },

    slots_booked: { type: Object, default: {} },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },

  { timestamps: true, minimize: false }
);

export const doctorModel = mongoose.model("doctor", doctorSchema);
