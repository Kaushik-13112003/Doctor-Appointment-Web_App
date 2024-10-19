import { userModel } from "../models/userModel";

export const updateProfileController = async (req, res) => {
  try {
    const isUserExist = await userModel
      .findById(req.userId)
      .select("-password");

    if (!isUserExist) {
      return res.status(400).json({ msg: "user not found " });
    }

    if (isUserExist.role === "patient") {
      let { name, image, phone, birthday, gender, address } = await req.body;

      await userModel.findByIdAndUpdate(
        id,
        { name, image, phone, birthday, gender, address },
        { new: true }
      );
    }

    if (isUserExist.role === "doctor") {
      let { name, image, phone, fees, gender, address, experience } =
        await req.body;

      await userModel.findByIdAndUpdate(
        id,
        { name, image, phone, fees, gender, address, experience },
        { new: true }
      );
    }

    return res.status(200).json({ msg: "profile updated " });
  } catch (err) {
    console.log(err);
  }
};
