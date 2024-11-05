import React from "react";
import Slider from "react-slick";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const HeroSection = () => {
  const carouselItems = [
    {
      id: 1,
      title: "Find a job that suits",
      subtitle: "your interests and skills",
      imgSrc: "/job1.png", // Update with your image paths
    },
    {
      id: 2,
      title: "Explore thousands of opportunities",
      subtitle: "that match your profile",
      imgSrc: "/job2.png", // Update with your image paths
    },
    {
      id: 3,
      title: "Join a community of skilled professionals",
      subtitle: "and enhance your career",
      imgSrc: "/job3.png", // Update with your image paths
    },
  ];

  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Jobs",
      icon: <FaSuitcase className="text-4xl text-orange-500" />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding className="text-4xl text-orange-500" />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers className="text-4xl text-orange-500" />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus className="text-4xl text-orange-500" />,
    },
  ];

  return (
    <section className="bg-gradient-to-r from-orange-200 to-orange-100 py-16">
      <div className="container mx-auto px-6">
        <Slider {...settings}>
          {carouselItems.map((item) => (
            <div key={item.id} className="text-center mb-8 flex justify-between flex-row">
              <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                {item.title}
              </h1>
              <h1 className="text-4xl md:text-5xl font-bold text-orange-700">
                {item.subtitle}
              </h1>
              </div>
              <div>
              <img
                src={item.imgSrc}
                alt={`hero-${item.id}`}
                className="mx-auto rounded-lg max-w-full h-auto mt-4"
              />
              </div>
            </div>
          ))}
        </Slider>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-16 py-12">
          {details.map((element) => {
            return (
              <div
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105"
                key={element.id}
              >
                <div className="icon mb-4">{element.icon}</div>
                <div className="content text-center">
                  <p className="text-2xl font-semibold">{element.title}</p>
                  <p className="text-sm text-gray-500">{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
