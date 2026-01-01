import React, { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import Button from "@/ui/Button";

export default function UploadFile() {
  const [selectedOption, setSelectedOption] = useState("Select");
  const [fileName, setFileName] = useState("Choose File");

  const options = ["Select", "Option 1", "Option 2", "Option 3"];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("Choose File");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-10 p-4">
        {/* Dropdown Select */}
        <div className="relative">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="appearance-none bg-gray-100 border border-gray-300 rounded px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>

        {/* File Chooser */}
        <div className="relative">
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <label
            htmlFor="file-input"
            className="inline-block bg-gray-100 border border-gray-300 rounded px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors w-full text-center"
          >
            {fileName}
          </label>
        </div>
      </div>
      <div className="flex justify-end me-4 mb-2">
        <Button className="w-44 px-6 py-2 text-sm " icon={<Plus size={16}/>}>New Folder</Button>
      </div>
    </div>
  );
}
