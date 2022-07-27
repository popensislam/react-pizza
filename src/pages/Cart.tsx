import React from 'react';
import { useSelector } from 'react-redux';
import CartEmpty from '../components/CartItem/CartEmpty';
import CartFull from '../components/CartItem/CartFull';
import { selectCart } from '../store/slices/cartSlice';

const Cart = () => {
    const { cartItems, totalPizzas, totalPrice } = useSelector(selectCart)
    const isCartItems: number = cartItems.length
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