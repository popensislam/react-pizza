import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cartItems: [],
    totalPrice: 0,
    totalPizzas: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCard(state, action) {
            const selectedItem = action.payload
            const cart = state.cartItems
            const foundItem = cart.find(item => {
                return item.id == selectedItem.id && item.size == selectedItem.size && item.type == selectedItem.type
            })
            if (foundItem) {
                foundItem.count++
                foundItem.totalOnePrice = foundItem.price * foundItem.count
            } else {
                state.cartItems.push({ ...selectedItem, count: 1, totalOnePrice: selectedItem.price, idToDel: Date.now() })
            }
            state.totalPrice += selectedItem.price
            state.totalPizzas++
        },
        plusItem(state, action) {
            const foundItemToDel = state.cartItems.find(item => item.idToDel == action.payload)

            foundItemToDel.count++
            foundItemToDel.totalOnePrice += foundItemToDel.price
            state.totalPrice += foundItemToDel.price
            state.totalPizzas++
        },
        minusItem(state, action) {
            const foundItemToDel = state.cartItems.find(item => item.idToDel == action.payload)
            console.log(foundItemToDel.count)
            if (foundItemToDel.count != 1) {
                foundItemToDel.count--
                foundItemToDel.totalOnePrice -= foundItemToDel.price
                state.totalPrice -= foundItemToDel.price
                state.totalPizzas--
                return
            }
            const cart = state.cartItems.filter(item => item.idToDel != action.payload)
            state.totalPrice -= foundItemToDel.price
            state.totalPizzas--
            state.cartItems = cart
        },
        clearByOne(state, action) {
            const cart = state.cartItems.find(item => item.idToDel == action.payload)
            console.log(cart.totalOnePrice, cart.count)
            state.totalPrice = state.totalPrice - cart.totalOnePrice
            state.totalPizzas = state.totalPizzas - cart.count
            const TheRestCart = state.cartItems.filter(item => item.idToDel != cart.idToDel)
            state.cartItems = TheRestCart
        },
        clearBasket(state) {
            state.cartItems = []
            state.totalPrice = 0
            state.totalPizzas = 0
        }
    }
})

export const { addItemToCard, plusItem, minusItem, clearBasket, clearByOne } = cartSlice.actions
export default cartSlice.reducer