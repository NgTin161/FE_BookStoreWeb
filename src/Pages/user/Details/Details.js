import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "./Details.css";

const { Title, Text } = Typography;

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7186/api/Books/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Lỗi khi tải chi tiết sản phẩm', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (!product) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className='container' style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
        {/* Hiển thị hình ảnh sản phẩm */}
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          style={{ width: 300, height: 400, objectFit: 'cover', borderRadius: 10 }}
        />

        {/* Thông tin sản phẩm */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '400px' }}>
          <Title level={2}>{product.name}</Title>
          <Text strong>Nhà xuất bản: {product.publisherName || 'Chưa rõ'}</Text>
          <Text>Còn {product.stock || 'không xác định'} sản phẩm</Text>

          {product.promotionalPrice ? (
            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: '1.5rem' }}>
              <span style={{ textDecoration: 'line-through', color: 'black', fontSize: '1rem' }}>
                {formatCurrency(product.price)}
              </span>{' '}
              {formatCurrency(product.promotionalPrice)}
            </Text>
          ) : (
            <Text style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatCurrency(product.price)}</Text>
          )}

          <Button style={{ border: '1px solid red', height: '50px', color: 'red' }}>
            <FontAwesomeIcon icon={faHeart} fontSize={20} style={{ color: 'red' }} /> Yêu thích
          </Button>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <Button
              style={{
                borderColor: '#379AE6FF',
                color: '#379AE6FF',
                height: '50px',
                width: '250px',
              }}
            >
              <FontAwesomeIcon icon={faCartShopping} fontSize={18} /> Thêm vào giỏ hàng
            </Button>
            <Button
              style={{
                height: '50px',
                width: '180px',
                backgroundColor: '#379AE6FF',
                color: 'white',
              }}
            >
              Mua ngay
            </Button>
          </div>
        </div>
      </div>

      {/* Thông tin chi tiết sản phẩm */}
      <div
        style={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          marginTop: 20,
          padding: 15,
          border: '1px solid #379AE6FF',
          borderRadius: 5,
        }}
      >
        <Title level={4} style={{ color: '#379AE6FF' }}>Thông tin chi tiết</Title>
        <Text>
          <strong>Mã sản phẩm:</strong> {product.bookCode || 'Không có'}
        </Text>
        <Text>
          <strong>Nhà xuất bản:</strong> {product.publisherid || 'Chưa rõ'}
        </Text>
        <Text>
          <strong>Ngôn ngữ:</strong> {product.language || 'Không có thông tin'}
        </Text>
        <Text>
          <strong>Số Trang:</strong> {product.pagecount || 'Không có thông tin'}
        </Text>
      </div>
    </div>
  );
};

export default Details;
