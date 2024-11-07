import React, { useState } from "react";
import LeftSide from "../layout/LeftSide";
import RightSide from "../layout/RightSide";
import { AiOutlineClose } from "react-icons/ai";
import Back from "./Back";

const Speciality = () => {
  const [filterDoctor, setFilterDoctors] = useState(false);

  return (
    <>
      <Back />
      <div className="flex gap-5 sm:flex-row flex-col ">
        <div className="sm:block hidden">
          <LeftSide  setFilterDoctors={setFilterDoctors}/>
        </div>
        <div className="sm:hidden">
          {filterDoctor ? (
            <div className=" relative">
              <AiOutlineClose
                className="absolute right-3 top-6"
                onClick={() => setFilterDoctors(false)}
              />
              <LeftSide />
            </div>
          ) : (
            <button onClick={() => setFilterDoctors(!filterDoctor)}>
              Filter
            </button>
          )}
        </div>
        <RightSide/>
      </div>
    </>
  );
};

export default Speciality;
