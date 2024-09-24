import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <main className="flex-row">
      <Sidebar />
      <div className="flex-col ml-[250px]">
        <Header />
        <div className="pt-[70px]">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Admin;
