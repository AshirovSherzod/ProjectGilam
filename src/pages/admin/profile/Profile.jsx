import React from "react";
import { useGetProfileQuery } from "../../../context/api/userApi";
import img from "../../../assets/profile-img.png";
import { GoPerson } from "react-icons/go";

const Profile = () => {
  const { data } = useGetProfileQuery();
  console.log(data);

  return (
    <div
      style={{ width: "calc(100% - 20px)" }}
      className="flex flex-col gap-[20px] mt-[30px] mx-[10px]"
    >
      <div className=" flex flex-row gap-[20px]">
        <button className=" w-[120px] h-[35px] bg-[rgb(35,38,39)] text-white text-[14px] rounded-[8px] border-[1px]">
          Edit Profile
        </button>
        <button className=" w-[120px] h-[35px] bg-[#232627]  text-white text-[14px] rounded-[8px]">
          Edit Password
        </button>
      </div>
      <div className="flex flex-row h-[400px] bg-white py-[30px] px-[20px] border-[2px] rounded-[5px]">
        <div className="h-[200px] w-[200px] flex">
          <img className="w-full" src={img} alt="" />
        </div>
        <div className="flex flex-col">
          <p className="flex flex-row items-center gap-[5px]">
            <span className="text-[20px]">
              <GoPerson />
            </span>{" "}
            {data?.full_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
