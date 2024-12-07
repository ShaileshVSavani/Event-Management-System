

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Eventify</Link>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white lg:hidden"
        >
          &#9776;
        </button>

        {/* Navbar Links */}
        <div className={`lg:flex items-center ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          {/* Conditional Links */}
          {user ? (
            <>
              {/* Links visible only when user is logged in */}
              <Link to="/event" className="text-white px-4 py-2 hover:bg-blue-500 rounded-md transition duration-200">
                Events
              </Link>
              <Link to="/create-event" className="text-white px-4 py-2 hover:bg-blue-500 rounded-md transition duration-200">
                Create Event
              </Link>
              {/* Authenticated User Links */}
              <Link to="/profile" className="text-white px-4 py-2 hover:bg-blue-500 rounded-md transition duration-200">
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-white px-4 py-2 hover:bg-red-600 rounded-md transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Guest User Links */}
              <Link to="/login" className="text-white px-4 py-2 hover:bg-blue-500 rounded-md transition duration-200">
                Login
              </Link>
              <Link to="/signup" className="text-white px-4 py-2 hover:bg-blue-500 rounded-md transition duration-200">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
