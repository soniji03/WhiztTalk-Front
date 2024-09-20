import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import { toast } from 'react-toastify';
import { PiUserCircle } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';
import { API_BACKEND_URL } from '../../../config'
import Anav from '../Navbar/Anav'
import Avatar from '../Elements/Avatar'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function CheckPassword() {

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [data, setData] = useState({
    password: "",
    userId: ""
  })
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/checkemail')
    }
  }, [])

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `${API_BACKEND_URL}/api/checkpassword`



    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password
        },
        XMLHttpRequestwithCredentials: true,
      })

      toast.success(response.data.message)


      if (response.data.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)

        dispatch(setUser({ ...response.data.user, online: true }))

        setData({
          password: "",
        })
        navigate('/')
      }
      console.log('Login response:', response.data);

    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }



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
      <div className='py-20 mt-16' style={backgroundImageStyle}>

        <div style={cardStyle} className=' w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

          <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>

            <Avatar
              width={70}
              height={70}
              name={location?.state?.name}
              imageUrl={location?.state?.profile_pic}
            />
            <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
          </div>

          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>

            <div className='flex flex-col gap-1'>
              <label className='mb-3' htmlFor='password'>Password :</label>
              {/* <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  placeholder='enter your password'
                  className='bg-slate-100 px-2 py-1 text-black focus:outline-primary w-full'
                  value={data.password}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  required
                />
                {data.password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-black right-2.5 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div> */}

<div className='relative'>
      <div className='relative border border-gray-300 rounded'>
        <input
          type={showPassword ? 'text' : 'password'}
          id='password'
          name='password'
          className='bg-transparent px-3 py-2 bg-white text-black focus:outline-none w-full'
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
      </div>
      {data.password && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute text-black right-3 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>



            </div>

            <button
              className='bg-[#FD527D]  text-lg  px-4 py-1 hover:bg-[#f82e61]  rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
            >
              Login
            </button>

          </form>

          <p className='my-3 text-center'><Link to={"/forgotpassword"} className='hover:text-[#FFD046] font-semibold'>Forgot password ?</Link></p>
        </div>
      </div>
    </>
  )
}

export default CheckPassword
