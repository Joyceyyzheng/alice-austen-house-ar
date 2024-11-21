// App.jsx
import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import useStore from "./store";
import Tutorial from "./Tutorial";
import Opening from "./Opening";
import Equipment from "./Equipment";
import InformationPanel from "./InformationPanel";
import LightsOff from "./LightsOff";
import BlurOverlay from "./BlurOverlay";
import TutorialHighlight from "./TutorialHighlight";

const App = () => {
  const { currentStep, nextStep, prevStep, programStart, tutorialStep } =
    useStore();

  const cameraModelEntity = document.querySelector('[src="#cameraModel"]');
  const roomModelEntity = document.querySelector('[src="#roomModel"]');
  const frameModelEntity = document.querySelector('[src="#cupModel"]');
  const newCameraModelEntity = document.querySelector('[src="#newCamModel"]');
  const contactModelEntity = document.querySelector('[src="#contactModel"]');
  const tankModelEntity = document.querySelector('[src="#tankModel"]');
  const trayModelEntity = document.querySelector('[src="#trayModel"]');
  const spoonModelEntity = document.querySelector('[src="#spoonModel"]');

  const handleNextButtonClick = () => {
    nextStep();
  };

  const handlePrevButtonClick = () => {
    prevStep();
  };

  const updateModelVisibility = () => {
    if (roomModelEntity && currentStep === 1) {
      roomModelEntity.setAttribute("visible", false);
      cameraModelEntity.setAttribute("visible", true);
      //dry plate = true
      frameModelEntity.setAttribute("visible", false);
      contactModelEntity.setAttribute("visible", false);
      tankModelEntity.setAttribute("visible", false);
      trayModelEntity.setAttribute("visible", false);
      spoonModelEntity.setAttribute("visible", false);
    } else {
      console.log("roomModelEntity not found");
    }

    if (cameraModelEntity && currentStep === 2) {
      roomModelEntity.setAttribute("visible", false);
      frameModelEntity.setAttribute("visible", true);
      contactModelEntity.setAttribute("visible", false);
      tankModelEntity.setAttribute("visible", true);
      trayModelEntity.setAttribute("visible", false);
      spoonModelEntity.setAttribute("visible", true);

      cameraModelEntity.setAttribute("visible", false);
    } else {
      console.log("cameraModelEntity not found");
    }

    if (frameModelEntity && currentStep === 3) {
      roomModelEntity.setAttribute("visible", false);
      cameraModelEntity.setAttribute("visible", false);
      contactModelEntity.setAttribute("visible", false);
      tankModelEntity.setAttribute("visible", false);
      trayModelEntity.setAttribute("visible", false);
      spoonModelEntity.setAttribute("visible", false);

      frameModelEntity.setAttribute("visible", false);
    } else {
      console.log("frameModelEntity not found");
    }

    if (contactModelEntity && currentStep === 4) {
      frameModelEntity.setAttribute("visible", true);
      roomModelEntity.setAttribute("visible", false);
      cameraModelEntity.setAttribute("visible", false);
      tankModelEntity.setAttribute("visible", false);
      trayModelEntity.setAttribute("visible", true);
      spoonModelEntity.setAttribute("visible", true);

      contactModelEntity.setAttribute("visible", false);
    } else {
      console.log("contactModelEntity not found");
    }

    if (tankModelEntity && currentStep === 5) {
      contactModelEntity.setAttribute("visible", true);
      trayModelEntity.setAttribute("visible", false);
      spoonModelEntity.setAttribute("visible", false);
      frameModelEntity.setAttribute("visible", false);
      roomModelEntity.setAttribute("visible", false);
      cameraModelEntity.setAttribute("visible", false);
      tankModelEntity.setAttribute("visible", false);
    } else {
      console.log("tankModelEntity not found");
    }
    if (trayModelEntity && currentStep === 6) {
      frameModelEntity.setAttribute("visible", true);
      roomModelEntity.setAttribute("visible", false);
      cameraModelEntity.setAttribute("visible", false);
      tankModelEntity.setAttribute("visible", false);
      trayModelEntity.setAttribute("visible", true);
      spoonModelEntity.setAttribute("visible", true);

      contactModelEntity.setAttribute("visible", false);
    } else {
      console.log("trayModelEntity not found");
    }

    if (spoonModelEntity && currentStep === 7) {
      roomModelEntity.setAttribute("visible", false);
      cameraModelEntity.setAttribute("visible", false);
      contactModelEntity.setAttribute("visible", false);
      tankModelEntity.setAttribute("visible", false);
      trayModelEntity.setAttribute("visible", false);
      spoonModelEntity.setAttribute("visible", false);

      frameModelEntity.setAttribute("visible", false);
    } else {
      console.log("spoonModelEntity not found");
    }
  };

  useEffect(() => {
    updateModelVisibility();
    // console.log("Step updated to", currentStep);
  }, [currentStep]);

  return (
    <div>
      {/* {programStart ? ( */}
      <>
        {" "}
        <Tutorial />

        <InformationPanel />
        <ProgressBar />
        <Equipment />

        <LightsOff />
        <BlurOverlay />
        {/* <TutorialHighlight step={[0, 1]}>
          <InformationPanel />
          <ProgressBar />
        </TutorialHighlight>
        <TutorialHighlight step={[2, 3, 4]}>
          <Equipment />
        </TutorialHighlight> */}
        <div className="mainLogo"></div>
        {/* <div className="main-header">
        </div> */}
        <button className="nextBtn" onClick={handleNextButtonClick}></button>
        <button className="prevBtn" onClick={handlePrevButtonClick}></button>
      </>
      {/* ) : (
        <Opening />
      )} */}
    </div>
  );
};

export default App;
