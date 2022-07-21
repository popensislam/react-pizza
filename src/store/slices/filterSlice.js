import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
        changeActiveSort(state, action) {
            state.sortActive = action.payload
        },
        changeActiveCategories(state, action) {
            state.categoryActive = action.payload
        },
        changeCurrentPage(state, action) {
            state.currentPage = action.payload  
        },
        setFilter(state, action) {
            state.sortActive = action.payload.sortActive
            state.categoryActive = action.payload.categoryActive
            state.currentPage = action.payload.currentPage
        },
    }
})

export const { changeActiveSort, changeActiveCategories, changeCurrentPage, setFilter } = filterSlice.actions

export default filterSlice.reducer