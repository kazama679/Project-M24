import React from 'react';
import '../../../styles/AddProduct.scss';

interface AddProductProps {
    backProduct: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ backProduct }) => {
    return (
        <div className="add-product-page">
            <button onClick={backProduct} className="back-button">Back</button>
            <h1>Add Product</h1>
            <form className="add-product-form">
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" placeholder="Iphone 15 pro max" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="text" placeholder="$ 899.00" />
                </div>
                <div className="form-group">
                    <label>Mã sản phẩm</label>
                    <select>
                        {/* <option value="available">Available</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="preorder">Preorder</option> */}
                    </select>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select>
                        <option value="available">Available</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="preorder">Preorder</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" />
                    <div className="image-preview">
                        <div className="image-placeholder"></div>
                        <div className="image-placeholder"></div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Type here"></textarea>
                </div>
                <button type="submit" className="submit-button">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;