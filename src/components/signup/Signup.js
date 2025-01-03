import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup({ setSignupModalOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    role: "User",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";
    if (!formData.mobile) formErrors.mobile = "Mobile number is required";
    if (!/^\d{10}$/.test(formData.mobile))
      formErrors.mobile = "Mobile number must be 10 digits";
    return formErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
        role: formData.role,
      };
  
      // Retrieve existing data or initialize it
      const existingData = JSON.parse(localStorage.getItem("users")) || {
        Admin: [],
        User: [],
      };
  
      // Save data based on role
      existingData[formData.role].push(userData);
      localStorage.setItem("users", JSON.stringify(existingData));
  
      // Show success toast
      toast.success("Registered Successfully! Please Login.");
      setSignupModalOpen(false);
      
      //navigate("/");
    } else {
      // Set form errors and show error toast
      setErrors(formErrors);
      toast.error("Registration failed. Please fill in all fields correctly.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
      </div>
      {/* Name */}
      <InputField
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      {/* Email */}
      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      {/* Mobile */}
      <InputField
        label="Mobile"
        name="mobile"
        type="text"
        value={formData.mobile}
        onChange={handleChange}
        error={errors.mobile}
      />

      {/* Password */}
      <InputField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      {/* Confirm Password */}
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Sign Up
      </button>
    </form>
  );
}

// Reusable InputField Component
const InputField = ({ label, name, type, value, onChange, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Signup;
