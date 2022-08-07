import React from 'react'
import { Link } from 'react-router-dom';

export default function HomeCard({name,img,goto}) {
  return (
    <Link
      to={`/categories/${goto}`}
      className="relative transform transition duration-500 hover:scale-110"
    >
      {/* <div> */}
      {/* <p>{name}</p> */}
      {/* <img src={img} alt="" /> */}
      <div className="shdow-md hover:shadow-lg">
        <img src={img} alt="" />
      </div>
      <div className="absolute bottom-32 md:bottom-24 lg:bottom-28 w-full text-center">
        <div className="bg-black px-2 py-1 text-white font-bold">{name}</div>
      </div>
      {/* </div> */}
    </Link>
  );
}
