import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = () => {

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const API_END_POINT = "http://localhost:8080/api/v1/users";
      const user = {
        email: data.email,
        password: data.password,
      };
      const res = await axios.post(`${API_END_POINT}/login`, user, {
        headers: {
          'content-type': 'application/json'
        },
        withCredentials: true,
      });
      console.log("User logged in:", res.data);
      toast.success(res.data.message);
      reset();
      setLoginError("");
      dispatch(setUser(res.data.user));
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("Invalid email or password. Please try again.");
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex relative flex-col min-h-screen">
      <div className="  bg-zinc-900 z-10">
        <Header />
      </div>
      <div className="relative w-full h-screen">
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1280,h_720,q_75,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs"
          alt="Login background"
          className="w-full h-full object-cover absolute inset-0 "
        />

        <div className="absolute inset-0 flex items-center justify-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-black bg-opacity-70 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">
              Login
            </h2>
            {loginError && (
              <div className="mb-3 text-red-400 text-xs text-center">
                {loginError}
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-white text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-opacity-50 bg-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300 text-sm"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-1 text-white text-sm"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-opacity-50 bg-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300 text-sm"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 mb-3 text-sm"
            >
              Login
              
            </button>
            <div className="text-center text-sm">
              <p className="text-white"> Don't have an account?</p>
              <Link to="/register" className="text-blue-400 hover:text-blue-300">
                Click here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;