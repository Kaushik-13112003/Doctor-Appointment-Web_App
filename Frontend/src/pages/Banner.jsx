import { useQuery } from "@tanstack/react-query";
import React from "react";

const Banner = () => {
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <>
      <div className={`${!authenticatedUser && "mt-[50px]"}`}>
        <div className=" sm:h-[390px]">
          <img
            src="./banner.png"
            alt="Home Page Banner"
            className=" h-[100%] w-[100%] rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
