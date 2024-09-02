import React, { useState, useEffect } from 'react';
import { FcReadingEbook } from "react-icons/fc";
import { HiMenu } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import logo from '/logo8.png';

export const SideMenu = ({ isOpen, setIsOpen }) => {

    return (
        <div
            className={`
          fixed top-0 left-0 h-full w-64 bg-[#D0D8FF] border-8 border-white text-xl font-bold shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:hidden
        `}
        >
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500"
            >
                X
            </button>
            <nav className="mt-16 p-4">
                <ul className="space-y-4">
                    <Link to='/'><li>Dashboard</li></Link>
                    <Link to='/register'><li>Sign in</li></Link>
                    <Link to='/checkemail'><li>Log iN</li></Link>
                </ul>
            </nav>
        </div>
    );
};


function AuthBar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const font = {
        fontFamily: {
            'times-new-roman': ['Times New Roman', 'serif'],
            fontWeight: { 400: 400, },
        }
    };

    const activeStyle = {
        color: '#778cf8',
        borderBottom: '2px solid #778cf8'
    };

   

    return (
        <div style={font} className='nav  items-center text-black bg-white fixed top-0 w-full p-2 cursor-pointer z-50'>
            <div className='flex justify-between items-center w-full max-w-7xl mx-auto lg:px-10 md:px-8 '>
                <div>
                    <ul className='flex gap-1 items-center font-bold'>
                    <img 
              src={logo}
              alt='logo'
              width={180}
              height={50}
            />
                    </ul>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <HiMenu className="w-6 h-6" />
                    </button>
                </div>
                <div className="hidden md:block">
                    <div>
                        <ul className=' font-bold flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 items-center  md:text-base'>
                            <Link to='/home'>
                                <li style={location.pathname === '/home' ? activeStyle : {}}>Dashboard</li>
                            </Link>
                            <Link to='/register'>
                                <li style={location.pathname === '/register' ? activeStyle : {}}>Sign In</li>
                            </Link>
                            <Link to='/checkemail'>
                                <li style={location.pathname === '/checkemail' ? activeStyle : {}}>Log IN</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    )
}

export default AuthBar
