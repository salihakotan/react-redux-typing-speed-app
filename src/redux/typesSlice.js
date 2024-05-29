import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getLangs = createAsyncThunk("types/getLangs", async()=> {
    const res = await axios("http://localhost:3000/languages")
    return await res.data
})

export const typesSlice = createSlice({
    name:"types",
    initialState: {
        items:[],
        status:"idle",
        language:{
            name:"Turkish",
            status:"idle",
            items:[]
        }
    },
    reducers:{
        setLang:(state,action)=> {
            state.language.name = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getLangs.pending, (state,action) => {
            state.language.status = "loading"
            console.log("loading")
        })
        .addCase(getLangs.fulfilled, (state,action) => {
            state.language.status = "succeeded"
            console.log("succeeded")
            state.language.items = action.payload
        })
        .addCase(getLangs.rejected, (state,action) => {
            state.language.status = "failed"
            console.log("error", action.error.message)
        })
    }
})


export const {setLang} = typesSlice.actions


export default typesSlice.reducer