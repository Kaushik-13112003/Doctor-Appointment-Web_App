import React, { useEffect, useState } from "react";
import { doctors } from "../assets/data";
import DoctorsLayout from "./DoctorsLayout";

const SuggestedDoctors = ({ singleDoctorData }) => {
  const [suggestedDoctors, setSuugestedDoctors] = useState([]);

  useEffect(() => {
    const filterDoctors = doctors.filter((ele) => {
      return (
        ele.specialty === singleDoctorData.specialty &&
        singleDoctorData.name !== ele.name
      );
    });
    setSuugestedDoctors(filterDoctors);
  }, [singleDoctorData?._id]);

  return (
    <>
      {suggestedDoctors?.length > 0 && (
        <>
          <h1 className="font-bold  text-2xl mt-6">Suggested Doctor</h1>

          <DoctorsLayout doctorsData={suggestedDoctors}></DoctorsLayout>
        </>
      )}
    </>
  );
};

export default SuggestedDoctors;
