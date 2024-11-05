import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={`bg-orange-800 text-white ${isAuthorized ? "block" : "hidden"}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="logo">
          <img src="/JobZee-logos__white.png" alt="logo" className="h-10" />
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to={"/"} className="hover:text-orange-200" onClick={() => setShow(false)}>
            HOME
          </Link>
          <Link to={"/job/getall"} className="hover:text-orange-200" onClick={() => setShow(false)}>
            ALL JOBS
          </Link>
          <Link to={"/applications/me"} className="hover:text-orange-200" onClick={() => setShow(false)}>
            {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
          </Link>
          {user && user.role === "Employer" && (
            <>
              <Link to={"/job/post"} className="hover:text-orange-200" onClick={() => setShow(false)}>
                POST NEW JOB
              </Link>
              <Link to={"/job/me"} className="hover:text-orange-200" onClick={() => setShow(false)}>
                VIEW YOUR JOBS
              </Link>
            </>
          )}
          <button onClick={handleLogout} className="hover:text-orange-400">
            LOGOUT
          </button>
        </div>
        <div className="md:hidden">
          <GiHamburgerMenu onClick={() => setShow(!show)} className="text-2xl" />
        </div>
      </div>
      {show && (
        <div className="md:hidden bg-gray-700">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link to={"/"} className="block hover:text-orange-400" onClick={() => setShow(false)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/job/getall"} className="block hover:text-orange-400" onClick={() => setShow(false)}>
                ALL JOBS
              </Link>
            </li>
            <li>
              <Link to={"/applications/me"} className="block hover:text-orange-400" onClick={() => setShow(false)}>
                {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
              </Link>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li>
                  <Link to={"/job/post"} className="block hover:text-orange-400" onClick={() => setShow(false)}>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} className="block hover:text-orange-400" onClick={() => setShow(false)}>
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            )}
            <li>
              <button onClick={handleLogout} className="block hover:text-orange-400">
                LOGOUT
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
