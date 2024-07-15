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
import { IoIosLogOut, IoMdSearch } from 'react-icons/io';
import EditProduct from './EditProduct';
import avtADM from '../../../images/Đen và Xanh mòng két Minh họa Thể thao Điện tử Game Logo (1).png';

const Products = () => {
    const data: any = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    const [statusProduct, setStatusProduct] = useState<boolean>(true);
    const [statusEditProduct, setStatusEditProduct] = useState<boolean>(false);
    const [productToEdit, setProductToEdit] = useState<any>(null);
    const [statusDelete, setStatusDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const productsPerPage = 5;

    const onclickAddProduct = () => {
        setStatusProduct(false);
    }

    const backProduct = () => {
        setStatusProduct(true);
    }

    const backEditProduct = () => {
        setStatusEditProduct(false);
    }

    // format tiền
    const formatVND = (value:number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }

    const handleDeleteProduct = (id: number) => {
        setStatusDelete(true);
        setTimeout(() => {
            setStatusDelete(false);
        }, 3000)
        dispatch(deleteProduct(id));
    }

    const handleLogOut = () => {
        window.location.href = 'http://localhost:5173/LoginAdmin';
    }

    const handleEditProduct = (product: any) => {
        setProductToEdit(product);
        setStatusEditProduct(true);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const filteredAndSortedProducts = data.productReducer.products
        .filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortOption === 'price') {
                return a.price - b.price;
            } else if (sortOption === 'created_at') {
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            }
            return 0;
        });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

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
                    <header className="header">
                        <div className="header__left">
                            <h1 className="header__title">Products</h1>
                        </div>
                        <div className="header__right">
                            <div className="header__search">
                                <IoMdSearch className='iconSearch'/>
                                <input
                                    className="header__search-input"
                                    type="text"
                                    placeholder="Tìm kiếm theo tên sản phẩm"
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
                    <div style={{ display: `${statusProduct && !statusEditProduct ? "block" : "none"}` }} className="product-management-render">
                        <button onClick={onclickAddProduct} className="add-button">+ Add Product</button>
                        <div className="product-table">
                            <div className="product-table-select">sắp xếp theo:
                                <select className="product-table-select-option" value={sortOption} onChange={handleSortChange}>
                                    <option value="">Chọn</option>
                                    <option value="name">Tên</option>
                                    <option value="price">Giá</option>
                                    <option value="created_at">Ngày tạo</option>
                                </select>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Trạng thái</th>
                                        <th>Loại</th>
                                        <th>Giá</th>
                                        <th>Ngày tạo</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProducts.map((product:any, index:number) => (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td><img className='image' src={product.image} alt="" /></td>
                                            <td className="product-name">{product.name}</td>
                                            <td>{product.status ? 'Đang bán' : 'Dừng bán'}</td>
                                            <td>{product.category}</td>
                                            <td>{formatVND(product.price)}</td>
                                            <td>{product.created_at}</td>
                                            <td>
                                                <button onClick={() => handleEditProduct(product)} className="action-button edit">Chi tiết</button>
                                                <button onClick={() => handleDeleteProduct(product.id)} className="action-button delete">Xóa</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {statusDelete ? <div className='messDelete'>Đã xóa thành công!</div> : <></>}
                            <div className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
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
