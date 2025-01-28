import React, { useState } from 'react';
import CustomInput from '../../utils/CustomInput';
import CustomButton from '../../utils/CustomButton';// Importing the CustomButton component
import { FaLeaf } from 'react-icons/fa'; // Importing Google icon from react-icons

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


        try {
            axios.post('http://localhost:8000/api/v1/auth/login', loginData).then((response) => {
                console.log(response.data);
                handleSuccess('Login Successful');
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                navigate('/');
            }).catch((error) => {
                handleError(error.response.data.message);
            });
        } catch (error) {   
            console.log(error);
            
            handleError('Login Failed',);
        }
    };
    return (
        <div className="flex flex-col  lg:flex-row h-screen relative mx-[20px] my-[20px] rounded-lg shadow-2xl " id="login">
            <div className="w-full bg-white p-10 flex flex-col justify-center rounded-lg">
                <h1 className="text-3xl md:text-4xl lg:text-6xl  font-bold mb-6 text-center" style={{ background: 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                    Smart Agro.
                </h1>
                <h2 className="text-sm md:text-xl lg:text-3xl  font-bold mb-6 text-center" style={{ color: 'black' }}>Welcome Back! Please Login to Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <CustomInput label="Enter Email or Phone number" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <CustomInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
                    <div className="mt-4 text-center">OR</div>
                    <div className="flex justify-center mt-4">
                        <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-black-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                            
                            <img className="w-5 h-5 md:w-6 md:h-6 "  src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                            <span className='text-sm md:text-base lg:text-lg' style={{ color: 'black' }}>Login with Google</span>
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


