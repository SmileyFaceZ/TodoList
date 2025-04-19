import React from "react";
import { FiHome, FiList, FiLogOut } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import useUser from "../hooks/useUser";
import { Skeleton } from "./ui/skeleton";

const Sidebar = () => {
  const { username, email, loading } = useUser();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67344c856c473c001d68c10b.png"
            alt="User"
            className="w-16 h-16 rounded-full mb-2"
          />
          {loading ? (
            <div>
              <Skeleton className="w-40 h-8 mt-2 mb-2" />
            </div>
          ) : (
            <div>
              <h2 className="text-lg text-center font-semibold">{username}</h2>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-4">
          <NavItem
            icon={<FiHome />}
            text="Dashboard"
            route="/"
            active={location.pathname === "/"}
          />
          <NavItem
            icon={<FiList />}
            text="Task Setting"
            route="/task-setting"
            active={location.pathname.startsWith("/task-setting")}
          />
          {loading ? (
            <Skeleton className="w-40 h-6" />
          ) : username ? (
            <NavItem
              icon={<FiLogOut />}
              text="Logout"
              route="/logout"
              active={location.pathname === "/logout"}
            />
          ) : (
            <NavItem
              icon={<FiLogOut />}
              text="Sign In"
              route="/signin"
              active={location.pathname === "/signin"}
            />
          )}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
