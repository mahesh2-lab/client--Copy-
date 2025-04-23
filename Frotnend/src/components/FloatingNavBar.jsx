import React, { useState, useEffect } from "react";
import { ProfileMenu } from "./Avatar";
import { Link } from "react-router-dom";

const FloatingNavBar = ({ onSearch, suggestions = [], fetchSuggestions }) => {
  const [place, setPlace] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setPlace(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (place.trim()) {
      onSearch(place);
      setPlace("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPlace(suggestion);
    console.log(suggestion);
    
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(place);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [place]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchSuggestions(debouncedQuery);
    }
  }, [debouncedQuery, fetchSuggestions]);

  return (
    <div className="absolute w-[97%]  cursor-pointer top-5 left-1/2 opacity-90 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] transform -translate-x-1/2 flex border border-[#FAF7F7] backdrop-blur-sm bg-[#E5E4E4] bg-opacity-80 rounded-[17px] shadow-md p-2 z-[1000]">
      <div className="flex items-center w-full justify-between">
        <div className="ml-4 flex items-center">
          <img src="logo.svg" className="h-11 w-11 hidden lg:block" alt="Logo" />
          <img src="logo.svg" className="h-6 w-6 lg:hidden" alt="Logo" />
          <div className="relative  mx-auto search text-gray-600 ml-[1rem] md:ml-[2rem] lg:ml-[50px]">
            <form onSubmit={handleSubmit} className="relative">
              <input
                className="border-2 border-[#FFFFFF] bg-[#F3E9E9] w-full lg:w-[500px] md:w-[400px] sm:w-[200px] placeholder:text-blue-gray-900 h-10 px-5 pr-16 rounded-[10px] text-base focus:outline-none"
                type="search"
                name="search"
                value={place}
                onChange={handleChange}
                placeholder="Search"
                autoComplete="off"
              />

              <button
                type="submit"
                className="absolute right-0 top-0  mt-[15px] mr-4"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56.966 56.966"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 w-full lg:w-[500px] md:w-[400px] sm:w-[300px] xs:w-[250px] bg-white border border-gray-300 rounded-md max-h-48 overflow-y-auto mt-1 z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mr-4 flex items-center">
          <button
            className="text-gray-600 pl-4 focus:outline-none lg:hidden"
            onClick={toggleMobileMenu}
          >
            {!isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            ) : (
              <svg
                fill="#9b829a"
                className="h-6 w-6"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="-49 -49 588.00 588.00"
                xml:space="preserve"
                stroke="#9b829a"
                transform="rotate(0)"
                stroke-width="0.0049"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.9800000000000001"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon>{" "}
                </g>
              </svg>
            )}
          </button>
          <div
            className={`lg:flex lg:items-center lg:gap-x-10 md:mr-0 ${
              isMobileMenuOpen ? "flex flex-col gap-y-4" : "hidden"
            } lg:flex-row lg:static lg:bg-transparent lg:shadow-none lg:p-0 p-4 lg:pr-0 bg-gray-100 lg:text-nowrap shadow-md rounded-lg absolute top-20 right-0 z-20`}
          >
            <p className="text-lg relative text-gray-900 lg:text-lg after:bg-blue-gray-900 after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </p>
            <p className="text-lg relative text-gray-900 lg:text-base after:bg-blue-gray-900 after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About Us
              </Link>
            </p>
            <p className="text-lg relative text-gray-900 after:bg-blue-gray-900 after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </p>
            <ProfileMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingNavBar;
