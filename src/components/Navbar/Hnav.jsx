import React, { useState, useEffect } from 'react';
import { FcReadingEbook } from "react-icons/fc";
import { HiMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import logo from '/logo8.png';

export const SideMenu = ({ isOpen, setIsOpen }) => {
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    };
  
    return (
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#D0D8FF] border-8 border-white text-xl font-bold  shadow-lg transform transition-transform duration-300 ease-in-out
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
            <li onClick={() => scrollToSection('dashboard')}>Dashboard</li>
            <li onClick={() => scrollToSection('about')}>About</li>
            <li onClick={() => scrollToSection('contacts')}>Contacts</li>
          <Link to='/checkemail'>  <li >Get Started</li></Link>
          </ul>
        </nav>
      </div>
    );
  };

  function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const font = {
    fontFamily: {
      'times-new-roman': ['Times New Roman', 'serif'],
      fontWeight: { 400: 400, },
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['dashboard', 'about',  'contacts'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 50 && rect.bottom >= 50;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


      
  return (
    <div className='space-arround'>
    <div style={font} className='nav items-center text-black bg-white fixed top-0 w-full p-2 cursor-pointer z-50'>
      <div className='flex justify-between items-center w-full max-w-7xl mx-auto lg:px-10 md:px-8'>
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
          <ul className='font-bold flex flex-row gap-8 lg:gap-12 items-center  text-base'>
            {['dashboard', 'about', 'contacts','Get Started'].map((section) => (
              <li 
                key={section}
                onClick={() => {
                  if (section === 'Get Started') {
                    window.location.href = '/checkemail';
                  } else {
                    scrollToSection(section);
                  }
                }}
                className={`cursor-pointer relative py-2 ${
                  activeSection === section ? 'text-[#778cf8]' : 'text-gray-600'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#778cf8] transform scale-x-0 transition-transform duration-300 ${
                  activeSection === section ? 'scale-x-100' : ''
                }`}></span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#778cf8] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
    </div>
  )
}

export default Navbar;



