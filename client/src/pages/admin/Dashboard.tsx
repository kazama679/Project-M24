import React from 'react';
import '../../styles/Dashboard.scss';
import { MdDashboard } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { PiUsersFill } from "react-icons/pi";
import { IoIosLogOut, IoMdSearch } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { NavLink, Route, Routes } from 'react-router-dom';
import Products from './product/Products';
import Customers from './Customers';
import Orders from './Orders';
import Settings from './Setting';
import Category from './category/Category';
import avtADM from '../../images/Đen và Xanh mòng két Minh họa Thể thao Điện tử Game Logo (1).png';

const Dashboard = () => {
    // đăng xuất admin
    const handleLogOut = () => {
        window.location.href = 'http://localhost:5173/LoginAdmin';
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
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Orders" element={<Orders />} />
                    <Route path="/Customers" element={<Customers />} />
                    <Route path="/Category" element={<Category />} />
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
                <div className="product-management">
                    <header className="header">
                        <div className="header__left">
                            <h1 className="header__title">Welcome back, QiQiShop</h1>
                        </div>
                        <div className="header__right">
                            <div className="header__search">
                                <input className="header__search-input" type="text" placeholder="Search" />
                                <IoMdSearch className='iconSearch'/>
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
                </div>
            </main>
        </div>
    );
};

export default Dashboard;