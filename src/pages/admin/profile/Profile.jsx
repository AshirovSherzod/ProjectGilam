import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} from "../../../context/api/userApi";
import img from "../../../assets/profile-img.png";
import { GoGitBranch, GoPerson } from "react-icons/go";
import { PiUserFocusFill } from "react-icons/pi";
import { FaPhone } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Input, message, Form } from "antd";
import CustomModal from "../../../components/modal/CustomModal";

const Profile = () => {
  const { data, refetch, isFetching } = useGetProfileQuery(); 
  const [updateProfile, {data: updatedProfile, isError, isLoading, isSuccess}] = useUpdateProfileMutation(); 
  const [updatePassword] = useUpdatePasswordMutation(); 

  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [isEditPasswordModalVisible, setIsEditPasswordModalVisible] =
    useState(false);


  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordHash, setPasswordHash] = useState(""); // New state for password_hash

  useEffect(() => {
    if (data) {
      setFullName(data.full_name);
      setUsername(data.username);
      setPhoneNumber(data.phone_number);
    }
  }, [data, isFetching]); 

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const showEditProfileModal = () => {
    setIsEditProfileModalVisible(true);
  };

  const handleEditProfileOk = async () => {
    updateProfile({full_name: fullName, password_hash: passwordHash, phone_number: phoneNumber, username: username})
  };

  const handleEditProfileCancel = () => {
    setIsEditProfileModalVisible(false);
  };

  const showEditPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsEditPasswordModalVisible(true);
  };

  const handleEditPasswordOk = async () => {
    if (newPassword !== confirmNewPassword) {
      message.error("Passwords do not match");
      return;
    }
    try {
      // Parolni yangilash uchun APIga o'zgargan ma'lumotlarni yuborish
      await updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      message.success("Password updated successfully");
      setIsEditPasswordModalVisible(false);
    } catch (error) {
      message.error("Failed to update password");
    }
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
          onClick={showEditProfileModal}
          className=" w-[120px] h-[35px] bg-[rgb(35,38,39)] text-white text-[14px] rounded-[8px] border-[1px]"
        >
          Edit Profile
        </button>
        <button
          onClick={showEditPasswordModal}
          className=" w-[120px] h-[35px] bg-[#232627] text-white text-[14px] rounded-[8px]"
        >
          Edit Password
        </button>
      </div>

      <CustomModal
        visible={isEditProfileModalVisible}
        onOk={handleEditProfileOk}
        onCancel={handleEditProfileCancel}
        title="Edit Profile"
        okText="Yes"
        cancelText="No"
        okButtonProps={{ className: "bg-[#232627] text-white" }}
        cancelButtonProps={{ className: "bg-red-600 text-white" }}
      >
        <Form layout="vertical">
        <Form.Item label="Password Hash">
            <Input.Password
              placeholder="Password Hash"
              value={passwordHash}
              onChange={(e) => setPasswordHash(e.target.value)}
            />
          </Form.Item>
          
          <Form.Item label="Full Name">
            <Input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Username">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Phone Number">
            <Input
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>

        </Form>
      </CustomModal>

      {/* Edit Password Modal */}
      <CustomModal
        visible={isEditPasswordModalVisible}
        onOk={handleEditPasswordOk}
        onCancel={handleEditPasswordCancel}
        title="Edit Password"
        okText="Yes"
        cancelText="No"
        okButtonProps={{ className: "bg-[#232627] text-white" }}
        cancelButtonProps={{ className: "bg-red-600 text-white" }}
      >
        <Form layout="vertical">
          <Form.Item label="Current Password">
            <Input.Password
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="New Password">
            <Input.Password
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Confirm New Password">
            <Input.Password
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Form.Item>
        </Form>
      </CustomModal>

      <div className="flex flex-row h-[400px] bg-white gap-[20px] py-[30px] px-[20px] border-[2px] rounded-[5px]">
        <div className="h-[200px] w-[200px] flex">
          <img className="w-full" src={img} alt="" />
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-row items-center gap-[30px]">
            <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
              <GoPerson />
            </span>
            <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
              {fullName} {/* Ma'lumotlar holat orqali aks ettiriladi */}
            </p>
          </div>
          <div className="flex flex-row items-center gap-[30px]">
            <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
              <PiUserFocusFill />
            </span>
            <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
              {username} {/* Ma'lumotlar holat orqali aks ettiriladi */}
            </p>
          </div>
          <div className="flex flex-row items-center gap-[30px]">
            <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
              <GoGitBranch />
            </span>
            <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
              {data?.role}
            </p>
          </div>
          <div className="flex flex-row items-center gap-[30px]">
            <span className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] text-[22px] border-[1px]">
              <FaPhone />
            </span>
            <p className="flex items-center w-[250px] h-[40px] pl-[20px] rounded-[5px] border-[1px]">
              {phoneNumber} {/* Ma'lumotlar holat orqali aks ettiriladi */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
