import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaHome,
  FaTv,
  FaFilm,
  FaFire,
  FaListUl,
  FaSearch,
  FaBell,
  FaUser,
  FaBars,
  FaCaretDown,
} from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice.js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const user = useSelector((state) => state.app.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const API_END_POINT = "http://localhost:8080/api/v1/users";
      const response = await axios.post(
        `${API_END_POINT}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(clearUser());
        toast.success("Logout successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="text-white py-4 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
          alt="Netflix"
          className="h-8 mr-4"
        />
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li>
                  <Link
                    to="/home"
                    className="hover:text-gray-300 flex items-center"
                  >
                    <FaHome className="mr-1" /> Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-gray-300 flex items-center"
                  >
                    <FaTv className="mr-1" /> TV Shows
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-gray-300 flex items-center"
                  >
                    <FaFilm className="mr-1" /> Movies
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-gray-300 flex items-center"
                  >
                    <FaFire className="mr-1" /> New & Popular
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-gray-300 flex items-center"
                  >
                    <FaListUl className="mr-1" /> My List
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <button className="md:flex hidden bg-red-600 text-black px-3 py-1 rounded hover:bg-gray-200 items-center">
              <FaSearch className="mr-1" /> Search More
            </button>
            <button className="md:block hidden hover:text-gray-600">
              <FaBell className="h-6 w-6" />
            </button>
            <div className="relative">
              <button
                className="hover:text-gray-600 flex items-center"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <FaUser className="h-6 w-6 mr-1" />
                {user.name}
                <FaCaretDown className="h-4 w-4" />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg py-1">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        ) : null}
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black p-4 md:hidden">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-gray-300 flex items-center">
                  <FaHome className="mr-1" /> Home
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300 flex items-center">
                  <FaTv className="mr-1" /> TV Shows
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300 flex items-center">
                  <FaFilm className="mr-1" /> Movies
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300 flex items-center">
                  <FaFire className="mr-1" /> New & Popular
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300 flex items-center">
                  <FaListUl className="mr-1" /> My List
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-4 space-y-2">
            <button className="bg-red-600 text-black px-3 py-1 rounded hover:bg-gray-200 flex items-center">
              <FaSearch className="mr-1" /> Search More
            </button>
            <button className="hover:text-gray-600">
              <FaBell className="h-6 w-6" />
            </button>
            <div className="relative">
              <button
                className="hover:text-gray-600 flex items-center"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <FaUser className="h-6 w-6 mr-1" />
                <FaCaretDown className="h-4 w-4" />
              </button>
              {isUserDropdownOpen && (
                <div className="mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg py-1">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
