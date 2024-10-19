import React, { useState } from "react";
import { AiOutlineUpload, AiOutlineClose } from "react-icons/ai"; // Importing icons
import AdminHome from "./admin-layout/AdminHome";
import { slotTime, weekDays } from "../assets/data";

const AddDoctors = () => {
  const [formData, setFormData] = useState({
    name: "",
    degree: "",
    about: "",
    address: "",
    password: "",
    experience: "",
    email: "",
    mobile: "",
    specialty: "",
    gender: "",
    fees: "",
    image: null,
  });
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  const handleTimeSelection = (ele, isChecked) => {
    setSelectedSlot((prevSlots) => {
      if (isChecked) {
        // Add the selected time slot if it's not already in the array
        return [...prevSlots, ele];
      } else {
        // Remove the selected time slot if it's unchecked
        return prevSlots.filter((time) => time !== ele);
      }
    });
  };

  const handleAvailability = () => {
    // Check if the day is already selected
    const isDayAlreadyAdded = availability.some((item) => item.day === day);

    if (isDayAlreadyAdded) {
      setErrorMessage(`${day} is already selected`);
    } else if (selectedSlot.length === 0) {
      setErrorMessage("Please select at least one time slot");
    } else {
      setAvailability((prev) => {
        return [
          ...prev,
          {
            day: day,
            slots: selectedSlot,
          },
        ];
      });
      setDay("");
      setSelectedSlot([]);
      setErrorMessage(""); // Clear any previous error message
    }
  };

  const handleDeleteDay = (dayToDelete) => {
    setAvailability((prev) => prev.filter((item) => item.day !== dayToDelete));
  };

  const handleEditDay = (dayToEdit) => {
    const dayData = availability.find((item) => item.day === dayToEdit);
    if (dayData) {
      setDay(dayToEdit);
      setSelectedSlot(dayData.slots);
      handleDeleteDay(dayToEdit); // Remove the day to allow updating
    }
  };

  const specialties = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Neurology",
    "Orthopedics",
  ];
  const experiences = ["0-1 years", "1-3 years", "3-5 years", "5+ years"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
      image: files ? URL.createObjectURL(files[0]) : null, // Store the image URL for display
    }));
  };

  const handleImageRemove = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: null, // Reset the image state
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your form submission logic (API call, etc.)
    console.log("Form Data Submitted:", formData);
  };

  return (
    <AdminHome>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>

        {/* Upload Button */}
        <div className="mb-4 flex items-center">
          <label className="mr-2 text-gray-700">Upload Image:</label>
          <label className="flex items-center bg-cyan-800 text-white rounded p-2 cursor-pointer hover:bg-cyan-600 hover:duration-500">
            <AiOutlineUpload className="mr-1" />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden" // Hide the default file input
              required
            />
            Upload
          </label>
        </div>

        {/* Display Uploaded Image */}
        {formData.image && (
          <div className="relative mb-4">
            <img
              src={formData.image}
              alt="Doctor"
              className="w-32 h-32 object-cover rounded border"
            />
            <button
              type="button"
              onClick={handleImageRemove}
              className="absolute -top-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              title="Remove Image"
            >
              <AiOutlineClose />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
            <label className="block text-gray-700 mb-1">Experience</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select Experience</option>
              {experiences.map((exp, index) => (
                <option key={index} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
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
            <label className="block text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
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
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Specialty</label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select Specialty</option>
              {specialties.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Fees</label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="Enter consultation fees"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          {/* Slot Section */}
          <div className="mb-6 flex flex-col gap-4">
            <label className="block text-gray-700 mb-1">
              Select Day & Time Slot
            </label>
            <div className="flex gap-3 flex-wrap">
              {weekDays.map((ele) => (
                <button
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
                <div className="flex gap-3 items-center">
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
          </div>

          {/* Display Availability */}
          <div>
            {availability.length > 0 && (
              <h3 className="text-lg font-bold mb-2">Availability:</h3>
            )}
            {availability.map((item, index) => (
              <div key={index} className="mb-2 p-2 border rounded">
                <div className="flex justify-between items-center">
                  <p>
                    {item.day}: {item.slots.join(", ")}
                  </p>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleEditDay(item.day)}
                      className="bg-green-600 hover:bg-green-500 duration-500 text-white p-2 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDay(item.day)}
                      className="bg-red-600 hover:bg-red-500 duration-500 text-white p-2 rounded-md mr-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-cyan-800 mb-2 mt-2 text-white rounded p-2 cursor-pointer hover:bg-cyan-600 hover:duration-500"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </AdminHome>
  );
};

export default AddDoctors;
