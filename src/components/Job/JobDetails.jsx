import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page bg-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-16">
        <h3 className="text-4xl font-bold text-gray-800 mb-8 text-center">Job Details</h3>
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Title:</span> {job.title}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Category:</span> {job.category}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Country:</span> {job.country}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">City:</span> {job.city}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Location:</span> {job.location}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Description:</span> {job.description}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Job Posted On:</span> {new Date(job.jobPostedOn).toLocaleDateString()}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-800">Salary:</span>{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>

          {user && user.role !== "Employer" && (
            <div className="text-center">
              <Link
                to={`/application/${job._id}`}
                className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-orange-600"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
