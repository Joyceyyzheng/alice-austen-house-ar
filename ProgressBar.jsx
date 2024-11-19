import { useState, useEffect } from "react";
import useStore from "./store";
import { step } from "three/webgpu";

const ProgressBar = () => {
  const { currentStep, nextStep, prevStep, setCurrentStep } = useStore();

  const handleStepClick = (step) => {
    setCurrentStep(step);
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
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
