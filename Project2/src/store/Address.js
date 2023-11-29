import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
//   import apiGetAllProduct from "../service/apis/api.product";
  
  export const getAllAddress = createAsyncThunk( 
  "bcd",    
  async () => {
     const response = await axios.get("http://localhost:8008/address");
    //  console.log(response.data);
    return response.data;
    
  });
  
  
  const addressSlice = createSlice({
    name: "address",
    initialState: {
      address:[]
    }
    ,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllAddress.pending, (state, action) => {
          // trang thai
        //   console.log("1111");
        })
        .addCase(getAllAddress.fulfilled, (state, action) => {
          // xu li thanh cong
          console.log(action.payload);
          state.products = action.payload
        })
        .addCase(getAllAddress.rejected, (state, action) => {
          // xu li that bai
          state.error = action.error;
        });
    },
  });
  
  export const addressReducer = addressSlice.reducer;