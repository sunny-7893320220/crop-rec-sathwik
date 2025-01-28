import NavBar from './NavBar';

const Layout = ({ children }) => {
  const currentPath = window.location.pathname;
  const showNavBar = currentPath !== '/login' && currentPath !== '/signup';

  return (
    <>
      {showNavBar && <NavBar />}
      {children}
    </>
  );
};

export default Layout;
