import React from "react";
import camPreview from "./public/assets/camera_preview.svg";
import useStore from "./store";

const Opening = () => {
  const { setProgramStart } = useStore();

  return (
    <>
      <div className="opening-overlay"></div>
      <div className="opening-container">
        <img className="opening-camera" src={camPreview} alt="camera preivew" />
        <div className="opening-title">Welcome to Alice Austen House</div>
        <div className="opening-content">
          This is an AR experience about the dark room process that Alice Austen
          used in the Victorian era. Explore what happened in her dark room with
          our physical miniature.
        </div>
        <button
          className="opening-btn"
          onClick={() => {
            setProgramStart(true);
          }}
        >
          Try now!
        </button>
      </div>
    </>
  );
};

export default Opening;
