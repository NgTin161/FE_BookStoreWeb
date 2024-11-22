import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import { DownOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartOutlined, BookOutlined, CoffeeOutlined } from '@ant-design/icons';
import { AuthContext } from '../Context/AuthContext';
import {jwtDecode} from 'jwt-decode';

const Header = ({ data }) => {
    const [selectedCategory, setSelectedCategory] = useState('Book');
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState('');
    const [fullName, setFullName] = useState('');

    const token = localStorage.getItem('jwt');
    const decodedToken = token ? jwtDecode(token) : null;

    useEffect(() => {
        if (decodedToken) {
            const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const name = decodedToken.fullName || 'Người dùng';
            setRole(roles);
            setFullName(name);
        }
    }, [decodedToken]);

    const handleMenuClick = (e) => {
        setSelectedCategory(e.key);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        window.location.href = '/login';
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

    const getMenuForRoles = (roles) => {
        const menuItems = [];

        if (roles === 'Admin') {
            menuItems.push(
                <Menu.Item key="statistics">
                    <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
                        Thống kê
                    </Link>
                </Menu.Item>
            );
        }

        if (roles.includes('User')) {
            menuItems.push(
                <Menu.Item key="profile">
                    <Link to="/user/profile" style={{ textDecoration: 'none' }}>
                        Thông tin tài khoản
                    </Link>
                </Menu.Item>
            );
        }

        menuItems.push(
            <Menu.Item key="logout" onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        );

        return <Menu>{menuItems}</Menu>;
    };

    const greeting = decodedToken && (
        <Dropdown overlay={getMenuForRoles(role)} trigger={['click']}>
            <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>
            <FontAwesomeIcon icon={faUser} fontSize={20} />
            Tài khoản
        </Button>
        </Dropdown>
    );

    const languageMenu = (
        <Menu>
            <Menu.Item key="vn">
                <img
                    src="./Logo/vietnam.png"
                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                    alt="VN"
                />
                VN
            </Menu.Item>
            <Menu.Item key="us">
                <img
                    src="./Logo/us.jpg"
                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                    alt="US"
                />
                US
            </Menu.Item>
        </Menu>
    );

    return (
        <header
            className=""
            style={{
                padding: '10px',
                width: '100vw',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderBottom: '1px solid #379AE6FF',
            }}
        >
            <Link to="/">
                <img src={data?.logo} alt="logo" style={{ width: '100px', height: '100px' }} />
            </Link>

            <div className="" style={{ margin: 10, display: 'flex', gap: 20 }}>
                <div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button
                            style={{
                                border: 'none',
                                boxShadow: 'none',
                                paddingTop: 30,
                                color: '#379AE6FF',
                            }}
                            icon={<MenuOutlined style={{ fontSize: 35 }} />}
                        ></Button>
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
                        <a style={{ color: '#379AE6FF' }} href="/">
                            Trang chủ
                        </a>
                        <a style={{ color: '#379AE6FF' }} href="/contact">
                            Liên hệ
                        </a>
                        <a style={{ color: '#379AE6FF' }} href="/services">
                            Dịch vụ
                        </a>
                        <a style={{ color: '#379AE6FF' }} href="/about">
                            Giới thiệu
                        </a>
                        {role && (
                            <a style={{ color: '#379AE6FF' }} href="">
                                Xin chào {fullName}
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', right: '30px' }}>
                <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>
                    <FontAwesomeIcon icon={faBell} fontSize={20} />
                    Thông báo
                </Button>
                <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>
                    <FontAwesomeIcon icon={faCartShopping} fontSize={20} />
                    Giỏ hàng
                </Button>

                {!decodedToken ? (
    <Dropdown
        menu={
            <Menu>
                <Menu.Item key="login">
                    <Link to="/login" style={{ textDecoration: 'none' }}>Đăng nhập</Link>
                </Menu.Item>
                <Menu.Item key="register">
                    <Link to="/register" style={{ textDecoration: 'none' }}>Đăng ký</Link>
                </Menu.Item>
            </Menu>
        }
        trigger={['click']}
    >
        <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>
            <FontAwesomeIcon icon={faUser} fontSize={20} />
            Tài khoản
        </Button>
    </Dropdown>
) : (
    greeting
)}


                <Dropdown menu={languageMenu} trigger={['click']}>
                    <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>
                        <img
                            src="./Logo/vietnam.png"
                            style={{ width: '30px', height: '30px' }}
                            alt="VN"
                        />
                        VN
                    </Button>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;
