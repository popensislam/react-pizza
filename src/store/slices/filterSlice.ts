import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."


type SortBy = {
    nameRu: string,
    nameEn: string
}

interface FilterState {
    sortBy: SortBy[],
    sortActive: number,
    categories: string[],
    categoryActive: number,
    currentPage: number
}

const initialState: FilterState = {
    sortBy: [
        {
            nameRu: 'популярности',
            nameEn: 'rating' 
        },
        {
            nameRu: 'цене',
            nameEn: 'price'
        },
        {
            nameRu: 'алфавиту',
            nameEn: 'title'
        }
    ],
    sortActive: 0,
    categories: ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'],
    categoryActive: 0,
    currentPage: 1
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeActiveSort(state, action: PayloadAction<number>) {
            state.sortActive = action.payload
        },
        changeActiveCategories(state, action: PayloadAction<number>) {
            state.categoryActive = action.payload
        },
        changeCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload  
        },
        setFilter(state, action: PayloadAction<any>) {
            state.sortActive = action.payload.sortActive
            state.categoryActive = action.payload.categoryActive
            state.currentPage = action.payload.currentPage
        },
    }
})

export const selectFilter = (state: RootState) => state.filter

export const { changeActiveSort, changeActiveCategories, changeCurrentPage, setFilter } = filterSlice.actions

export default filterSlice.reducer