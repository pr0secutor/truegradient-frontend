import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-white min-h-[calc(100dvh-64px)] w-full">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
