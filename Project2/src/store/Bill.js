import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
//   import apiGetAllProduct from "../service/apis/api.product";
  
export const getAllBills = createAsyncThunk( 
  "bill/getAllBills",    
  async ()=>{
   let data=await axios.get("http://localhost:8008/bills");
    return data.data
  }
   
  );
  

  
 
  
  
  const billsSlice = createSlice({
    name: "bills",
    initialState: {
      bills:[]
    }
    ,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllBills.pending, (state, action) => {
          // trang thai
        //   console.log("1111");
        })
        .addCase(getAllBills.fulfilled, (state, action) => {
          console.log(2323232323);
          console.log(action.payload);
          state.bills = action.payload
        })
        .addCase(getAllBills.rejected, (state, action) => {
          // xu li that bai
          state.error = action.error;
        });
    },
  });
  
  export const billsReducer = billsSlice.reducer;