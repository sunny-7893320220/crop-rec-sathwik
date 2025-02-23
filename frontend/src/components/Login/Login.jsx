import React, { useState } from 'react';
import CustomInput from '../../utils/CustomInput';
import CustomButton from '../../utils/CustomButton';// Importing the CustomButton component
import { FaLeaf } from 'react-icons/fa'; // Importing Google icon from react-icons

import { User, Phone, Mail, Lock, Eye, EyeOff } from 'lucide-react';

import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils/errortost';
import { data, Navigate, useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            handleError('Please fill all the fields');
            return;
        }

        if (!termsAccepted) {
            handleError('Please accept the terms and conditions');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        let loginData;
        if (emailRegex.test(username)) {
            loginData = { farmersEmail: username, password: password };
        } else if (phoneRegex.test(username)) {
            loginData = { farmersPhone: username, password: password };
        } else {
            handleError('Please enter a valid email or phone number');
            return;
        }

        console.log(loginData);

        // Try-catch block for API request
        try {
            axios.post('http://localhost:8000/api/v1/auth/login', loginData)
                .then((response) => {
                    // Check if the response is successful
                    if (response && response.data && response.data.success) {
                        console.log(response.data);
                        handleSuccess('Login Successful');
                        localStorage.setItem('accessToken', response.data.data.accessToken);
                        localStorage.setItem('farmersName', response.data.data.user.farmersName);
                        navigate('/');
                    } else {
                        // If success field is false or undefined
                        handleError('Login failed, please check your credentials');
                    }
                })
                .catch((error) => {
                    // Check if error.response is defined before accessing error.response.data
                    if (error.response) {
                        console.log(error.response);
                        handleError(error.response.data.message || 'An error occurred during login');
                    } else {
                        handleError('No response from server');
                    }
                });
        } catch (error) {
            console.log(error);
            handleError('Login Failed');
        }
    };


    const inputfeilds = [{
        label: 'Email/Phone',
        type: 'text',
        name: 'username',
        required: true,
        Icon: User

    },
    {
        label: 'Password',
        type: 'password',
        name: 'password',
        required: true,
        Icon: Lock
    }
    ]
    return (
        <div className="flex flex-col  lg:flex-row h-screen relative mx-[20px] my-[20px] rounded-lg shadow-2xl " id="login">
            <div className="w-full bg-white p-10 flex flex-col justify-center rounded-lg">
                <h1 className="text-3xl md:text-4xl lg:text-6xl  px-10 py-9 font-bold mb-6 text-center" style={{ background: 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                    Smart Agro.
                </h1>
                <h2 className="text-sm md:text-xl lg:text-3xl  font-bold mb-6 text-center" style={{ color: 'black' }}>Welcome Back! Please Login to Your Account</h2>
                <form onSubmit={handleSubmit}>
                    {/* <CustomInput label=" Email or Phone number" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <CustomInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> */}

                    {inputfeilds.map((inputfeild, index) => (
                        <CustomInput
                            key={index}
                            label={inputfeild.label}
                            type={inputfeild.type}
                            name={inputfeild.name}
                            required={inputfeild.required}
                            Icon={inputfeild.Icon}
                            value={inputfeild.name === 'username' ? username : password}
                            onChange={(e) => inputfeild.name === 'username' ? setUsername(e.target.value) : setPassword(e.target.value)}
                        />
                    ))}
                    <div className="mb-4">
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            required
                        />
                        <label className="ml-2 text-sm md:text-lg" style={{ color: 'black' }}>I agree to the terms and conditions.</label>
                    </div>
                    <CustomButton type="submit" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                        <div className='flex items-center justify-center' >
                            <FaLeaf className="mr-2" />
                            Login
                        </div>
                    </CustomButton>

                    {/* 
                    <CustomButton type="submit" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
            <div className='flex items-center justify-center'>
              <FaLeaf className="mr-2" />
              Sign Up
            </div>
          </CustomButton> */}
                    <div className="mt-4 text-center text-black">OR</div>
                    <div className="flex justify-center mt-4">
                    <button aria-label="Sign in with Google"
              className="flex items-center gap-3 bg-google-button-blue rounded-full p-0.5 pr-4 transition-colors duration-300 hover:bg-google-button-blue-hover">
              <div className="flex items-center justify-center bg-white w-9 h-9 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" className="fill-google-logo-blue" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" className="fill-google-logo-green" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" className="fill-google-logo-yellow" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" className="fill-google-logo-red" />
                </svg>
              </div>
              <span className="text-sm text-white tracking-wider">Login with Google</span>
            </button>
                    </div>
                </form>
            </div>
            <div className="w-full bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/images/farmer.png')" }}></div>


            <ToastContainer />
        </div>
    );
};

export default Login;


