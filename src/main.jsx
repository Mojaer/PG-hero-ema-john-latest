import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home/Home';
import Shop from './Components/Shop/Shop';
import Orders from './Components/Orders/Orders';
import Inventory from './Components/Inventory/Inventory';
import Login from './Components/Login/Login';
import CartProductsLoader from './Components/cartProductLoader';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [{
      path: "/",
      element: <Shop></Shop>
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
