import React, { useState, useEffect } from 'react';
import '../../../styles/AddProduct.scss';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../../../store/reducers/categoryReducer';

interface EditCategoryProps {
    backEditCategory: () => void;
    currentCategory: any;
}

const EditCategory: React.FC<EditCategoryProps> = ({ backEditCategory, currentCategory }) => {
    const dispatch = useDispatch();
    const [nameCategory, setNameCategory] = useState(currentCategory?.name || '');
    const [statusCategory, setStatusCategory] = useState(currentCategory?.status || true);
    const [descriptionCategory, setDescriptionCategory] = useState(currentCategory?.description || '');

    useEffect(() => {
        setNameCategory(currentCategory?.name || '');
        setStatusCategory(currentCategory?.status || true);
        setDescriptionCategory(currentCategory?.description || '');
    }, [currentCategory]);

    const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameCategory(e.target.value);
    };
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusCategory(e.target.value === 'active');
    };
    const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionCategory(e.target.value);
    };
    const saveCategory = () => {
        const updatedCategory = {
            ...currentCategory,
            name: nameCategory,
            description: descriptionCategory,
            status: statusCategory,
        };
        dispatch(updateCategory(updatedCategory));
        backEditCategory();
    };

    return (
        <div className="add-product-page">
            <button onClick={backEditCategory} className="back-button">Back</button>
            <h1>Edit Category</h1>
            <form className="add-product-form" onSubmit={saveCategory}>
                <div className="form-group">
                    <label>Category Name</label>
                    <input value={nameCategory} onChange={handleChangeCategory} type="text" placeholder="Laptop văn phòng" />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select value={statusCategory ? 'active' : 'unactive'} onChange={handleChangeSelect}>
                        <option value="active">Hoạt động</option>
                        <option value="unactive">Dừng hoạt động</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea value={descriptionCategory} onChange={handleChangeTextarea} placeholder="Type here"></textarea>
                </div>
                <button type="submit" className="submit-button">Edit Category</button>
            </form>
        </div>
    );
};

export default EditCategory;