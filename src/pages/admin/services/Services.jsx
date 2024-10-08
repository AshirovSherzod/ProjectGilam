import { Space, Table, Modal, message, Input, Form, Button } from "antd";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
  useCreateServiceMutation, // Import create service mutation
} from "../../../context/api/serviceApi";
import { useState } from "react";

const Services = () => {
  const { data: servicesData, refetch } = useGetAllServicesQuery();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [createService] = useCreateServiceMutation(); // For creating a new service
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false); // For create modal
  const [editingService, setEditingService] = useState(null); // Store service being edited

  // Handle delete with confirmation modal
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

  // Handle edit service
  const handleEdit = (service) => {
    setEditingService(service); // Set the service data to be edited
    setEditModalVisible(true); // Show the edit modal
  };

  // Handle submit edit changes
  const handleEditSubmit = async (values) => {
    try {
      await updateService({ id: editingService.id, ...values }); // Update the service data
      message.success("Service updated successfully");
      refetch(); // Refetch services to refresh the list
      setEditModalVisible(false); // Close the modal
    } catch (error) {
      message.error("Failed to update service");
    }
  };

  // Handle create service
  const handleCreate = () => {
    setCreateModalVisible(true); // Show the create modal
  };

  // Handle submit create service
  const handleCreateSubmit = async (values) => {
    try {
      await createService(values); // Create the new service
      message.success("Service created successfully");
      refetch(); // Refetch services to refresh the list
      setCreateModalVisible(false); // Close the create modal
    } catch (error) {
      message.error("Failed to create service");
    }
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
          <button onClick={() => handleEdit(record)}>Edit</button>
          <button
            onClick={() => handleDelete(record.id)}
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
      name: service.name,
      tariffs: service.tariffs,
      price: service.price,
      description: service.description,
      id: service.id,
    })) || [];

  return (
    <div className="flex flex-col gap-[40px] mt-[40px] mx-[15px]">
      <div className="flex">
        <button
          onClick={handleCreate}
          className="w-[120px] h-[35px] bg-[#232627] text-white rounded-[5px]"
        >
          Create Service
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={isDeleting || isUpdating}
      />

      {/* Edit Service Modal */}
      <Modal
        title="Edit Service"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => {
          document.getElementById("editServiceForm").submit(); // Trigger form submit
        }}
        confirmLoading={isUpdating}
      >
        {editingService && (
          <Form
            id="editServiceForm"
            layout="vertical"
            initialValues={editingService}
            onFinish={handleEditSubmit}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Tariffs" name="tariffs">
              <Input />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Create Service Modal */}
      <Modal
        title="Create Service"
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={() => {
          document.getElementById("createServiceForm").submit(); // Trigger form submit
        }}
      >
        <Form
          id="createServiceForm"
          layout="vertical"
          onFinish={handleCreateSubmit}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tariffs" name="tariffs" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;
