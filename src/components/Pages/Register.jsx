import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { API_BACKEND_URL } from '../../../config';
import Anav from '../Navbar/Anav'

function Register() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [data,setData] = useState({
        name : "",
        email : "",
        password : "",
        profile_pic : ""
      })
      const [uploadPhoto,setUploadPhoto] = useState("")
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
    
      const handleUploadPhoto = async(e)=>{
        const file = e.target.files[0]
    
        const uploadPhoto = await uploadFile(file)
    
        setUploadPhoto(file)
    
        setData((preve)=>{
          return{
            ...preve,
            profile_pic : uploadPhoto?.url
          }
        })
      }
      const handleClearUploadPhoto = (e)=>{
        e.stopPropagation()
        e.preventDefault()
        setUploadPhoto(null)
      }
    
      const validateForm = () => {
        if (data.password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return false;
        }
        if (!/[A-Z]/.test(data.password)) {
            toast.error('Password must contain at least one uppercase letter');
            return false;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
            toast.error('Password must contain at least one special character');
            return false;
        }
       
        return true;
    };

      const handleSubmit = async(e)=>{
        e.preventDefault()
        if (!validateForm()) return;
        e.stopPropagation()
    
        const URL = `${API_BACKEND_URL}/api/register`
    
        try {
            const response = await axios.post(URL,data)
            console.log("response",response)
    
            toast.success(response.data.message)
    
            if(response.data.success){
                setData({
                  name : "",
                  email : "",
                  password : "",
                  profile_pic : ""
                })
    
                navigate('/checkemail')
    
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        console.log('data',data)
      }
      const backgroundImageStyle = {
        backgroundImage: 'url(/bg2.png)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'auto',
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
        <div className='py-8 mt-16' style={backgroundImageStyle}>
    
            <div style={cardStyle} className=' w-full max-w-md min-h-[30.5rem] rounded overflow-hidden p-4 mx-auto'>
            <h3>Welcome to <span className='text-xl font-semibold'>WhizTalk!</span></h3>
    
              <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
                  <div className='flex flex-col gap-1'>
                    <label className='mb-3' htmlFor='name'>Name :</label>
                    <div className='relative border border-gray-300 rounded'>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      className='bg-transparent px-3 py-2 text-black focus:outline-none w-full'
                      value={data.name}
                      onChange={handleOnChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(data.name !== '')}
                      required
                    />
                      <label
          htmlFor='name'
          className={`absolute left-3 px-1 transition-all duration-200 ${
            isFocused || data.name
              ? '-top-2 text-xs bg-gray-500  text-white'
              : 'top-1/2 -translate-y-1/2 text-black'
          }`}
        >
          Enter your name
        </label>
                  </div>
                  </div>
    

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
    
                  <div className='flex flex-col gap-1'>
  <label className='mb-3' htmlFor='password'>Password :</label>
  <div className='relative border border-gray-300 rounded'>
    <input
      type={showPassword ? 'text' : 'password'}
      id='password'
      name='password'
      className='bg-transparent px-3 py-2 text-black focus:outline-none w-full'
      value={data.password}
      onChange={(e) => {
        handleOnChange(e);
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(data.password !== '')}
      required
    />
     <label
          htmlFor='password'
          className={`absolute left-3 px-1 transition-all duration-200 ${
            isFocused || data.password
              ? '-top-2 text-xs bg-gray-500 text-white'
              : 'top-1/2 -translate-y-1/2 text-black'
          }`}
        >
          Enter your password
        </label>
    {data.password && (
      <button 
        type="button" 
        onClick={() => setShowPassword(!showPassword)} 
        className="absolute text-black right-2.5 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    )}
  </div>
</div>
    
                  <div className='flex flex-col gap-1'>
                    <label  htmlFor='profile_pic'>Photo :
    
                      <div className='h-14  text-black font-bold bg-transparent flex justify-center items-center border rounded hover:border-gray-800 cursor-pointer'>
                          <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                            {
                              uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                            }
                          </p>
                          {
                            uploadPhoto?.name && (
                              <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                                <IoClose/>
                              </button>
                            )
                          }
                          
                      </div>
                    
                    </label>
                    
                    <input
                      type='file'
                      id='profile_pic'
                      name='profile_pic'
                      className='bg- px-2 py-1 focus:outline-primary hidden'
                      onChange={handleUploadPhoto}
                    />

                  </div>


    
    
                  <button
                   className='bg-[#FD527D]  text-lg  px-4 py-1 hover:bg-[#f82e61] rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
                  >
                    Register
                  </button>
              </form>
    
              <p className='my-3 text-center'>Already have account ? <Link to={"/checkemail"} className='hover:text-[#FFD046] font-semibold'>Login</Link></p>
            </div>
        </div>
  </>
  )
}

export default Register
