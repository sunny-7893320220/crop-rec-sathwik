import React, { useState } from 'react';
import CustomInput from '../../utils/CustomInput';
import CustomButton from '../../utils/CustomButton';
import { FaLeaf } from 'react-icons/fa';
import { User, Phone, Mail, Lock } from 'lucide-react';
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

  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateform()) { // Proceed only if form is valid
      return; // Validation failed, errors are already set in validateform
    }

    try {
      const { farmersName, farmersPhone, farmersEmail, password } = signUpValues;
      const response = await axios.post("http://localhost:8000/api/v1/auth/signup", {
        farmersName,
        farmersPhone,
        farmersEmail,
        password,
      });
      handleSuccess("Signup Successful");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      const message = error.response?.data?.message || 
                      (error.response ? `A conflict occurred: ${error.response.statusText}` : "An unexpected error occurred.");
      handleError(message);
    }
  };

  const validateform = () => {
    let newErrors = {};

    if (!signUpValues.farmersName) {
      newErrors.farmersName = 'Name is required';
    }
    if (!signUpValues.farmersPhone) {
      newErrors.farmersPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(signUpValues.farmersPhone)) {
      newErrors.farmersPhone = 'Invalid phone number';
    }
    if (!signUpValues.farmersEmail) {
      newErrors.farmersEmail = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(signUpValues.farmersEmail)) {
      newErrors.farmersEmail = 'Invalid email address';
    }
    if (!signUpValues.password) {
      newErrors.password = 'Password is required';
    } else if (signUpValues.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (!signUpValues.reEnterPassword) {
      newErrors.reEnterPassword = 'Confirm password is required';
    } else if (signUpValues.password !== signUpValues.reEnterPassword) {
      newErrors.reEnterPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: '' }); // Clear error for the current field

    if (name === 'farmersPhone') {
      const updatedPhone = value.slice(0, 10);
      if (updatedPhone.length === 10 && (updatedPhone[0] < '6' || updatedPhone[0] > '9')) {
        setSignUpValues({ ...signUpValues, farmersPhone: '' });
        handleError('Invalid Phone Number');
        return;
      }
      setSignUpValues({ ...signUpValues, [name]: updatedPhone });
      return;
    }
    setSignUpValues({ ...signUpValues, [name]: value });
  };

  const inputFields = [
    { label: "Farmer's Name", type: 'text', name: 'farmersName', required: true, Icon: User },
    { label: "Farmer's Phone Number", type: 'number', name: 'farmersPhone', required: true, Icon: Phone },
    { label: "Farmer's Email", type: 'email', name: 'farmersEmail', required: true, Icon: Mail },
    { label: "Password", type: 'password', name: 'password', required: true, Icon: Lock, autocomplete: 'new-password' },
    { label: 'Re-enter Password', type: 'password', name: 'reEnterPassword', required: true, Icon: Lock },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen relative mx-5 my-5 rounded-lg shadow-2xl" id="signup">
      <div className="bg-white p-6 md:p-10 flex flex-col justify-center w-full lg:w-1/2 rounded-lg">
        <h1
          className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 p-5 text-center signika-font"
          style={{ background: 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}
        >
          Smart Agro.
        </h1>
        <h1 className="text-sm md:text-xl lg:text-3xl font-bold mb-6 text-center text-black">
          Join the Future of Farming: Tailored Crop Solutions Await!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {inputFields.map((input, index) => (
            <div key={index}>
              <CustomInput
                {...input}
                value={signUpValues[input.name]}
                onChange={handleChange}
              />
              {errors[input.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[input.name]}</p>
              )}
            </div>
          ))}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
              className="mr-2"
            />
            <label className="ml-2 text-sm md:text-lg text-black">
              I agree to the terms and conditions.
            </label>
          </div>
          <CustomButton type="submit" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', width: '100%' }}>
            <div className="flex items-center justify-center">
              <FaLeaf className="mr-2" />
              Sign Up
            </div>
          </CustomButton>
          <div className="mt-4 text-center text-black">OR</div>
          <div className="flex justify-center mt-4">
            <button
              aria-label="Sign in with Google"
              className="flex items-center gap-3 bg-google-button-blue rounded-full p-0.5 pr-4 transition-colors duration-300 hover:bg-google-button-blue-hover"
            >
              <div className="flex items-center justify-center bg-white w-9 h-9 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    className="fill-google-logo-blue"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    className="fill-google-logo-green"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    className="fill-google-logo-yellow"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    className="fill-google-logo-red"
                  />
                </svg>
              </div>
              <span className="text-sm text-white tracking-wider">Signup with Google</span>
            </button>
          </div>
        </form>
      </div>
      <div
        className="hidden lg:block w-full lg:w-1/2 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: "url('/images/login.png')" }}
      />
      <ToastContainer />
    </div>
  );
};

export default Signup;