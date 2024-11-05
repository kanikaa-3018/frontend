import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices className="text-6xl text-white" />,
      bgColor: "bg-orange-500",
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled className="text-6xl text-white" />,
      bgColor: "bg-blue-500",
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook className="text-6xl text-white" />,
      bgColor: "bg-green-500",
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact className="text-6xl text-white" />,
      bgColor: "bg-purple-500",
    },
    {
      id: 5,
      title: "Account and Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance className="text-6xl text-white" />,
      bgColor: "bg-teal-500",
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence className="text-6xl text-white" />,
      bgColor: "bg-yellow-500",
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation className="text-6xl text-white" />,
      bgColor: "bg-red-500",
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController className="text-6xl text-white" />,
      bgColor: "bg-indigo-500",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-orange-200 to-orange-100">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 text-center">
          Popular Categories
        </h3>
        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-8 pb-4">
          {categories.map((element) => (
            <div
              className={`flex flex-col items-center justify-between px-16 rounded-2xl transition-transform transform hover:scale-105 duration-300 snap-start w-[190px] h-60 ${element.bgColor}`} // Fixed width for cards
              key={element.id}
            >
              <div className="mb-4 flex-grow flex items-center justify-center">{element.icon}</div>
              <div className="text-center flex-grow">
                <p className="text-lg font-semibold text-white">{element.title}</p>
                <p className="text-sm text-white">{element.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
