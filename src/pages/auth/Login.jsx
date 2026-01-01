import React, { useState } from "react";
import InputField from "@/common/InputField";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "@/ui/Button";
import { usePostMutation } from "@/services/apiService";
import { Lock, Mail, ArrowRight } from "lucide-react";

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
  };

  const handleSubmit = async () => {
    const payload = { email, password };
    console.log("Login payload:", payload);

    try {
      const response = await loginUser({
        path: "/community-user/login",
        body: payload,
      }).unwrap();

      console.log("API response:", response);
      toast.success("Login successful!");

      if (response?.meta?.token) {
        localStorage.setItem("authToken", response.meta.token);
        console.log("Token saved:", response.meta.token);
      }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
        
                   <h1 className="text-3xl font-bold text-slate-800 mb-2">Sign In</h1>
          <p className="text-slate-600">Access your complaint management portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                Email Address
              </label>
              <InputField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                field="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange focus:border-transparent transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" />
                Password
              </label>
              <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                field="password"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange focus:border-transparent transition-all"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-orange hover:text-orange-600 font-medium transition-colors"
                onClick={() => navigate("/forget-password")}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-orange hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-orange/30 hover:shadow-xl hover:shadow-orange/40 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-slate-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/choose-role")}
              className="text-orange hover:text-orange-600 font-semibold transition-colors"
            >
              Register Now
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;