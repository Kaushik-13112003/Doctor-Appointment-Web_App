import React, { useState, useEffect } from "react";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";

const UpdateDoctorProfile = () => {
  const navigate = useNavigate();

  // Initial user data fetched from API or stored locally
  const initialData = {
    name: "Kaushik Prajapati",
    email: "kp@gmail.com",
    phone: "9087623122",
    address: "123, local plaza",
    gender: "Male",
    birthday: "12/02/2003",
    profileImage: "./banner.png",
    fees: "13",
  };

  // Local state to handle the form data
  const [userData, setUserData] = useState(initialData);
  const [image, setImage] = useState(initialData.profileImage);

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

  // Submit updated data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data: ", userData);
    // Logic to submit updated profile data (API call)
    // After successful update, navigate to the profile page
    navigate(-1);
  };

  return (
    <div>
      <Back />

      <form onSubmit={handleSubmit} className="flex gap-6 flex-col">
        <div className="flex items-center gap-6">
          <div>
            <img src={image} alt="Profile" className=" h-[150px] w-[150px]  " />
            <label htmlFor="image">
              <div className="flex text-white items-center justify-center  gap-3 bg-cyan-800 p-2  hover:bg-cyan-500 duration-500">
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
              value={userData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Phone:</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Fees($):</label>
            <input
              type="number"
              name="fees"
              value={userData.fees}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Address:</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Gender:</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Birthday:</label>
            <input
              type="date"
              name="birthday"
              value={userData.birthday}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-[150px] mt-2 bg-cyan-800 text-white p-2 rounded-md hover:bg-cyan-500 duration-500"
          >
            Save Changes
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
