import {
  createBrowserRouter,
}
  from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SingUp from "../pages/SingUp/SingUp";
import Secret from "../pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/dashboard/Cart/Cart";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element:<Home></Home>,
      },
      {
        path: 'Menu',
        element:<Menu></Menu>,
      },
      {
        path: 'Order/:category',
        element:<Order></Order>,
      },
       {
    path: 'login',
    element:<Login></Login>
  },
  {
    path: 'singup',
    element: <SingUp></SingUp>
      },
      {
        path: 'secret',
        element: <PrivateRoute>
          <Secret></Secret>
        </PrivateRoute>
  },
    ]
  },
  // dashboard
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'cart',
       element: <Cart></Cart>,
      },
    ]
  },
]);