import React, { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai"; // Importing icons
import AdminHome from "./admin-layout/AdminHome";
import { IoClose } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddDoctors = () => {
  const navigate = useNavigate("");
  const specialties = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrics",
    "Neurologist",
    "Orthopedics",
  ];
  const [formData, setFormData] = useState({
    name: "",
    degree: "",
    about: "",
    address: "",
    password: "",
    experience: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "",
    fees: "",
  });

  const [image, setImage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // Add new doctor
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ ...formData }) => {
      try {
        if (formData.phone.length !== 10) {
          toast.error("Enter a valid phone number");
          return;
        }

        const res = await fetch("/api/admin/add-doctor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, image }),
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(dataFromResponse?.msg || "Doctor added successfully");
          navigate("/admin-doctor-list");
        } else {
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...formData });
  };

  return (
    <AdminHome>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>

        <form onSubmit={handleSubmit}>
          {/* Upload Button */}
          <div className="mb-4 flex items-center">
            <label className="mr-2 text-gray-700">Upload Image:</label>
            <label className="flex items-center bg-cyan-800 text-white rounded p-2 cursor-pointer hover:bg-cyan-600 hover:duration-500">
              <AiOutlineUpload className="mr-1" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden" // Hide the default file input
              />
              Upload
            </label>
          </div>

          {/* Display Uploaded Image */}
          {image && (
            <>
              <div className=" relative">
                <IoClose
                  className=" absolute left-2 top-2 text-red-400 hover:text-red-300 duration-0  cursor-pointer"
                  size={25}
                  
                  onClick={() => setImage("")}
                />
                <img src={image} className="mt-6 mb-3 w-[] h-[200px]"></img>
              </div>
            </>
          )}
          {/* Form Fields */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter doctor's name"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="Enter doctor's degree"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Write a brief description about the doctor"
              className="w-full border border-gray-300 rounded p-2"
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter doctor's address"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">
              Experience (in years)
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter Experience"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter doctor's email"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter doctor's phone number"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Fees(₹)</label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="Enter doctor's fees"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Speciality</label>
            <select
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select Speciality</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Availability Section */}
          {/* <div className="mb-6 flex flex-col gap-4">
            <label className="block text-gray-700 mb-1">
              Select Day & Time Slot
            </label>
            <div className="flex gap-3 flex-wrap">
              {weekDays.map((ele) => (
                <button
                  key={ele}
                  type="button"
                  onClick={() => setDay(ele)}
                  className={`text-center gap-5 hover:bg-cyan-400 hover:duration-500 text-white p-2 rounded-md ${
                    ele === day ? "bg-cyan-400" : "bg-cyan-800"
                  }`}
                >
                  {ele}
                </button>
              ))}
            </div>

            <div>
              {slotTime.map((ele) => (
                <div key={ele} className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    value={ele}
                    checked={selectedSlot.includes(ele)} // Bind checkbox state to selectedSlot
                    onChange={(e) => handleTimeSelection(ele, e.target.checked)}
                  />
                  <p>{ele}</p>
                </div>
              ))}
            </div>

            {day && (
              <button
                type="button"
                onClick={handleAvailability}
                className="bg-cyan-800 text-white rounded p-2 cursor-pointer hover:bg-cyan-600 hover:duration-500"
              >
                Add for {day}
              </button>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div> */}

          {/* Display Selected Availability */}
          {/* <div className="mb-6">
            {availability.length > 0 && (
              <div>
                <h3 className="font-bold mb-2">Selected Availability:</h3>
                <ul className="list-disc">
                  {availability.map((item) => (
                    <li
                      key={item.day}
                      className="flex gap-3 sm:flex-row flex-col sm:items-center mt-4 border-b border-black p-3"
                    >
                      {item.day}:{" "}
                      {item.slots.map((slot) => slot.time).join(", ")}
                      <div className=" flex gap-2 mb-3">
                        <button
                          onClick={() => handleEditDay(item.day)}
                          className="bg-green-500 hover:bg-green-400 duration-500  p-2 rounded-md text-white w-[80px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDay(item.day)}
                          className="bg-red-500 hover:bg-red-400 duration-500  text-white p-2 rounded-md w-[80px]"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-cyan-800 text-white rounded p-2 hover:bg-cyan-600 hover:duration-500"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Doctor"}
          </button>
        </form>
      </div>
    </AdminHome>
  );
};

export default AddDoctors;
