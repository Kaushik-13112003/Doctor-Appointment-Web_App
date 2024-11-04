import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
    },

    slotDate: {
      type: String,
      require: true,
    },

    slotDay: {
      type: String,
      require: true,
    },

    slotTime: {
      type: String,
      require: true,
    },

    payment: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const appointmentsModel = mongoose.model(
  "appointment",
  appointmentSchema
);
