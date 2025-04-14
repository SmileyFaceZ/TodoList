import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow p-4 from-red-200 via-pink-200 to-purple-200 bg-gradient-to-r">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
