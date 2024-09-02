import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import CheckPassword from "../Pages/CheckPassword";
import Home from "../Pages/Home";
import MessagePage from "../Elements/MessagePage";
import '../../index.css';
import Checkemail from "../Pages/CheckEmail";
import MainPage from '../Pages/MainPage'
import ForgotPassword from "../Pages/Forgot-password";
import ResetPassword from "../Pages/Reset-password";
import Sidebar from "../Elements/Sidebar";
import Register from "../Pages/Register"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "checkemail",
        element: <Checkemail />
      },
      {
        path: "checkpassword",
        element: <CheckPassword />
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />
      },
      {
        path: "resetpassword",
        element: <ResetPassword />
      },
      {
        path: "",
        element: <MainPage />,
        children: [
          {
            path: ':userId',
            element: <MessagePage />
          },
          {
            path: 'sidebar',
            element: <Sidebar />
          }
        ]
      }
    ]
  }
]);

export default router

