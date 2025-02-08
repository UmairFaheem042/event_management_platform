import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="max-w-[500px] w-full  flex flex-col gap-5 px-4 lg:p-0">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="firstName"
            className="text-gray-500 font-medium text-sm"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            placeholder="Umair"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="lastName"
            className="text-gray-500 font-medium text-sm"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            placeholder="Faheem"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="email" className="text-gray-500 font-medium text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            placeholder="umair@example.com"
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
            required
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-gray-500 font-medium text-sm"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            placeholder="********"
            required
          />
        </div>
        <button className="text-sm font-medium bg-green-400 text-white transition-all px-6 py-3 rounded-md cursor-pointer">
          Create Account
        </button>
        <div className="text-center">
          <span className="text-gray-500">Already have an account?</span>{" "}
          <Link to="/signin" className="text-green-500 font-medium">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
