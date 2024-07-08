import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUser:any = createAsyncThunk("users/getAllUser",async ()=>{
    const response = await axios.get("http://localhost:8080/users")
    return response.data
})

// hàm thêm thông tin
export const addUser: any = createAsyncThunk(
    "users/addUser",
    async (user: any) => {
        const response: any = await axios.post(
            "http://localhost:8080/users",
            user
        );
        return response.data;
    }
);
// hàm cập nhật
// export const updateUser: any = createAsyncThunk(
//     "users/updateUser",
//     async (item: any) => {
//         const response: any = await axios.put(
//             `http://localhost:8080/users/${item.id}`,
//             item
//         );
//         return response.data;
//     }
// );

const userReducer = createSlice({
    name:"users",
    initialState:{
        users:[]
    },
    reducers:{
        // chứa action
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllUser.pending, (state,action)=>{
            console.log('chờ call API');
        })
        .addCase(getAllUser.fulfilled, (state,action)=>{
            state.users=action.payload
        })
        .addCase(getAllUser.rejected, (state,action)=>{
            console.log('thất bại');
        })
        //thêm
        .addCase(addUser.fulfilled, (state: any, action: any) => {
            state.users.push(action.payload);
        })
        // cập nhập
        // .addCase(updateUser.fulfilled, (state: any, action) => {
        //     const index = state.users.findIndex((item: any) => {
        //         return item.id === action.payload.id;
        //     });
        //     if (index != -1) {
        //         state.users[index] = action.payload;
        //     }
        // });
    }
})
export default userReducer.reducer;