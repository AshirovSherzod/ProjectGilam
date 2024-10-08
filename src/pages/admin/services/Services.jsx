import { Space, Table, Modal, message } from "antd";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "../../../context/api/serviceApi";
import { useState } from "react";

const Services = () => {
  const { data: servicesData, refetch } = useGetAllServicesQuery();
  const [deleteService, { isLoading }] = useDeleteServiceMutation();
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = (serviceId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this service?",
      content: "Once deleted, the service cannot be recovered.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteService(serviceId);
          message.success("Service deleted successfully");
          refetch();
        } catch (error) {
          message.error("Failed to delete service");
        }
      },
    });
  };

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
        <Space size="middle">
          <button>Edit</button>
          <button
            onClick={() => {
              handleDelete(record.id);
            }}
            className="text-red-600"
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  const data =
    servicesData?.data.services.map((service) => ({
      name: `${service.name}`,
      tariffs: `${service.tariffs}`,
      price: `${service.price}`,
      description: `${service.description}`,
      id: service.id,
    })) || [];

  return (
    <div className="flex flex-col gap-[40px] mt-[40px] mx-[15px]">
      <div className="flex">
        <button className="w-[120px] h-[35px] bg-[#232627] text-white rounded-[5px]">
          Create Service
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={isLoading}
      />
    </div>
  );
};

export default Services;
