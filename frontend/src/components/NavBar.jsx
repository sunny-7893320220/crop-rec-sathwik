import React from 'react';
import { Link } from 'react-router-dom';

const getNavButton = (to, label, className = '') => (
  <li className={`${className} flex flex-col items-center hover:font-bold group`}>
    <Link to={to}>{label}</Link>
    <span className='block w-full h-[2px] group-hover:bg-[#F7C35F]'></span>
  </li>
);

export default function NavBar() {
  return (
    <nav className='w-full h-[80px] bg-[#334B35] flex justify-between items-center sticky top-0 z-50'>
      <Link to="/">
        <img src='/images/logo.svg' alt="Logo" width={198} height={31} />
      </Link>
      <ul className='flex gap-[20px]'>
        {getNavButton('/login', 'Login', 'w-[55px]')}
        {getNavButton('/signup', 'Signup', 'w-[80px]')}
      </ul>
    </nav>
  );
}
