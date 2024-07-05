import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategory:any = createAsyncThunk("classify/getAllCategory",async ()=>{
    const response = await axios.get("http://localhost:8080/classify")
    return response.data
})

export const deleteCategory:any = createAsyncThunk("classify/deleteCategory",async (id:number)=>{
    await axios.delete(`http://localhost:8080/classify/${id}`);
    return id;
})
// hàm thêm thông tin
export const addCategory: any = createAsyncThunk(
    "classify/addCategory",
    async (category: any) => {
        const response: any = await axios.post(
            "http://localhost:8080/classify",
            category
        );
        return response.data;
    }
);
// hàm cập nhật
export const updateCategory: any = createAsyncThunk(
    "classify/updateCategory",
    async (item: any) => {
        const response: any = await axios.put(
            `http://localhost:8080/classify/${item.id}`,
            item
        );
        return response.data;
    }
);
const categoryReducer = createSlice({
    name:"classify",
    initialState:{
        classify:[]
    },
    reducers:{
        // chứa action
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllCategory.pending, (state,action)=>{
            console.log('chờ call API');
        })
        .addCase(getAllCategory.fulfilled, (state,action)=>{
            state.classify=action.payload
        })
        .addCase(getAllCategory.rejected, (state,action)=>{
            console.log('thất bại');
        })
        //thêm
        .addCase(addCategory.fulfilled, (state: any, action: any) => {
            state.classify.push(action.payload);
        })
        // xóa
        .addCase(deleteCategory.fulfilled, (state,action)=>{
            state.classify = action.payload.filter((a:any)=>{
                return a.id != action.payload
            })
        })
        // cập nhập
        .addCase(updateCategory.fulfilled, (state: any, action) => {
            const index = state.users.findIndex((item: any) => {
                return item.id === action.payload.id;
            });
            if (index != -1) {
                state.classify[index] = action.payload;
            }
        });
    }
})
export default categoryReducer.reducer;