import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//  Actions
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

export default function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, product, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push("/cart");
  };

  return (
    <div className="h-screen -mb-10">
      <div className="flex mt-4 items-center flex-col md:flex-row bg-gray-100 mx-4">
        {loading ? (
          <p>Loading ...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between w-4/5 items-center">
              <div className="">
                <img src={product.imageUrl} alt={product.name} className="" />
              </div>
              <div className="md:ml-8">
                <p className="bg-white text-xl mt-2  font-bold shadow-md px-4 py-4">
                  {product.name}
                </p>
                <p className="bg-white shadow-md text-lg mt-2  px-4 py-4">
                  Price: ₹{product.price}
                </p>
                <p className="bg-white shadow-md  mt-2 px-4 py-4 text-xs md:text-sm lg:text-base">
                  Description: {product.description}
                </p>
              </div>
            </div>
            <div className="md:ml-4 px-4 my-5 w-full md:w-1/5 ">
              <div>
                <div className="px-2 py-2 mt-1 bg-white shadow-lg flex justify-between item-center">
                  <p>Price:</p>
                  <p>₹{product.price}</p>
                  {/* Price: <span>$499.99</span> */}
                </div>
                <div className="px-2 py-2 mt-1 bg-white shadow-lg flex justify-between item-center">
                  <p>Status:</p>
                  <p>
                    {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                  </p>
                </div>
                <div className="bg-white shadow-lg mt-1 px-2 py-2 flex justify-between items-center">
                  <p>Qty :</p>

                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="w-1/2"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="bg-white shadow-lg mt-1 flex items-center justify-center hover:shadow-xl">
                  <button
                    onClick={addToCartHandler}
                    className="bg-black px-2 lg:px-14 py-3 my-1 mx-2 md:my-2 text-sm font-semibold lg:text-base lg:font-bold text-white"
                  >
                    Add to Cart
                  </button>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
