import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { updateAuthState } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function resetForm() {
    setFormData({
      email: "",
      password: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      await updateAuthState();
      toast.success(data.data.message);
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Registration Error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data.message || error.message);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        className="max-w-[500px] w-full  flex flex-col gap-5 px-4 lg:p-0"
        onSubmit={handleSubmit}
      >
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="email" className="text-gray-500 font-medium text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            placeholder="umair@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-gray-500 font-medium text-sm"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            placeholder="********"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="text-sm font-medium bg-green-400 text-white transition-all px-6 py-3 rounded-md cursor-pointer"
        >
          Sign In
        </button>
        <div className="text-center">
          <span className="text-gray-500">Don't have an account?</span>{" "}
          <Link to="/signup" className="text-green-500 font-medium">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
