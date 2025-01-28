import React, { useState } from 'react';
import CustomInput from '../../utils/CustomInput';
import CustomButton from '../../utils/CustomButton';
import { FaLeaf } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils/errortost';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [signUpValues, setSignUpValues] = useState({
    farmersName: '',
    farmersPhone: '',
    farmersEmail: '',
    password: '',
    reEnterPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signUpValues.password !== signUpValues.reEnterPassword) {
      handleError("Passwords do not match!");
      return;
    }

    const { farmersName, farmersPhone, farmersEmail, password } = signUpValues;

    if (!farmersName || !farmersPhone || !farmersEmail || !password) {
      handleError("Please fill all the fields");
      return;
    }

    const newUser = {
      farmersName,
      farmersPhone,
      farmersEmail, 
      password,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/register", newUser);
    
      console.log("Signup Successful", response.data);
      handleSuccess("Signup Successful");
    
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    
      if (error.response) {
        // Check if the response is JSON
        const contentType = error.response.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
          handleError(error.response.data.message);
        } else {
          handleError("A conflict occurred: " + error.response.statusText);
        }
      } else {
        handleError("An unexpected error occurred. Please try again.");
      }
    }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'farmersPhone') {
      const updatedPhone = value.slice(0, 10);
      const firstDigit = updatedPhone.charAt(0);

      if (firstDigit < 6 || firstDigit > 10) {
        setSignUpValues({ ...signUpValues, farmersPhone: "" });
        console.log("Invalid phone number");
        handleError("Invalid Phone Number");
        return;
      }

      const signupInfo = { ...signUpValues };
      signupInfo[name] = updatedPhone;
      setSignUpValues(signupInfo);
      return;
    }

    const signupInfo = { ...signUpValues };
    signupInfo[name] = value;
    setSignUpValues(signupInfo);
  };

  const inputFields = [
    { label: "Farmer's Name", type: 'text', name: 'farmersName', required: true },
    { label: "Farmer's Phone Number", type: 'number', name: 'farmersPhone', required: true },
    { label: "Farmer's Email", type: 'email', name: 'farmersEmail', required: true },
    { label: "Password", type: "password", name: 'password', required: true, autocomplete: "new-password" },
    { label: 'Re-enter Password', type: 'password', name: 'reEnterPassword', required: true },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen relative mx-[20px] my-[20px] rounded-lg shadow-2xl" id="signup">
      <div className="w-full bg-white p-10 flex flex-col justify-center rounded-lg">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 p-4 text-center" style={{ background: 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          Smart Agro.
        </h1>
        <h1 className="text-sm md:text-xl lg:text-3xl font-bold mb-6 text-center" style={{ color: 'black' }}>Join the Future of Farming: Tailored Crop Solutions Await!</h1>
        <form onSubmit={handleSubmit}>
          {inputFields.map((input, index) => (
            <CustomInput
              key={index}
              label={input.label}
              type={input.type}
              name={input.name}
              value={signUpValues[input.name]}
              onChange={handleChange}
              required={input.required}
              autocomplete={input.autocomplete || undefined}
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
            <div className='flex items-center justify-center'>
              <FaLeaf className="mr-2" />
              Sign Up
            </div>
          </CustomButton>
          <div className="mt-4 text-center text-black">OR</div>
          <div className="flex justify-center mt-4">
            <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-white-700 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <img className="w-5 h-5 md:w-6 md:h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
              <span className='text-sm md:text-base lg:text-lg' style={{ color: 'black' }}>Signup with Google</span>
            </button>
          </div>
        </form>
      </div>
      <div className="w-full bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/images/login.png')" }}></div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
