import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import {store} from './components/redux/store.jsx'
import router from './components/Routes/index.jsx'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
      <RouterProvider router={router} >
      <App/>
      </RouterProvider>
      </Provider>
  </StrictMode>

)
