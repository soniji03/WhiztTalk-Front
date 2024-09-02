import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BACKEND_URL } from '../../../config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

  

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tokenFromUrl = searchParams.get('token');
        setIsLoading(false)
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [location]);

    const validateForm = () => {
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least one uppercase letter');
            return false;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            toast.error('Password must contain at least one special character');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BACKEND_URL}/api/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password })
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Password reset successful');
                setTimeout(() => navigate('/checkemail'), 3000);
                console.log('Response:', response);
                console.log('Data:', data);

            } else {
                throw new Error(data.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Reset password error:', error);
            toast.error(error.message || 'An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isTokenValid) {
        return <div>Verifying token...</div>;
    }

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={backgroundImageStyle}>
            <div className="bg-white p-8 rounded-lg min-h-[45vh]   shadow-lg w-full max-w-md" style={cardStyle}>
                <h2 className="text-xl mb-4 font-bold ">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block mb-5 text-[1rem] font-medium text-white ">New Password</label>
                        <div className='relative'>
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                placeholder='enter your password'
                                className='bg-slate-100 px-2 py-1 text-black focus:outline-primary w-full'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                required
                            />
                            {password && (
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
                    <button
                        type="submit"
                        className="w-full text-white bg-primary hover:bg-[#f82e61] focus:ring-4 focus:outline-none focus:ring-[#f82e61] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        disabled={isLoading}>
                        {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;