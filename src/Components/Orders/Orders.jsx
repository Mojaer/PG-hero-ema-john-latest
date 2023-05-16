import React, { useState } from 'react';
import Cart from '../Shop/Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewOrders from './ReviewOrders/ReviewOrders';
import { deleteShoppingCart, removeFromDb } from '../../assets/utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData()
    const [cart, setCart] = useState(savedCart)

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter((pd) => pd._id != id)
        console.log(remaining, id)
        setCart(remaining)
        removeFromDb(id)
    }
    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {cart.map((product) => <ReviewOrders key={product._id} product={product} handleRemoveFromCart={() => handleRemoveFromCart(product._id)}></ReviewOrders>)}
            </div>
            <div className='cart-container'>
                <Cart cart={cart} handleClearCart={handleClearCart}>
                    <Link to='./checkout'><button>Proceed to Checkout</button></Link>
                </Cart>
            </div>

        </div>
    );
};

export default Orders;