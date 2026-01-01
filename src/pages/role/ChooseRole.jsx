import CommunityHero from "@/components/communityHero";
import Button from "@/ui/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChooseRole = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const roles = [
    {
      id: "member",
      title: "Join as Member",
      description: "Access community features and connect with neighbors",
    },
    {
      id: "admin",
      title: "Join as Admin",
      description: "Manage community settings and moderate content",
    },
  ];

    const handleProceed = () => {
    if (selectedRole === "admin") {
      navigate("/register-for-admin");
    } else if (selectedRole === "member") {
      navigate("/register-for-member");
    }
  };


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Hero */}
          <CommunityHero />

          {/* Right Side - Role Selection */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-sm mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Choose your Role
              </h2>
              <p className="mb-8">
                Select how you'd like to join our community
              </p>

              <div className="space-y-6 mb-10">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`border-2 rounded-2xl p-6 lg:p-8 cursor-pointer transition-all ${
                      selectedRole === role.id
                        ? "border-orange"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {role.title}
                        </h3>
                        <p className="text-base text-gray-600">
                          {role.description}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedRole === role.id
                            ? "border-orange"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedRole === role.id && (
                          <div className="w-3.5 h-3.5 bg-orange rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="w-full bg-orange  text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                disabled={!selectedRole}
                onClick={handleProceed}
              >
                Proceed to Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
