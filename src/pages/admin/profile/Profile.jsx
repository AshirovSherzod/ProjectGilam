import { useGetProfileQuery } from "../../../context/api/userApi";
import img from "../../../assets/profile-img.png";
import { GoGitBranch, GoPerson } from "react-icons/go";
import { PiUserFocusFill } from "react-icons/pi";
import { FaPhone } from "react-icons/fa";
import { useState } from "react";
import { Input } from "antd";
import CustomModal from "../../../components/modal/CustomModal";

const Profile = () => {
  const { data } = useGetProfileQuery();
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [isEditPasswordModalVisible, setIsEditPasswordModalVisible] =
    useState(false);

  const showEditProfileModal = () => {
    setIsEditProfileModalVisible(true);
  };

  const handleEditProfileOk = () => {
    setIsEditProfileModalVisible(false);
  };

  const handleEditProfileCancel = () => {
    setIsEditProfileModalVisible(false);
  };

  const showEditPasswordModal = () => {
    setIsEditPasswordModalVisible(true);
  };

  const handleEditPasswordOk = () => {
    setIsEditPasswordModalVisible(false);
  };

  const handleEditPasswordCancel = () => {
    setIsEditPasswordModalVisible(false);
  };

  return (
    <div
      style={{ width: "calc(100% - 20px)" }}
      className="flex flex-col gap-[20px] mt-[30px] mx-[10px]"
    >
      <div className=" flex flex-row gap-[20px]">
        <button
          onClick={showEditProfileModal} // Edit Profile modalni ochadi
          className=" w-[120px] h-[35px] bg-[rgb(35,38,39)] text-white text-[14px] rounded-[8px] border-[1px]"
        >
          Edit Profile
        </button>
        <button
          onClick={showEditPasswordModal} // Edit Password modalni ochadi
          className=" w-[120px] h-[35px] bg-[#232627]  text-white text-[14px] rounded-[8px]"
        >
          Edit Password
        </button>
      </div>

      {/* Edit Profile Modal */}
      <CustomModal
        visible={isEditProfileModalVisible}
        onOk={handleEditProfileOk}
        onCancel={handleEditProfileCancel}
        title="Edit Profile"
      >
        <Input placeholder="Full Name" defaultValue={data?.full_name} />
        <Input placeholder="Username" defaultValue={data?.username} />
        <Input placeholder="Phone Number" defaultValue={data?.phone_number} />
      </CustomModal>

      {/* Edit Password Modal */}
      <CustomModal
        visible={isEditPasswordModalVisible}
        onOk={handleEditPasswordOk}
        onCancel={handleEditPasswordCancel}
        title="Edit Password"
      >
        <Input.Password placeholder="Current Password" />
        <Input.Password placeholder="New Password" />
        <Input.Password placeholder="Confirm New Password" />
      </CustomModal>

      <div className="flex flex-row h-[400px] bg-white gap-[20px] py-[30px] px-[20px] border-[2px] rounded-[5px]">
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
      </div>
    </div>
  );
};

export default Profile;
