import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Modal, Button, Input } from "antd";
import axios from "axios"; // Import Axios
import "react-quill/dist/quill.snow.css";
import { axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";

const Information = () => {
    const [id,setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [shippingPolicy, setShippingPolicy] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosJson.get("/Information");
      const data = response.data; // Dữ liệu trả về từ API
  console.log(data);
      setId(data.id);
      setName(data.name);
      setPhone(data.phone);
      setEmail(data.email);
      setAddress(data.address);
      setDescription(data.description);
      setShippingPolicy(data.shippingPolicy);
      setFacebookLink(data.facebookLink);
      setInstagramLink(data.instagramLink);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
  };
  useEffect(() => {
    

    fetchData();
  }, []); // Chỉ chạy khi component mount

  // Mở Modal chỉnh sửa toàn bộ thông tin công ty
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Lưu thay đổi và gửi lên API
  const handleSave = async () => {
    const updatedData = {
      name,
      phone,
      email,
      address,
      description,
      shippingPolicy,
      facebookLink,
      instagramLink,
    };

    try {
      const response = await axiosJson.put(`/Information/${id}`, updatedData);
      console.log("Cập nhật thành công:", response.data);
      toast.success("Cập nhật thành công!");
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  // Modules của ReactQuill để cấu hình thanh công cụ
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ align: [] }],
      ["image"],
    ],
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
       <p><strong>Tên công ty:</strong> {name}</p>
      <p><strong>Số điện thoại:</strong> {phone}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Địa chỉ:</strong> {address}</p>
      <p><strong>Liên kết Facebook:</strong> {facebookLink}</p>
      <p><strong>Liên kết Instagram:</strong> {instagramLink}</p>

      <h4>Thông tin </h4>
      <ReactQuill value={description} readOnly={true} theme="bubble" />

      <h4>Chính sách vận chuyển</h4>
      <ReactQuill value={shippingPolicy} readOnly={true} theme="bubble" />


      <Button type="primary" style={{ marginTop: "20px" }} onClick={showModal}>
        Cập nhật thông tin
      </Button>

      
      <Modal
        title="Chỉnh sửa thông tin"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        width={1000}
      >
        <div style={{ padding:'30px',display: "flex", flexDirection: "column", gap: "10px" }}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên công ty"
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Số điện thoại"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Địa chỉ"
          />
          <Input
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
            placeholder="Facebook Link"
          />
          <Input
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
            placeholder="Instagram Link"
          />
          <div style={{height:'300px'}}>
            <h4>Thông tin:</h4>
            <ReactQuill
              value={description}
              onChange={setDescription}
              modules={modules}
              style={{ height:'200px'}}
            />
          </div>
          <div style={{margin:'10px'}}>
            <h4>Chính sách giao hàng:</h4>
            <ReactQuill
              value={shippingPolicy}
              onChange={setShippingPolicy}
              modules={modules}
              style={{ height:'200px'}}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Information;
