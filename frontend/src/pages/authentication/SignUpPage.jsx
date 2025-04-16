import React, { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import api from "../../api";
import SpinnerLoading from "../../components/SpinnerLoading";

const SignUpPage = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const { login, isAuthorized } = useAuth();

  const handleConfirmPassword = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!handleConfirmPassword()) {
        setLoading(false);
        return;
      }

      const res = await api.post(route, {
        username,
        password,
        email,
      });

      setSuccess("Registration successful. Please login.");
      setTimeout(() => navigate("/signin", { replace: true }), 2000);
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid credentials");
        } else if (error.response.status === 400) {
          setError("Username already exists");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else if (error.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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

          {error && (
            <div className="mb-4 text-red-500 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-gray-500" />
              <input
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
                type="text"
                placeholder="Username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-gray-500" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-500" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-500" />
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            <button
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <SpinnerLoading />
                  Registering...
                </div>
              ) : (
                "Register"
              )}
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
