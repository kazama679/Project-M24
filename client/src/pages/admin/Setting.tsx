import React from 'react';
import '../../styles/Dashboard.scss';
import { MdDashboard } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { PiUsersFill } from "react-icons/pi";
import { MdCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { NavLink, Route, Routes } from 'react-router-dom';
import Products from './product/Products';
import Customers from './Customers';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Category from './category/Category';
import { IoIosLogOut } from 'react-icons/io';
// import Settings from './Setting';

const Settings = () => {
    // đăng xuất admin
    const handleLogOut=()=>{
        window.location.href = 'http://localhost:5173';
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
                    <Route path="/Dashboard" element={<Dashboard/>} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Orders" element={<Orders />} />
                    <Route path="/Customers" element={<Customers />} />
                    <Route path="/Category" element={<Category />} />
                </Routes>
                Settings
            </main>
        </div>
    );
};

export default Settings;