import React from 'react';
import './Product.css'

const Product = (props) => {
    const { name, img, price, quantity, ratings, seller } = props.product
    const handleAddToCart = props.handleAddToCart
    return (
        <div className='product'>
            <div className='product-details' >
                <img src={img} alt="" />
                <h4>{name}</h4>
                <p>Price: ${price}</p>
                <br /><p>Manufacturer : {seller}</p>
                <p>ratings : {ratings} Star</p>
            </div>
            <button className='btn-cart' onClick={() => handleAddToCart(props.product)}>Add To Cart</button>
        </div>
    );
};

export default Product;