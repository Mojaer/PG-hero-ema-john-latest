import { createBrowserRouter } from "react-router-dom";
import Home from '../Components/Home/Home';
import Shop from '../Components/Shop/Shop';
import Orders from '../Components/Orders/Orders'
import Inventory from '../Components/Inventory/Inventory'
import CartProductsLoader from '../Components/cartProductLoader'
import Login from '../Components/Login/Login.jsx';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children: [{
            path: "/",
            element: <Shop></Shop>,
            loader: () => fetch('http://localhost:4000/totalproducts')
        },
        {
            path: "/orders",
            element: <Orders></Orders>,
            loader: CartProductsLoader
        },
        {
            path: "/inventory",
            element: <Inventory></Inventory>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "*",
            element: <div><h1>This component is not implemented yet</h1><h2>Coming soon</h2> </div>
        },
        ]
    },
]);

export default router;