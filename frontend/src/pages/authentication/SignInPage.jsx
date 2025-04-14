import React from "react";
import { FiUser, FiLock } from "react-icons/fi";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl flex overflow-hidden">
        <div className="w-1/2 hidden md:block">
          <img
            src="authentication/signin-dec.jpg"
            alt="Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>

          <div className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-gray-500" />
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-500" />
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Remember Me</span>
              </label>
              <a href="#" className="text-red-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition">
              Login
            </button>

            <div className="text-center text-gray-500 text-sm mt-4">
              Or, login with
              <div className="flex justify-center gap-4 mt-2">
                <div
                  className="w-10 h-10 bg-white rounded-full border border-gray-300 flex justify-center items-center cursor-pointer shadow-lg hover:shadow-2xl transition"
                  title="Google"
                >
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                    alt="Google Logo"
                    className="w-6 h-6"
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-6 text-sm text-gray-700">
              Don't have an account?{" "}
              <a href="/signup" className="text-red-500 hover:underline">
                Create One
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
