import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/Pages/Register";
import Login from "../features/auth/Pages/Login";
import CreateProduct from "../features/products/Pages/createProduct";
import Dashboard from "../features/products/Pages/Dashboard";
import Protected from "../features/auth/Components/Protected";
import Home from "../features/products/Pages/Home";
import ProductDetail from "../features/products/Pages/ProductDetail";
import SellerProductDetail from "../features/products/Pages/SellerProductDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
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
        path: "/product/:productId",
        element: <ProductDetail />
    }
    ,
    {
        path:"/seller",
        children:[{
            path:"/seller/create-product",
            element:<Protected role='seller'><CreateProduct/></Protected>
        },
        {
            path:"/seller/dashboard",
            element:<Protected role='seller'><Dashboard/></Protected>
        },
        {
            path:"/seller/detail/:productId",
            element:<Protected role="seller"><SellerProductDetail/></Protected>
        }
    ]
   }
])



export default router
