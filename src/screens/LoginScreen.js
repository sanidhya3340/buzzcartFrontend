import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./RegisterScreen.css";

export default function RegisterScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content/type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    try {
      const { data } = await axios.post(
        "https://buzzcart-backend.herokuapp.com/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response?.data?.error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center -mt-12 -mb-8 -z-20">
      <div className="bg-black  px-16 py-12 rounded-lg shadow-lg">
        <p className="font-bold text-2xl text-white mb-4">Login</p>
        {error && <span className="text-red-700">{error}</span>}
        <form onSubmit={loginHandler}>
          <div>
            <div className="flex justify-between my-2">
              <label htmlFor="" className="text-white font-semibold px-3">
                Email
              </label>
              <input
                type="email"
                className="bg-black text-white focus:outline-none"
                required
                id="name"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                tabIndex={1}
              />
            </div>
            <div className="flex justify-between my-2">
              <label
                htmlFor="Password"
                className="text-white font-semibold px-3"
              >
                Password
                <Link
                  to="/forgotpassword"
                  className="text-gray-400 text-sm font-light"
                  tabIndex={4}
                >
                  {" "}
                  Forgot Password?
                </Link>
              </label>
              <input
                type="password"
                className="bg-black text-white focus:outline-none"
                required
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                tabIndex={2}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-100 shadow-xl rounded-lg font-bold mt-6 mb-4 py-3"
            tabIndex={3}
          >
            Login
          </button>
          <div className="text-white">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
