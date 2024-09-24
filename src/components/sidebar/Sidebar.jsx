import React from "react";

const Sidebar = () => {
  return (
    <section className="w-[250px] h-[100vh] fixed bg-white border-r-[1px] border-[#E0E0E0]">
        <div className="h-[70px] border-b-[1px] flex items-center px-[20px] border-[#E0E0E0]">
            <h1 className="font-bold text-[24px]">Your Logo</h1>
        </div>
    </section>
  );
};

export default Sidebar;
