import { useState } from "react";
import React from "react";
import tutorialContent from "./TutorialContent";
import nextBtn from "./public/assets/tutorial_next_btn.svg";
import useStore from "./store";

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
  // return <div className="tutorial-overlay"></div>;
};

const Tutorial = () => {
  // const [currentStep, setCurrentStep] = useState(0); //make this a store one
  // const [tutorialActive, setTutorialActive] = useState(true);

  const { tutorialStep, setTutorialStep, tutorialActive, setTutorialActive } = useStore();

  const handleNext = () => {

    if (tutorialStep < tutorialContent.length - 1) {
      setTutorialStep(tutorialStep + 1);
      // console.info("Updated tutorialStep (async):", tutorialStep + 1);
    } else {
      //setTutorialStep(0);
      setTutorialActive(false);
    }
  };

  const handleSkip = () => {
    setTutorialActive(false);
    // console.info("Tutorial skipped");
  };

  //⚠️⚠️⚠️⚠️
  //useMemo / useEffect
  // style variables (?blur)

  // const style = useMemo(() => {
  //   if (currentStep === 3) {
  //     return {filter: 'blur(10px)'};
  //   }
  //   return {}
  // }, [currentStep])

  //use in each file where tutorial is active, don't make it global

  if (!tutorialActive) return null;

  return (
    <div>
      <Overlay />
      <TutorialComp
        title={tutorialContent[tutorialStep].title}
        content={tutorialContent[tutorialStep].content}
        onNext={handleNext}
        onSkip={handleSkip}
        isLastStep={tutorialStep === tutorialContent.length - 1}
        position={tutorialContent[tutorialStep].position}
      />
    </div>
  );
};
export default Tutorial;
