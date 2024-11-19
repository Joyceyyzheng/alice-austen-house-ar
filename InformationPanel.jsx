import { useState, useEffect } from "react";
import React from "react";
import useStore from "./store";
import InformationPanelContent from "./InformationPanelContent";

const InformationPanel = () => {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState(true);
  const { modalExpanded, setModalExpanded, currentStep, tutorialStep } =
    useStore();
  // console.info(InformationPanelContent[1][0].title);
  //   console.info(currentStep);
  //console.info(InformationPanelContent[currentStep][0].title);

  const handleExpand = () => {
    // console.log("expand");
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (tutorialStep === 0) {
      setExpanded(false);
    } else if (tutorialStep === 1) {
      setExpanded(true);
    } else {
      // console.info(tutorialStep);
      setExpanded(false);
    }
  }, [tutorialStep]);

  useEffect(() => {
    if (currentStep === 3 || currentStep === 7) {
      setContent(false);
    } else {
      setContent(true);
    }
  }, [currentStep]);

  return (
    <>
      <div className="info-panel-parent">
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
