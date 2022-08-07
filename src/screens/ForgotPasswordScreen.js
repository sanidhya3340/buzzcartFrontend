import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
        setError(error.response.data.error);
        setEmail("");
        setTimeout(() => {
            setError("")
        },5000)
    }
  };

  return (
    <div className="h-screen -mb-8 -mt-16">
      <form
        className="h-full flex flex-col items-center justify-center"
        onSubmit={forgotPasswordHandler}
      >
        <div className="bg-black flex flex-col items-center justify-center px-8 py-6 rounded-xl shadow-xl">
          <p className="text-xl text-white font-bold">Forgot Password</p>
          {error && <span>{error}</span>}
          {success && <span>{success}</span>}
          <div className="flex flex-col items-center">
            <p className="text-white mt-8 w-2/3">
              Please enter the email address you register your account with. We
              will send you reset password confirmation to this email.
            </p>
            <div className="w-full flex justify-center mt-4">
              <label htmlFor="" className="text-white mx-4">
                Email
              </label>
              <input
                type="email"
                required
                className="bg-black font-semibold text-white w-auto focus:outline-none"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button className="bg-white rounded-lg shadow-xl mt-12 px-8 py-3 font-bold ">
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
}
