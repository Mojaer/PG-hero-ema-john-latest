import React, { useState } from 'react';
import Cart from '../Shop/Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewOrders from './ReviewOrders/ReviewOrders';
import { removeFromDb } from '../../assets/utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData()
    const [cart, setCart] = useState(savedCart)

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter((pd) => pd.id != id)
        setCart(remaining)
        removeFromDb(id)
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {cart.map((product) => <ReviewOrders key={product.id} product={product} handleRemoveFromCart={handleRemoveFromCart}></ReviewOrders>)}
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Orders;