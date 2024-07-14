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
import { deleteCategory, getAllCategory } from '../../../store/reducers/categoryReducer';
import AddCategory from './AddCategory';
import { IoIosLogOut, IoMdSearch } from 'react-icons/io';
import EditCategory from './EditCategory';
import avtADM from '../../../images/Đen và Xanh mòng két Minh họa Thể thao Điện tử Game Logo (1).png';

const Category = () => {
    const data = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const [statusCategory, setStatusCategory] = useState(true);
    const [statusEditCategory, setStatusEditCategory] = useState(true);
    const [statusDelete, setStatusDelete] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const categoriesPerPage = 5;

    const onclickAddCategory = () => {
        setStatusCategory(false);
    };
    const backCategory = () => {
        setStatusCategory(true);
    };

    const handleDeleteCategory = (id) => {
        setStatusDelete(true);
        setTimeout(() => {
            setStatusDelete(false);
        }, 3000);
        dispatch(deleteCategory(id));
    };

    const handleUpdateCategory = (item) => {
        setStatusEditCategory(false);
        setCurrentCategory(item);
    };
    const backEditCategory = () => {
        setStatusEditCategory(true);
        setCurrentCategory(null);
    };

    const handleLogOut = () => {
        window.location.href = 'http://localhost:5173/LoginAdmin';
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredCategories = data.categoryReducer.classify.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

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
                    <header className="header">
                        <div className="header__left">
                            <h1 className="header__title">Category</h1>
                        </div>
                        <div className="header__right">
                            <div className="header__search">
                                <IoMdSearch className='iconSearch' />
                                <input
                                    className="header__search-input"
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
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
                    <div style={{ display: `${statusCategory && statusEditCategory ? "block" : "none"}` }} className="product-management-render">
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
                                    {currentCategories.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.status ? "Đang hoạt động" : "Đã dừng"}</td>
                                            <td className='description'>{item.description}</td>
                                            <td>
                                                <button onClick={() => handleUpdateCategory(item)} className="action-button edit">Edit</button>
                                                <button onClick={() => handleDeleteCategory(item.id)} className="action-button delete">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {statusDelete ? <div className='messDelete'>Đã xóa thành công!</div> : <></>}
                            <div className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        className={index + 1 === currentPage ? 'active' : ''}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
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
