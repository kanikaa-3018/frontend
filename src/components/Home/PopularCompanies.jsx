import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft className="text-6xl text-gray-800" />,
      bgColor: "bg-gray-200",
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla className="text-6xl text-gray-800" />,
      bgColor: "bg-gray-200",
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple className="text-6xl text-gray-800" />,
      bgColor: "bg-gray-200",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 text-center">
          Top Companies
        </h3>
        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-4 pt-4 items-center justify-center">
          {companies.map((element) => (
            <div
              className={`flex flex-col items-center justify-center p-6 rounded-full transition-transform transform hover:scale-105 hover:shadow-lg duration-300 snap-start w-64 h-64 ${element.bgColor}`}
              key={element.id}
            >
              <div className="mb-4 flex-grow flex items-center justify-center">
                {element.icon}
              </div>
              <div className="text-center flex-grow">
                <p className="text-lg font-semibold text-gray-800">{element.title}</p>
                <p className="text-sm text-gray-600">{element.location}</p>
              </div>
              <button className=" text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">
                Open Positions {element.openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;
