import React from "react";
import camPreview from "./public/assets/camera_preview.svg";
import useStore from "./store";
import nextBtn from "./public/assets/tutorial_next_btn.svg";
import { useState } from "react";


const OnBoarding = ({ onSkip, onNext }) => {

  return (
    <>
      <div className="opening-tutorial-title">Before we start...</div>
      <div className="tutorial-comp-parent-op">
        <div className="tutorial-comp-text-op">
          <div className="tutorial-comp-title">On-boarding</div>
          <div className="tutorial-comp-content">We’ll walk you through an on-boarding stage to get you familiar with how to use the app.</div>
        </div>
        <div className="tutorial-comp-buttons">
          <div className="tutorial-comp-next-container">
            <div className="tutorial-comp-next" onClick={onNext}>
              Next
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
    </>

  )
}

const Opening = () => {

  const { setProgramStart, tutorialStep, setTutorialStep, tutorialActive, setTutorialActive } = useStore();
  const [nextPage, setNextPage] = useState(false);

  const handleSkip = () => {
    setTutorialActive(false);
    setProgramStart(true);
  };

  const handleNext = () => {
    setProgramStart(true);
  }



  return (
    <>
      <div className="opening-overlay"></div>
      {!nextPage ? <>
        <div className="opening-container">
          <img className="opening-camera" src={camPreview} alt="camera preivew" />
          <div className="opening-title">Welcome to Alice Austen’s Darkroom</div>
          <div className="opening-content">
            This is an Augmented Reality experience about the dark room process that Alice Austen used in the Victorian era. Explore what happened in her dark room with our physical miniature.
          </div>
          <button
            className="opening-btn"
            onClick={() => {
              setNextPage(true);
            }}
          >
            Try now!
          </button>
          {/* {nextPage && <OnBoarding onSkip={handleSkip} onNext={handleNext} />} */}
        </div>
      </> : <OnBoarding onSkip={handleSkip} onNext={handleNext} />}


    </>
  );
};




export default Opening;
