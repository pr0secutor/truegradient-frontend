import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login")
  }

  return (
    <aside className="flex">
      <nav className="w-20 whitespace-nowrap">
        <div className="fixed top-0 left-0 z-[1000] w-20 flex">
          <div className="flex h-screen w-20 flex-col items-center space-y-8 border-r border-slate-300 bg-slate-50 py-8 sm:w-16">
            <a href="#" className="mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-blue-600"
                fill="currentColor"
                strokeWidth="1"
                viewBox="0 0 24 24"
              >
                <path d="M20.553 3.105l-6 3C11.225 7.77 9.274 9.953 8.755 12.6c-.738 3.751 1.992 7.958 2.861 8.321A.985.985 0 0012 21c6.682 0 11-3.532 11-9 0-6.691-.9-8.318-1.293-8.707a1 1 0 00-1.154-.188zm-7.6 15.86a8.594 8.594 0 015.44-8.046 1 1 0 10-.788-1.838 10.363 10.363 0 00-6.393 7.667 6.59 6.59 0 01-.494-3.777c.4-2 1.989-3.706 4.728-5.076l5.03-2.515A29.2 29.2 0 0121 12c0 4.063-3.06 6.67-8.046 6.965zM3.523 5.38A29.2 29.2 0 003 12a6.386 6.386 0 004.366 6.212 1 1 0 11-.732 1.861A8.377 8.377 0 011 12c0-6.691.9-8.318 1.293-8.707a1 1 0 011.154-.188l6 3A1 1 0 018.553 7.9z"></path>
              </svg>
            </a>

            {role === "admin" ? (
              <a href="/admin">
                <MdOutlineSpaceDashboard className="rounded-lg h-9 w-9 p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200 focus:outline-none cursor-pointer" />
              </a>
            ) : (
              <a href="/">
                <MdOutlineSpaceDashboard className="rounded-lg h-9 w-9 p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200 focus:outline-none cursor-pointer" />
              </a>
            )}

            {role !== "admin" && (
              <a href="/saved_responses">
                <MdOutlineMarkUnreadChatAlt className="rounded-lg h-9 w-9 p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200 focus:outline-none cursor-pointer" />{" "}
              </a>
            )}

            <IoSettingsOutline className="rounded-lg h-9 w-9 p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200 focus:outline-none cursor-pointer" />
            <div className="flex-grow"/>
            <button onClick={handleLogout}>
              <BiLogOut className="rounded-lg h-9 w-9 p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200 focus:outline-none cursor-pointer" />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
