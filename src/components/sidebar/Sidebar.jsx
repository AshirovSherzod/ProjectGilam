import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <section className="w-[250px] h-[100vh] fixed bg-white border-r-[1px] border-[#E0E0E0]">
        <div className="h-[70px] border-b-[1px] flex items-center px-[20px] border-[#E0E0E0]">
            <h1 className="font-bold text-[24px]">Your Logo</h1>
            <h2>Salom</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum vitae animi dolorem!</p>
        </div>
        <NavLink></NavLink>
    </section>
  );
};

export default Sidebar;
