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
    sortActive: 1 ,
    categories: ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'],
    categoryActive: 0 
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
        }
    }
})

export const { changeActiveSort, changeActiveCategories } = filterSlice.actions

export default filterSlice.reducer