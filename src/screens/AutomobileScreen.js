import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import Product from "../components/Products/Product";
import { useSelector, useDispatch } from "react-redux";
import { getProducts as listProducts } from "../redux/actions/productActions";

export default function SportsScreen() {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const autoProducts = products.filter((item) => {
    return item.type === "auto";
  });

  return (
    <div className="mx-16 my-12">
      <p className="lg:text-3xl md:text-2xl text-xl font-bold">
        Automobile Poducts
      </p>
      <div className="grid gap-4 md:grid-cols-2 mt-8 lg:grid-cols-3">
        {loading ? (
          // <p>Loading..</p>
          <ReactLoading
            type={"balls"}
            color="#03fc4e"
            height={"20%"}
            width={"20%"}
          />
        ) : error ? (
          <p>{error}</p>
        ) : (
          autoProducts.map((product, key) => (
            <Product
              key={key}
              productId={product._id}
              name={product.name}
              imgUrl={product.imageUrl}
              description={product.description}
              price={product.price}
              countInStock
            />
          ))
        )}
      </div>
    </div>
  );
}
