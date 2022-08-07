import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//components
import CartItem from "../components/CartItem";

//actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

export default function CartScreen() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeHandler = (id) => {
      dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  }

  const getCartSubtotal = () => {
    return cartItems.reduce((price, item) => (item.price * item.qty) + price, 0);
  }

  return (
    <div className="h-screen -mb-10 px-4 py-4  flex flex-col md:flex-row md:justify-between ">
      <div className="md:w-3/5">
        <p className="font-bold text-lg md:text-xl lg:text-2xl">
          Shopping Cart
        </p>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          cartItems.map((item, key) => (
            <CartItem
              key={key}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={removeHandler}
            />
          ))
        )}
      </div>
      <div className="md:w-2/5 mt-8 md:mt-0 md:ml-4">
        <div className="bg-gray-100 shadow-md hover:shadow-lg mt-2 px-4 py-4">
          <p>Subtotal ({getCartCount()}) item</p>
          <p className="mt-2">${getCartSubtotal().toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 shadow-md hover:shadow-lg mt-2 py-2 flex items-center justify-center">
          <Link to="/thankyou" className="bg-black hover:shadow-lg text-white font-bold px-4 py-2">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
