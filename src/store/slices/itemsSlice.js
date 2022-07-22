import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPizza = createAsyncThunk('items/fetchPizza', async (param) => {
    const data = await axios.get(`https://62d668c515ad24cbf2d694b3.mockapi.io/items?page=${param.currentPage}&limit=4&sortBy=${param.sortBy}&order=${param.order}&category=${param.categoryActive > 0 ? param.categoryActive : ''}`)
    return data.data
})

const initialState = {
    items: [],
    status: 'pending'
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        getItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state, action) => {
            state.status = 'pending';
            state.items = [];
        });

        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        });

        builder.addCase(fetchPizza.rejected, (state, action) => {
            state.status = 'error';
            state.items = [];
        });
    }
})

export const { getItems } = itemsSlice.actions
export default itemsSlice.reducer