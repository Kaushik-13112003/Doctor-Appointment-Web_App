import React, { useState, useEffect } from "react";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

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
  const { mutate ,isPending} = useMutation({
    mutationFn: async ({ name, gender, address, image, phone }) => {
      if (phone.length < 10 || phone.length > 10) {
        toast.error("invalid phone number");
        return;
      }
      try {
        const res = await fetch("/api/user/update-profile", {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ name, gender, address, image, phone }),
        });

        if (res.ok) {
          toast.success("profile updated");
          navigate("/user-profile");
        } else {
          toast.error("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  // Submit updated data
  const handleUpdatee = (e) => {
    e.preventDefault();
    mutate({ name, gender, address, image, phone });
  };

  useEffect(() => {
    setName(authenticatedUser?.name);
    setPhone(authenticatedUser?.phone);
    setImage(authenticatedUser?.image);
    setAddress(authenticatedUser?.address);
    setGender(authenticatedUser?.gender);
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
              className=" h-[150px] w-[150px] "
            />
            <label htmlFor="image">
              <div className="flex text-white items-center justify-center  gap-3 bg-cyan-800 p-2 cursor-pointer  hover:bg-cyan-500 duration-500">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              disabled
              value={authenticatedUser?.email}
              className="w-full border border-gray-300 bg-gray-200 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Phone:</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Address:</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Gender:</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select One</option>

              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            onClick={handleUpdatee}
            type="submit"
            className="w-[150px] mt-4 bg-cyan-800 text-white p-2 rounded-md hover:bg-cyan-500 duration-500"
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

export default UpdateProfile;
