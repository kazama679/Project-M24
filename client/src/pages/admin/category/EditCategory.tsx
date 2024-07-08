import React, { useState } from 'react';
import '../../../styles/AddProduct.scss';
import { Category } from '../../../interface';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../store/reducers/categoryReducer';

interface AddCategoryProps {
    backEditCategory: () => void;
}

const EditCategory: React.FC<AddCategoryProps> = ({ backEditCategory }) => {
    return (
        <div className="add-product-page">
            <button onClick={backEditCategory} className="back-button">Back</button>
            <h1>Edit Category</h1>
            <form className="add-product-form">
                <div className="form-group">
                    <label>Category Name</label>
                    <input type="text" placeholder="Laptop văn phòng" />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select >
                        <option value="active">Hoạt động</option>
                        <option value="unactive">Dừng hoạt động</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Đặc điểm</label>
                    <textarea placeholder="Type here"></textarea>
                </div>
                <button type="submit" className="submit-button">Edit Category</button>
            </form>
        </div>
    );
};

export default EditCategory;