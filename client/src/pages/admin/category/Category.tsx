import React, { useEffect, useState } from 'react';
import '../../../styles/Dashboard.scss';
import { MdDashboard } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { PiUsersFill } from "react-icons/pi";
import { MdCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { NavLink, Route, Routes } from 'react-router-dom';
import Products from '../product/Products';
import Dashboard from '../Dashboard';
import Orders from '../Orders';
import Settings from '../Setting';
import Customers from '../Customers';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getAllCategory, updateCategory } from '../../../store/reducers/categoryReducer';
import AddCategory from './AddCategory';
import { IoIosLogOut } from 'react-icons/io';
import EditCategory from './EditCategory';

const Category = () => {
    const data = useSelector(state => state);
    console.log("data", data);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory());
    }, []);
    const [statusCategory, setStatusCategory] = useState(true);
    const [statusEditCategory, setStatusEditCategory] = useState(true);
    const [currentCategory, setCurrentCategory] = useState(null);

    const onclickAddCategory = () => {
        setStatusCategory(false);
    };
    const backCategory = () => {
        setStatusCategory(true);
    };

    // hàm xóa
    const handleDeleteCategory = (id) => {
        dispatch(deleteCategory(id));
    };
    // cập nhập
    const handleUpdateCategory = (item) => {
        setStatusEditCategory(false);
        setCurrentCategory(item);
    };
    const backEditCategory = () => {
        setStatusEditCategory(true);
        setCurrentCategory(null);
    };

    // đăng xuất admin
    const handleLogOut = () => {
        window.location.href = 'http://localhost:5173/LoginAdmin';
    };

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
                    <Route path="/Customers" element={<Customers />} />
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
                <div className="product-management">
                    <div className="header">
                        <h1>Category</h1>
                    </div>
                    <div style={{ display: `${statusCategory ? "block" : "none"}` }} className="product-management-render">
                        <button onClick={onclickAddCategory} className="add-button">+ Add Category</button>
                        <div className="product-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Loại</th>
                                        <th>Trạng thái</th>
                                        <th>Đặc điểm</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.categoryReducer.classify.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.status ? "Đang hoạt động" : "Đã dừng"}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <button onClick={() => handleUpdateCategory(item)} className="action-button edit">Edit</button>
                                                <button onClick={() => handleDeleteCategory(item.id)} className="action-button delete">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="pagination">
                                <button>1</button>
                                <button>2</button>
                                <button>3</button>
                                <button>4</button>
                                <button>5</button>
                                <span>...</span>
                                <button>20</button>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: `${statusCategory ? "none" : "block"}` }}>
                        <AddCategory backCategory={backCategory} />
                    </div>
                    <div style={{ display: `${statusEditCategory ? "none" : "block"}` }}>
                        <EditCategory backEditCategory={backEditCategory} currentCategory={currentCategory} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Category;
