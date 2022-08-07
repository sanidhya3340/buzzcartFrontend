import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar({ click, show }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // const user = JSON.parse(localStorage.getItem("authUser"));
  // console.log(user);

  const [token, setToken] = useState(null);

  setInterval(() => {
    setToken(localStorage.getItem("authToken"));
  }, 1000);

  // const token = localStorage.getItem("authToken");

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };
  return (
    <nav className="z-20 flex justify-between items-center bg-black text-white py-4 px-4">
      {/* logo */}
      <div>
        <Link to="/">
          <h2 className="md:text-xl font-bold">BuzzCart</h2>
        </Link>
      </div>
      {/* links */}

      {token != null ? (
        <div className="hidden md:flex md:items-center">
          <div className="mx-2">
            <Link
              to="/cart"
              className="flex mx-1 bg-gray-400 hover:bg-red-100 hover:text-black rounded-lg py-2 px-2 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 hover:text-black"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <div className="">Cart</div>
              <span className=" flex item-center justify-center mx-2 bg-white text-black rounded-full w-6 h-6 ">
                {getCartCount()}
              </span>
            </Link>
          </div>
          <div className="mx-2">
            <Link to="/" className="hover:text-red-100">
              Shop
            </Link>
          </div>
          <div className="mx-2">
            <button onClick={logoutHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}

      {/* handburger Menu */}
      <div className="md:hidden cursor-pointer" onClick={click}>
        {/* {console.log(show)} */}
        {show === true ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 hover:text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </nav>
  );
}
