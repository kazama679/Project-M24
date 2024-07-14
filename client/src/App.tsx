import React from 'react';
import './App.scss';
import Dashboard from './pages/admin/Dashboard';
import { Route, Routes } from 'react-router-dom';
import ProductManagement from './pages/admin/product/Products';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import Setting from './pages/admin/Setting';
import Category from './pages/admin/category/Category';
import LoginAdmin from './pages/admin/LoginAdmin';
import Register from './pages/user/Register';
import Home from './pages/user/Home';
import Form from './pages/user/Form';
import Card from './pages/user/Card';
import Cart from './pages/user/Cart';
import Pay from './pages/user/Pay';

const App = () => {
    return (
        <div className="App">
            <Routes>
                {/* USER */}
                <Route path="/" element={<Form />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Pay" element={<Pay />} />
                <Route path="/Card" element={<Card />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/LoginAdmin" element={<LoginAdmin />} />
                {/* ADMIN */}
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Products" element={<ProductManagement />} />
                <Route path="/Orders" element={<Orders />} />
                <Route path="/Customers" element={<Customers />} />
                <Route path="/Category" element={<Category />} />
                <Route path="/Settings" element={<Setting />} />
            </Routes>
        </div>
    );
};

export default App;
