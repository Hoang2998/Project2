import {
    createSlice,
    configureStore,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import apiGetAllProduct from "../service/apis/api.product";
  
  export const getAllProduct = createAsyncThunk( 
  "abc",    
  async () => {
     const response = await axios.get(apiGetAllProduct.getProduct);
    //  console.log(response.data);
    return response.data;
    
  });
  
  
  const productSlice = createSlice({
    name: "product",
    initialState: {
      products:[]
    }
    ,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllProduct.pending, (state, action) => {
          // trang thai
          // console.log("1111");
        })
        .addCase(getAllProduct.fulfilled, (state, action) => {
          // xu li thanh cong
          state.products = action.payload
        })
        .addCase(getAllProduct.rejected, (state, action) => {
          // xu li that bai
          state.error = action.error;
        });
    },
  });
  
  export const productReducer = productSlice.reducer;