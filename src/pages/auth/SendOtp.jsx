import CommunityHero from "@/components/communityHero";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

const SendOtp = () => {
  const [otp, setOtp] = useState("");
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Hero */}
          <CommunityHero />

          {/* Right Side */}
          <div className="lg:w-[40%] mx-auto flex flex-col justify-center px-8 py-6">
            <h1 className="text-2xl font-semibold my-4 font-manrope">
              Enter The Verification Code
            </h1>

            <div className="flex flex-col gap-y-3 mt-4">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={5}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  fontSize: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                  marginRight: "20px",
                }}
                focusStyle={{
                  border: "1px solid #f97316",
                  outline: "none",
                }}
              />
              <p className="text-sm">
                Didn't receive code?{" "}
                <span className="text-orange cursor-pointer hover:underline">
                  Resend it?
                </span>
              </p>
              <button className="w-full bg-orange hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-3">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;
