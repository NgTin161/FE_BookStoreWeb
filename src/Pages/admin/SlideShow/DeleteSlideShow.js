import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";

const DeleteSlideShow = ({ id, onDeleteSuccess }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      await axiosJson.delete(`/Slideshows/${id}`);
      toast.success("Xóa thành công!");
      if (onDeleteSuccess) onDeleteSuccess(id);
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Xóa thất bại!");
      console.error(error);
    }
  };

  return (
    <>
      <Button type="link" danger icon={<DeleteOutlined />} onClick={showModal}>
        Xóa
      </Button>
      <Modal
        title="Xác nhận xóa"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
      </Modal>
    </>
  );
};

export default DeleteSlideShow;
