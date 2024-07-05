import React, { useState } from 'react';
import '../../../styles/AddProduct.scss';
import { Category } from '../../../interface';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../store/reducers/categoryReducer';

interface AddCategoryProps {
    backCategory: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ backCategory }) => {
    const dispatch=useDispatch()
    const [nameCategory,setNameCategory]=useState<string>('')
    const [statusCategory,setStatusCategory]=useState<boolean>(true)
    const [descriptionCategory,setDescriptionCategory]=useState<string>('')
    const handleChangeCategory=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setNameCategory(e.target.value);
        console.log(nameCategory);
    }
    const handleChangeSelect=(e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.value === 'active'){
            setStatusCategory(true)
        }else{
            setStatusCategory(false)
        }
        console.log(statusCategory);
    }
    const handleChangeTextarea=(e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setDescriptionCategory(e.target.value)
        console.log(descriptionCategory);
    }
    const saveCategory=()=>{
        const newCategory = {
            id: Math.floor(Math.random()*99999999),
            name: nameCategory,
            description :descriptionCategory,
            status: statusCategory,
            products: []
        }
        dispatch(addCategory(newCategory))
    }
    return (
        <div className="add-product-page">
            <button onClick={backCategory} className="back-button">Back</button>
            <h1>Add Category</h1>
            <form className="add-product-form">
                <div className="form-group">
                    <label>Category Name</label>
                    <input onChange={handleChangeCategory} type="text" placeholder="Laptop văn phòng" />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select onChange={handleChangeSelect} >
                        <option value="active">Hoạt động</option>
                        <option value="unactive">Dừng hoạt động</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea onChange={handleChangeTextarea} placeholder="Type here"></textarea>
                </div>
                <button onClick={saveCategory} type="submit" className="submit-button">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;