import {
  configureStore,
} from "@reduxjs/toolkit";
import { productReducer } from "./Product";
import { accountReducer } from "./Account";
import { addressReducer} from "./Address"
import { billsReducer } from "./Bill"
const store = configureStore({
  reducer: {
    productReducer,
    accountReducer,
    addressReducer,
    billsReducer
  },
});
export default store;
