import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from ".."

type FetchPizzaType = {
    currentPage: number,
    sortBy: string,
    order: string,
    categoryActive: number,
}

export const fetchPizza = createAsyncThunk('items/fetchPizza', async (param: FetchPizzaType) => {
    const data = await axios.get(`https://62d668c515ad24cbf2d694b3.mockapi.io/items?page=${param.currentPage}&limit=4&sortBy=${param.sortBy}&order=${param.order}&category=${param.categoryActive > 0 ? param.categoryActive : ''}`)
    return data.data
})

interface ItemsState {
    items: {}[],
    status: string
}

const initialState: ItemsState = {
    items: [],
    status: 'pending',
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        getItems(state, action: PayloadAction<[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, (state) => {
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

export const selectItems = (state: RootState) => state.items
export const { getItems } = itemsSlice.actions
export default itemsSlice.reducer