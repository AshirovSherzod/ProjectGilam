import React from "react";
import { useGetProfileQuery } from "../../context/api/userApi";

const Header = () => {
  const { data } = useGetProfileQuery();
  console.log(data);

  return (
    <div
      style={{ width: "calc(100% - 250px)" }}
      className=" h-[78px] fixed py-1 px-2 bg-white"
    >
      <div className=" w-full h-full rounded-[20px] bg-[#232627]">
        <h1>Hello world</h1>
      </div>
    </div>
  );
};

export default Header;
