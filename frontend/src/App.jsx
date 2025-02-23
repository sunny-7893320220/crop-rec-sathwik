import React from 'react';
import './App.css';
import Navbar from './components/Homepage/NavBar';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup'; // Updated path

import Hero from './components/Homepage/Hero';
import Introduction from './components/Homepage/Introduction';
import FruitsVegetables from './components/Homepage/FruitsVegetables';
import OurProjects from './components/Homepage/OurProjects';
import Blog from './components/Homepage/Blog';
import Modern from './components/Homepage/modern';
import ContactUs from './components/Homepage/ContactUs';
import Leader from './components/Homepage/Leader';
import RecommendationForm from './components/recommendation/recommendform';
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
    {
      path: "/recommend",
      element: <> <Navbar /><RecommendationForm /></>
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