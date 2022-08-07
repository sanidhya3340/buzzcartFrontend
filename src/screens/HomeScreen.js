import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Product from "../components/Products/Product";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
// import {productData} from '../components/Products/ProductData'
import data from "../data/homepallet";
import HomeCard from "../components/HomeCard";

//actions
import { getProducts as listProducts } from "../redux/actions/productActions";

export default function HomeScreen({ history }) {
  console.log(history);
  const [error1, setError1] = useState("");
  const [privateData, setPrivateData] = useState("");
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          "https://buzzcart-backend.herokuapp.com/api/private",
          config
        );
        setPrivateData(data.data);
      } catch (error1) {
        localStorage.removeItem("authToken");
        setError1("You are not authorized please ");
      }
    };

    fetchPrivateDate();
  }, [history]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  // console.log(privateData);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error1 ? (
    <div>
      <span>{error1}</span>
      <Link to="/login" className="p-2 bg-black text-white">
        Login
      </Link>
    </div>
  ) : (
    <div>
      <div className="m-2">
        <div className="min-h-screen grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((items, k) => (
            <HomeCard
              name={items.name}
              img={items.img}
              goto={items.goto}
              key={k}
            />
          ))}
        </div>
      </div>
      <div className="mx-16 my-12">
        <p className="lg:text-3xl md:text-2xl text-xl font-bold">
          Latest Poducts
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // <p>Loading..</p>
            <ReactLoading
              type={"balls"}
              color="#03fc4e"
              height={"20%"}
              width={"20%"}
            />
          ) : error ? (
            <div>
              <p>{error}</p>
              <p>{privateData}</p>
            </div>
          ) : (
            products.map((product, key) => (
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
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}
