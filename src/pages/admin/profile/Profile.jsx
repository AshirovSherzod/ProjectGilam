import React, { useState } from "react";
import { useGetProfileQuery } from "../../../context/api/userApi";
import img from "../../../assets/profile-img.png";
import { GoGitBranch, GoPerson } from "react-icons/go";
import { PiUserFocusFill } from "react-icons/pi";
import { FaPhone } from "react-icons/fa";

const Profile = () => {
  const [change, setChange] = useState(0);
  const { data } = useGetProfileQuery();
  console.log(data);

  return (
    <div
      style={{ width: "calc(100% - 20px)" }}
      className="flex flex-col gap-[20px] mt-[30px] mx-[10px]"
    >
      <div className=" flex flex-row gap-[20px]">
        <button
          onClick={() => setChange(1)}
          className=" w-[120px] h-[35px] bg-[rgb(35,38,39)] text-white text-[14px] rounded-[8px] border-[1px]"
        >
          Edit Profile
        </button>
        <button
          onClick={() => setChange(2)}
          className=" w-[120px] h-[35px] bg-[#232627]  text-white text-[14px] rounded-[8px]"
        >
          Edit Password
        </button>
      </div>
      <div className="flex flex-row h-[400px] bg-white gap-[20px] py-[30px] px-[20px] border-[2px] rounded-[5px]">
        {change === 0 ? (
          <>
            <div className="h-[200px] w-[200px] flex">
              <img className="w-full" src={img} alt="" />
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-row items-center gap-[30px]">
                <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
                  <GoPerson />
                </span>{" "}
                <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
                  {data?.full_name}
                </p>
              </div>
              <div className="flex flex-row items-center gap-[30px]">
                <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
                  <PiUserFocusFill />
                </span>{" "}
                <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
                  {data?.username}
                </p>
              </div>
              <div className="flex flex-row items-center gap-[30px]">
                <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
                  <GoGitBranch />
                </span>{" "}
                <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
                  {data?.role}
                </p>
              </div>
              <div className="flex flex-row items-center gap-[30px]">
                <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
                  <FaPhone />
                </span>{" "}
                <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
                  {data?.phone_number}
                </p>
              </div>
            </div>
          </>
        ) : change === 1 ? (
          <></>
        ) : change === 2 ? (
          <></>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
