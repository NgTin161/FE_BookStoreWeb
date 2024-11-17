import React from 'react';
import { Card, Button } from "antd";
import { useNavigate } from 'react-router-dom';

const SlideProduct = () => {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate('/more-products'); // Thay đổi đường dẫn đến trang "Xem thêm"
    };

    const products = [
        { id: 1, name: 'Lược sử loài người', price: '70.000 đ', sold: 81, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { id: 2, name: 'Lược sử loài người', price: '70.000 đ', sold: 81, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { id: 3, name: 'Lược sử loài người', price: '70.000 đ', sold: 81, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { id: 4, name: 'Lược sử loài người', price: '70.000 đ', sold: 81, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { id: 5, name: 'Lược sử loài người', price: '70.000 đ', sold: 81, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { id: 6, name: 'Lược sử loài người', price: '70.000 đ', sold: 81, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { id: 7, name: 'Lược sử loài người', price: '70.000 đ', sold: 81, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { id: 8, name: 'Lược sử loài người', price: '70.000 đ', sold: 81, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
    ];

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
                        style={{ width: 280, height: 250,padding:'10px' }}
                        cover={<img style={{ objectFit: 'contain', height: '150px' }} alt="example" src={product.img} />}
                    >
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <p>Đã bán {product.sold} sản phẩm</p>
                    </Card>
                ))}
            </div>

            <Button type="primary" style={{ marginTop: '20px' }} onClick={handleViewMore}>
                Xem thêm
            </Button>
        </div>
    );
};

export default SlideProduct;
