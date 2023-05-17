import React, { useCallback, useEffect, useState } from 'react';
import Cart from './Cart/Cart';
import Product from './Product/Product';
import './Shop.css';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../assets/utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {

    let [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [content, setContent] = useState(10)
    const [active, setActive] = useState(0)
    const totalProducts = useLoaderData()
    const numberOfPages = Math.ceil(totalProducts.productCount / content)

    const pageNumbers = [...Array(numberOfPages).keys()]
    // console.log(pageNumbers)

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`http://localhost:4000/products?page=${active}&limit=${content}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                // Handle the error appropriately
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [active, content]);




    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const storedCart = await getShoppingCart();
                const savedCart = [];

                for (const id in storedCart) {
                    const addedCart = products.find((product) => product._id === id);
                    if (addedCart) {
                        const quantity = storedCart[id];
                        addedCart.quantity = quantity;
                        savedCart.push(addedCart);
                    }
                }

                setCart(savedCart);
            } catch (error) {
                // Handle the error appropriately
                console.log('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [products]);

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

    // number of products in a page 

    const options = [10, 15, 20]

    const contentChange = useCallback((event) => {
        const content = event.target.value
        setContent(content)
    }, [content])

    // active Pagination 

    const PaginationBtn = (num) => {
        setActive(num)
    }

    return (
        <>
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
            <div className='pagination'>
                <select onChange={contentChange}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {
                    pageNumbers.map(number =>
                        <button key={number} className={active === number ? 'active' : 'notActive'}
                            onClick={() => PaginationBtn(number)} >
                            {number + 1}
                        </button>)
                }
            </div>

        </>
    );
};

export default Shop;