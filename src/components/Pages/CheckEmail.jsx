import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import { FaUserCircle } from "react-icons/fa";
import {API_BACKEND_URL} from '../../../config';
import Anav from '../Navbar/Anav'
import { toast } from 'react-toastify';

function Checkemail() {
  const [isFocused, setIsFocused] = useState(false);
  
      const [data,setData] = useState({
        email : "",
      })
      const navigate = useNavigate()
    
      const handleOnChange = (e)=>{
        const { name, value} = e.target
    
        setData((preve)=>{
          return{
              ...preve,
              [name] : value
          }
        })
      }
    
      const handleSubmit = async(e)=>{
        e.preventDefault()
        e.stopPropagation()
    
        const URL = `${API_BACKEND_URL}/api/checkemail`
    
        try {
            const response = await axios.post(URL,data)
    
            toast.success(response.data.message)
    
            if(response.data.success){
                setData({
                  email : "",
                })
                navigate('/checkpassword',{
                  state : response?.data?.data
                })
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
      };
    
     const backgroundImageStyle = {
        backgroundImage: 'url(/bg2.png)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '89vh',
        width: '100%',
        zIndex: -100,
    };
    
    const cardStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
      backdropFilter: 'blur(10px)', 
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      color: 'white', // Text color
      maxWidth: '400px', // Set the desired width
      margin: 'auto', // Centers the card
    };
    
    
    
      return (
        <>
        <Anav />
        <div className='py-20 mt-[4rem]' style={backgroundImageStyle}>
            <div className=' w-full max-w-md z-10 rounded overflow-hidden p-4 mx-auto' style={cardStyle}>
    
                <div className='w-fit mx-auto mb-2 text-[#FFD853]'>
                    <FaUserCircle
                      size={70}
                    />
                </div>
    
              <h3>Welcome to <span className='text-xl font-semibold'>WhizTalk!</span></h3>
    
              <form className='grid gap-4 mt-3 font-semibold' onSubmit={handleSubmit}>
                  
    
                  {/* <div className='flex flex-col gap-1'>
                    <label htmlFor='email'>Email :</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='enter your email' 
                      className='bg-slate-100 text-black px-2 py-1 focus:outline-primary'
                      value={data.email}
                      onChange={handleOnChange}
                      required
                    />
                  </div> */}

<div className='flex flex-col gap-1'>
<label className='mb-3' htmlFor='email'>Email :</label>
      <div className='relative border border-gray-300 rounded'>
        <input
          type='email'
          id='email'
          name='email'
          className='bg-transparent px-3 py-2 text-black focus:outline-none w-full'
          value={data.email}
          onChange={handleOnChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(data.email !== '')}
          required
        />
        <label
          htmlFor='email'
          className={`absolute left-3 px-1 transition-all duration-200 ${
            isFocused || data.email
              ? '-top-2 text-xs bg-gray-500  text-white'
              : 'top-1/2 -translate-y-1/2 text-black'
          }`}
        >
          Enter your email
        </label>
      </div>
    </div>
    
                  <button
                   className='bg-[#FD527D] text-lg  px-4 py-1 hover:bg-[#f82e61] rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
                  >
                    Let's Go
                  </button>
    
              </form>
    
              <p className='my-3 text-center'>New User ? <Link to={"/register"} className='hover:text-[#FFD046] font-semibold'>Register</Link></p>
            </div>
        </div>
     </>
  )
}

export default Checkemail
