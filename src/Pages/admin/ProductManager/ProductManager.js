import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProductManager";

const ProductManager = () => {
  const [data, setData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [namePublishers, setNamePublishers] = useState("");
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [SelectPublisherId, setSelectPublisherId] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredParentData, setFilteredParentData] = useState([]);

  const fetchPublishers = async () => {
    try {
      const response = await axiosJson.get("/Books");
      setData(response.data);
      setFilteredParentData(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh mục sách!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchSelectPublisherId = async () => {
    try {
      setLoading(true);
      const response = await axiosJson.get(`/Publishers`);
      setSelectPublisherId(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách NXB!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredParentData(
      data.filter((item) =>
        item.nameCategory?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleViewPublishers = (record) => {
    fetchSelectPublisherId(record.id);
    setNamePublishers(record.Name);
  };

  const handleDeleteSuccess = (id) => {
    setFilteredParentData(filteredParentData.filter((item) => item.id !== id));
    setChildData(childData.filter((item) => item.id !== id));
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingType, setEditingType] = useState("");

  const handleEdit = async (record, type) => {
    if (type === "nxb") {
      await fetchSelectPublisherId();
    }
    setEditingCategory(record);
    setEditingType(type);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}
      >
        <Input
          placeholder="Tìm kiếm theo tên danh mục"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            fetchSelectPublisherId();
            setIsModalProductOpen(true);
          }}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <h4>Danh sách sản phẩm</h4>
      <ProductTable
        data={filteredParentData}
        type="book"
        onViewChild={handleViewPublishers}
        onEdit={(record) => handleEdit(record, "book")}
        onDeleteSuccess={handleDeleteSuccess}
      />
      <AddProduct
        isOpen={isModalProductOpen}
        setIsOpen={setIsModalProductOpen}
        type="nxb"
        SelectPublisherId={SelectPublisherId}
        fetchSelectPublisherId={fetchSelectPublisherId} 
        // Chỉnh hàm gọi phù hợp
      />
      <EditProduct
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        category={editingCategory}
        type={editingType}
        SelectPublisherId={SelectPublisherId}
        fetchPublishers={fetchPublishers}
        setNamePublishers={setNamePublishers}
      />
    </div>
  );
};

export default ProductManager;
