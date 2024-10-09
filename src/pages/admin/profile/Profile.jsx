import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} from "../../../context/api/userApi"; // API chaqiruvlari
import img from "../../../assets/profile-img.png"; // Profil rasmi
import { GoGitBranch, GoPerson } from "react-icons/go"; // Ikonalar
import { PiUserFocusFill } from "react-icons/pi"; // Ikonalar
import { FaPhone } from "react-icons/fa"; // Ikonalar
import { useState, useEffect } from "react"; // React hooklari
import { Input, message, Form } from "antd"; // AntDesign komponentlari
import CustomModal from "../../../components/modal/CustomModal"; // Maxsus modal komponent

const Profile = () => {
  // Ma'lumot olish uchun useGetProfileQuery dan foydalanamiz
  const { data, refetch, isFetching } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation(); // Profil yangilash uchun
  const [updatePassword] = useUpdatePasswordMutation(); // Parolni yangilash uchun

  // Modalni boshqarish uchun useState
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [isEditPasswordModalVisible, setIsEditPasswordModalVisible] =
    useState(false);

  // Profil malumotlarini saqlash uchun state
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordHash, setPasswordHash] = useState(""); // New state for password_hash

  // Profil ma'lumotlari kelganda state'larni yangilash
  useEffect(() => {
    if (data) {
      setFullName(data.full_name);
      setUsername(data.username);
      setPhoneNumber(data.phone_number);
    }
  }, [data, isFetching]); 

  // Parol o'zgartirish uchun state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Profilni tahrirlash modalini ko'rsatish funksiyasi
  const showEditProfileModal = () => {
    setIsEditProfileModalVisible(true);
  };

  // Profil yangilashni tasdiqlash funksiyasi
  const handleEditProfileOk = async () => {
    try {
      await updateProfile({
        full_name: fullName,
        username,
        phone_number: phoneNumber,
        password_hash: passwordHash,
      }).unwrap();
      message.success("Profile updated successfully");
      await refetch(); // Profil ma'lumotlarini yangilash
      setIsEditProfileModalVisible(false); // Modalni yopish
    } catch (error) {
      // Agar backend password_hash bilan bog'liq xatolik yuborsa, uni ko'rsatamiz
      if (error?.data?.error === "Invalid password hash") {
        message.error("Failed to update profile: Invalid password hash");
      } else {
        message.error(`Failed to update profile: ${error?.message}`);
      }
    }
  };

  // Profilni tahrirlashni bekor qilish funksiyasi
  const handleEditProfileCancel = () => {
    setIsEditProfileModalVisible(false);
  };

  // Parolni tahrirlash modalini ko'rsatish funksiyasi
  const showEditPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsEditPasswordModalVisible(true);
  };

  // Parolni yangilashni tasdiqlash funksiyasi
  const handleEditPasswordOk = async () => {
    if (newPassword !== confirmNewPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      const result = await updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
      }).unwrap();

      message.success("Password updated successfully");
      setIsEditPasswordModalVisible(false);
    } catch (error) {
      // Xatolik tafsilotlarini ko'rsatish
      if (error?.data?.error === "Incorrect current password") {
        message.error("Failed to update password: Incorrect current password");
      } else if (error?.data?.error === "Password too weak") {
        message.error("Failed to update password: Password too weak");
      } else {
        message.error(
          `Failed to update password: ${error?.message || "Unknown error"}`
        );
      }
    }
  };

  // Parolni yangilashni bekor qilish funksiyasi
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
