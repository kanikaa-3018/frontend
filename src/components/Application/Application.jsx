import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../index";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application py-10">
      <div className="container mx-auto max-w-md px-4">
        <h3 className="text-2xl font-semibold mb-6">Application Form</h3>
        <form onSubmit={handleApplication} className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Cover Letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Select Resume</label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              className="w-full text-gray-500 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
