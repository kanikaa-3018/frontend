import React, { useContext, useState } from "react";
import { Context } from "../../index";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, email, password, phone, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="bg-gradient-to-br from-orange-900 via-orange-700 to-orange-500 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl px-6 py-16 bg-white rounded-lg shadow-xl flex items-center justify-between mx-4 my-4">
        <div className="w-1/2 hidden md:block">
          <h1 className="text-5xl font-bold text-orange-700 mb-6 px-6">
            Create a new account
          </h1>
          <img src="./registerimg.png" alt="Register" className="w-full -mt-12" />
        </div>

        <form
          className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-10 space-y-6"
          onSubmit={handleRegister}
        >
          <h2 className="text-3xl font-semibold text-orange-600 text-center">
            Register
          </h2>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700">
              Register As
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-orange-100">
              <select
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser className="text-orange-600" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-orange-100">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
              />
              <FaPencilAlt className="text-orange-600" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-orange-100">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
              />
              <MdOutlineMailOutline className="text-orange-600" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-orange-100">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
              />
              <RiLock2Fill className="text-orange-600" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-orange-100">
              <input
                type="number"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
              />
              <FaPhoneFlip className="text-orange-600" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-orange-700 hover:bg-orange-800 rounded-lg font-semibold"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
