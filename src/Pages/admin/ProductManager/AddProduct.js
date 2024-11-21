import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";

const { Option } = Select;

const AddProduct = ({ isOpen, setIsOpen, type, SelectPublisherId, fetchSelectPublisherId }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        bookCode: values.bookCode,
        name: values.name,
        description: values.description,
        price: values.price,
        stock: values.stock,
        pageCount: values.pageCount,
        language: values.language,
        publisherId: values.publisherId,
      };
        payload.parentId = values.parentId;
      await axiosJson.post("/Books", payload);
      toast.success("Thêm sản phẩm thành công!");
      fetchSelectPublisherId();
      setIsOpen(false);
      form.resetFields();
    } catch (error) {

      if (error.response) {
        // Lỗi trả về từ server (400, 500, v.v.)
        toast.error(`Lỗi từ server: ${error.response.data.message}`);
        // toast.error(`Lỗi từ server: ${error.response.data.bookCode}`);
        // toast.error(`Lỗi từ server: ${error.response.data.name}`);
        // toast.error(`Lỗi từ server: ${error.response.data.description}`);
        // toast.error(`Lỗi từ server: ${error.response.data.price}`);
        // toast.error(`Lỗi từ server: ${error.response.data.stock}`);
        // toast.error(`Lỗi từ server: ${error.response.data.pageCount}`);
        // toast.error(`Lỗi từ server: ${error.response.data.language}`);
        // toast.error(`Lỗi từ server: ${error.response.data.publisherId}`);
        
      } else if (error.request) {
        // Không nhận được phản hồi từ server
        toast.error("Không nhận được phản hồi từ server");
      } else {
        // Lỗi khác
        toast.error("Lỗi khi thêm sản phẩm!");
      }
    }
  };

  return (
    <Modal
      title={type === "book"}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={() => setIsOpen(false)}
      okText="Tạo"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Mã sách"
          name="bookCode"
          rules={[{ required: true, message: "Vui lòng nhập mã sách!" }]}
        >
          <Input placeholder="Nhập mã sách" />
        </Form.Item>
        <Form.Item
          label="Tên sách"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sách!" }]}
        >
          <Input placeholder="Nhập tên sách" />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá sách!" }]}
        >
          <Input placeholder="Nhập giá sách" />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="stock"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <Input placeholder="Nhập số lượng" />
        </Form.Item>
        <Form.Item
          label="Số trang"
          name="pageCount"
          rules={[{ required: true, message: "Vui lòng nhập số trang!" }]}
        >
          <Input placeholder="Nhập số trang" />
        </Form.Item>
        <Form.Item
          label="Ngôn ngữ"
          name="language"
          rules={[{ required: true, message: "Vui lòng nhập ngôn ngữ!" }]}
        >
          <Input placeholder="Nhập ngôn ngữ" />
        </Form.Item>
        {type === "nxb" && (
          <Form.Item
            label="Nhà xuất bản"
            name="publisherId"
            rules={[{ required: true, message: "Vui lòng chọn nhà xuất bản!" }]}
          >
            <Select placeholder="Chọn nhà xuất bản">
              {SelectPublisherId.map((publisher) => (
                <Option key={publisher.id} value={publisher.id}>
                  {publisher.nameCategory}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item label="Miêu tả" name="description">
          <Input.TextArea placeholder="Nhập miêu tả" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProduct;
