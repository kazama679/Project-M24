import React, { useEffect, useState } from "react";
import "../../../styles/AddProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../store/reducers/categoryReducer";
import { addProduct, getAllProduct, updateProduct } from "../../../store/reducers/productReducer";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/config";

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
    const [stockProduct, setStockProduct] = useState<number>(0);
    const [categoryProduct, setCategoryProduct] = useState<string>('');
    const [statusProduct, setStatusProduct] = useState<boolean>(true);
    const [imageProduct, setImageProduct] = useState<string>('');
    const [imageURL, setImageURL] = useState<any>(null);
    const [descriptionProduct, setDescriptionProduct] = useState<string>('');

    const [statusMess1, setStatusMess1] = useState<boolean>(false);
    const [statusMess2, setStatusMess2] = useState<boolean>(false);
    const [statusMess3, setStatusMess3] = useState<boolean>(false);
    const [statusMess4, setStatusMess4] = useState<boolean>(false);
    const [statusMess5, setStatusMess5] = useState<boolean>(false);
    const [statusMess6, setStatusMess6] = useState<boolean>(false);
    const [statusMess7, setStatusMess7] = useState<boolean>(false);
    const [statusMess8, setStatusMess8] = useState<boolean>(false);

    useEffect(() => {
        if (product) {
            setNameProduct(product.name);
            setPriceProduct(product.price);
            setStockProduct(product.stock);
            setCategoryProduct(product.category);
            setStatusProduct(product.status);
            setImageProduct(product.image);
            setDescriptionProduct(product.description);
        }
    }, [product]);

    const handleNameProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameProduct(e.target.value);
    };

    const handlePriceProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const parsedValue = parseFloat(value);

        if (isNaN(parsedValue)) {
            setStatusMess6(true);
            setPriceProduct(0);
        } else {
            setStatusMess6(false);
            setPriceProduct(parsedValue);
        }
    };
    const handleStockProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const parsedValue = parseFloat(value);

        if (isNaN(parsedValue)) {
            setStatusMess7(true);
            setStockProduct(0);
        } else {
            setStatusMess7(false);
            setStockProduct(parsedValue);
        }
    };

    const handleCategoryProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryProduct(e.target.value);
    };

    const handleStatusProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusProduct(e.target.value === 'true');
    };

    const handleDescriptionProduct = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionProduct(e.target.value);
    };

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueImage: any = e.target.files?.[0];
        setImageURL(valueImage);
    };

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const saveProduct = (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMess1(false);
        setStatusMess2(false);
        setStatusMess3(false);
        setStatusMess4(false);
        setStatusMess5(false);
        setStatusMess6(false);

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
        if (stockProduct === 0) {
            setStatusMess8(true);
            return;
        }
        const isDuplicate = data.productReducer.products.some((p: any) => p.name === nameProduct && p.id !== product.id);
        if (isDuplicate) {
            setStatusMess4(true);
            return;
        }

        const handleUpdateProduct = (imageURL: string) => {
            setStatusMess3(true);
            const updatedProduct = {
                ...product,
                name: nameProduct,
                price: priceProduct,
                stock: stockProduct,
                category: categoryProduct,
                status: statusProduct,
                image: imageURL,
                description: descriptionProduct,
                updated_at: formattedDate,
            };

            dispatch(updateProduct(updatedProduct));
            setTimeout(() => {
                window.location.href = 'http://localhost:5173/Products';
            }, 1000);
        };

        if (imageURL) {
            const imageRef = ref(storage, `ptit-image/${imageURL.name}`);
            uploadBytes(imageRef, imageURL).then((snapShop) => {
                getDownloadURL(snapShop.ref).then((url) => {
                    handleUpdateProduct(url);
                });
            });
        } else {
            handleUpdateProduct(imageProduct);
        }
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
                            <label>Số lượng</label>
                            <input onChange={handleStockProduct} value={stockProduct} type="text" placeholder="15.000.000 đ" />
                            {statusMess8 ? <div className="messProduct">Vui lòng nhập số lượng hàng</div> : <></>}
                            {statusMess7 ? <div className="messProduct">Vui lòng nhập đúng định dạng số</div> : <></>}
                        </div>
                        <div className="form-group">
                            <label>Ảnh</label>
                            <input type="file" id="file-upload" className="hidden" onChange={changeImage} />
                            {imageURL ? (
                                <div className="image-preview">
                                    <img src={URL.createObjectURL(imageURL)} alt="Chosen image" width={150} />
                                </div>
                            ) : (
                                <div className="image-preview">
                                    <img src={imageProduct} alt="Current image" width={150} />
                                </div>
                            )}
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