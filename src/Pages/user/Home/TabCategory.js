import React, { useState, useEffect } from 'react';
import { Tabs, Spin, Card, Progress, Rate } from 'antd';
import { toast } from 'react-toastify';
import { axiosJson } from '../../../axios/AxiosCustomize';

const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
const TabCategory = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);

  // Hàm gọi API để lấy danh mục cha
  const fetchParentCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosJson.get(`/Home/get-father-category`);
      setParentCategories(response.data);
      if (response.data.length > 0) {
        fetchBooksByCategory(response.data[0].id); // Gọi sách cho tab đầu tiên
      }
    } catch (error) {
      toast.error('Lỗi khi tải danh mục cha!');
    } finally {
      setLoading(false);
    }
  };

  // Hàm gọi API để lấy danh sách sách theo danh mục
  const fetchBooksByCategory = async (categoryId) => {
    try {
      setLoadingBooks(true);
      const response = await axiosJson.get(`/Home/get-books-by-category?Id=${categoryId}`);
      setBooks(response.data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách sách!');
    } finally {
      setLoadingBooks(false);
    }
  };

  useEffect(() => {
    fetchParentCategories();
  }, []);

  const onChange = (key) => {
    fetchBooksByCategory(key); // Gọi API tải sách khi tab thay đổi
  };

  // Tạo danh sách các item cho Tabs
  const items = parentCategories.map((category) => ({
    key: category.id, // Sử dụng id làm key cho từng tab
    label: category.nameCategory, // Sử dụng tên danh mục làm tiêu đề tab
    children: (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {loadingBooks ? (
          <Spin tip="Đang tải danh sách sách..." />
        ) : books.length > 0 ? (
          books.map((product) => {
            const soldPercentage = (product.sold / product.stock) * 100;
            return (
              <Card
                key={product.id}
                hoverable
                style={{
                  width: 240,
                  border: '1px solid #379AE6FF',
                  borderRadius: '10px',
                  padding: '10px',
                  textAlign: 'center',
                }}
              >
                <img
                  style={{ objectFit: 'contain', height: '150px', marginBottom: '10px' }}
                  alt={product.name}
                  src={product.imageUrls}
                />
                <div>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={product.name}
                  >
                    {product.name}
                  </span>
                  <div>
    {product.promotionalPrice ? (
        <div>
            <span 
                style={{ 
                    textDecoration: 'line-through', 
                    color: '#B0B0B0', 
                    marginRight: '10px' 
                }}
            >
                {formatCurrency(product.price)}
            </span>
            <span style={{ color: '#E74C3C', fontWeight: 'bold' }}>
                {formatCurrency(product.promotionalPrice)}
            </span>
        </div>
    ) : (
        <span style={{ color: '#E74C3C', fontWeight: 'bold' }}>
            {formatCurrency(product.price)}
        </span>
    )}
</div>
                  <Progress
                    percent={Math.round(soldPercentage)}
                    status="active"
                    format={() => `Đã bán ${product.sold}`}
                    style={{ marginTop: '10px' }}
                  />
                  <Rate disabled defaultValue={product.rating || 0} style={{ fontSize: 12 }} />
                </div>
              </Card>
            );
          })
        ) : (
          <p>Không có sách nào để hiển thị!</p>
        )}
      </div>
    ),
  }));

  return (
    <div>
      {loading ? (
        <Spin tip="Đang tải danh mục cha..." />
      ) : (
        <div className="container">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default TabCategory;
