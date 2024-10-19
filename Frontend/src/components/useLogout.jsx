import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate("");

  //logout user
  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(dataFromResponse?.msg || "Logout Successfully");
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          navigate("/login");
        } else {
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleLogout = async (e) => {
    e.preventDefault();
    mutate();
  };
  return { handleLogout };
};

export default useLogout;
