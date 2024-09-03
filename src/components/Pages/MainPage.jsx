import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../Elements/Sidebar'
import logo from '/logo8.png'
import io from 'socket.io-client'
import {API_BACKEND_URL} from '../../../config'
import MessagePage from '../Elements/MessagePage'

const Home = () => {

  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true) 
 

  console.log('user',user)
  const fetchUserDetails = async()=>{
    
    try {
        const URL = `${API_BACKEND_URL}/api/user-details`
        const response = await axios({
          url : URL,
          withCredentials : true
        })
     
        dispatch(setUser(response.data.data))

        if(response.data.data.logout){
            dispatch(logout())
            navigate("/checkemail")
        }
        console.log("current user Details",response)
    } catch (error) {
        console.log("error",error)
    }
  
  finally {
    setIsLoading(false);
  }
}

  useEffect(()=>{
    fetchUserDetails()
  },[])


  useEffect(() => {
    const token = localStorage.getItem('token');
    const allowedPaths = ['', 'sidebar'];
    const isMessagePage = location.pathname.match(/^\/[^/]+$/);
    
    if (!isLoading) {
      if (!token) {
        navigate("/checkemail");
      } else if (!allowedPaths.includes(location.pathname) && !isMessagePage) {
        navigate('');
      }
    }
  }, [location.pathname, navigate, isLoading]);

  useEffect(() => {
    if (!isLoading && user && user._id) {
      const socketConnection = io(`${API_BACKEND_URL}`, {
        auth: {
          token: localStorage.getItem('token')
        },
      });

      socketConnection.on('connect', () => {
        socketConnection.emit('user_connected', user._id);
      });

      socketConnection.on('onlineUsers', (onlineUsers) => {
        dispatch(setOnlineUser(onlineUsers));
      });

      dispatch(setSocketConnection(socketConnection));

      return () => {
        socketConnection.disconnect();
      };
    }
  }, [user._id, isLoading, dispatch]);


  // useEffect(() => {
  
  // /***socket connection */
  //   const socketConnection = io(`${API_BACKEND_URL}`, {
  //     auth: {
  //       token: localStorage.getItem('token')
  //     },
  //   })

  //   socketConnection.on('connect', () => {
  //     if (user && user._id) {
  //       socketConnection.emit('user_connected', user._id);
  //     }
  //   });

  //   socketConnection.on('onlineUsers', (onlineUsers) => {
  //     dispatch(setOnlineUser(onlineUsers))
  //   })

  //   dispatch(setSocketConnection(socketConnection))

  //   return () => {
  //     socketConnection.disconnect()
  //   }
  // }, [user._id, dispatch])


  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const allowedPaths = ['', '/:userId', 'sidebar'];
  //   if (token && !allowedPaths.includes(location.pathname)) {
  //     navigate('');
  //   }
  // }, [location.pathname, navigate]);

 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const basePath = location.pathname === '/'

  const backgroundImageStyle = {
    backgroundImage: 'url(/bg1.jpg)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    zIndex: -100,
    opacity: 0.9,
};

  return (


    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/**message component**/}
      <section className={`${basePath && "hidden"}`} >
        <MessagePage />
      </section>

      <div style={backgroundImageStyle} className={`h-[92vh] justify-center items-center flex-col gap-5 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
        <div className='z-100'>
          <img
            src={logo}
            width={250}
            alt='logo'
          />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
      </div>
    </div>

  )
}

export default Home