import { useState } from "react";
import { Link } from "react-router-dom";

const getNavButton = (to, label, className = "") => (
  <li className={`${className} flex flex-col items-center hover:font-bold group`}>
    <Link to={to} className="px-2 py-1">{label}</Link>
    <span className="block w-full h-[2px] group-hover:bg-[#F7C35F]"></span>
  </li>
);

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        {getNavButton("/login", "Login", "w-full md:w-auto")}
        {getNavButton("/signup", "Signup", "w-full md:w-auto")}
      </ul>
    </nav>
  );
}