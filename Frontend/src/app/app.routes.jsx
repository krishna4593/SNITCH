import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/Pages/Register";
import Login from "../features/auth/Pages/Login";
import CreateProduct from "../features/products/Pages/createProduct";
import Dashboard from "../features/products/Pages/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>hello world</h1>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path:"/seller",
        children:[{
            path:"/seller/create-product",
            element:<CreateProduct/>
        },
        {
            path:"/seller/dashboard",
            element:<Dashboard/>
        }
    ]
   }
])



export default router
