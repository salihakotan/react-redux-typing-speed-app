import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getItems = createAsyncThunk("typing/getItems", async()=> {
    const res = await axios(`http://localhost:3000/items`)
    return await res.data
})

export const typingSlice = createSlice({
    name:"typing",
    initialState: {
        status:"idle",
        language:"Turkish",
        timesUp:false,
        items:[], //an object includes lang_name and words
    },
    reducers:{
        setLang:(state,action)=> {
            state.language = action.payload

        },
        setTimesUp:(state,action)=> {
            state.timesUp = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getItems.pending, (state,action) => {
            state.status = "loading"
            console.log("loading")
        })
        .addCase(getItems.fulfilled, (state,action) => {
            state.status = "succeeded"
            console.log("succeeded")
            state.items = action.payload
           
        })
        .addCase(getItems.rejected, (state,action) => {
            state.status = "failed"
            console.log("error", action.error.message)
        })
    }
})


export const {setLang,setTimesUp} = typingSlice.actions


export default typingSlice.reducer