import { useState, useEffect } from "react";
import useStore from "./store";
import threeIcon from "./public/assets/progressbar_icon1.svg";
import sevenIcon from "./public/assets/progressbar_icon2.svg";
import eightIcon from "./public/assets/photo_progresseight_icon.svg";
import threeActiveIcon from "./public/assets/photo_progressthree_active_icon.svg";
import sevenActiveIcon from "./public/assets/photo_progressseven_active_icon.svg";
import eightActiveIcon from "./public/assets/photo_progresseight_active_icon.svg";

const ProgressBar = () => {
  const { currentStep, nextStep, prevStep, setCurrentStep, tutorialStep, tutorialActive } = useStore();
  const [isTutorial, setIsTutorial] = useState(false);


  useEffect(() => {
    if (tutorialActive && tutorialStep === 0) {
      setIsTutorial(true);
    } else {
      setIsTutorial(false);
    }

  }, [tutorialStep, tutorialActive]);



  const handleStepClick = (step) => {
    setCurrentStep(step);
  };
  return (
    <>
      <div className={`progressbar-parent ${isTutorial ? "up" : ""}`}>
        {isTutorial && <div className="progressbar-parent-bg"></div>}
        <div className="progressbar-steps">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="progressbar-segment">
              {/* Step */}
              <div
                className={`progressbar-step ${index + 1 === currentStep
                  ? "active"
                  : index + 1 < currentStep
                    ? "completed"
                    : ""
                  } ${isTutorial ? "up" : ""}`}
                onClick={() => handleStepClick(index + 1)}
              >

                {index + 1 === 3 ? (
                  <img
                    src={index + 1 <= currentStep ? threeIcon : threeIcon}
                    alt="3"
                  />
                ) : index + 1 === 7 ? (
                  <img
                    src={index + 1 <= currentStep ? sevenIcon : sevenIcon}
                    alt="7"
                  />
                ) : index + 1 === 8 ? (
                  <img
                    src={index + 1 <= currentStep ? eightActiveIcon : eightActiveIcon}
                    alt="8"
                  />
                ) : (
                  index + 1
                )}
              </div>

              {index < 6 && (
                <div
                  className={`progressbar-track ${currentStep > index + 1
                    ? "completed"
                    : ""
                    } ${isTutorial ? "up" : ""}`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default ProgressBar;
