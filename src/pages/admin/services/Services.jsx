import { Space, Table } from "antd";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "../../../context/api/serviceApi";
import { useState } from "react";
import CustomModal from "../../../components/modal/CustomModal";

const Services = () => {
  const { data: servicesData } = useGetAllServicesQuery();
  const [deleteService, { data: deletedData, isError, isLoading, isSuccess }] =
    useDeleteServiceMutation();
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);

  const handleSubmit = () => {};

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tariffs",
      key: "tariffs",
      dataIndex: "tariffs",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Manage",
      key: "manage",
      render: (_, record) => (
        <>
          <Space size="middle">
            <button>Edit</button>
            <button onClick={() => setShowModal((prev) => !prev)}>
              Delete{" "}
            </button>
          </Space>
          <CustomModal
            visible={showModal}
            onOk={handleSubmit}
            onCancel={() => setShowModal(false)}
          >
            <div className="flex flex-col gap-[30px] mt-[30px]">
              <h2 className="text-[24px]">
                Are you sure delete this information?
              </h2>
            </div>
          </CustomModal>
        </>
      ),
    },
  ];

  const data =
    servicesData?.data.services.map((service) => ({
      name: `${service.name}`,
      tariffs: `${service.tariffs}`,
      price: `${service.price}`,
      description: `${service.description}`,
      id: `${service}`,
    })) || [];

  return (
    <div className="flex flex-col gap-[40px] mt-[40px] mx-[15px]">
      <div className="flex">
        <button className="w-[120px] h-[35px] bg-[#232627] text-white rounded-[5px]">
          Create Service
        </button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Services;
