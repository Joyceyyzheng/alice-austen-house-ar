import { useState } from "react";
import React from "react";
import tutorialContent from "./TutorialContent";
import nextBtn from "./public/assets/tutorial_next_btn.svg";

const TutorialComp = ({
  title,
  content,
  onNext,
  onSkip,
  isLastStep,
  position,
}) => {
  return (
    <div className="tutorial" style={{ position: "absolute", ...position }}>
      <div className="tutorial-comp-parent">
        <div className="tutorial-comp-text">
          <div className="tutorial-comp-title">{title}</div>
          <div className="tutorial-comp-content">{content}</div>
        </div>
        <div className="tutorial-comp-buttons">
          <div className="tutorial-comp-next-container">
            <div className="tutorial-comp-next" onClick={onNext}>
              {isLastStep ? "Finish" : "Next"}
            </div>
            <div className="tutorial-comp-next-Btn">
              <img src={nextBtn} alt="nextBtn" />
            </div>
          </div>
          <div className="tutorial-comp-skip" onClick={onSkip}>
            Skip
          </div>
        </div>
      </div>
      <div className="tutorial-comp-background"></div>
    </div>
  );
};

const Overlay = () => {
  return <div className="tutorial-overlay"></div>;
};

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialActive, setTutorialActive] = useState(true);

  const handleNext = () => {
    if (currentStep < tutorialContent.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
      console.info("currentStep", currentStep);
    } else {
      setTutorialActive(false);
    }
  };

  const handleSkip = () => {
    setTutorialActive(false);
    console.info("Tutorial skipped");
  };

  if (!tutorialActive) return null;

  return (
    <div>
      <Overlay />
      <TutorialComp
        title={tutorialContent[currentStep].title}
        content={tutorialContent[currentStep].content}
        onNext={handleNext}
        onSkip={handleSkip}
        isLastStep={currentStep === tutorialContent.length - 1}
        position={tutorialContent[currentStep].position}
      />
    </div>
  );
};
export default Tutorial;
