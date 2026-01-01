import InputField from "@/common/InputField";
import { usePostMutation } from "@/services/apiService";
import Button from "@/ui/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MemberForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [communityCode, setCommunityCode] = useState("");

  const [errors, setErrors] = useState({});
  const [registerUser, { isLoading, error }] = usePostMutation();

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value.trim()) error = "required";
        break;
      case "email":
        if (!value.trim()) error = "required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "contact":
        if (!value.trim()) error = "required";
        else if (!/^\d{10,15}$/.test(value)) error = "Invalid contact number";
        break;
      case "password":
        if (!value.trim()) error = "required";
        else if (value.length < 6)
          error = "Password must be at least 6 characters";
        break;
      case "communityCode":
        if (!value.trim()) error = "required";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateAll = () => {
    const values = { name, email, contact, password, communityCode };
    let valid = true;
    Object.keys(values).forEach((field) => {
      if (!validateField(field, values[field])) valid = false;
    });
    return valid;
  };

  const handleSubmit = async () => {
    // if (!validateAll()) return;
    console.log("Submit clicked");
    try {
      console.log("Submit clicked");
      const response = await registerUser({
        path: "/community-members/register",
        body: { name, email, contact, password, community_code: communityCode },
      }).unwrap();

      console.log("Registration success:", response);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      }
    }
  };

  return (
    <div className="p-8 min-h-[600px] flex flex-col justify-center mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Hello! Register to start your journey.
      </h1>

      <InputField
        type="text"
        label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        errors={errors}
      />

      <InputField
        type="email"
        label="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errors={errors}
      />
      <InputField
        type="password"
        label="Pasword"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errors={errors}
      />
      <InputField
        type="text"
        label="Contact"
        name="contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        errors={errors}
      />
      <InputField
        type="text"
        label="Community Code"
        name="communityCode"
        value={communityCode}
        onChange={(e) => setCommunityCode(e.target.value)}
        errors={errors}
      />

      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Registering..." : "Register Now"}
      </Button>
    </div>
  );
};

export default MemberForm;
