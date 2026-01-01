import React, { useState } from "react";
import { ChevronDown, MapPin, Waves } from "lucide-react";
import Heading from "@/common/Heading";

const Pools = () => {
  const [selectedPool, setSelectedPool] = useState("Emerywood Pool");

  const poolsData = {
    "Emerywood Pool": {
      location: "601 Emerywood Dr",
      status: "OPEN",
      waterTemp: "78°F",
      capacity: "Normal",
      scheduleData: {
        "Days without Swimming": {
          dates: "May 10 - September 02",
          schedule: {
            MON: "7:00 am - 7:00 pm",
            TUE: "7:00 am - 7:00 pm",
            WED: "7:00 am - 7:00 pm",
            THU: "7:00 am - 7:00 pm",
            FRI: "7:00 am - 7:00 pm",
            SAT: "7:00 am - 7:00 pm",
            SUN: "7:00 am - 7:00 pm",
          },
        },
        "Lifeguard Hours": {
          dates: "May 10 - September 02",
          schedule: {
            MON: "7:00 am - 7:00 pm",
            TUE: "7:00 am - 7:00 pm",
            WED: "7:00 am - 7:00 pm",
            THU: "7:00 am - 7:00 pm",
            FRI: "7:00 am - 7:00 pm",
            SAT: "7:00 am - 7:00 pm",
            SUN: "7:00 am - 7:00 pm",
          },
        },
        "Post Summer": {
          dates: "May 10 - September 02",
          schedule: {
            MON: "7:00 am - 7:00 pm",
            TUE: "7:00 am - 7:00 pm",
            WED: "7:00 am - 7:00 pm",
            THU: "7:00 am - 7:00 pm",
            FRI: "7:00 am - 7:00 pm",
            SAT: "7:00 am - 7:00 pm",
            SUN: "7:00 am - 7:00 pm",
          },
        },
      },
    },
    "Carrington Pool": {
      location: "401 Carrington Dr",
      status: "OPEN",
      waterTemp: "76°F",
      capacity: "Normal",
      scheduleData: {
        "Days without Swimming": {
          dates: "May 15 - September 10",
          schedule: {
            MON: "6:00 am - 8:00 pm",
            TUE: "6:00 am - 8:00 pm",
            WED: "6:00 am - 8:00 pm",
            THU: "6:00 am - 8:00 pm",
            FRI: "6:00 am - 8:00 pm",
            SAT: "8:00 am - 6:00 pm",
            SUN: "8:00 am - 6:00 pm",
          },
        },
        "Lifeguard Hours": {
          dates: "May 15 - September 10",
          schedule: {
            MON: "10:00 am - 6:00 pm",
            TUE: "10:00 am - 6:00 pm",
            WED: "10:00 am - 6:00 pm",
            THU: "10:00 am - 6:00 pm",
            FRI: "10:00 am - 6:00 pm",
            SAT: "10:00 am - 4:00 pm",
            SUN: "10:00 am - 4:00 pm",
          },
        },
        "Post Summer": {
          dates: "September 11 - October 15",
          schedule: {
            MON: "6:00 am - 6:00 pm",
            TUE: "6:00 am - 6:00 pm",
            WED: "6:00 am - 6:00 pm",
            THU: "6:00 am - 6:00 pm",
            FRI: "6:00 am - 6:00 pm",
            SAT: "Closed",
            SUN: "Closed",
          },
        },
      },
    },
  };

  const currentPool = poolsData[selectedPool];

  const PoolCard = ({
    name,
    location,
    status,
    waterTemp,
    capacity,
    isSelected,
    onClick,
  }) => (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected ? "border-orange" : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {/* <div className="w-4 h-4 bg-orange rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div> */}
          <Waves />
          <h3 className="font-semibold text-gray-900">{name}</h3>
        </div>
       <div>
         <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-gray-200 px-2 py-1 rounded">
            {status}
          </span>
          
        </div>
         <div className="flex flex-col gap-y-2 mt-2 text-xs text-gray-500">
        <span>Water: {waterTemp}</span>
        <span>Capacity: {capacity}</span>
      </div>
       </div>
      </div>
      <p className="text-sm  mb-3 flex items-center gap-1">
        <MapPin size={16} />
        {location}
      </p>
     
    <div className="mt-3 pt-3 border-t-2 border-gray-300">
  <div className="flex items-center gap-2 text-sm">
    <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-orange" : "bg-gray-400"}`}></span>
    <span className={isSelected ? " font-semibold" : "text-gray-600"}>Selected</span>
  </div>
</div>
    </div>
  );

  return (
    <div className="w-full md:w-[90%] mx-auto p-6 bg-gray-50 min-h-screen">
      <Heading heading="Pools" />
      <div className="grid gap-4 mb-8">
        {Object.entries(poolsData).map(([poolName, poolInfo]) => (
          <PoolCard
            key={poolName}
            name={poolName}
            location={poolInfo.location}
            status={poolInfo.status}
            waterTemp={poolInfo.waterTemp}
            capacity={poolInfo.capacity}
            isSelected={selectedPool === poolName}
            onClick={() => setSelectedPool(poolName)}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
             <Waves/>
            {selectedPool}
          </h2>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold ">
                    Seasons
                  </th>
                  <th className="text-left py-3 px-4 font-semibold ">
                    Dates
                  </th>
                  <th className="text-left py-3 px-4 font-semibold ">
                    MON
                  </th>
                  <th className="text-left py-3 px-4 font-semibold ">
                    TUE
                  </th>
                  <th className="text-left py-3 px-4 font-semibold ">
                    WED
                  </th>
                  <th className="text-left py-3 px-4 font-semibold ">
                    THU
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    FRI
                  </th>
                  <th className="text-left py-3 px-4 font-semibold ">
                    SAT
                  </th>
                  <th className="text-left py-3 px-4 font-semibold ">
                    SUN
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(currentPool.scheduleData).map(
                  ([season, data], index) => (
                    <tr
                      key={season}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-3 px-4 font-medium ">
                        {season}
                      </td>
                      <td className="py-3 px-4 ">{data.dates}</td>
                      <td className="py-3 px-4 ">
                        {data.schedule.MON}
                      </td>
                      <td className="py-3 px-4 ">
                        {data.schedule.TUE}
                      </td>
                      <td className="py-3 px-4 ">
                        {data.schedule.WED}
                      </td>
                      <td className="py-3 px-4 ">
                        {data.schedule.THU}
                      </td>
                      <td className="py-3 px-4 ">
                        {data.schedule.FRI}
                      </td>
                      <td className="py-3 px-4 ">
                        {data.schedule.SAT}
                      </td>
                      <td className="py-3 px-4 ">
                        {data.schedule.SUN}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        <div className="float-right mt-4">
          <button
            className="bg-orange text-white px-6 py-3 text-sm rounded shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 font-medium"
          >
            <span >View Schedule</span>
          </button>
        </div>
    </div>
  );
};

export default Pools;
