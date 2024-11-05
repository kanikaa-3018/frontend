import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-10">How konzeee Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
            <div className="flex justify-center items-center text-4xl text-orange-500 mb-4">
              <FaUserPlus />
            </div>
            <p className="text-xl font-semibold">Create Account</p>
            <p className="text-gray-600 mt-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
            <div className="flex justify-center items-center text-4xl text-orange-500 mb-4">
              <MdFindInPage />
            </div>
            <p className="text-xl font-semibold">Find a Job/Post a Job</p>
            <p className="text-gray-600 mt-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
            <div className="flex justify-center items-center text-4xl text-orange-500 mb-4">
              <IoMdSend />
            </div>
            <p className="text-xl font-semibold">Apply For Job/Recruit Suitable Candidates</p>
            <p className="text-gray-600 mt-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
