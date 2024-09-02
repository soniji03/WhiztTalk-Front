import React, { useEffect } from 'react'
import Navbar from '../Navbar/Hnav'
import Dashboard from './Dashboard'
import About from './About'
import Contacts from './Contacts'
import { useNavigate } from 'react-router-dom'

function Home() {


  // const navigate = useNavigate();

  // useEffect(() => {
  //   checkLoginStatus()
  // }, [])

  // async function checkLoginStatus() {
  //   try {
  //     const res = await authCheck();
  //     if (res) {
  //       navigate('/')
  //     }
  //   }
  //   catch (error) {
  //     console.error("Error checking auth status:", error);
  //   }
  // }

  return (
   <>
<Navbar />
   <div id="dashboard"><Dashboard /></div>
      <div id="about"><About /></div>
      <div id="contacts"><Contacts /></div>
      </>
  )
}


export default Home
