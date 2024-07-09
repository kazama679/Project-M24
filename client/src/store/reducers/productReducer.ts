import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProductAPI, getProducts } from "../../services/products.service";

// lấy thông tin tất cả products
export const getAllProduct:any = createAsyncThunk("products/getAllProduct",getProducts)

// hàm xóa thông tin product
export const deleteProduct:any = createAsyncThunk("products/deleteProduct",deleteProductAPI)

const productReducer = createSlice({
    name:"products",
    initialState:{
        products:[]
    },
    reducers:{
        // chứa action
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllProduct.pending, (state,action)=>{
            console.log('chờ call API');
        })
        .addCase(getAllProduct.fulfilled, (state,action)=>{
            state.products=action.payload
        })
        .addCase(getAllProduct.rejected, (state,action)=>{
            console.log('thất bại');
        })

        // xóa
        .addCase(deleteProduct.fulfilled, (state,action)=>{
            state.products = action.payload.filter((product:any)=>{
                return product.id != action.payload
            })
        })
    }
})
export default productReducer.reducer;