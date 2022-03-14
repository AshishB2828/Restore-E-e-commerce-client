import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/accountSlice";
import { basketSlice } from "./slices/basketSlice";
import { catalogSlice } from "./slices/catalogSlice";

export const store = configureStore({
    reducer:{
        basket: basketSlice.reducer,
        account: accountSlice.reducer,
        catalog: catalogSlice.reducer,
    }
})