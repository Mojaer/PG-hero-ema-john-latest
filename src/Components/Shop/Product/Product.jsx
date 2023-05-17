import React, { useEffect } from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import 'aos/dist/aos.css';
import AOS from 'aos';


const Product = (props) => {
    const { name, img, price, quantity, ratings, seller } = props.product
    const handleAddToCart = props.handleAddToCart
    useEffect(() => {
        AOS.init({
            duration: 1500, // values from 0 to 30
            easing: 'ease-in-out-back', // default easing for AOS animations
        })
    }, [])

    return (
        <div className='product'
            data-aos="zoom-out-right"
            data-aos-easing="linear">
            <div className='product-details'  >
                <img src={img} alt="" />
                <h4>{name}</h4>
                <p>Price: ${price}</p>
                <br /><p>Manufacturer : {seller}</p>
                <p>ratings : {ratings} Star</p>
            </div>
            <button className='btn-cart' onClick={() => handleAddToCart(props.product)}>Add To Cart <FontAwesomeIcon icon={faShoppingCart} /></button>
        </div>
    );
};

export default Product;