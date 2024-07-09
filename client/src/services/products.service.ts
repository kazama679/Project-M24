import axios from "axios";

// API lấy thông tin tất cả products
export const getProducts = async () => {
    const res: any = await axios.get("http://localhost:8080/products")
    return res.data
}

// hàm xóa thông tin products
export const deleteProductAPI = async (id: number) => {
    const res: any = await axios.delete(`http://localhost:8080/products/${id}`);
    return res.data
}