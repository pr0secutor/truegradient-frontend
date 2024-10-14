import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email_id: email, password: password };

    try {
      const res = await axios.post(`${BACKEND_URL}/login`, data);

    //   console.log(res);

      localStorage.setItem("token", res?.data.token);
      localStorage.setItem("role", res.data.data.role)
      localStorage.setItem("email", email);
      if (res?.data.data.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (error) {
      if (error.status === 401) toast.error("Invalid Credentials");
      else if (error.status === 404) toast.error("User Not Found");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-8 px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
