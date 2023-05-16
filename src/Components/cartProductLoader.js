import { getShoppingCart } from "../assets/utilities/fakedb"


const CartProductsLoader = async () => {
    const res = await fetch('http://localhost:4000/products')
    const products = await res.json()
    const savedCart = []
    const storedCart = getShoppingCart()

    for (const id in storedCart) {
        const addedProducts = products.find(pd => pd._id === id)

        if (addedProducts) {
            const quantity = storedCart[id]
            addedProducts.quantity = quantity
            savedCart.push(addedProducts)
        }
    }
    return savedCart

}
export default CartProductsLoader