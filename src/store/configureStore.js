import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./slices/basketSlice";
import { catalogSlice } from "./slices/catalogSlice";

export const store = configureStore({
    reducer:{
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer,
    }
})