import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SlideProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Cấu hình axios để lấy dữ liệu từ API
  const axiosJson = axios.create({
    baseURL: 'https://localhost:7186/api',  // Đặt base URL đúng
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Hàm lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const response = await axiosJson.get('/Books'); // Giả sử API trả về danh sách sản phẩm
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('Dữ liệu không hợp lệ');
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu sản phẩm', error);
    }
  };

  useEffect(() => {
    fetchProducts();  // Lấy sản phẩm khi component được render
  }, []);

  const handleViewMore = () => {
    navigate('/more-products'); // Thay đổi đường dẫn đến trang "Xem thêm"
  };

  return (
    <div style={{ border: '1px solid #379AE6FF', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', padding: '20px' }}>
      <h2 style={{ padding: 10 }}>SẢN PHẨM HOT</h2>

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
            style={{ width: 280, height: 300, padding: '10px' }}
            cover={
              product.imageUrls && product.imageUrls.length > 0 ? (
                <img
                  src={product.imageUrls[0]}  // Lấy ảnh đầu tiên trong mảng
                  alt={product.name}
                  className="card-img-top"
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"  // Thay thế bằng ảnh mặc định nếu không có hình
                  alt="Ảnh sản phẩm không có sẵn"
                  className="card-img-top"
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
              )
            }
            onClick={() => navigate(`/book/${product.id}`)} 
          >
            <p style={{ fontWeight: 'bold' }}>{product.name}</p>
            <p style={{ fontWeight: 'bold',color:'red' }}>Giá:{product.price || 'Giá chưa có'}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SlideProduct;
