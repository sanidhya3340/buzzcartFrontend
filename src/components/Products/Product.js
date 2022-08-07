import React from 'react';
import {Link} from 'react-router-dom';

export default function Product({
    name,
    productId,
    imgUrl,
    description,
    price,
}) {
    return (
      <div className="bg-gray-200 shadow-md flex flex-col justify-between transition duration-500 ease-in-out hover:scale-180 hover:shadow-xl ">
        <div className="flex mx-4 my-4 ">
          <img src={imgUrl} alt={name} className="h-72 items-center justify-center" />
        </div>
        <div className="mx-4 text-md md:text-base lg:text-lg font-semibold">
          {name}
        </div>
        <div className="mx-4 text-xs md:text-sm lg-text-base ">
          {description.substring(0, 100)}....
        </div>
        <div className="mx-4 font-bold text-base md:text-lg">₹{price}</div>
        <Link
          // to={`/product/${productId}`}
          to={`/product/${productId}`}
          className="flex items-center justify-center mx-4 my-4 py-4 font-semibold hover:shadow-md bg-gray-400 border border-black "
        >
          View
        </Link>
      </div>
    );
}
