import React, { useState } from "react";
import { Upload } from "lucide-react";
import Heading from "@/common/Heading";

const CreateCommunity = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    logo: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  return (
    <div className=" flex items-center justify-center px-4">
      <div className=" p-8 w-[80%]">
        <Heading heading="Create Community"/>
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="John Doe"
            />
          </div>

          {/* Address */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              Community Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="20 Cooper Square, New York, NY 10003, USA"
            />
          </div>

          {/* Logo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium  mb-2">
              Add your Logo
            </label>
            <div className="flex ">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center h-36 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center text-gray-400">
                  <Upload className="w-6 h-6 mb-2" />
                  <p className="text-sm">Paste an image here or</p>
                  <p className="text-sm font-semibold text-orange-500">
                    Upload from your computer
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button className="bg-orange hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Create Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;
