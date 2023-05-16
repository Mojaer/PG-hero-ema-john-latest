import React, { useEffect, useState } from 'react';
import Cart from './Cart/Cart';
import Product from './Product/Product';
import './Shop.css';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../assets/utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/products')
            .then((res) => res.json())
            .then((data) => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart()
        const savedCart = []

        for (const id in storedCart) {
            const addedCart = products.find((product) => product._id === id)
            if (addedCart) {
                const quantity = storedCart[id]
                addedCart.quantity = quantity
                savedCart.push(addedCart);
            }

        }
        setCart(savedCart)

    }, [products])

    const handleAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart)
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map((product) => <Product product={product} key={product._id} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart} handleClearCart={handleClearCart}>
                    <Link to='./orders'><button>Go to review order</button></Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;