import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Navbar from "./components/Navbar";
import Speciality from "./components/Speciality";
import SingleDoctor from "./components/SingleDoctor";
import UserProfile from "./profile/UserProfile";
import UpdateProfile from "./profile/UpdateProfile";
import Footer from "./pages/Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";

const App = () => {
  return (
    <>
      <Toaster />
      <ScrollToTop
        smooth
        className="bg-cyan-800 flex items-center justify-center "
        color="white"
      />

      <div className="w-[85vw] ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/:specialty" element={<Speciality />}></Route>
          <Route path="/user-profile" element={<UserProfile />}></Route>
          <Route path="/update-profile" element={<UpdateProfile />}></Route>
          <Route path="/doctor/:id" element={<SingleDoctor />}></Route>
          <Route path="/all-doctors" element={<Doctors />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
