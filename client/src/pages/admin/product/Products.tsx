import React, { useEffect, useState } from 'react';
import '../../../styles/Dashboard.scss';
import '../../../styles/ProductTable.scss';
import '../../../styles/ProductManagement.scss';
import { MdDashboard } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { PiUsersFill } from "react-icons/pi";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { NavLink, Route, Routes } from 'react-router-dom';
import Customers from '../Customers';
import Dashboard from '../Dashboard';
import Orders from '../Orders';
import Settings from '../Setting';
import AddProduct from './AddProduct';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProduct } from '../../../store/reducers/productReducer';
import Category from '../category/Category';
import { IoIosLogOut } from 'react-icons/io';
import EditProduct from './EditProduct';

const Products = () => {
    const data:any = useSelector(state=>state);
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getAllProduct());
    },[dispatch]);

    const [statusProduct, setStatusProduct] = useState<boolean>(true);
    const [statusEditProduct, setStatusEditProduct] = useState<boolean>(false); // Default to false
    const [productToEdit, setProductToEdit] = useState<any>(null); // Store product to edit

    const onclickAddProduct = () => {
        setStatusProduct(false);
    }

    const backProduct = () => {
        setStatusProduct(true);
    }

    const backEditProduct = () => {
        setStatusEditProduct(false);
    }

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }

    const handleDeleteProduct = (id:number) => {
        dispatch(deleteProduct(id));
    }

    const handleLogOut = () => {
        window.location.href = 'http://localhost:5173/LoginAdmin';
    }

    const handleEditProduct = (product:any) => {
        setProductToEdit(product);
        setStatusEditProduct(true);
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
                    <Route path="/Orders" element={<Orders />} />
                    <Route path="/Customers" element={<Customers />} />
                    <Route path="/Category" element={<Category />} />
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
                <div className="product-management">
                    <div className="header">
                        <h1>Products</h1>
                    </div>
                    <div style={{ display: `${statusProduct && !statusEditProduct ? "block" : "none"}` }} className="product-management-render">
                        <button onClick={onclickAddProduct} className="add-button">+ Add Product</button>
                        <div className="product-table">
                            <div className="product-table-select">sắp xếp theo:
                                <select className="product-table-select-option" name="" id="">
                                    <option value="">Id</option>
                                    <option value="">Name</option>
                                    <option value="">Price</option>
                                </select>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Trạng thái</th>
                                        <th>Loại</th>
                                        <th>Giá</th>
                                        <th>Ngày tạo</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.productReducer.products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.status ? 'Đang bán' : 'Dừng bán'}</td>
                                            <td>{product.category}</td>
                                            <td>{formatVND(product.price)}</td>
                                            <td>{product.created_at}</td>
                                            <td>
                                                <button className="action-button view">View</button>
                                                <button onClick={() => handleEditProduct(product)} className="action-button edit">Edit</button>
                                                <button onClick={() => handleDeleteProduct(product.id)} className="action-button delete">Delete</button>
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
                    <div style={{ display: `${statusProduct ? "none" : "block"}` }}>
                        <AddProduct backProduct={backProduct} />
                    </div>
                    <div style={{ display: `${statusEditProduct ? "block" : "none"}` }}>
                        <EditProduct product={productToEdit} backEditProduct={backEditProduct} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Products;
