import React from "react";

const NavItem = ({ icon, text, active = false }) => {
  return (
    <div
      className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
        active ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default NavItem;
