import React from 'react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, qtyChangeHandler, removeHandler }) {
  return (
    <div className="flex justify-between px-4 py-2 mt-3 bg-gray-100 shadow-md hover:shadow-lg items-center">
      <img src={item.imageUrl} alt={item.name} className="w-1/5" />
      <Link to={`/product/${item.product}`} className="">
        <p>{item.name}</p>
      </Link>

      <p>${item.price}</p>
      <select
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>

      <button
        className="bg-gray-800 px-1 py-1 rounded-full hover:shadow-md hover:bg-red-600 hover:text-black"
        onClick={() => removeHandler(item.product)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-600 hover:text-black"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
