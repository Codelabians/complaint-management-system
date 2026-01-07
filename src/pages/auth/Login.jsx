import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Button from "@/ui/Button";
import { usePostMutation } from "@/services/apiService";
import { setCredentials } from "@/features/authSlice"; // better absolute path
import FormInput from "@/components/forms/Formnput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = usePostMutation();

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const payload = { username, password };

    try {
      const response = await loginUser({
        path: "admin/login", // or url: "/auth/login" – depends on your apiService setup
        body: payload,
      }).unwrap();

      toast.success("Login successful!");

      dispatch(
        setCredentials({
          token: response?.token,
          user: response?.user,
        })
      );

      navigate("/portal");
    } catch (err) {
      console.error("Login failed:", err);
      const errorMsg =
        err?.data?.message || err?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Sign In</h1>
        <p className="text-slate-600">Access your complaint management portal</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              Username
            </label>
            <FormInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange focus:border-transparent transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400" />
              Password
            </label>
            <FormInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange focus:border-transparent transition-all"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-greenDarkest hover:text-greenPrimary font-medium transition-colors"
              onClick={() => navigate("/forget-password")}
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-greenDarkest hover:bg-greenPrimary text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

      <div className="text-center mt-6">
        <p className="text-slate-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/choose-role")}
            className="text-greenDarkest font-semibold transition-colors"
          >
            Register Now
          </button>
        </p>
      </div>
    </>
  );
};

export default Login;