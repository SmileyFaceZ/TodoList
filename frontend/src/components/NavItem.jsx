import React from "react";
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";

const NavItem = ({ icon, text, route, active = false }) => {
  const navigate = useNavigate();
  const { isAuthorized, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signup");
  };

  return (
    <button
      onClick={route === "/logout" ? handleLogout : () => navigate(route)}
      className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
        active ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default NavItem;
