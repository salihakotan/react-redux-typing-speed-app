import { createSlice } from "@reduxjs/toolkit";

export const typesSlice = createSlice({
    name:"types",
    initialState: {
        items:[],
        state:"idle",

    },
    reducers:{

    }
})

export default typesSlice.reducer