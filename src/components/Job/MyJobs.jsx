import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
        console.log(myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    
    const updatedJob = myJobs.find((job) => job._id === jobId);
    console.log(updatedJob);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myJobs.map((element) => (
              <div
                className="bg-white shadow-lg rounded-lg p-6"
                key={element._id}
              >
                <div className="mb-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block font-medium">Title:</label>
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(element._id, "title", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Country:</label>
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "country",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block font-medium">City:</label>
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        onChange={(e) =>
                          handleInputChange(element._id, "city", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Category:</label>
                      <select
                        className="border rounded px-2 py-1 w-full"
                        value={element.category}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "category",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id}
                      >
                        <option value="Graphics & Design">
                          Graphics & Design
                        </option>
                        <option value="Mobile App Development">
                          Mobile App Development
                        </option>
                        <option value="Frontend Web Development">
                          Frontend Web Development
                        </option>
                        <option value="MERN Stack Development">
                          MERN STACK Development
                        </option>
                        <option value="Account & Finance">
                          Account & Finance
                        </option>
                        <option value="Artificial Intelligence">
                          Artificial Intelligence
                        </option>
                        <option value="Video Animation">
                          Video Animation
                        </option>
                        <option value="MEAN Stack Development">
                          MEAN STACK Development
                        </option>
                        <option value="MEVN Stack Development">
                          MEVN STACK Development
                        </option>
                        <option value="Data Entry Operator">
                          Data Entry Operator
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium">Salary:</label>
                      {element.fixedSalary ? (
                        <input
                          type="number"
                          className="border rounded px-2 py-1 w-full"
                          disabled={editingMode !== element._id}
                          value={element.fixedSalary}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "fixedSalary",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-full"
                            disabled={editingMode !== element._id}
                            value={element.salaryFrom}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "salaryFrom",
                                e.target.value
                              )
                            }
                          />
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-full"
                            disabled={editingMode !== element._id}
                            value={element.salaryTo}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "salaryTo",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block font-medium">Expired:</label>
                      <select
                        className="border rounded px-2 py-1 w-full"
                        value={element.expired}
                        onChange={(e) =>
                          handleInputChange(element._id, "expired", e.target.value)
                        }
                        disabled={editingMode !== element._id}
                      >
                        <option value={true}>TRUE</option>
                        <option value={false}>FALSE</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block font-medium">Description:</label>
                    <textarea
                      rows={5}
                      className="border rounded px-2 py-1 w-full"
                      value={element.description}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block font-medium">Location:</label>
                    <textarea
                      rows={5}
                      className="border rounded px-2 py-1 w-full"
                      value={element.location}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "location",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      >
                        Edit Job
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <p className="text-lg font-medium">
              You haven't posted any jobs yet!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
