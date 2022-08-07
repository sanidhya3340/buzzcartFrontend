import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./RegisterScreen.css";

export default function RegisterScreen({ history }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content/type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "https://buzzcart-backend.herokuapp.com/api/auth/register",
        { username, email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center -mt-12 -mb-8 -z-20">
      <div className="bg-black  px-16 py-12 rounded-lg shadow-lg">
        <p className="font-bold text-2xl text-white mb-4">Register</p>
        {error && <span className="text-red-700">{error}</span>}
        <form onSubmit={registerHandler}>
          <div>
            <div className="flex justify-between my-2">
              <label htmlFor="" className="text-white font-semibold px-3">
                Username
              </label>
              <input
                type="text"
                className="bg-black text-white focus:outline-none"
                required
                id="name"
                placeholder="Enter Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex justify-between my-2">
              <label htmlFor="" className="text-white font-semibold px-3">
                Email
              </label>
              <input
                type="email"
                className="bg-black text-white focus:outline-none"
                required
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-between my-2">
              <label htmlFor="" className="text-white font-semibold px-3">
                Password
              </label>
              <input
                type="password"
                className="bg-black text-white focus:outline-none"
                required
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between my-2">
              <label htmlFor="" className="text-white font-semibold px-3">
                Confirm Password
              </label>
              <input
                type="password"
                className="bg-black text-white focus:outline-none"
                required
                id="changepassword"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-100 shadow-xl rounded-lg font-bold mt-6 mb-4 py-3"
          >
            Register
          </button>
          <div className="text-white">
            Already have an account?{" "}
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
