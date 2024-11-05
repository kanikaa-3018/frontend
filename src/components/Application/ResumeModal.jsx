import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 relative max-w-md w-full">
        <span className="absolute top-2 right-2 text-2xl cursor-pointer text-gray-500" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" className="w-full h-auto rounded-lg" />
      </div>
    </div>
  );
};

export default ResumeModal;
