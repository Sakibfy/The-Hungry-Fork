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
import AllUsers from "../pages/dashboard/Cart/AllUsers/AllUsers";
import AddItems from "../pages/dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/dashboard/AdminHome/AdminHome";
import ManageItems from "../pages/dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/dashboard/UpdateItem/Payment/Payment";
import PaymentHistory from "../pages/dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/dashboard/UserHome/UserHome";


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
    element: <PrivateRoute>
      <Dashboard></Dashboard>
    </PrivateRoute>,
    children: [
      // normal user routes
      {
        path: 'userhome',
        element: <UserHome></UserHome>
    },
      {
        path: 'cart',
       element: <Cart></Cart>,
      },
      {
        path: 'payment',
        element: <Payment></Payment>,
      },
      {
        path: 'paymenthistory',
        element: <PaymentHistory></PaymentHistory>
      },

      // Addmin routes
      {
        path: 'addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: 'users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'manageItems',
        element:<AdminRoute> <ManageItems></ManageItems></AdminRoute>
      },
      {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
      },
      {
        path: 'AdminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      }
    ]
  },
]);