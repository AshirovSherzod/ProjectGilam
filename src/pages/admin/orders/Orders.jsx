import React from "react";
import { Space, Table, Tag } from "antd";
import { useGetAllOrdersQuery } from "../../../context/api/ordersApi";

const Orders = () => {
  const { data: ordersData } = useGetAllOrdersQuery();
  console.log(ordersData);
  

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Tariffs",
      key: "tariffs",
      dataIndex: "tariffs",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a>Invite {record.name}</a>
      //     <a>Delete</a>
      //   </Space>
      // ),
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
    ordersData?.data.orders.map((order) => ({
      name: `${order.user_object[0].full_name}`,
      phone: `${order.user_object[0].phone_number}`,
      service: `${order.service_object[0].name}`,
      tariffs: `${order.service_object[0].tariffs}`,
      status: `${order.status}`,
      id: `${order.id}`,
    })) || [];

  return (
    <div className="flex flex-col gap-[40px] mt-[40px] mx-[15px]">
      <div className="flex">
        <button className="w-[120px] h-[35px] bg-[#232627] text-white rounded-[5px]">
          Create Order
        </button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Orders;
