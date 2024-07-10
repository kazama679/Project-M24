import React, { useEffect } from 'react';
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
    const data: any = useSelector(state => state);
    console.log("data", data.userReducer.users);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUser());
    }, [])

    // đăng xuất admin
    const handleLogOut = () => {
        window.location.href = 'http://localhost:5173/LoginAdmin';
    }

    // cập nhập trạng thái user
    const handleStatusUser = (user: any) => {
        const newUser = { ...user, status: !user.status }
        dispatch(updateUser(newUser));
    }
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
                                <IoMdSearch className='iconSearch'/>
                                <input className="header__search-input" type="text" placeholder="Search" />
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
                    <div className="user-table">
                        <table className="user-table__table">
                            <thead className="user-table__thead">
                                <tr className="user-table__tr">
                                    <th className="user-table__th">ID</th>
                                    <th className="user-table__th">Tên đăng nhập</th>
                                    <th className="user-table__th">Email</th>
                                    <th className="user-table__th">Date</th>
                                    <th className="user-table__th">Action</th>
                                </tr>
                            </thead>
                            <tbody className="user-table__tbody">
                                {data.userReducer.users.map(user => (
                                    <tr key={user.id} className="user-table__tr">
                                        <td className="user-table__td">{user.id}</td>
                                        <td className="user-table__td">{user.name}</td>
                                        <td className="user-table__td">{user.email}</td>
                                        <td className="user-table__td">{user.created_at}</td>
                                        <td className="user-table__td">
                                            <button className="user-table__view-button">View</button>
                                            <button onClick={() => handleStatusUser(user)} className={user.status ? "user-table__active-button" : "user-table__inactive-button"}>
                                                {user.status ? "Mở" : "Chặn"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="user-table__pagination">
                            <button className="user-table__page-button">1</button>
                            <button className="user-table__page-button">2</button>
                            <button className="user-table__page-button">3</button>
                            <button className="user-table__page-button">4</button>
                            <button className="user-table__page-button">...</button>
                            <button className="user-table__page-button">20</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Customers;