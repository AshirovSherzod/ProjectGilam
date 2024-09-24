import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";

const Admin = () => {
  return (
    <main className="flex-row">
      <Sidebar />
      <div className="flex-col ml-[250px]">
        <Header />
        <p>lorem100000</p>
      </div>
    </main>
  );
};

export default Admin;
