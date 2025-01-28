import React from 'react';
import './App.css';
import Navbar from './components/NavBar';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

import Hero from './components/Hero';
import Introduction from './components/Introduction';
import FruitsVegetables from './components/FruitsVegetables';
import OurProjects from './components/OurProjects';
import Blog from './components/Blog';
import Modern from './components/modern';
import ContactUs from './components/ContactUs';
import Leader from './components/Leader';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Hero />
          <Introduction />
          <FruitsVegetables />
          <OurProjects />
          <Blog />
          <Modern />
          <ContactUs />
          <Leader />
        </>
      )
    },
    {
      path: "/login",
      element: <><Login /></>
    },
    {
      path: "/signup",
      element: <><Signup /></>
    },
    // {
    //   path: "/about",
    //   element: <><Navbar /><About /></>
    // },
    // {
    //   path: "/user/:username",
    //   element: <><Navbar /><User /></>
    // },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
//browser router lo manam oka object thisukoni manam path inka element ani properties ni pass chesthamlike 


// const route = createBrowserRouter([
// {
//   path: "/",
//   element: <><Navbar/></>
// },{},{},{}
// ]) inka manam retur lo <RouterProvider router={router} /> ani pass chestham