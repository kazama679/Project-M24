import React, { useEffect, useState } from "react";
import "../../../styles/AddProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../store/reducers/categoryReducer";
import { addProduct, getAllProduct, updateProduct } from "../../../store/reducers/productReducer";

interface EditProductProps {
    product: any;
    backEditProduct: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, backEditProduct }) => {
    const data: any = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllProduct());
    }, [dispatch]);

    const [nameProduct, setNameProduct] = useState<string>('');
    const [priceProduct, setPriceProduct] = useState<number>(0);
    const [categoryProduct, setCategoryProduct] = useState<string>('');
    const [statusProduct, setStatusProduct] = useState<boolean>(true);
    const [imageProduct, setImageProduct] = useState<string>('');
    const [descriptionProduct, setDescriptionProduct] = useState<string>('');

    const [statusMess1, setStatusMess1] = useState<boolean>(false);
    const [statusMess2, setStatusMess2] = useState<boolean>(false);
    const [statusMess3, setStatusMess3] = useState<boolean>(false);
    const [statusMess4, setStatusMess4] = useState<boolean>(false);
    const [statusMess5, setStatusMess5] = useState<boolean>(false);
    const [statusMess6, setStatusMess6] = useState<boolean>(false);

    useEffect(() => {
        if (product) {
            setNameProduct(product.name);
            setPriceProduct(product.price);
            setCategoryProduct(product.category);
            setStatusProduct(product.status);
            setImageProduct(product.image);
            setDescriptionProduct(product.description);
        }
    }, [product]);

    const handleNameProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameProduct(e.target.value);
    };

    // kiểm tra xem có phải số không
    const handlePriceProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const parsedValue = parseFloat(value);

        if (isNaN(parsedValue)) {
            setStatusMess6(true);
            setPriceProduct(0); // Đặt giá trị sản phẩm về 0 nếu không hợp lệ
        } else {
            setStatusMess6(false);
            setPriceProduct(parsedValue);
        }
    };

    const handleCategoryProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryProduct(e.target.value);
    };

    const handleStatusProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusProduct(e.target.value === 'true');
    };

    const handleImageProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageProduct(e.target.value);
    };

    const handleDescriptionProduct = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionProduct(e.target.value);
    };

    // ngày
    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    // ngày

    const saveProduct = (e: React.FormEvent) => {
        e.preventDefault();
        // Reset trạng thái thông báo
        setStatusMess1(false);
        setStatusMess2(false);
        setStatusMess3(false);
        setStatusMess4(false);
        setStatusMess5(false);
        setStatusMess6(false); // Reset trạng thái thông báo cho định dạng giá

        if (nameProduct === '') {
            setStatusMess1(true);
            return;
        }
        if (priceProduct === 0) {
            setStatusMess2(true);
            return;
        }
        if (categoryProduct === '') {
            setStatusMess5(true);
            return;
        }

        // Kiểm tra trùng tên sản phẩm
        const isDuplicate = data.productReducer.products.some((p: any) => p.name === nameProduct && p.id !== product.id);
        if (isDuplicate) {
            setStatusMess4(true);
            return;
        }

        const editProduct = {
            ...product,
            name: nameProduct,
            price: priceProduct,
            category: categoryProduct,
            status: statusProduct,
            image: imageProduct,
            description: descriptionProduct,
            updated_at: formattedDate,
        };

        dispatch(updateProduct(editProduct));
        setStatusMess3(true);
        setTimeout(() => {
            window.location.href = 'http://localhost:5173/Products';
        }, 1000);
    };

    return (
        <div className="add-product-page">
            <button onClick={backEditProduct} className="back-button">Back</button>
            <h1>Edit Product</h1>
            <form className="add-product-form" onSubmit={saveProduct}>
                <div className="form-group-two">
                    <div>
                        <div className="form-group">
                            <label>Tên sản phẩm</label>
                            <input onChange={handleNameProduct} type="text" value={nameProduct} placeholder="Iphone 15 pro max" />
                            {statusMess1 ? <div className="messProduct">Vui lòng nhập tên cho sản phẩm</div> : <></>}
                        </div>
                        <div className="form-group">
                            <label>Giá</label>
                            <input onChange={handlePriceProduct} value={priceProduct} type="text" placeholder="15.000.000 đ" />
                            {statusMess2 ? <div className="messProduct">Vui lòng nhập giá cho sản phẩm</div> : <></>}
                            {statusMess6 ? <div className="messProduct">Vui lòng nhập đúng định dạng số</div> : <></>}
                        </div>

                        <div className="form-group">
                            <label>Phân loại</label>
                            <select onChange={handleCategoryProduct} value={categoryProduct}>
                                <option value="">Phân loại sản phẩm</option>
                                {data.categoryReducer.classify.length > 0 ? (
                                    data.categoryReducer.classify.map((item: any) => (
                                        <option key={item.id} value={item.name}>{item.name}</option>
                                    ))
                                ) : (
                                    <option value="">No categories available</option>
                                )}
                            </select>
                            {statusMess5 ? <div className="messProduct">Vui lòng phân loại sản phẩm</div> : <></>}
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select onChange={handleStatusProduct} value={statusProduct ? 'true' : 'false'}>
                                <option value="true">Đang bán</option>
                                <option value="false">Dừng bán</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="form-group">
                            <label>Ảnh</label>
                            <input value={imageProduct} onChange={handleImageProduct} type="text" />
                            <div className="image-preview">
                                <div className="image-placeholder"></div>
                                <div className="image-placeholder"></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Chi tiết sản phẩm</label>
                            <textarea value={descriptionProduct} onChange={handleDescriptionProduct} placeholder="Type here"></textarea>
                        </div>
                    </div>
                </div>
                {statusMess3 ? <div className="messAddProduct">Đã chỉnh sửa sản phẩm thành công</div> : <></>}
                <button type="submit" className="submit-button">Sửa sản phẩm</button>
            </form>
        </div>
    );
};

export default EditProduct;