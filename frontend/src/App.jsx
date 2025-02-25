// import React from 'react';
// import './App.css';
// import Navbar from './components/Homepage/NavBar';

// import Login from './components/Login/Login';
// import Signup from './components/Signup/Signup'; // Updated path

// import Hero from './components/Homepage/Hero';
// import Introduction from './components/Homepage/Introduction';
// import FruitsVegetables from './components/Homepage/FruitsVegetables';
// import OurProjects from './components/Homepage/OurProjects';
// import Blog from './components/Homepage/Blog';
// import Modern from './components/Homepage/modern';
// import ContactUs from './components/Homepage/ContactUs';
// import Leader from './components/Homepage/Leader';
// import RecommendationForm from './components/recommendation/recommendform';
// import { BrowserRouter, createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
// import RecommendationPage from './components/result/RecommendationPage';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = React.useState(false);

//   const privateroute = ({element}) => {
// return isAuthenticated ? element : <Navigate to="/login" />
//   }
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <>
//           <Navbar />
//           <Hero />
//           <Introduction />
//           <FruitsVegetables />
//           <OurProjects />
//           <Blog />
//           <Modern />
//           <ContactUs />
//           <Leader />
//         </>
//       )
//     },
//     {
//       path: "/login",
//       element: <><Login /></>
//     },
//     {
//       path: "/signup",
//       element: <><Signup /></>
//     },
//     {
//       path: "/recommend",
//       element: <> <Navbar /><RecommendationForm /></>
//     },
//     {
//       path: "/result",
//       element: <> <Navbar /><RecommendationPage /></>
//     },
//     // {
//     //   path: "/about",
//     //   element: <><Navbar /><About /></>
//     // },
//     // {
//     //   path: "/user/:username",
//     //   element: <><Navbar /><User /></>
//     // },
//   ]);

//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }

// export default App;
// //browser router lo manam oka object thisukoni manam path inka element ani properties ni pass chesthamlike 


// // const route = createBrowserRouter([
// // {
// //   path: "/",
// //   element: <><Navbar/></>
// // },{},{},{}
// // ]) inka manam retur lo <RouterProvider router={router} /> ani pass chestham

import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Homepage/NavBar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Hero from './components/Homepage/Hero';
import Introduction from './components/Homepage/Introduction';
import FruitsVegetables from './components/Homepage/FruitsVegetables';
import OurProjects from './components/Homepage/OurProjects';
import Blog from './components/Homepage/Blog';
import Modern from './components/Homepage/modern';
import ContactUs from './components/Homepage/ContactUs';
import Leader from './components/Homepage/Leader';
import RecommendationForm from './components/recommendation/recommendform';
import RecommendationPage from './components/result/RecommendationPage';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to check initial auth state
const getInitialAuthState = () => {
  const token = localStorage.getItem('accessToken');
  return !!token; // Returns true if token exists, false otherwise
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(getInitialAuthState);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const PublicRoute = ({ element }) => {
    return isAuthenticated ? <Navigate to="/" /> : element;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute 
          element={
            <>
              <Navbar setIsAuthenticated={setIsAuthenticated} />
              <Hero />
              <Introduction />
              <FruitsVegetables />
              <OurProjects />
              <Blog />
              <Modern />
              <ContactUs />
              <Leader />
            </>
          }
        />
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute 
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoute 
          element={<Signup />}
        />
      ),
    },
    {
      path: "/recommend",
      element: (
        <PrivateRoute 
          element={
            <>
              <Navbar setIsAuthenticated={setIsAuthenticated} />
              <RecommendationForm />
            </>
          }
        />
      ),
    },
    {
      path: "/result",
      element: (
        <PrivateRoute 
          element={
            <>
              <Navbar setIsAuthenticated={setIsAuthenticated} />
              <RecommendationPage />
            </>
          }
        />
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;