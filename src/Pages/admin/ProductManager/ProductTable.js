import React from "react";
import { Table, Button, Space } from "antd";
import DeleteProduct from "./DeleteProduct";


const ProductTable = ({ data, type, onViewChild, onEdit, onDeleteSuccess }) => {
  const columns = [
    {
      title: "Mã sách",
      dataIndex: "bookcode",
      key: "bookcode",
      align: "center",
      width: 'auto',
      render: (text, _, index) => index + 1,
    },
    {
      title: "Tên sách",
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "left",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "left",
    },
    {
      title: "Nhà Xuất Bản",
      dataIndex: "punlisherid",
      key: "punlisherid",
      align: "left",
    },
    {
      title: "Số Lượng",
      dataIndex: "stock",
      key: "stock",
      align: "left",
    },
    {
      title: "Số trang",
      dataIndex: "pagecount",
      key: "stock",
      align: "left",
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      key: "language",
      align: "left",
    },
    {
      title: "Chức năng",
      key: "actions",
      align: "center",
      width: 250, // Adjust width
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>

           <Button type="link" onClick={() => onEdit(record)}>
                Chỉnh sửa
              </Button>
          <DeleteProduct
            id={record.id}
            endpoint=""
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      bordered
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ProductTable;
