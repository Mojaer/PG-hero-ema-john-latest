import React from 'react';
import './ReviewOrder.css'

const ReviewOrders = ({ product, handleRemoveFromCart }) => {
    const { id, img, price, name, quantity } = product

    return (
        <div>
            <div className='reviewOrder'>
                <img src={img} alt="" />
                <h5>{name}</h5>
                <p>{quantity}</p>
                <button onClick={() => handleRemoveFromCart(id)}>delete</button>
            </div>


        </div>
    );
};

export default ReviewOrders;