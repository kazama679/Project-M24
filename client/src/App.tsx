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

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginAdmin />} />
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
