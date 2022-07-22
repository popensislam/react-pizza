import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartEmpty from '../components/CartItem/CartEmpty';
import CartFull from '../components/CartItem/CartFull';

const Cart = () => {
    const { cartItems, totalPizzas, totalPrice } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const isCartItems = cartItems.length
    return (
        <div className="container container--cart">
            {
                isCartItems
                    ? <CartFull cartItems={cartItems} totalPizzas={totalPizzas} totalPrice={totalPrice}/>
                    : <CartEmpty />
            }
        </div>
    );
}

export default Cart;