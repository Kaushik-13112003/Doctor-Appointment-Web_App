import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Here, you can add code to handle form submission, like sending the data to a backend API
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold text-cyan-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have any questions, feedback, or need assistance? We're here to help!
          Reach out to us using the form below, and our team will get back to
          you as soon as possible.
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="mt-12 w-full max-w-xl">
        <form
          className="bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          {/* Name Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your message"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-800 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 duration-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Footer Section */}
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          You can also reach us at:{" "}
          <span className="font-bold text-cyan-800">
            support@cureconnect.com
          </span>
        </p>
        <p className="text-gray-600 mt-2">
          Call us:{" "}
          <span className="font-bold text-cyan-800">+1 (800) 123-4567</span>
        </p>
      </div>
    </div>
  );
};

export default Contact;