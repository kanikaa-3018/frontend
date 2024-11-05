import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../index";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page bg-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">All Available Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.jobs && jobs.jobs.length > 0 ? (
            jobs.jobs.map((element) => (
              <div
                className="card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                key={element._id}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{element.title}</h3>
                <p className="text-gray-600 mb-2">{element.category}</p>
                <p className="text-gray-600 mb-4">{element.country}</p>
                <Link
                  to={`/job/${element._id}`}
                  className="inline-block text-orange-500 font-semibold hover:text-orange-600 transition duration-200"
                >
                  Job Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-xl col-span-full">
              No Jobs Available
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
