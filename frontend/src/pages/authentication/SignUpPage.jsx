import React from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="authentication/signup-dec.jpg"
            alt="Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>

          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="relative w-1/2">
                <FiUser className="absolute left-3 top-3.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div className="relative w-1/2">
                <FiUser className="absolute left-3 top-3.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-gray-500" />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-500" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="form-checkbox mr-2" />I agree to
              all terms
            </div>

            <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition">
              Register
            </button>

            <div className="text-center mt-4 text-sm text-gray-700">
              Already have an account?{" "}
              <a href="/signin" className="text-red-500 hover:underline">
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
