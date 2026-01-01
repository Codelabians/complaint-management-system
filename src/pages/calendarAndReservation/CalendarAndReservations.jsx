import Heading from "@/common/Heading";
import React from "react";
import CalendarComponent from "../homepage/components/CalendarComponent";

const CalendarAndReservations = () => {
  return (
    <div className=" mx-auto">
      <div className="w-[87%] mx-auto">
        <Heading heading="Clubhouse" />
      </div>
      <CalendarComponent />
      <div className="w-[90%] mx-auto mt-8 flex justify-end">
        <button className="md:me-6 px-8 py-3 text-sm bg-orange text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm">
          Reserve
        </button>
      </div>
    </div>
  );
};

export default CalendarAndReservations;
