import { createBrowserRouter } from "react-router-dom";
import Signin from "../Components/AuthComponets/Signin/Signin";
import SignUp from "../Components/AuthComponets/Signup/signUp";
import Dashboard from "../Page/Dashboard/Dashboard";
import Page404 from "../Components/Shared/Error/Page404";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "../Page/Product/AddProduct";
import UpdateProduct from "../Page/Product/UpdateProduct";
import AllProduct from "../Page/Product/AllProduct";

import SingleProduct from "../Page/Product/SingleProduct";
import ShowCost from "../Page/Cost/ManageCost";
import ManageProduct from "../Page/Product/ManageProduct";

const router = createBrowserRouter([
  {
    path: "/signIn",
    element: <Signin />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <Page404 />,
    children: [
      {
        path: "/Products",
        element: <AllProduct />,
      },
      {
        path: "/AddProduct",
        element: <AddProduct />,
      },
      {
        path: "/Product/:id",
        element: <SingleProduct />,
      },

      {
        path: "/manageProduct",
        element: <ManageProduct />,
      },
      {
        path: "/UpdateProduct/:id",
        element: <UpdateProduct />,
      },
      {
        path: "/cost",
        element: <ShowCost />,
      },
    ],
  },
]);

export default router;