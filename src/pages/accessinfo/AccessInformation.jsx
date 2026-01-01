import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import Heading from "@/common/Heading";
import InputField from "@/common/InputField";
import Button from "@/ui/Button";
import Modal from "@/widgets/layout/Modal";

const AccessInformation = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "••••••••",
  });
  const [errors, setErrors] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [modalFormData, setModalFormData] = useState({
    category: "",
    description: "",
    ssid: "",
    password: "",
  });

  const [wifiNetworks] = useState([
    {
      id: 1,
      category: "Elmwood/Rod & Clubhouse WiFi",
      description:
        "The Rawleigh Homeowners Association supplies WiFi access at the Elmwood Clubhouse and pool for use by member and guests",
      ssid: "ElmwoodPool",
      password: "••••••••",
    },
    {
      id: 2,
      category: "Carrington Pool & Tennis WiFi",
      description:
        "The Rawleigh Homeowners Association supplies WiFi access at the Elmwood Clubhouse and pool for use by member and guests",
      ssid: "CarringtonWiFi",
      password: "••••••••",
    },
    {
      id: 3,
      category: "HOA Zoom Master Account",
      description:
        "This is the master HOA zoom account used to start a zoom meeting for allowing remote access to meeting",
      isAccount: true,
    },
  ]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    console.log("Update Now clicked", formData);
  };
  const handleBlur = () => {
    console.log("blurred");
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" w-full md:w-[90%] mx-auto space-y-6">
        <Heading heading="Access Information" />
        {/* WiFi Network Cards */}
        {wifiNetworks.map((network) => (
          <div
            key={network.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className=" font-medium mb-1">Category</h3>
                <p className="text-gray-900 font-medium">{network.category}</p>
              </div>
              <button
                className="relative text-gray-400 hover:text-gray-600 p-1"
                onClick={() => toggleDropdown(network.id)}
              >
                <MoreHorizontal size={20} />
                {openDropdownId === network.id && (
                  <div className="absolute right-0 mt-2 w-28  bg-white border border-gray-200 shadow-md rounded-md z-10">
                    <button
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                      onClick={() => {
                        console.log("Edit clicked for", network.id);
                        setIsModalOpen(true);
                        setModalFormData({
                          category: network.category || "",
                          description: network.description || "",
                          ssid: network.ssid || "",
                          password: network.password || "",
                        });
                        setOpenDropdownId(null);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 text-red-500"
                      onClick={() => {
                        console.log("Delete clicked for", network.id);
                        // Add delete logic here
                        setOpenDropdownId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">
                Description
              </h4>
              <p className="text-sm  leading-relaxed">
                {network.description}
              </p>
            </div>

            {network.isAccount ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InputField
                    label="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    errors={errors}
                  />
                </div>
                <div>
                  <InputField
                    label="Last Name"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    errors={errors}
                  />
                </div>
                <div>
                  <InputField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    errors={errors}
                  />
                </div>
                <div>
                  <InputField
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    errors={errors}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    SSID
                  </label>
                  <input
                    type="text"
                    value={network.ssid}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={network.password}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col  sm:flex-row gap-3 float-right">
          <Button onClick={handleAddNew}>Add New</Button>
          <Button onClick={handleUpdate}>Update Now</Button>
        </div>
        {/* {isModalOpen &&  */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Your Information"
        >
          <InputField
            label="Category"
            type="text"
            value={modalFormData.category}
            onBlur={handleBlur}
            onChange={handleInputChange}
            errors={errors}
          />
          <InputField
            label="Description"
            type="textarea"
            value={modalFormData.description}
            onBlur={handleBlur}
            onChange={handleInputChange}
            errors={errors}
          />
          <InputField
            label="SSID"
            type="text"
            value={modalFormData.ssid}
            onBlur={handleBlur}
            onChange={handleInputChange}
            errors={errors}
          />
          <InputField
            label="Password"
            type="password"
            value={modalFormData.password}
            onBlur={handleBlur}
            onChange={handleInputChange}
            errors={errors}
          />
          <div className="flex justify-end gap-x-4">
            <Button
              className="bg-red hover:bg-lightred"
              onClick={() => setIsModalOpen(false)}
            >
              Discard
            </Button>
            <Button>Save</Button>
          </div>
        </Modal>

        {/* } */}
      </div>
    </div>
  );
};

export default AccessInformation;
