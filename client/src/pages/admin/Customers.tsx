import React, { useEffect, useState } from 'react';
import '../../styles/Dashboard.scss';
import '../../styles/Customers.scss'
import { MdDashboard } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { PiUsersFill } from "react-icons/pi";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { NavLink, Route, Routes } from 'react-router-dom';
import Products from './product/Products';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Settings from './Setting';
import Category from './category/Category';
import { IoIosLogOut, IoMdSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, updateUser } from '../../store/reducers/userReducer';
import avtADM from '../../images/Đen và Xanh mòng két Minh họa Thể thao Điện tử Game Logo (1).png';

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5; // số lượng item trên mỗi trang
    const data = useSelector(state => state);
    const dispatch = useDispatch();
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    useEffect(() => {
        setFilteredUsers(data.userReducer.users);
    }, [data.userReducer.users]);

    // đăng xuất admin
    const handleLogOut = () => {
        window.location.href = 'http://localhost:5173/LoginAdmin';
    };

    // cập nhập trạng thái user
    const handleStatusUser = (user) => {
        const newUser = { ...user, status: !user.status };
        dispatch(updateUser(newUser));
    };

    // xử lý tìm kiếm
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = data.userReducer.users.filter(user => user.name.toLowerCase().includes(term.toLowerCase()));
        setFilteredUsers(filtered);
    };

    // sắp xếp theo tên
    const handleSortChange = (e) => {
        const value = e.target.value;
        let sortedUsers = [];
        if (value === "lon") {
            sortedUsers = [...filteredUsers].sort((a, b) => b.name.localeCompare(a.name));
        } else if (value === "be") {
            sortedUsers = [...filteredUsers].sort((a, b) => a.name.localeCompare(b.name));
        } else {
            sortedUsers = [...data.userReducer.users]; // Khôi phục danh sách ban đầu nếu không có sắp xếp
        }
        setFilteredUsers(sortedUsers);
    };

    // tính toán index bắt đầu và kết thúc của trang hiện tại
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    // lấy danh sách khách hàng của trang hiện tại
    const paginateData = () => {
        return filteredUsers.slice(startIndex, endIndex);
    };

    // thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // số lượng trang
    const totalPages = Math.ceil(filteredUsers.length / perPage);

    // render danh sách khách hàng của trang hiện tại
    const renderUsers = paginateData().map((user, index) => (
        <tr key={user.id} className="user-table__tr">
            <td className="user-table__td">{startIndex + index + 1}</td>
            <td className="user-table__td">{user.name}</td>
            <td className="user-table__td">{user.email}</td>
            <td className="user-table__td">{user.phone}</td>
            <td className="user-table__td">{user.address}</td>
            <td className="user-table__td">{user.created_at}</td>
            <td className="user-table__td">
                <button
                    onClick={() => handleStatusUser(user)}
                    className={user.status ? "user-table__active-button" : "user-table__inactive-button"}
                >
                    {user.status ? "Mở" : "Chặn"}
                </button>
            </td>
        </tr>
    ));

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2>Rikkei Academy</h2>
                <nav>
                    <ul className="menu-list">
                        <li className="menu-item">
                            <NavLink to='/Dashboard' className="active2"><MdDashboard />Dashboard</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to='/Products' className="active2"><FaProductHunt />Products</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to='/Orders' className="active2"><RiBillFill />Orders</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to='/Customers' className="active2"><PiUsersFill />Customers</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to='/Category' className="active2"><MdCategory />Category</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to='/Settings' className="active2"><MdOutlineSettingsSuggest />Settings</NavLink>
                        </li>
                        <li onClick={handleLogOut} className="menu-item logout">
                            <IoIosLogOut />Log out
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <Routes>
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Orders" element={<Orders />} />
                    <Route path="/Category" element={<Category />} />
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
                <div className="product-management">
                    <header className="header">
                        <div className="header__left">
                            <h1 className="header__title">Customers</h1>
                        </div>
                        <div className="header__right">
                            <div className="header__search">
                                <IoMdSearch className='iconSearch' />
                                <input
                                    className="header__search-input"
                                    type="text"
                                    placeholder="Tìm kiếm theo tên"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className="header__notifications">
                                <i className="header__icon icon-bell"></i>
                            </div>
                            <div className="header__profile">
                                <img className='avtADM' src={avtADM} alt="" />
                                <span className="header__profile-name">Admin</span>
                                <i className="header__icon icon-dropdown"></i>
                            </div>
                        </div>
                    </header>
                    <select className="product-table-select-option" onChange={handleSortChange}>
                        <option value="">Sắp xếp theo tên</option>
                        <option value="be">Tên tăng dần</option>
                        <option value="lon">Tên giảm dần</option>
                    </select>
                    <div className="user-table">
                        <table className="user-table__table">
                            <thead className="user-table__thead">
                                <tr className="user-table__tr">
                                    <th className="user-table__th">STT</th>
                                    <th className="user-table__th">Tên đăng nhập</th>
                                    <th className="user-table__th">Email</th>
                                    <th className="user-table__th">Số điện thoại</th>
                                    <th className="user-table__th">Địa chỉ</th>
                                    <th className="user-table__th">Ngày tạo</th>
                                    <th className="user-table__th">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="user-table__tbody">
                                {renderUsers}
                            </tbody>
                        </table>
                        <div className="user-table__pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`user-table__page-button ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Customers;
