import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { handleError, handleSuccess } from '../../utils/errortost';
import axios from "axios";

const getNavButton = (to, label, className = "") => (
  <li className={`${className} flex flex-col items-center hover:font-bold group`}>
    <Link to={to} className="px-2 py-1">{label}</Link>
    <span className="block w-full h-[2px] group-hover:bg-[#F7C35F]"></span>
  </li>
);

export default function NavBar({ setIsAuthenticated }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);  // Update the auth state
      handleSuccess("Logout successful");
      navigate("/login");  // This should now work
      console.log("Logged out successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
      // Replace with your actual error handler (e.g., toast)
      console.error("Logout error:", errorMessage);
    }
  };

  return (
    <nav className="w-full h-[80px] bg-[#334B35] flex justify-between items-center sticky top-0 z-50 px-4">
      <Link to="/" className="flex items-center">
        <img
          src="/images/logo.svg"
          alt="Logo"
          className="w-32 md:w-[198px] h-auto"
        />
      </Link>

      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none p-2"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <ul
        className={`
          ${isMenuOpen ? "flex" : "hidden"}
          md:flex
          flex-col md:flex-row
          gap-6
          absolute md:relative
          top-[80px] md:top-0
          left-0
          w-full md:w-auto
          bg-[#334B35] md:bg-transparent
          p-4 md:p-0
          md:items-center
          text-white
          transition-all duration-300 ease-in-out
        `}
      >
        {getNavButton("/", "Home", "w-full md:w-auto")}
        {getNavButton("/about-us", "About Us", "w-full md:w-auto")}
        {getNavButton("/recommend", "Recommend", "w-full md:w-auto")}
        {getNavButton("/weather", "Get Weather", "w-full md:w-auto")}
        {getNavButton("/market-rate", "Market Rate", "w-full md:w-auto")}
        <li className="w-full md:w-auto flex flex-col items-center group">
          <button
            onClick={handleLogout}
            className="
              w-fit
              rounded-[20px]
              px-2 sm:px-1 md:px-4
              py-3 sm:py-1 md:py-3
              uppercase
              text-black
              bg-[#F7C35F]
              text-sm sm:text-sm md:text-sm
              font-medium
              hover:bg-[#e5b151]
              transition-colors
              duration-300
            "
          >
            Logout
          </button>
          <span className="block w-full h-[2px] group-hover:bg-[#F7C35F]"></span>
        </li>
      </ul>
    </nav>
  );
}