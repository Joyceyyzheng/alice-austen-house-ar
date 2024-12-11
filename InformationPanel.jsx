import { useState, useEffect } from "react";
import React from "react";
import useStore from "./store";
import InformationPanelContent from "./InformationPanelContent";
import BlurOverlay from "./BlurOverlay";

const InformationPanel = () => {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState(true);
  const { modalExpanded, setModalExpanded, currentStep, tutorialStep, tutorialActive } =
    useStore();
  const [isTutorial, setIsTutorial] = useState(false);
  // console.info(InformationPanelContent[1][0].title);
  //   console.info(currentStep);
  //console.info(InformationPanelContent[currentStep][0].title);

  const handleExpand = () => {
    // console.log("expand");
    setExpanded(!expanded);
  };

  useEffect(() => {

    if (tutorialStep === 1 && tutorialActive) {
      setExpanded(false);
      setIsTutorial(true);
    }
    //reading tutorial steps, setting blurry overlay
    else {
      // console.info(tutorialStep);
      setExpanded(false);
      setIsTutorial(false);
    }
  }, [tutorialStep, tutorialActive]);

  useEffect(() => {
    if (currentStep === 3 || currentStep === 7 || currentStep === 8) {
      setContent(false);
    } else {
      setContent(true);
    }
  }, [currentStep]);

  return (
    <>

      {/* {isTutorial && <div className="info-panel-parent-bg"></div>} */}
      {/* <div className={`info-panel-parent ${isTutorial ? "up" : ""}`}> */}
      <div className={`info-panel-parent `}>
        <div className="info-panel-header">
          <div className="info-panel-title">
            {InformationPanelContent[currentStep][0].title}
          </div>
          {content && (
            <div
              className={`info-panel-close-btn ${expanded ? "expanded" : ""}`}
              onClick={handleExpand}
            ></div>
          )}
        </div>
        {expanded && content && (
          <div className="info-panel-content">
            {InformationPanelContent[currentStep][0].content}
          </div>
        )}
      </div>
    </>
  );
};

export default InformationPanel;
