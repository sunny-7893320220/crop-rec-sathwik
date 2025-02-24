import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to import axios

const getNavButton = (to, label, className = "") => (
  <li className={`${className} flex flex-col items-center hover:font-bold group`}>
    <Link to={to} className="px-2 py-1">{label}</Link>
    <span className="block w-full h-[2px] group-hover:bg-[#F7C35F]"></span>
  </li>
);

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/auth/logout');
      localStorage.removeItem('user');
      navigate('/login');
      // Assuming handleSuccess is imported from errortost.js
      // handleSuccess("Logged out successfully!");
    } catch (error) {
      // Assuming handleError is imported from errortost.js
      // handleError("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="w-full h-[80px] bg-[#334B35] flex justify-between items-center sticky top-0 z-50 px-4">
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <img 
          src="/images/logo.svg" 
          alt="Logo" 
          className="w-32 md:w-[198px] h-auto" 
        />
      </Link>

      {/* Hamburger Menu Button for Mobile */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none p-2"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Navigation Links */}
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
        <li className="w-full md:w-auto flex flex-col items-center">
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