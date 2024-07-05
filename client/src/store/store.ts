import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import categoryReducer from "./reducers/categoryReducer";

const store = configureStore({
    reducer:{
        productReducer,
        categoryReducer
    }
})
export default store