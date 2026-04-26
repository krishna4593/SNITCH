import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/Pages/Register";
import Login from "../features/auth/Pages/Login";

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
])



export default router
