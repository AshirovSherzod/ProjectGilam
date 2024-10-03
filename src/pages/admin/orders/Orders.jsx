import React from "react";
import { useGetAllOrdersQuery } from "../../../context/api/ordersApi";

const Orders = () => {
  const { data } = useGetAllOrdersQuery();
  console.log(data);

  return <div>Orders</div>;
};

export default Orders;
