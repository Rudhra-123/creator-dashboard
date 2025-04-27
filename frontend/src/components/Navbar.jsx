import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Menu, X, User, LogOut, Bell, Home, Settings, PlusCircle, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and primary nav items */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center">
                <span className="text-white text-xl font-bold tracking-tight">CreatorApp</span>
              </NavLink>
            </div>
            
            {/* Desktop navigation */}
            {user && (
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => 
                      isActive
                        ? "bg-blue-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink 
                    to="/feed" 
                    className={({ isActive }) => 
                      isActive
                        ? "bg-blue-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                  >
                    Feed
                  </NavLink>
                </div>
              </div>
            )}
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center">
            {user ? (
              <>
                {/* Notification bell */}
                <button className="p-1.5 rounded-full text-blue-100 hover:bg-blue-700 hover:text-white mr-3">
                  <Bell size={20} />
                </button>
                
                {/* Create new content button */}
                <NavLink
                  to="/create"
                  className="hidden md:flex items-center bg-white text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-md text-sm font-medium mr-4"
                >
                  <PlusCircle size={16} className="mr-1" />
                  Create
                </NavLink>
                
                {/* Profile dropdown */}
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={toggleProfileDropdown}
                      className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center text-white">
                        {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                      </div>
                      <ChevronDown size={16} className="ml-1 text-blue-100" />
                    </button>
                  </div>
                  
                  {/* Dropdown menu */}
                  {profileDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <NavLink to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User size={16} className="mr-2" />
                        Profile
                      </NavLink>
                      <NavLink to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings size={16} className="mr-2" />
                        Settings
                      </NavLink>
                      <button 
                        onClick={handleLogout} 
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex space-x-3">
                <NavLink to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Sign in
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="bg-white text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </NavLink>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="flex md:hidden ml-3">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    isActive
                      ? "bg-blue-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                      : "text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home size={16} className="inline-block mr-2" />
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/feed" 
                  className={({ isActive }) => 
                    isActive
                      ? "bg-blue-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                      : "text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Feed
                </NavLink>
                <NavLink 
                  to="/create" 
                  className={({ isActive }) => 
                    isActive
                      ? "bg-blue-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                      : "text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PlusCircle size={16} className="inline-block mr-2" />
                  Create
                </NavLink>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left text-red-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  <LogOut size={16} className="inline-block mr-2" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className="text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="text-blue-100 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;