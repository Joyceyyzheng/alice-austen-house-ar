import { useState, useEffect } from "react";
import useStore from "./store";

const ProgressBar = () => {
  const { currentStep, nextStep, prevStep } = useStore();
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
