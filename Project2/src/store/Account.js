import {
    createSlice,
    configureStore,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  
  export const getAllAccount = createAsyncThunk( 
  "abcd",    
  async () => {
     const response = await axios.get("http://localhost:8008/Account");
    //  console.log(response.data);
    return response.data;
    
  });
  
  
  const accountSlice = createSlice({
    name: "product",
    initialState: {
      account:[]
    }
    ,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllAccount.pending, (state, action) => {
          // trang thai
          // console.log("1111");
        })
        .addCase(getAllAccount.fulfilled, (state, action) => {
          // xu li thanh cong
          state.account = action.payload
        })
        .addCase(getAllAccount.rejected, (state, action) => {
          // xu li that bai
          state.error = action.error;
        });
    },
  });
  
  export const accountReducer = accountSlice.reducer;