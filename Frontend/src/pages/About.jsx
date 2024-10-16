import React from "react";
import Banner from "./Banner";

const About = () => {
  return (
    <>
      <Banner />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
        {/* Header Section */}
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold text-cyan-800 mb-4">
            About CureConnect
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Welcome to CureConnect, your go-to solution for booking appointments
            with trusted doctors effortlessly. Our goal is to make healthcare
            accessible by connecting patients with healthcare professionals
            through a seamless, user-friendly platform.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-cyan-700 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At CureConnect, we aim to revolutionize the healthcare experience by
            simplifying the way you book appointments, manage consultations, and
            access medical information. We believe in delivering quality
            healthcare services with transparency and convenience for all.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-cyan-700 mb-4">
            Why Choose Us?
          </h2>
          <ul className="text-lg text-gray-600 max-w-2xl mx-auto list-disc list-inside">
            <li>Access a wide range of trusted healthcare professionals.</li>
            <li>Book appointments with ease and minimal wait times.</li>
            <li>Track and manage your medical history securely.</li>
            <li>Get reminders and updates for your upcoming consultations.</li>
            <li>24/7 support for any issues or concerns.</li>
          </ul>
        </div>

        {/* Closing Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-cyan-700 mb-4">
            Our Vision
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We envision a future where healthcare is more efficient,
            patient-centric, and easily accessible. CureConnect is committed to
            building a bridge between patients and healthcare providers,
            ensuring everyone gets the care they deserve, when they need it.
          </p>
        </div>

        {/* Footer Section */}
        <div className="mt-16 mb-8">
          <p className="text-gray-500">
            &copy; 2024 CureConnect. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
