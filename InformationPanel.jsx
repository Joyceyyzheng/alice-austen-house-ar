import { useState } from "react";
import React from "react";
import useStore from "./store";
import InformationPanelContent from "./InformationPanelContent";

const InformationPanel = () => {
  const { currentStep } = useStore();
  // console.info(InformationPanelContent[1][0].title);
  console.info(currentStep);
  console.info(InformationPanelContent[currentStep][0].title);
  return (
    <>
      <div className="info-panel-parent">
        <div className="info-panel-header">
          <div className="info-panel-title">
            {InformationPanelContent[currentStep][0].title}
          </div>
          <div className="info-panel-close-btn"></div>
        </div>
        <div className="info-panel-content">
          {/* {InformationPanelContent[tutorialStep].content} */}
        </div>
      </div>
    </>
  );
};

export default InformationPanel;
