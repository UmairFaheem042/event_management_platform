import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="max-w-[500px] w-full  flex flex-col gap-5 px-4 lg:p-0">
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

        <button className="text-sm font-medium bg-green-400 text-white transition-all px-6 py-3 rounded-md cursor-pointer">
          Sign In
        </button>
        <div className="text-center">
          <span className="text-gray-500">Already have an account?</span>{" "}
          <Link to="/signup" className="text-green-500 font-medium">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
