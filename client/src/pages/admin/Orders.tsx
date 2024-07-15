import React, { useEffect, useState } from 'react';
import '../../styles/Dashboard.scss';
import '../../styles/Order.scss';
import '../../styles/ProductTable.scss';
import { MdDashboard } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { PiUsersFill } from "react-icons/pi";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { NavLink, Route, Routes } from 'react-router-dom';
import Products from './product/Products';
import Customers from './Customers';
import Dashboard from './Dashboard';
import Settings from './Setting';
import Category from './category/Category';
import { IoIosLogOut, IoMdSearch } from 'react-icons/io';
import avtADM from '../../images/Đen và Xanh mòng két Minh họa Thể thao Điện tử Game Logo (1).png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder, updateOrder } from '../../store/reducers/orderReducer';

const Orders = () => {
    const data: any = useSelector(state => state);
    const dispatch = useDispatch();
    const [check1, setCheck1] = useState<boolean>(true);
    const [check2, setCheck2] = useState<boolean>(false);
    const [indexOrder, setIndexOrder] = useState<any>(null);
    const [statusOrder, setStatusOrder] = useState<string>("");

    useEffect(() => {
        dispatch(getAllOrder());
    }, [dispatch]);

    useEffect(() => {
        if (indexOrder !== null && data.orderReducer.orders.length > 0) {
            setStatusOrder(data.orderReducer.orders[indexOrder]?.status);
        }
    }, [indexOrder, data.orderReducer.orders]);

    // format tiền
    const formatVND = (value: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    // đăng xuất admin
    const handleLogOut = () => {
        window.location.href = 'http://localhost:5173/LoginAdmin';
    };

    // view order
    const handleViewOrder = (item: number) => {
        setIndexOrder(item);
        setCheck1(false);
        setCheck2(true);
    };

    // select status
    const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusOrder(e.target.value);
    };

    // back
    const back = () => {
        setCheck1(true);
        setCheck2(false);
    };

    // cập nhập
    const handleSaveOrder = () => {
        const updatedOrder = { ...data.orderReducer.orders[indexOrder], status: statusOrder };
        dispatch(updateOrder(updatedOrder)).then(() => {
            setCheck1(true);
            setCheck2(false);
        });
    };

    // sắp xếp 
    const handleSortChange = () => {
        // Thực hiện sắp xếp
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
                    <Route path="/Customers" element={<Customers />} />
                    <Route path="/Category" element={<Category />} />
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
                <div className="product-management">
                    <header className="header">
                        <div className="header__left">
                            <h1 className="header__title">Orders</h1>
                        </div>
                        <div className="header__right">
                            <div className="header__search">
                                <IoMdSearch className='iconSearch' />
                                <input className="header__search-input" type="text" placeholder="Tìm kiếm theo mã đơn hàng" />
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
                {check1 ? (
                    <div className="product-table">
                        <div className="product-table-select">sắp xếp theo giá đơn hàng:
                            <select className="product-table-select-option" onChange={handleSortChange}>
                                <option value="">Chọn</option>
                                <option value="price">Từ lớn đến bé</option>
                                <option value="price">Từ bé đến lớn</option>
                            </select>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Tên người nhận</th>
                                    <th>Địa chỉ nhận</th>
                                    <th>Số người nhận</th>
                                    <th>Trạng thái</th>
                                    <th>Tổng tiền</th>
                                    <th>Ngày tạo</th>
                                    <th>Note</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.orderReducer.orders && data.orderReducer.orders.map((item: any, index: number) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td className="product-name">{item.name}</td>
                                        <td className="product-name">{item.address}</td>
                                        <td className="product-name">{item.phone}</td>
                                        <td>{item.status === 'choDuyet' ? 'Chờ duyệt' : item.status === 'daDuyet' ? 'Đã duyệt' : 'Giao hàng thành công'}</td>
                                        <td>{formatVND(item.cart.map((i: any) => {
                                            return i.quantity * i.price;
                                        }).reduce((a: number, b: number) => a + b, 0))}</td>
                                        <td>{item.created_at}</td>
                                        <td>{item.note}</td>
                                        <td>
                                            <button onClick={() => handleViewOrder(index)} className="action-button edit">Chi tiết</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null}
                {check2 && data.orderReducer.orders && data.orderReducer.orders.length > 0 && (
                    <div className="order-details">
                        <button onClick={back} className="back-button">Back</button>
                        <h2>Thông tin đơn hàng</h2>
                        <div className="order-info">
                            <div className="order-info-div">
                                <p><strong>Mã đơn hàng:</strong></p>
                                <p>{data.orderReducer.orders[indexOrder]?.id}</p>
                            </div>
                            <div className="order-info-div">
                                <p><strong>Tổng tiền (cả ship):</strong></p>
                                <p>{formatVND(((data.orderReducer.orders[indexOrder]?.cart.map((i: any) => i.quantity * i.price).reduce((a: number, b: number) => a + b, 0))) + data.orderReducer.orders[0].ship)}</p>
                            </div>
                            <div className="order-info-div">
                                <p><strong>Tên người nhận:</strong></p>
                                <p>{data.orderReducer.orders[indexOrder]?.name}</p>
                            </div>
                            <div className="order-info-div">
                                <p><strong>Số người nhận:</strong></p>
                                <p>{data.orderReducer.orders[indexOrder]?.phone}</p>
                            </div>
                            <div className="order-info-div">
                                <p><strong>Địa chỉ người nhận:</strong></p>
                                <p>{data.orderReducer.orders[indexOrder]?.address}</p>
                            </div>
                            <div className="order-info-div">
                                <p><strong>Ghi chú:</strong></p>
                                <p>{data.orderReducer.orders[indexOrder]?.note}</p>
                            </div>
                            <div className="order-info-div">
                                <p><strong>Trạng thái:</strong></p>
                                <select onChange={handleStatus} value={statusOrder} name="" id="">
                                    <option value="choDuyet">Chờ duyệt</option>
                                    <option value="daDuyet">Đã duyệt</option>
                                    <option value="daNhanHang">Giao hàng thành công</option>
                                </select>
                            </div>
                            <div className="order-info-div">
                                <p><strong>Thời gian đặt hàng:</strong></p>
                                <p>{data.orderReducer.orders[indexOrder]?.created_at}</p>
                            </div>
                            <div className="order-info-div">
                                <p><strong>Phương thức thanh toán:</strong></p>
                                <p>{data.orderReducer.orders[indexOrder]?.payTo === 'NhanHang' ? 'Trả tiền khi nhận hàng' : 'Thanh toán bằng ngân hàng'}</p>
                            </div>
                            <button onClick={handleSaveOrder} className="update-btn">Cập nhập</button>
                        </div>
                        <table className="product-list">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Tổng giá sp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.orderReducer.orders[indexOrder]?.cart.map((product: any, index: number) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td><img className='img' src={product.image} alt="" /></td>
                                        <td>{product.name}</td>
                                        <td>{product.quantity}</td>
                                        <td>{formatVND(product.price)}</td>
                                        <td>{formatVND(product.quantity * product.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Orders;
