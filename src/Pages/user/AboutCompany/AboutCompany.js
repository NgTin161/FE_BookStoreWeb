
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Modal, Button, Input, Image, Upload,Card } from "antd";
import axios from "axios"; // Import Axios
import "react-quill/dist/quill.snow.css";
import { axiosFormData, axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";

const AboutCompany = () => {
  const [id,setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [shippingPolicy, setShippingPolicy] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);


  const [previewImage, setPreviewImage] = useState(null); 
  const [selectedFile, setSelectedFile] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axiosJson.get("/Information");
      const data = response.data;
  
      if (data && Object.keys(data).length > 0) {

        setId(data.id);
        setName(data.name);
        setPhone(data.phone);
        setEmail(data.email);
        setAddress(data.address);
        setDescription(data.description);
        setShippingPolicy(data.shippingPolicy);
        setFacebookLink(data.facebookLink);
        setInstagramLink(data.instagramLink);
        setImageUrl(data.logo);
      } else {
        setId("");
      }
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
      if (!id) {
   
        const response = await axiosJson.post("/Information", updatedData);
        console.log("Thêm mới thành công:", response.data);
        toast.success("Thêm mới thông tin thành công!");
      } else {
 
        const response = await axiosJson.put(`/Information/${id}`, updatedData);
        console.log("Cập nhật thành công:", response.data);
        toast.success("Cập nhật thông tin thành công!");
      }
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
  const products = [
    { id: 1, name: 'Lược sử loài người', img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
    { id: 2, name: 'Lược sử loài người', img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
    { id: 3, name: 'Lược sử loài người', img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
    { id: 4, name: 'Lược sử loài người', img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
    { id: 5, name: 'Lược sử loài người', img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
    { id: 6, name: 'Lược sử loài người', img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
    { id: 7, name: 'Lược sử loài người', img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
    { id: 8, name: 'Lược sử loài người', img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
];


return (
    <>
    <div style={{ border: '1px solid #ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', padding: '20px',textAlign: "justify",borderLeft: "500px solid #ffffff",
      borderRight: "500px solid #ffffff", }}>
      <h2 style={{ padding: 5,color:"rgb(55, 154, 230)" }}>Thông tin công ty</h2>
      <ReactQuill value={description} readOnly={true} theme="bubble" />
      <div 
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', // 4 cột
                    gap: '10px', 
                    justifyContent: 'center',
                  
                }}
            >
                {products.map(product => (
                    <Card
                        key={product.id}
                        hoverable
                        style={{ width: 280, height: 250,padding:'10px' }}
                        cover={<img style={{ objectFit: 'contain', height: '150px' }} alt="example" src={product.img} />}
                    >
                        <p>{product.name}</p>
                        <p>{product.price}</p>

                    </Card>
                ))}
            </div>
    </div>


      </>
  );
};
export default AboutCompany;