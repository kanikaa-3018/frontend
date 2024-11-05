import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      const fetchApplications = async () => {
        const endpoint =
          user && user.role === "Employer"
            ? "http://localhost:4000/api/v1/application/employer/getall"
            : "http://localhost:4000/api/v1/application/jobseeker/getall";
        const { data } = await axios.get(endpoint, { withCredentials: true });
        setApplications(data.applications);
      };

      if (isAuthorized) fetchApplications();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications p-10">
      {user && user.role === "Job Seeker" ? (
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-5">My Applications</h1>
          {applications.length === 0 ? (
            <h4 className="text-xl text-gray-600">No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-5">Applications From Job Seekers</h1>
          {applications.length === 0 ? (
            <h4 className="text-xl text-gray-600">No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-5">
      <div className="mb-4">
        <p>
          <span className="font-bold">Name:</span> {element.name}
        </p>
        <p>
          <span className="font-bold">Email:</span> {element.email}
        </p>
        <p>
          <span className="font-bold">Phone:</span> {element.phone}
        </p>
        <p>
          <span className="font-bold">Address:</span> {element.address}
        </p>
        <p>
          <span className="font-bold">Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="mb-4">
        <img
          className="w-32 h-32 object-cover cursor-pointer"
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="text-right">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={() => deleteApplication(element._id)}
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-5">
      <div className="mb-4">
        <p>
          <span className="font-bold">Name:</span> {element.name}
        </p>
        <p>
          <span className="font-bold">Email:</span> {element.email}
        </p>
        <p>
          <span className="font-bold">Phone:</span> {element.phone}
        </p>
        <p>
          <span className="font-bold">Address:</span> {element.address}
        </p>
        <p>
          <span className="font-bold">Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="mb-4">
        <img
          className="w-32 h-32 object-cover cursor-pointer"
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};
