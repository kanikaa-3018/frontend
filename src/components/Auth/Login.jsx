import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-400 to-orange-500 text-black">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
        <div className="flex flex-col w-full p-6">
          <div className="text-center mb-6">
            <img src="/heroimg.png" alt="logo" className="mx-auto mb-4" />
            <h3 className="text-4xl font-bold">Login to your account</h3>
          </div>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Login As</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex-1 p-2 bg-gray-100 rounded-md focus:outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="text-gray-600 ml-2" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 p-2 bg-gray-100 rounded-md focus:outline-none"
                />
                <MdOutlineMailOutline className="text-gray-600 ml-2" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Password</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 p-2 bg-gray-100 rounded-md focus:outline-none"
                />
                <RiLock2Fill className="text-gray-600 ml-2" />
              </div>
            </div>

            <button
              type="submit"
              onClick={handleLogin}
              className="w-full py-2 mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-md"
            >
              Login
            </button>
            <Link to={"/register"} className="text-blue-500 hover:underline mt-8 pt-12 text-center mx-[537px]">
              Register Now
            </Link>
          </form>
        </div>
        {/* Uncomment if you want to add an image on the right */}
        {/* <div className="hidden md:block w-1/2">
          <img src="/login.png" alt="login" className="w-full h-full object-cover rounded-lg" />
        </div> */}
      </div>
    </section>
  );
};

export default Login;
