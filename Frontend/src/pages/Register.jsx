import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ name, email, password, role }) => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ name, email, password, role }),
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(
            dataFromResponse?.msg || "User Registered Successfully"
          );
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          navigate("/");
        } else {
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ name, email, password, role });
  };

  return (
    <div className="flex justify-center items-center mt-[50px]">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-cyan-800">Register</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          {/* Role Selection */}
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            {" "}
            <option value="">Select</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-cyan-800 text-white p-2 rounded-lg hover:bg-cyan-500 duration-300"
          >
            {isPending ? "Loading..." : "Create Account"}{" "}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already registered?{" "}
            <NavLink to="/login" className="text-cyan-800 underline">
              Log in here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
