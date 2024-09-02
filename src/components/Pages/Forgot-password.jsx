import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BACKEND_URL } from '../../../config';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BACKEND_URL}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      navigate('/checkemail');
      toast.success(data.message || 'Reset link sent successfully. Check your email.');
      // onClose();
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const backgroundImageStyle = {
    backgroundImage: 'url(/bg2.png)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center "style={backgroundImageStyle}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"style={cardStyle}>
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-[#f82e61] focus:ring-4 focus:outline-none focus:ring-[#ed8aa3] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <Link to='/checkpassword'>
          <button
            className="mt-4 w-full bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Close
          </button></Link>
      </div>
    </div>
  );
}

export default ForgotPassword;