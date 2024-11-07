import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import Appointments from "./profile/Appointments";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAppointments from "./admin/AdminAppointments";
import AddDoctors from "./admin/AddDoctors";
import DoctorsList from "./admin/DoctorsList";
import Header from "./admin/pages/Header";
import AdminHome from "./admin/admin-layout/AdminHome";
import DoctorDashboard from "./doctors/DoctorDashboard";
import DoctorAppointments from "./doctors/DoctorAppointments";
import UpdateDoctorProfile from "./doctors/UpdateDoctorProfile";
import DoctorProfile from "./doctors/DoctorProfile";
import { useQuery } from "@tanstack/react-query";
import WelcomeAdmin from "./admin/pages/WelcomeAdmin";
import WelcomeDoctor from "./doctors/WelcomeDoctor";
import PrivateRoute from "./pages/PrivateRoute";
import NotFound from "./pages/NotFound";
import Success from "./profile/Success";
import Cancel from "./profile/Cancel";

const App = () => {
  const navigate = useNavigate("");

  // Fetching authenticated user
  const { data: authenticatedUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/get-auth-user", {
          method: "GET",
        });

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          return dataFromResponse;
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  if (isLoading) {
    return <div className="text-center mt-7">Loading...</div>;
  }

  return (
    <>
      <Toaster />
      <ScrollToTop
        smooth
        className="bg-cyan-800 flex items-center justify-center"
        color="white"
      />

      <div className="w-[85vw]">
        {authenticatedUser?.role === "admin" && <Header />}
        {authenticatedUser?.role === "doctor" && <Header />}
        {authenticatedUser?.role === "patient" && <Navbar />}

        <Routes>
          {/* Public Routes */}
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {/* <Route path="/all-doctors" element={<Doctors />}></Route> */}
          <Route
            path="/:speciality"
            element={authenticatedUser ? <Speciality /> : <Register />}
          ></Route>
          <Route
            path="/doctor/:id"
            element={authenticatedUser ? <SingleDoctor /> : <Register />}
          ></Route>

          {/* Conditional Redirect for Unauthenticated Users */}
          {!authenticatedUser && (
            <Route path="*" element={<Navigate to="/login" />} />
          )}

          {/* Patient Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="patient"
              >
                <Home />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user-profile"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="patient"
              >
                <UserProfile />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/update-user-profile"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="patient"
              >
                <UpdateProfile />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/my-appointments"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="patient"
              >
                <Appointments />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/success"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="patient"
              >
                <Success />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/cancel"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="patient"
              >
                <Cancel />
              </PrivateRoute>
            }
          ></Route>

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="admin"
              >
                <AdminDashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/admin-appointments"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="admin"
              >
                <AdminAppointments />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/admin-add-doctor"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="admin"
              >
                <AddDoctors />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/admin-doctor-list"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="admin"
              >
                <DoctorsList />
              </PrivateRoute>
            }
          ></Route>

          {/* Doctor Routes */}
          <Route
            path="/doctor-dashboard"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="doctor"
              >
                <DoctorDashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/doctor-appointments"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="doctor"
              >
                <DoctorAppointments />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/doctor-profile"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="doctor"
              >
                <DoctorProfile />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/update-doctor-profile"
            element={
              <PrivateRoute
                authenticatedUser={authenticatedUser}
                requiredRole="doctor"
              >
                <UpdateDoctorProfile />
              </PrivateRoute>
            }
          ></Route>

          {/* Fallback Route for Unauthenticated Users */}
          <Route
            path="*"
            element={<NotFound authenticatedUser={authenticatedUser} />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
