import React, { useState, useEffect } from "react";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const UpdateDoctorProfile = () => {
  const navigate = useNavigate();
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  // Local state to handle the form data
  const [userData, setUserData] = useState();
  const [image, setImage] = useState();

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //update prifle
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ ...userData }) => {
      if (userData.phone.length < 10 || userData.phone.length > 10) {
        toast.error("invalid phone number");
        return;
      }
      try {
        const res = await fetch(
          `/api/doctor/update-doctor-profile/${authenticatedUser?.doctorProfile?._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ ...userData, image }),
          }
        );

        if (res.ok) {
          toast.success("profile updated");
          navigate("/doctor-profile");
        } else {
          toast.error("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  // Submit updated data
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...userData });
  };

  // console.log(doctorProfile);
  useEffect(() => {
    if (authenticatedUser?.doctorProfile) {
      setUserData(authenticatedUser?.doctorProfile);
      setImage(authenticatedUser?.doctorProfile?.image);
    }
  }, []);

  return (
    <div>
      <Back />

      <form className="flex gap-6 flex-col">
        <div className="flex items-center gap-6">
          <div>
            <img
              src={image ? image : "./banner.png"}
              alt="Profile"
              className=" h-[150px] w-[150px]"
            />
            <label htmlFor="image">
              <div className="flex text-white items-center justify-center  gap-3 bg-cyan-800 p-2  hover:bg-cyan-500 duration-500 cursor-pointer">
                <FaUpload />
                Uplaod
              </div>
              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              value={userData?.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              disabled
              value={userData?.email}
              onChange={handleChange}
              className="w-full border bg-gray-200 border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Phone:</label>
            <input
              type="text"
              name="phone"
              value={userData?.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Fees(₹):</label>
            <input
              type="number"
              name="fees"
              value={userData?.fees}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Address:</label>
            <input
              type="text"
              name="address"
              value={userData?.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Gender:</label>
            <select
              name="gender"
              value={userData?.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select One</option>

              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-[150px] mt-2 bg-cyan-800 text-white p-2 rounded-md hover:bg-cyan-500 duration-500"
          >
            {isPending ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>

      <button
        onClick={() => navigate(-1)}
        className="w-[150px] mt-4 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-400 duration-500"
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdateDoctorProfile;
