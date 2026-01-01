import React, { useState } from "react";
import CommunityHero from "@/components/communityHero";
import InputField from "@/common/InputField";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "@/ui/Button";
import { usePostMutation } from "@/services/apiService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [touched, setTouched] = useState({});

  const [loginUser, { isLoading }] = usePostMutation();

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    // Validate on blur
    validateField(field, formData[field]);
  };
  const handleSubmit = async () => {
    const payload = { email, password };
    console.log("Login payload:", payload);

    try {
      const response = await loginUser({
        path: "/community-user/login",
        body: payload,
      }).unwrap();

      console.log("API response:", response); // Full response

      toast.success("Login successful!");

      // Save token
      if (response?.meta?.token) {
        localStorage.setItem("authToken", response.meta.token);
        console.log("Token saved:", response.meta.token);
      }

      // Save user info
      if (response?.data?.user) {
        localStorage.setItem("adminUser", JSON.stringify(response.data.user));
        console.log("User saved:", response.data.user);
      }

      navigate("/portal");
    } catch (err) {
      console.error("Login failed:", err);
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Login failed. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Hero */}
          <CommunityHero />

          {/* Right Side - Role Selection */}
          <div className="w-[40%] mx-auto flex flex-col justify-center px-8 py-6">
            <h1 className="text-2xl font-semibold my-4 font-manrope">
              Welcome Back! <br /> Glad To See You Again
            </h1>
            <div className="flex flex-col gap-y-3 mt-4">
              <InputField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                field="email"
              />
               <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                field="password"
              />

              {/* Forgot Password */}
              <div className="flex justify-end text-sm mb-2">
                <button
                  type="button"
                  className="text-orange hover:text-orange-600 transition-colors font-manrope"
                  onClick={() => navigate("/forget-password")}
                >
                  Forgot Password?
                </button>
              </div>
              <Button onClick={handleSubmit} 
              disabled={isLoading}
              >Login</Button>
              <span onClick={() => navigate("/choose-role")}>
                Didn't have an account?{" "}
                <span className="text-orange font-manrope cursor-pointer">
                  Register Now
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
