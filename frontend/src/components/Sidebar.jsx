import React from "react";
import { FiHome, FiList, FiLogOut } from "react-icons/fi";
import NavItem from "./NavItem";

const Sidebar = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67344c856c473c001d68c10b.png"
            alt="User"
            className="w-16 h-16 rounded-full mb-2"
          />
          <h2 className="text-lg font-semibold">Sundar Gurung</h2>
          <p className="text-sm text-gray-500">sundargurung360@gmail.com</p>
        </div>

        <nav className="flex-1 space-y-4">
          <NavItem icon={<FiHome />} text="Dashboard" active />
          <NavItem icon={<FiList />} text="My Task" />
          <NavItem icon={<FiLogOut />} text="Logout" />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
