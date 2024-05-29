import { configureStore } from "@reduxjs/toolkit";
import typesSlice from "./typesSlice";

export const store = configureStore({
    reducer:{
        types:typesSlice
    }
})