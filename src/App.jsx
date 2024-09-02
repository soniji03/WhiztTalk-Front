import { useState } from 'react'
import { createBrowserRouter,  Outlet,  RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Home from './components/Pages/Home';
// import Register from './components/Pages/Register'
// import Checkemail from './components/Pages/Checkemail';
// import CheckPassword from './components/Pages/CheckPassword';
// import { Provider } from 'react-redux';
// import { store } from './components/redux/store'
// import MainPage from './components/Pages/MainPage'
// import MessagePage from './components/Elements/MessagePage'

function App() {


//   const router = createBrowserRouter([

//     { path: "/",
//       element: <Home />,
//     },

//       { path: "/register",
//         element: <Register /> },

//         {path: "/checkemail",
//           element: <Checkemail />
//         },

//         {path: "/checkpassword",
//           element: <CheckPassword />
//         },

//         {path: "/main",
//           element: <MainPage />,
        
//           children: [
//             {
//               path: ":userId",
//               element: <MessagePage />
//             }
//           ]
//         }
     

//  ])

  return (
    
//  <RouterProvider router={router}  /> 
<>
<ToastContainer position="top-right" autoClose={5000} />
<Outlet /> 
</>

  )
}

export default App
