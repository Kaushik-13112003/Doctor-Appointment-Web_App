import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email, password }),
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          if (dataFromResponse?.role === "admin") {
            navigate("/admin-dashboard");
          } else if (dataFromResponse?.role === "doctor") {
            navigate("/doctor-dashboard");
          } else if (dataFromResponse?.role === "patient") {
            navigate("/"); // Patient home page
          }
          toast.success(dataFromResponse?.msg || "User Logged in Successfully");
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
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
    mutate({ email, password });
  };

  return (
    <div className="flex justify-center items-center mt-[50px]">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-cyan-800">Login</h2>
        <form className="flex flex-col gap-4">
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
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-cyan-800 text-white p-2 rounded-lg hover:bg-cyan-500 duration-300"
          >
            {isPending ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-cyan-800 underline">
              Register here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
