import { Space, Table } from "antd";
import { useGetAllServicesQuery } from "../../../context/api/serviceApi";

const Services = () => {
  const { data: servicesData } = useGetAllServicesQuery();
  console.log(servicesData);

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
          <a>Edit</a>
          <a>Delete</a>
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
