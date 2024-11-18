import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Button, Dropdown, Menu, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartOutlined, BookOutlined, CoffeeOutlined } from '@ant-design/icons';
import { AuthContext } from '../Context/AuthContext';

const Header = () => {
    const [selectedCategory, setSelectedCategory] = useState('Book');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || '');
            setEmail(user.email || '');
            setPhoneNumber(user.phoneNumber || '');
        }
    }, [user]);


    const handleMenuClick = (e) => {
        setSelectedCategory(e.key);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="Book">
                <BookOutlined /> Book
            </Menu.Item>
            <Menu.Item key="Coffee">
                <CoffeeOutlined /> Coffee
            </Menu.Item>
            <Menu.Item key="Cart">
                <ShoppingCartOutlined /> Cart
            </Menu.Item>
        </Menu>
    );

  
    const accountMenu = (
        <Menu>
            <Menu.Item key="login">
                <Link to="/login">Đăng nhập</Link>
            </Menu.Item>
            <Menu.Item key="register">
                <Link to="/register">Đăng ký</Link>
            </Menu.Item>
        </Menu>
    );

    
    const languageMenu = (
        <Menu>
            <Menu.Item key="vn">
                <img src="./Logo/vietnam.png" style={{ width: '20px', height: '20px', marginRight: '8px' }} alt="VN" /> VN
            </Menu.Item>
            <Menu.Item key="us">
                <img src="./Logo/us.jpg" style={{  width: '20px', height: '20px', marginRight: '8px' }} alt="US" /> US
            </Menu.Item>
        </Menu>
    );

    return (
        <header className="" style={{ padding: '10px', width: '100vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '1px solid #379AE6FF' }}>
            <img src="/Logo/logoABC.png" alt="logo" style={{ width: '100px', height: '100px' }} />

            <div className="" style={{ margin: 10, display: 'flex', gap: 20 }}>
                <div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button style={{ border: 'none', boxShadow: 'none', paddingTop: 30, color: '#379AE6FF' }} icon={<MenuOutlined style={{ fontSize: 35 }} />}>
                        </Button>
                    </Dropdown>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <Search
                            placeholder="Tìm kiếm"
                            style={{
                                paddingTop: 15,
                                width: 500,
                                borderRadius: '8px',
                            }}
                            enterButton={
                                <Button
                                    style={{
                                        backgroundColor: '#379AE6FF',
                                        color: '#fff',
                                        border: 'none',
                                    }}
                                >
                                    <SearchOutlined />
                                </Button>
                            }
                        />
                    </div>
                    <div className="nav" style={{ paddingTop: 20, textDecoration: 'none' }}>
                        <a style={{ color: '#379AE6FF' }} href="">Trang chủ</a>
                        <a style={{ color: '#379AE6FF' }} href="">Liên hệ</a>
                        <a style={{ color: '#379AE6FF' }} href="">Dịch vụ</a>
                        <a style={{ color: '#379AE6FF' }} href="">Giới thiệu</a>
                        <a style={{ color: '#379AE6FF' }} href="">Hello {fullName}</a>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', right: '30px' }}>
                <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}><FontAwesomeIcon icon={faBell} fontSize={20} />Thông báo</Button>
                <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}><FontAwesomeIcon icon={faCartShopping} fontSize={20} />Giỏ hàng</Button>

               
                <Dropdown overlay={accountMenu} trigger={['click']}>
                    <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>
                        <FontAwesomeIcon icon={faUser} fontSize={20} />Tài khoản
                    </Button>
                </Dropdown>

               
                <Dropdown overlay={languageMenu} trigger={['click']}>
                <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>
                        <img src="./Logo/vietnam.png" style={{ width: '30px', height: '30px' }} alt="VN" /> VN
                    </Button>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;
