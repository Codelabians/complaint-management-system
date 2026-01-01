import Heading from '@/common/Heading';
import InputField from '@/common/InputField';
import Button from '@/ui/Button';
import React, { useEffect, useState } from 'react'

const UserDetails = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    secondaryEmail: "",
    cell: "",
    street: "",
    houseNo: "",
    role: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("adminUser"));

    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        email: user.email || "",
        cell: user.contact ,
        street: user.address || "",
        houseNo: user.streetNo || "",
        role: user.roles,
        secondaryEmail: "",
        currentPassword: "********",
      }));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className='w-full md:w-[90%] mx-auto'>
         <Heading heading="User Details"/>
         <div className=" mx-auto bg-white p-8  rounded-lg">
           
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="First name"
          field="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          errors={errors}

        />
        <InputField
          label="Last name"
          field="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
            errors={errors}

        />
        <InputField
          label="Email"
          field="email"
          value={formData.email}
          onChange={handleInputChange}
            errors={errors}

        />
        <InputField
          label="Secondary Email"
          field="secondaryEmail"
          value={formData.secondaryEmail}
          onChange={handleInputChange}
          errors={errors}

        />
        <InputField
          label="Cell"
          field="cell"
          value={formData.cell}
          onChange={handleInputChange}
          errors={errors}

        />
        <InputField
          label="Street Address"
          field="street"
          value={formData.street}
          onChange={handleInputChange}
          errors={errors}

        />
        <InputField
          label="House No"
          field="houseNo"
          value={formData.houseNo}
          onChange={handleInputChange}
          errors={errors}

        />
        <InputField
          label="Role"
          field="role"
          value={formData.role}
          onChange={handleInputChange}
          errors={errors}

        />
        <InputField
          label="Current Password"
          field="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={handleInputChange}
          errors={errors}

        />
        <InputField
          label="New Password"
          field="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleInputChange}
          errors={errors}

        />
        <InputField
          label="Confirm Password"
          field="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          errors={errors}

        />
      </form>

      <div className="mt-6">
        <Button
          type="submit"
        >
          Update Now
        </Button>
      </div>
    </div>
    </div>
  )
}

export default UserDetails
