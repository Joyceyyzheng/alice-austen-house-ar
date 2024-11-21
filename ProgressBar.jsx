import { useState, useEffect } from "react";
import useStore from "./store";
import threeIcon from "./public/assets/photo_progressthree_icon.svg";
import sevenIcon from "./public/assets/photo_progressseven_icon.svg";
import threeActiveIcon from "./public/assets/photo_progressthree_active_icon.svg";
import sevenActiveIcon from "./public/assets/photo_progressseven_active_icon.svg";

const ProgressBar = () => {
  const { currentStep, nextStep, prevStep, setCurrentStep } = useStore();

  const handleStepClick = (step) => {
    setCurrentStep(step);
    console.info("currentStep", currentStep);
  };
  return (
    <>
      <div className="progressbar-parent">
        <div className="progressbar-track">
          <div
            className="progressbar-progress"
            style={{ width: `${Math.min((currentStep / 6) * 100, 100)}%` }}
          ></div>
        </div>
        <div className="progressbar-steps">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className={`progressbar-step ${
                index + 1 <= currentStep ? "active" : ""
              }`}
              onClick={() => handleStepClick(index + 1)}
            >
              {index + 1 === 3 ? (
                <img
                  src={index + 1 <= currentStep ? threeActiveIcon : threeIcon}
                  alt="1"
                />
              ) : index + 1 === 7 ? (
                <img
                  src={index + 1 <= currentStep ? sevenActiveIcon : sevenIcon}
                  alt="1"
                />
              ) : (
                index + 1
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
