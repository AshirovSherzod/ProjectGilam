import React from "react";
import { useGetProfileQuery } from "../../context/api/userApi";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetProfileQuery();
  console.log(data);

  return (
    <div
      style={{ width: "calc(100% - 250px)" }}
      className=" h-[78px] fixed py-1 px-2 bg-white"
    >
      <div className="flex items-center w-full h-full rounded-[20px] bg-[#232627] gap-2">
        <Link to={"/admin/profile"} className="flex flex-row items-center justify-center gap-2">
          <div className="flex flex-row items-center justify-center h-[60px] w-[60px] bg-gray-500 ml-5 rounded-[50%]">
            <h2 className="flex w-full h-full text-white mb-[9px] items-center justify-center text-[34px]">
              {data?.username?.split("")[0]}
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="text-white">{data?.full_name}</h2>
            <p className="text-white">{data?.role}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
