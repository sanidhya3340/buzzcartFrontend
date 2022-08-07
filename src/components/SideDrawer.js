import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function SideDrawer({ show, click }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // const [token, setToken] = useState(null);

  // setInterval(() => {
  //   setToken(localStorage.getItem("authToken"));
  // }, 1000);

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  return !show ? (
    <div className="w-2/3 h-screen z-50 bg-white fixed top-0 left-0 transform -translate-x-full transition duration-500 ease-in-out">
      <div
        className="flex flex-col h-screen justify-center items-center text-xl font-semibold"
        onClick={click}
      >
        <div className="w-full flex items-center justify-center hover:bg-black hover:text-white">
          <Link
            to="/cart"
            className="flex mx-1  rounded-lg py-2 px-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        <div className="flex items-center justify-center w-full hover:text-white hover:bg-black">
          <Link to="/" className="py-2">
            Shop
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className=" w-2/3 h-screen z-50 bg-white fixed top-0 left-0 transform translate-x-0">
      <div
        className="flex flex-col h-screen justify-center items-center text-xl font-semibold"
        onClick={click}
      >
        <div className="w-full flex items-center justify-center hover:bg-black hover:text-white">
          <Link
            to="/cart"
            className="flex mx-1  rounded-lg py-2 px-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <div className="">Cart</div>
            <span className=" flex item-center justify-center mx-2 bg-white text-black rounded-full w-6 h-6 ">
              0
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full hover:text-white hover:bg-black">
          <Link to="/" className="py-2">
            Shop
          </Link>
        </div>
        <div className="flex items-center justify-center w-full hover:text-white hover:bg-black">
          <button onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
