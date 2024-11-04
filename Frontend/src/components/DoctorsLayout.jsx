import React from "react";
// import { doctors } from "../assets/data";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const DoctorsLayout = () => {
  //getting logged in authenticated user
  const { data: allDoctors, isLoading } = useQuery({
    queryKey: ["allDoctors"],

    queryFn: async () => {
      try {
        const res = await fetch(`/api/doctor/speciality/all-doctors`, {
          method: "GET",
        });

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          return dataFromResponse?.allDoctors;
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isLoading) {
    return <div className="text-center mt-7">Loading...</div>;
  }
  // console.log(allDoctors);

  return (
    <>
      <div className=" flex  flex-col gap-5 mb-10  items-center mt-[25px]">
        <div className="grid sm:grid-cols-3 md:grid-cols-3 gird-cols-2 gap-6">
          {allDoctors &&
            allDoctors?.map((ele) => {
              return (
                <>
                  <NavLink
                    to={`/doctor/${ele._id}`}
                    className="flex flex-col rounded-t border border-black hover:shadow-[2px_2px_blue] hover:cursor-pointer duration-500"
                  >
                    <div className="sm:h-[220px] sm:w-[220px]">
                      <img
                        src={ele.image ? ele.image : "/profile.jpg"}
                        // src="/banner.png"
                        alt={ele?.name}
                        className="h-[100%] w-[100%]  rounded-t  border-b border-gray-400"
                      />
                    </div>

                    <div className="p-3">
                      <h1 className=" font-bold text-2xl ">{ele?.name}</h1>
                      <p>speciality : {ele?.speciality}</p>
                      <p>Fees : ₹{ele?.fees}</p>
                    </div>
                  </NavLink>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default DoctorsLayout;
