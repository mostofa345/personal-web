import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

// Client-side API URL
const API_URL = "VITE_API_URL=https://personal-server-uf48.onrender.com/api";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/webnav`);
        if (!response.ok) {
          throw new Error('Failed to fetch navigation items');
        }
        const data = await response.json();
        // The data is already sorted by the backend API.
        setNavItems(data);
        setError(null);
      } catch (err) {
        setError('Navigation items anay somossa hoyeche.');
        console.error("Error fetching nav items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNavItems();
  }, []); // Empty dependency array ensures this runs only once on mount

  const isActive = (url) => {
    // Check if the current location pathname matches the nav item's URL
    if (url === '/') {
      return location.pathname === '/';
    } else {
      return location.pathname.startsWith(url);
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full p-4 text-center text-white bg-[#1f242d] z-50">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-0 left-0 w-full p-4 text-center text-red-400 bg-[#1f242d] z-50">
        {error}
      </div>
    );
  }

  return (
    <motion.header
      className="fixed top-0 left-0 w-full px-4 md:px-36 py-8 bg-[#1f242d] flex justify-between items-center z-50 transition-all duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="logo text-white text-3xl font-bold">S. Rahman.</Link>

      <button
        className="md:hidden text-4xl text-white focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full p-4 bg-[#323946] md:w-auto md:p-0 md:bg-transparent transition-all duration-300`}>
        {navItems.map(item => (
          <Link
            key={item._id}
            to={item.url}
            onClick={() => setIsMenuOpen(false)}
            className={`text-2xl font-medium px-4 py-2 hover:text-[#7cf03d] transition-colors md:text-xl md:ml-14 md:p-0 ${isActive(item.url) ? 'text-[#7cf03d]' : 'text-white'}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
};

export default Navbar;
