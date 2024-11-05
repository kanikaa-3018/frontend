import React, { useContext } from "react";
import { Context } from "../../index";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <footer
      className={`${
        isAuthorized ? "block" : "hidden"
      } bg-orange-800 py-4 text-white text-center`}
    >
      <div className="container mx-auto">
        <div className="text-lg mb-4">&copy; All Rights Reserved By kanzz.</div>
        <div className="flex justify-center gap-6 text-xl">
          <Link
            to={"https://www.facebook.com/profile.php?id=100030535123397"}
            target="_blank"
            className="hover:text-orange-300 transition duration-300"
          >
            <FaFacebookF />
          </Link>
          <Link
            to={"https://www.youtube.com/@CodeWithZeeshu"}
            target="_blank"
            className="hover:text-orange-300 transition duration-300"
          >
            <FaYoutube />
          </Link>
          <Link
            to={"https://www.youtube.com/@CodeWithZeeshu"}
            target="_blank"
            className="hover:text-orange-300 transition duration-300"
          >
            <FaLinkedin />
          </Link>
          <Link
            to={"https://www.instagram.com/z_4_zeeshuuu/"}
            target="_blank"
            className="hover:text-orange-300 transition duration-300"
          >
            <RiInstagramFill />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
