import InputField from '@/common/InputField';
import { usePostMutation } from '@/services/apiService';
import Button from '@/ui/Button';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminForm = () => {
  const navigate = useNavigate();
  const [registerAdmin, { isLoading }] = usePostMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation per field
  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'name':
        if (!value.trim()) error = 'required';
        break;
      case 'email':
        if (!value.trim()) error = 'required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = 'Invalid email format';
        break;
      case 'contact':
        if (!value.trim()) error = 'required';
        else if (!/^\d{10,15}$/.test(value))
          error = 'Invalid contact number';
        break;
      case 'password':
        if (!value.trim()) error = 'required';
        else if (value.length < 6)
          error = 'Password must be at least 6 characters';
        break;
      default:
        break;
    }

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }

    return !error;
  };

  const handleBlur = (field, value) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    validateField(field, value);
  };

  const validateAll = () => {
    let valid = true;
    if (!validateField('name', name)) valid = false;
    if (!validateField('email', email)) valid = false;
    if (!validateField('contact', contact)) valid = false;
    if (!validateField('password', password)) valid = false;
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateAll()) return;

    try {
      const response = await registerAdmin({
        path: '/community-admins/register',
        body: { name, email, contact, password },
      }).unwrap();

      toast.success('Admin registered successfully!');
      console.log('API response:', response);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      toast.error(err?.data?.message || 'Something went wrong!');
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      }
    }
  };

  return (
    <div className="p-8 min-h-[600px] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold font-manrope text-gray-900">
          Hello! Register to start your journey.
        </h1>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-y-3 mt-4">
        <InputField
          label="Name"
          field="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur('name', name)}
          errors={errors}
        />
        <InputField
          label="Email"
          field="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email', email)}
          errors={errors}
        />
        <InputField
          label="Contact"
          field="contact"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          onBlur={() => handleBlur('contact', contact)}
          errors={errors}
        />
        <InputField
          label="Password"
          field="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password', password)}
          errors={errors}
        />

        {/* Forgot Password */}
        <div className="flex justify-end text-sm mb-2">
          <button
            type="button"
            className="font-manrope text-orange hover:text-orange-600 transition-colors"
            onClick={() => navigate('/forget-password')}
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2">
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Now'}
        </Button>

        <div className="text-center text-sm text-gray-600 font-manrope">
          Already have an account?{' '}
          <button
            type="button"
            className="text-orange hover:text-lightorange font-medium font-manrope"
            onClick={() => navigate('/login')}
          >
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
