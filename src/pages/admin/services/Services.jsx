import { Space, Table } from "antd";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "../../../context/api/serviceApi";
import { useState } from "react";
import CustomModal from "../../../components/modal/CustomModal";

const Services = () => {
  const { data: servicesData } = useGetAllServicesQuery();
  const [id, setId] = useState(0);
  const [deleteService, { data: deletedData, isError, isLoading, isSuccess }] =
    useDeleteServiceMutation();
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);

  // const handleDelete = () => {
  //   console.log("ok");

  //   deleteService({ id: id });
  // };

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
            <button>Edit {record.id}</button>
            <button
              onClick={() => {
                deleteService(record.id);
              }}
            >
              Delete{" "}
            </button>
          </Space>
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
      id: `${service.id}`,
    })) || [];

  return (
    <div className="flex flex-col gap-[40px] mt-[40px] mx-[15px]">
      <div className="flex">
        <button className="w-[120px] h-[35px] bg-[#232627] text-white rounded-[5px]">
          Create Service
        </button>
      </div>
      <Table columns={columns} dataSource={data} />
      {/* <CustomModal
        visible={showModal}
        onOk={handleDelete}
        onCancel={() => setShowModal(false)}
      >
        <div className="flex flex-col gap-[30px] mt-[30px]">
          <h2 className="text-[24px]">Are you sure delete this information?</h2>
        </div>
      </CustomModal> */}
    </div>
  );
};

export default Services;
