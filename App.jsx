// App.jsx
import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import useStore from "./store";

const App = () => {
  const [step, setStep] = useState(0);
  const { currentStep, nextStep, prevStep } = useStore();

  const cameraModelEntity = document.querySelector('[src="#cameraModel"]');
  const roomModelEntity = document.querySelector('[src="#roomModel"]');
  const frameModelEntity = document.querySelector('[src="#cupModel"]');

  const handleNextButtonClick = () => {
    nextStep();
  };

  const handlePrevButtonClick = () => {
    prevStep();
    console.info("Previous button clicked");
  };

  const updateModelVisibility = () => {
    // Select each model entity by ID

    if (roomModelEntity && currentStep === 1) {
      roomModelEntity.setAttribute("visible", true);
      cameraModelEntity.setAttribute("visible", false);
      frameModelEntity.setAttribute("visible", false);
      console.log("roomModelEntity updated to visible");
    } else {
      console.log("roomModelEntity not found");
    }

    if (cameraModelEntity && currentStep === 2) {
      cameraModelEntity.setAttribute("visible", true);
      roomModelEntity.setAttribute("visible", false);
      frameModelEntity.setAttribute("visible", false);
      console.log("cameraModelEntity updated to visible");
    } else {
      console.log("cameraModelEntity not found");
    }

    if (frameModelEntity && currentStep === 3) {
      frameModelEntity.setAttribute("visible", true);
      roomModelEntity.setAttribute("visible", false);
      cameraModelEntity.setAttribute("visible", false);
      console.log("frameModelEntity updated to visible");
    } else {
      console.log("frameModelEntity not found");
    }

    if (frameModelEntity && currentStep === 4) {
      frameModelEntity.setAttribute("visible", false);
      console.log("frameModelEntity updated to visible");
    }
  };

  useEffect(() => {
    updateModelVisibility();
    console.log("Step updated to", currentStep);
  }, [currentStep]);

  return (
    <div>
      <ProgressBar />
      <div className="mainLogo"></div>
      <button className="nextBtn" onClick={handleNextButtonClick}></button>
      <button className="prevBtn" onClick={handlePrevButtonClick}></button>
    </div>
  );
};

export default App;
